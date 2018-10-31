import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";

export const refundByKillButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.REFUND_BY_KILL_BUTTON_SPINNING
});

export const refundBySoftCapFailButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.REFUND_BY_SOFT_CAP_FAIL_BUTTON_SPINNING
});

export const refundByKill = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  dispatch(refundByKillButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      instance.methods
        .refundByKill()
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(refundByKillButtonSpinning(false));
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(refundByKillButtonSpinning(false));
        });
    })
    .catch(err => {
      console.log(err.message);
      dispatch(refundByKillButtonSpinning(false));
    });
};

export const refundBySoftCapFail = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  dispatch(refundBySoftCapFailButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      instance.methods
        .refundBySoftcapFail()
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(refundBySoftCapFailButtonSpinning(false));
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(refundBySoftCapFailButtonSpinning(false));
        });
    })
    .catch(err => {
      console.log(err.message);
      dispatch(refundBySoftCapFailButtonSpinning(false));
    });
};