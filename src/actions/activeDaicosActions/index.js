import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";
import constants from "../../constants";
import web3 from "../../helpers/web3";

export function getActiveDaicos() {
  return async dispatch => {
    const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
    axios
      .get(`${config.api_base_url}/db/projects/active?network=${localNetwork}`)
      .then(response => {
        if (response.status === 200) {
          if (response.data.message === constants.SUCCESS) {
            dispatch({
              type: actionTypes.ACTIVE_DAICOS_SUCCESS,
              payload: response.data.data
            });
          } else {
            dispatch({
              type: actionTypes.ACTIVE_DAICOS_FAILED,
              payload: constants.ACTIVE_DAICOS_FAILED_MESSAGE
            });
          }
        } else {
          dispatch({
            type: actionTypes.ACTIVE_DAICOS_FAILED,
            payload: constants.ACTIVE_DAICOS_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        dispatch({
          type: actionTypes.ACTIVE_DAICOS_FAILED,
          payload: constants.ACTIVE_DAICOS_FAILED_MESSAGE
        });
      });
  };
}

export function showActiveDaicosLoaderAction() {
  return dispatch => {
    dispatch({
      type: actionTypes.SHOW_ACTIVE_DAICOS_LOADER,
      payload: null
    });
  };
}
