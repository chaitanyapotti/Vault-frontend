import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";
import { pollTxHash } from "../helperActions";

export const isAlreadyWhiteListed = receipt => ({
  payload: { receipt },
  type: actionTypes.WHITELIST_CHECK
});

export const isButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.BUTTON_SPINNING
});

export const onWhiteListClick = (version, contractName, contractAddress, userLocalPublicAddress) => async dispatch => {
  dispatch(isButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: contractName } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      // TODO: to send country attributes of the user
      instance.methods
        .requestMembership([])
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.WHITELIST_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(isAlreadyWhiteListed(true));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.WHITELIST_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isButtonSpinning(false));
                dispatch(isAlreadyWhiteListed(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.WHITELIST_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isButtonSpinning(false));
                dispatch(isAlreadyWhiteListed(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.WHITELIST_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isButtonSpinning(false));
      dispatch(isAlreadyWhiteListed(false));
    });
};

export const checkWhiteList = (version, contractAddress, userLocalPublicAddress) => async dispatch => {
  // doesn't call the blockchain => non-blocking
  const network = "rinkeby";
  const address = await web3.utils.toChecksumAddress(contractAddress);
  axios
    .get(`${config.api_base_url}/web3/membershiptoken/iscurrentmember`, {
      params: { version: version.toString(), network, address, useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(isAlreadyWhiteListed(data === "true"));
      } else {
        console.error("api response error");
        dispatch(isAlreadyWhiteListed(false));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isAlreadyWhiteListed(false));
    });
};
