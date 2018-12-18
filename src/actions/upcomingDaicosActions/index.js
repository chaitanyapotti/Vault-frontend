import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";
import constants from "../../constants";
import web3 from "../../helpers/web3";

export function getUpcomingDaicos() {
  return async dispatch => {
    const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
    axios
      .get(`${config.api_base_url}/db/projects/upcoming`, {
        params: { network: localNetwork }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.message === constants.SUCCESS) {
            dispatch({
              type: actionTypes.UPCOMING_DAICOS_SUCCESS,
              payload: response.data.data
            });
          } else {
            dispatch({
              type: actionTypes.UPCOMING_DAICOS_FAILED,
              payload: constants.UPCOMING_DAICOS_FAILED_MESSAGE
            });
          }
        } else {
          dispatch({
            type: actionTypes.UPCOMING_DAICOS_FAILED,
            payload: constants.UPCOMING_DAICOS_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        dispatch({
          type: actionTypes.UPCOMING_DAICOS_FAILED,
          payload: constants.UPCOMING_DAICOS_FAILED_MESSAGE
        });
      });
  };
}

export function showUpcomingDaicosLoaderAction() {
  return dispatch => {
    dispatch({
      type: actionTypes.SHOW_UPCOMING_DAICOS_LOADER,
      payload: null
    });
  };
}
