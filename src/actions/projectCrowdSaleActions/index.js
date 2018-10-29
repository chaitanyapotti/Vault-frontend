import axios from "axios";
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
        dispatch(etherCollected(await web3.utils.fromWei(data, "ether")));
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
    .then(async response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(tokenBalanceReceived(await web3.utils.fromWei(data, "ether")));
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
  web3.eth
    .sendTransaction({
      from: userLocalPublicAddress,
      to: contractAddress,
      value: web3.utils.toWei(amount, "ether")
    })
    .on("receipt", receipt => {
      dispatch(isBuyButtonSpinning(false));
      getTokenBalance(version, contractAddress, userLocalPublicAddress);
      getRoundTokensSold(version, contractAddress, round);
    })
    .on("error", error => {
      console.error(error.message);
      dispatch(isBuyButtonSpinning(false));
    });
};
