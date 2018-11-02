import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";

export const isTapButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.TAP_BUTTON_SPINNING
});

export const revokeVoteInTapPoll = (version, contractAddress, userLocalPublicAddress, pollFactoryAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isTapButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      ipollInstance.methods
        .revokeVote()
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(isTapButtonSpinning(false));
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isTapButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isTapButtonSpinning(false));
    });
};
