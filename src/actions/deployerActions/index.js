import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";

export const txPending = () => ({
  payload: {},
  type: actionTypes.BUTTON_SPINNING
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

export const fetchProjectDetails = projectid => dispatch =>
  axios
    .get(`${config.api_base_url}/db/projects`, { params: { projectid } })
    .then(async response => {
      if (response.status === 200) {
        const { data } = response.data || {};
        const { latestTxHash, currentDeploymentIndicator } = data || {};
        dispatch(projectDetailsFetched(data));
        if (latestTxHash !== "0x") {
          web3.eth.getTransactionReceipt(latestTxHash).then(result => {
            if (result !== null) {
              // update ctr address in db and update txhash to "0x"
              if (result.status)
                setContractAddress(projectid, currentDeploymentIndicator, result.contractAddress).then(body => dispatch(deployedContract(body)));
              // redotx;  set txHash to 0x
              else dispatch(redoTx(currentDeploymentIndicator));
            } else {
              // wait for tx to complete - keep spinner rotating
              dispatch(txPending());
            }
          });
        }
      } else {
        dispatch(projectDetailsFetched({}));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(projectDetailsFetched({}));
    });

export const deployContractAction = (version, projectid, cdi, args, contractName, userLocalPublicAddress) => dispatch =>
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: contractName } })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data || {};
        const { abi, bytecode } = data || {};
        new web3.eth.Contract(abi)
          .deploy({ data: bytecode, arguments: args })
          .send({ from: userLocalPublicAddress })
          .on("error", error => console.error(error.message))
          .on("transactionHash", transactionHash => setTxHash(projectid, transactionHash, cdi).then(body => dispatch(receivedTransactionHash(body))))
          .then(newContractInstance =>
            setContractAddress(projectid, cdi, newContractInstance.options.address)
              .then(body => dispatch(deployedContract(body)))
              .catch(err => {
                console.error(err.message);
                dispatch(receivedTransactionHash({}));
                dispatch(deployedContract({}));
              })
          );
      } else {
        console.log("database error");
        dispatch(receivedTransactionHash({}));
        dispatch(deployedContract({}));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(receivedTransactionHash({}));
      dispatch(deployedContract({}));
    });

export const performContractAction = (version, projectid, cdi, args, contractName, contractAddress, userLocalPublicAddress) => dispatch =>
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: contractName } })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
        peformSpecificAction(cdi, instance, args, userLocalPublicAddress)
          .on("error", error => console.error(error.message))
          .on("transactionHash", transactionHash => setTxHash(projectid, transactionHash, cdi).then(body => dispatch(receivedTransactionHash(body))))
          .then(receipt =>
            setContractAddress(projectid, cdi, null)
              .then(body => dispatch(deployedContract(body)))
              .catch(err => {
                console.error(err.message);
                dispatch(receivedTransactionHash({}));
                dispatch(deployedContract({}));
              })
          );
      } else {
        console.log("database error");
        dispatch(receivedTransactionHash({}));
        dispatch(deployedContract({}));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(receivedTransactionHash({}));
      dispatch(deployedContract({}));
    });

const peformSpecificAction = (cdi, instance, args, userLocalPublicAddress) => {
  switch (cdi) {
    case 5:
      return instance.methods.setTreasuryAddress(args).send({ from: userLocalPublicAddress });
    case 6:
    case 7:
    case 8:
      return instance.methods.setCrowdSaleAddress(args).send({ from: userLocalPublicAddress });
    case 9:
      return instance.methods.createKillPolls().send({ from: userLocalPublicAddress });
    case 10:
      return instance.methods.createRemainingKillPolls().send({ from: userLocalPublicAddress });
    case 11:
      return instance.methods.mintFoundationTokens().send({ from: userLocalPublicAddress });
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
