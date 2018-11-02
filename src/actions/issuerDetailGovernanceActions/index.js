import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";
import { getCurrentTap } from "../projectDetailGovernanceActions/index";

export const isStartNewRoundButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.START_NEW_ROUND_BUTTON_SPINNING
});

export const isStartR1ButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.Start_R1_BUTTON_SPINNING
});

export const isDeployTapPollButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.DEPLOY_TAP_POLL_BUTTON_SPINNING
});

export const isIncrementTapButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.INCREMENT_TAP_BUTTON_SPINNING
});

export const isDeployXfrPollButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.DEPLOY_XFR_POLL_BUTTON_SPINNING
});

export const isWithdrawXfrButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.WITHDRAW_XFR_BUTTON_SPINNING
});

export const isWithdrawButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.WITHDRAW_BUTTON_SPINNING
});

export const startR1 = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  dispatch(isStartR1ButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "CrowdSale" } })
    .then(res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      instance.methods
        .startNewRound()
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(isStartR1ButtonSpinning(false));
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isStartR1ButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isStartR1ButtonSpinning(false));
    });
};

export const startNewRound = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isStartNewRoundButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "CrowdSale" } })
    .then(res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      instance.methods
        .startNewRound()
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(isStartNewRoundButtonSpinning(false));
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isStartNewRoundButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isStartNewRoundButtonSpinning(false));
    });
};

export const deployTapPoll = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isDeployTapPollButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      instance.methods
        .createTapIncrementPoll()
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(getCurrentTap(version, contractAddress));
          dispatch(isDeployTapPollButtonSpinning(false));
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isDeployTapPollButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isDeployTapPollButtonSpinning(false));
    });
};

export const incrementTap = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isIncrementTapButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      instance.methods
        .increaseTap()
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(getCurrentTap(version, contractAddress));
          dispatch(isIncrementTapButtonSpinning(false));
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isIncrementTapButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isIncrementTapButtonSpinning(false));
    });
};

export const deployXfrPoll = (version, contractAddress, userLocalPublicAddress, amount) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isDeployXfrPollButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const weiAmount = await web3.utils.toWei(amount, "ether");
      instance.methods
        .createXfr(weiAmount)
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(isDeployXfrPollButtonSpinning(false));
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isDeployXfrPollButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isDeployXfrPollButtonSpinning(false));
    });
};

export const withdrawXfrAmount = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isWithdrawXfrButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      instance.methods
        .withdrawXfrAmount()
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(isWithdrawXfrButtonSpinning(false));
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isWithdrawXfrButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isWithdrawXfrButtonSpinning(false));
    });
};

export const withdrawAmount = (version, contractAddress, userLocalPublicAddress, amount) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isWithdrawButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const weiAmount = await web3.utils.toWei(amount, "ether");
      instance.methods
        .withdrawAmount(weiAmount)
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(isWithdrawButtonSpinning(false));
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isWithdrawButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isWithdrawButtonSpinning(false));
    });
};
