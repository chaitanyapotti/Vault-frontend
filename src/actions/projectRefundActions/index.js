import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";
import { getTotalSupply, getRemainingEtherBalance } from "../projectDetailGovernanceActions";
import { getTokenBalance } from "../projectCrowdSaleActions";
import { pollTxHash } from "../helperActions";

export const refundByKillButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.REFUND_BY_KILL_BUTTON_SPINNING
});

export const refundBySoftCapFailButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.REFUND_BY_SOFT_CAP_FAIL_BUTTON_SPINNING
});

export const refundByKill = (version, contractAddress, userLocalPublicAddress, daicoTokenAddress, network) => dispatch => {
  dispatch(refundByKillButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      instance.methods
        .refundByKill()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(refundByKillButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.REFUND_BY_KILL_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getTokenBalance(version, daicoTokenAddress, userLocalPublicAddress, network));
                dispatch(getRemainingEtherBalance(version, contractAddress, network));
                dispatch(getTotalSupply(version, daicoTokenAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.REFUND_BY_KILL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(refundByKillButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.REFUND_BY_KILL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(refundByKillButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.REFUND_BY_KILL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.log(err.message);
          dispatch(refundByKillButtonSpinning(false));
        });
    })
    .catch(err => {
      console.log(err.message);
      dispatch(refundByKillButtonSpinning(false));
    });
};

export const refundBySoftCapFail = (version, contractAddress, userLocalPublicAddress, daicoTokenAddress, network) => dispatch => {
  dispatch(refundBySoftCapFailButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      instance.methods
        .refundBySoftcapFail()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(refundBySoftCapFailButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.REFUND_BY_SOFTCAPFAIL_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getTokenBalance(version, daicoTokenAddress, userLocalPublicAddress, network));
                dispatch(getRemainingEtherBalance(version, contractAddress, network));
                dispatch(getTotalSupply(version, daicoTokenAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.REFUND_BY_SOFTCAPFAIL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(refundBySoftCapFailButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.REFUND_BY_SOFTCAPFAIL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(refundBySoftCapFailButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.REFUND_BY_SOFTCAPFAIL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.log(err.message);
          dispatch(refundBySoftCapFailButtonSpinning(false));
        });
    })
    .catch(err => {
      console.log(err.message);
      dispatch(refundBySoftCapFailButtonSpinning(false));
    });
};
