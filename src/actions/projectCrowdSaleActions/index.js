import axios from "axios";
// import { type } from "os";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";
import { pollTxHash } from "../helperActions";
import { currentRound } from "../projectGovernanceActions";

export const etherCollected = receipt => ({
  payload: { receipt },
  type: actionTypes.ETHER_COLLECTED
});

export const userTokens = receipt => ({
  payload: { receipt },
  type: actionTypes.USER_TOKENS
});

export const roundInfoReceived = data => ({
  payload: { rec: data },
  type: actionTypes.ROUND_INFO_RECEIVED
});

export const isBuyButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.BUY_BUTTON_SPINNING
});

export const tokenBalanceReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.TOKEN_BALANCE_RECEIVED
});

export const isR1FinalizeButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.R1_FINALIZE_BUTTON_SPINNING
});

export const getEtherCollected = (version, contractAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/totaletherraised`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(async response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(etherCollected(data));
      } else {
        dispatch(etherCollected("0"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(etherCollected("0"));
    });
};

export const getUserTokens = (crowdsaleAddress, version, roundNumber, address, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/crowdsale/round/userdetails`, {
      params: { address: crowdsaleAddress, network, version: version.toString(), round: roundNumber, useraddress: address }
    })
    .then(async response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(userTokens(data));
      } else {
        dispatch(userTokens("0"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(userTokens("0"));
    });
};

export const buyAmountChangedAction = value => dispatch => {
  dispatch({
    type: actionTypes.BUY_AMOUNT_CHANGED,
    payload: value
  });
};

export const getRoundTokensSold = (version, contractAddress, round, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/crowdsale/round/details`, {
      params: { version: version.toString(), network, address: contractAddress, round }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(roundInfoReceived(data));
      } else {
        dispatch(roundInfoReceived({}));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(roundInfoReceived({}));
    });
};

export const getTokenBalance = (version, contractAddress, userLocalPublicAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/erc20token/tokenbalance`, {
      params: { version: version.toString(), network, address: contractAddress, useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(tokenBalanceReceived(data));
      } else {
        dispatch(tokenBalanceReceived("0"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(tokenBalanceReceived("0"));
    });
};

export const buyTokens = (
  version,
  contractAddress,
  userLocalPublicAddress,
  amount,
  round,
  daicoTokenAddress,
  pollFactoryAddress,
  network
) => async dispatch => {
  dispatch(isBuyButtonSpinning(true));
  const gasPrice = await web3.eth.getGasPrice();
  web3.eth
    .sendTransaction({
      from: userLocalPublicAddress,
      to: contractAddress,
      value: web3.utils.toWei(amount, "ether"),
      gasPrice: (parseFloat(gasPrice) + 2000000000).toString()
    })
    .on("transactionHash", transactionHash => {
      dispatch(isBuyButtonSpinning(false));
      dispatch({
        payload: { transactionHash },
        type: actionTypes.BUY_BUTTON_TRANSACTION_HASH_RECEIVED
      });
      dispatch(
        pollTxHash(
          transactionHash,
          () => {
            dispatch(getTokenBalance(version, daicoTokenAddress, userLocalPublicAddress, network));
            dispatch(getRoundTokensSold(version, contractAddress, round, network));
            dispatch(getEtherCollected(version, pollFactoryAddress, network));
            dispatch(getUserTokens(contractAddress, version, round, userLocalPublicAddress, network));
            dispatch({
              payload: { transactionHash: "" },
              type: actionTypes.BUY_BUTTON_TRANSACTION_HASH_RECEIVED
            });
            dispatch({
              payload: "",
              type: actionTypes.BUY_AMOUNT_CHANGED
            });
          },
          () => {
            dispatch(isBuyButtonSpinning(false));
            dispatch({
              payload: { transactionHash: "" },
              type: actionTypes.BUY_BUTTON_TRANSACTION_HASH_RECEIVED
            });
          },
          () => {},
          () => {
            dispatch(isBuyButtonSpinning(false));
            dispatch({
              payload: { transactionHash: "" },
              type: actionTypes.BUY_BUTTON_TRANSACTION_HASH_RECEIVED
            });
          }
        )
      );
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isBuyButtonSpinning(false));
    });
};

export const finalizeR1 = (version, contractAddress, userLocalPublicAddress, projectid, network) => dispatch => {
  dispatch(isR1FinalizeButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "CrowdSale" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      // TODO: to send country attributes of the user
      instance.methods
        .finalizeRoundOne()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isR1FinalizeButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.R1_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(currentRound(projectid));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.R1_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isR1FinalizeButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.R1_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isR1FinalizeButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.R1_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isR1FinalizeButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isR1FinalizeButtonSpinning(false));
    });
};
