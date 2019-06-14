import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";
import web3 from "../../helpers/web3";
import constants from "../../constants";

const version = config.vault_version;

export const getUserTokens = userAddress => async dispatch => {
  const network = await web3.eth.net.getNetworkType();
  const localVersion = version[network];
  // const network = "rinkeby";
  // await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/projectweb3/tokens`, {
      params: { network, version: localVersion, address: userAddress }
    })
    .then(response => {
      if (response.status === 200) {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.USER_TOKENS_SUCCESS,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: actionTypes.USER_TOKENS_FAILED,
            payload: constants.USER_TOKENS_FAILED_MESSAGE
          });
        }
      } else {
        dispatch({
          type: actionTypes.USER_TOKENS_FAILED,
          payload: constants.USER_TOKENS_FAILED_MESSAGE
        });
      }
    })
    .catch(err => {
      dispatch({
        type: actionTypes.USER_TOKENS_FAILED,
        payload: constants.USER_TOKENS_FAILED_MESSAGE
      });
    });
};

export function showUserTokensLoaderAction() {
  return dispatch => {
    dispatch({
      type: actionTypes.SHOW_USER_TOKENS_LOADER,
      payload: null
    });
  };
}
