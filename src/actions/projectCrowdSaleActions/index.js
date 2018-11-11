import axios from "axios";
// import { type } from "os";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";
import { pollTxHash } from "../helperActions";

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

export const buyTokens = (version, contractAddress, userLocalPublicAddress, amount, round, daicoTokenAddress) => dispatch => {
  dispatch(isBuyButtonSpinning(true));
  web3.eth
    .sendTransaction({
      from: userLocalPublicAddress,
      to: contractAddress,
      value: web3.utils.toWei(amount, "ether")
    })
    .on("transactionHash", transactionHash =>
      dispatch(
        pollTxHash(
          transactionHash,
          () => {
            dispatch(getTokenBalance(version, daicoTokenAddress, userLocalPublicAddress));
            dispatch(getRoundTokensSold(version, contractAddress, round));
            dispatch(isBuyButtonSpinning(false));
          },
          () => {
            dispatch(isBuyButtonSpinning(false));
          },
          () => {},
          () => {
            dispatch(isBuyButtonSpinning(false));
          }
        )
      )
    )
    .on("receipt", receipt => {
      dispatch(getTokenBalance(version, daicoTokenAddress, userLocalPublicAddress));
      dispatch(getRoundTokensSold(version, contractAddress, round));
      dispatch(isBuyButtonSpinning(false));
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
