import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";

const timers = [];

export const txPending = () => ({
  payload: {},
  type: actionTypes.BUTTON_SPINNING
});

export const isDeployContractButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.DEPLOY_CONTRACT_BUTTON_SPINNING
});

export const isDeployContractStartButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.DEPLOY_CONTRACT_START_BUTTON_SPINNING
});

export const redoTx = cdi => ({
  payload: { cdi, txHash: "0x" },
  type: actionTypes.TRANSACTION_REDO
});

export const projectDetailsFetched = data => ({
  payload: { data },
  type: actionTypes.PROJECT_DETAILS_FETCHED
});

export const deployedContract = body => ({
  payload: { body },
  type: actionTypes.DEPLOYED_CONTRACT
});

export const receivedTransactionHash = body => ({
  payload: { body },
  type: actionTypes.RECEIVED_TRANSACTION_HASH
});

export const fetchProjectDetails = (projectid, useraddress) => async dispatch => {
  const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
  let paramObject = {};
  if (projectid !== "") {
    paramObject = { params: { projectid, network: localNetwork } };
  } else {
    paramObject = { params: { useraddress, network: localNetwork } };
  }
  axios
    .get(`${config.api_base_url}/db/projects`, paramObject)
    .then(async response => {
      if (response.status === 200) {
        const { data } = response.data || {};
        const { latestTxHash, currentDeploymentIndicator } = data || {};
        dispatch(projectDetailsFetched(data));
        if (latestTxHash !== "0x") {
          dispatch(pollTxHash(latestTxHash, projectid, currentDeploymentIndicator));
        }
      } else {
        dispatch(projectDetailsFetched({}));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(projectDetailsFetched({}));
    });
};

export const pollTxHash = (latestTxHash, projectid, currentDeploymentIndicator, userLocalPublicAddress, nonce) => dispatch => {
  let txHash = latestTxHash;
  timers.forEach(x => clearInterval(x));
  const myTimer = setInterval(() => {
    if (txHash === "0x" || !latestTxHash) clearInterval(myTimer);
    web3.eth
      .getTransactionReceipt(latestTxHash)
      .then(result => {
        if (result !== null) {
          // update ctr address in db and update txhash to "0x"
          if (result.status) {
            setContractAddress(projectid, currentDeploymentIndicator, result.contractAddress, nonce).then(async body => {
              dispatch(deployedContract(body));
              dispatch(isDeployContractButtonSpinning(false));
              if (currentDeploymentIndicator === 11) {
                const projectObject = {
                  ownerAddress: userLocalPublicAddress,
                  tokenPrice: 0,
                  projectHealth: 0,
                  killConsensus: 0,
                  projectEndedAt: null,
                  tapIncrement: 0,
                  xfrCount: 0,
                  r1EndedAt: "",
                  currentRound: 0,
                  raisedAmount: 0
                };
                const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
                axios
                  .post(`${config.api_base_url}/db/projects?network=${localNetwork}`, projectObject)
                  .then(response => {
                    if (response.status === 200) {
                      console.log("patch success");
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
            });
            txHash = "0x";
          }
          // redotx;  set txHash to 0x
          else dispatch(redoTx(currentDeploymentIndicator));
        } else {
          // wait for tx to complete - keep spinner rotating
          dispatch(isDeployContractButtonSpinning(true));
        }
      })
      .catch(err => {
        console.error(err.message);
        dispatch(isDeployContractButtonSpinning(false));
        dispatch(isDeployContractStartButtonSpinning(false));
        dispatch(receivedTransactionHash({}));
        dispatch(deployedContract({}));
      });
  }, 2000);
  timers.push(myTimer);
};

export const resetDeployment = userLocalPublicAddress => async dispatch => {
  const projectObject = {
    ownerAddress: userLocalPublicAddress,
    currentDeploymentIndicator: 0,
    latestTxHash: "0x"
  };
  const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
  axios
    .post(`${config.api_base_url}/db/projects?network=${localNetwork}`, projectObject)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchProjectDetails("", userLocalPublicAddress));
        dispatch({
          type: actionTypes.PAGE_RELOADING,
          payload: true
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const deployContractAction = (version, projectid, cdi, args, contractName, userLocalPublicAddress, userNonce = "") => dispatch => {
  dispatch(isDeployContractStartButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: contractName } })
    .then(async response => {
      if (response.status === 200) {
        const { data } = response.data || {};
        const { abi, bytecode } = data || {};
        const gasPrice = await web3.eth.getGasPrice();
        const fetchedNonce = await web3.eth.getTransactionCount(userLocalPublicAddress, "pending");
        const nonceAdj = userNonce !== "" ? userNonce : fetchedNonce;
        const gasPriceAdj = userNonce !== "" ? (parseFloat(gasPrice) + 5000000000).toString() : (parseFloat(gasPrice) + 2000000000).toString();
        new web3.eth.Contract(abi)
          .deploy({ data: bytecode, arguments: args })
          .send({ from: userLocalPublicAddress, gasPrice: gasPriceAdj, nonce: nonceAdj })
          .on("error", error => {
            console.error(error.message);
            dispatch(isDeployContractStartButtonSpinning(false));
          })
          .on("transactionHash", transactionHash => {
            setTxHash(projectid, transactionHash, cdi, nonceAdj).then(body => {
              dispatch(receivedTransactionHash(body));
              dispatch(isDeployContractButtonSpinning(true));
              dispatch(isDeployContractStartButtonSpinning(false));
              dispatch(pollTxHash(transactionHash, projectid, cdi, userLocalPublicAddress, nonceAdj));
            });
          })
          .on("receipt", receipt =>
            setContractAddress(projectid, cdi, receipt.contractAddress, nonceAdj)
              .then(body => {
                dispatch(deployedContract(body));
                dispatch(isDeployContractButtonSpinning(false));
              })
              .catch(err => {
                console.error(err.message);
                dispatch(isDeployContractButtonSpinning(false));
                dispatch(isDeployContractStartButtonSpinning(false));
                dispatch(receivedTransactionHash({}));
                dispatch(deployedContract({}));
              })
          );
      } else {
        console.log("database error");
        dispatch(isDeployContractButtonSpinning(false));
        dispatch(isDeployContractStartButtonSpinning(false));
        dispatch(receivedTransactionHash({}));
        dispatch(deployedContract({}));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isDeployContractButtonSpinning(false));
      dispatch(isDeployContractStartButtonSpinning(false));
      dispatch(receivedTransactionHash({}));
      dispatch(deployedContract({}));
    });
};

export const performContractAction = (
  version,
  projectid,
  cdi,
  args,
  contractName,
  contractAddress,
  userLocalPublicAddress,
  userNonce = ""
) => dispatch => {
  dispatch(isDeployContractStartButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: contractName } })
    .then(async response => {
      if (response.status === 200) {
        const { data } = response.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
        const gasPrice = await web3.eth.getGasPrice();
        const fetchedNonce = await web3.eth.getTransactionCount(userLocalPublicAddress, "pending");
        const nonceAdj = userNonce !== "" ? userNonce : fetchedNonce;
        const gasPriceAdj = userNonce !== "" ? (parseFloat(gasPrice) + 5000000000).toString() : (parseFloat(gasPrice) + 2000000000).toString();
        console.log(nonceAdj, "nonce");
        peformSpecificAction(cdi, instance, args, userLocalPublicAddress, gasPriceAdj, nonceAdj)
          .on("error", error => {
            console.error(error.message);
            dispatch(isDeployContractStartButtonSpinning(false));
          })
          .on("transactionHash", transactionHash =>
            setTxHash(projectid, transactionHash, cdi, nonceAdj).then(body => {
              dispatch(receivedTransactionHash(body));
              dispatch(isDeployContractButtonSpinning(true));
              dispatch(isDeployContractStartButtonSpinning(false));
              dispatch(pollTxHash(transactionHash, projectid, cdi, userLocalPublicAddress, nonceAdj));
            })
          )
          .on("receipt", receipt =>
            setContractAddress(projectid, cdi, null, nonceAdj)
              .then(body => {
                dispatch(deployedContract(body));
                dispatch(isDeployContractButtonSpinning(false));
              })
              .catch(err => {
                console.error(err.message);
                dispatch(isDeployContractButtonSpinning(false));
                dispatch(isDeployContractStartButtonSpinning(false));
                dispatch(receivedTransactionHash({}));
                dispatch(deployedContract({}));
              })
          );
      } else {
        console.log("database error");
        dispatch(isDeployContractButtonSpinning(false));
        dispatch(isDeployContractStartButtonSpinning(false));
        dispatch(receivedTransactionHash({}));
        dispatch(deployedContract({}));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isDeployContractButtonSpinning(false));
      dispatch(isDeployContractStartButtonSpinning(false));
      dispatch(receivedTransactionHash({}));
      dispatch(deployedContract({}));
    });
};

const peformSpecificAction = (cdi, instance, args, userLocalPublicAddress, gasPriceAdj, nonceAdj) => {
  switch (cdi) {
    case 5:
      return instance.methods.setTreasuryAddress(args).send({ from: userLocalPublicAddress, gasPrice: gasPriceAdj, nonce: nonceAdj });
    case 6:
    case 7:
    case 8:
      return instance.methods.setCrowdSaleAddress(args).send({ from: userLocalPublicAddress, gasPrice: gasPriceAdj, nonce: nonceAdj });
    case 9:
      return instance.methods.createKillPolls().send({ from: userLocalPublicAddress, gasPrice: gasPriceAdj, nonce: nonceAdj });
    case 10:
      return instance.methods.createRemainingKillPolls().send({ from: userLocalPublicAddress, gasPrice: gasPriceAdj, nonce: nonceAdj });
    case 11:
      return instance.methods.mintFoundationTokens().send({ from: userLocalPublicAddress, gasPrice: gasPriceAdj, nonce: nonceAdj });
    default:
      return null;
  }
};

const setTxHash = (projectid, transactionHash, cdi, nonce) =>
  new Promise((resolve, reject) => {
    const body = { latestTxHash: transactionHash, currentDeploymentIndicator: cdi, nonce };
    patchContractApi(projectid, body, resolve, reject);
  });

const setContractAddress = (projectid, cdi, address, nonce) =>
  new Promise((resolve, reject) => {
    const body = { latestTxHash: "0x", currentDeploymentIndicator: cdi + 1, nonce };
    switch (cdi) {
      case 0:
        body.membershipAddress = address;
        break;
      case 1:
        body.daicoTokenAddress = address;
        break;
      case 2:
        body.lockedTokensAddress = address;
        break;
      case 3:
        body.pollFactoryAddress = address;
        break;
      case 4:
        body.crowdSaleAddress = address;
        break;
      default:
        console.log(body);
    }
    patchContractApi(projectid, body, resolve, reject);
  });

const patchContractApi = async (projectid, body, resolve, reject) => {
  const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
  axios
    .patch(`${config.api_base_url}/db/projects/contracts?projectid=${projectid}&network=${localNetwork}`, body)
    .then(response => resolve(body)) // maybe update backend to send response as this
    .catch(err => reject(err.message));
};
