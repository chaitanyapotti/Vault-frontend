import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";

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

export const fetchProjectDetails = projectid => dispatch => {
  console.log("fetching details: ", projectid);
  axios
    .get(`${config.api_base_url}/db/projects`, { params: { projectid } })
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

export const pollTxHash = (latestTxHash, projectid, currentDeploymentIndicator, userLocalPublicAddress) => dispatch => {
  let txHash = latestTxHash;
  const myTimer = setInterval(() => {
    if (txHash === "0x" || !latestTxHash) clearInterval(myTimer);
    web3.eth
      .getTransactionReceipt(latestTxHash)
      .then(result => {
        if (result !== null) {
          // update ctr address in db and update txhash to "0x"
          if (result.status) {
            setContractAddress(projectid, currentDeploymentIndicator, result.contractAddress).then(body => {
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
                axios
                  .post(`${config.api_base_url}/db/projects/`, projectObject)
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
};

export const deployContractAction = (version, projectid, cdi, args, contractName, userLocalPublicAddress) => dispatch => {
  dispatch(isDeployContractStartButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: contractName } })
    .then(async response => {
      if (response.status === 200) {
        const { data } = response.data || {};
        const { abi, bytecode } = data || {};
        const gasPrice = await web3.eth.getGasPrice();
        new web3.eth.Contract(abi)
          .deploy({ data: bytecode, arguments: args })
          .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
          .on("error", error => {
            console.error(error.message);
            dispatch(isDeployContractStartButtonSpinning(false));
          })
          .on("transactionHash", transactionHash => {
            setTxHash(projectid, transactionHash, cdi).then(body => {
              dispatch(receivedTransactionHash(body));
              dispatch(isDeployContractButtonSpinning(true));
              dispatch(isDeployContractStartButtonSpinning(false));
              dispatch(pollTxHash(transactionHash, projectid, cdi));
            });
          })
          .on("receipt", receipt =>
            setContractAddress(projectid, cdi, receipt.contractAddress)
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

export const performContractAction = (version, projectid, cdi, args, contractName, contractAddress, userLocalPublicAddress) => dispatch => {
  dispatch(isDeployContractStartButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: contractName } })
    .then(async response => {
      if (response.status === 200) {
        const { data } = response.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
        const gasPrice = await web3.eth.getGasPrice();
        peformSpecificAction(cdi, instance, args, userLocalPublicAddress, gasPrice)
          .on("error", error => {
            console.error(error.message);
            dispatch(isDeployContractStartButtonSpinning(false));
          })
          .on("transactionHash", transactionHash =>
            setTxHash(projectid, transactionHash, cdi).then(body => {
              dispatch(receivedTransactionHash(body));
              dispatch(isDeployContractButtonSpinning(true));
              dispatch(isDeployContractStartButtonSpinning(false));
              dispatch(pollTxHash(transactionHash, projectid, cdi, userLocalPublicAddress));
            })
          )
          .on("receipt", receipt =>
            setContractAddress(projectid, cdi, null)
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

const peformSpecificAction = (cdi, instance, args, userLocalPublicAddress, gasPrice) => {
  switch (cdi) {
    case 5:
      return instance.methods
        .setTreasuryAddress(args)
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() });
    case 6:
    case 7:
    case 8:
      return instance.methods
        .setCrowdSaleAddress(args)
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() });
    case 9:
      return instance.methods.createKillPolls().send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 20000000000).toString() });
    case 10:
      return instance.methods
        .createRemainingKillPolls()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() });
    case 11:
      return instance.methods.mintFoundationTokens().send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() });
    default:
      return null;
  }
};

const setTxHash = (projectid, transactionHash, cdi) =>
  new Promise((resolve, reject) => {
    const body = { latestTxHash: transactionHash, currentDeploymentIndicator: cdi };
    patchContractApi(projectid, body, resolve, reject);
  });

const setContractAddress = (projectid, cdi, address) =>
  new Promise((resolve, reject) => {
    const body = { latestTxHash: "0x", currentDeploymentIndicator: cdi + 1 };
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

const patchContractApi = (projectid, body, resolve, reject) => {
  axios
    .patch(`${config.api_base_url}/db/projects/contracts?projectid=${projectid}`, body)
    .then(response => resolve(body)) // maybe update backend to send response as this
    .catch(err => reject(err.message));
};
