import axios from "axios";
import { type } from "os";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";

export const etherCollected = receipt => ({
  payload: { receipt },
  type: actionTypes.ETHER_COLLECTED
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

export const isStartR1ButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.Start_R1_BUTTON_SPINNING
});

export const getEtherCollected = (version, contractAddress) => async dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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

export const getRoundTokensSold = (version, contractAddress, round) => async dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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

export const getTokenBalance = (version, contractAddress, userLocalPublicAddress) => async dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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

export const buyTokens = (version, contractAddress, userLocalPublicAddress, amount, round) => dispatch => {
  dispatch(isBuyButtonSpinning(true));
  console.log(amount);
  web3.eth
    .sendTransaction({
      from: userLocalPublicAddress,
      to: contractAddress,
      value: web3.utils.toWei(amount, "ether")
    })
    .on("receipt", receipt => {
      dispatch(isBuyButtonSpinning(false));
      dispatch(getTokenBalance(version, contractAddress, userLocalPublicAddress));
      dispatch(getRoundTokensSold(version, contractAddress, round));
    })
    .on("error", error => {
      console.error(error.message);
      dispatch(isBuyButtonSpinning(false));
    });
};

export const finalizeR1 = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  dispatch(isR1FinalizeButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "CrowdSale" } })
    .then(res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      // TODO: to send country attributes of the user
      instance.methods
        .finalizeRoundOne()
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(isR1FinalizeButtonSpinning(false));
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isR1FinalizeButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isR1FinalizeButtonSpinning(false));
    });
};

export const startR1 = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  dispatch(isStartR1ButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "CrowdSale" } })
    .then(res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      // TODO: to send country attributes of the user
      instance.methods
        .startRoundOne()
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
