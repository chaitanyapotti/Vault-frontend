import axios from "axios";
import actionTypes from "../../action_types";
import config from "../../config";
import constants from "../../constants";
import web3 from "../../helpers/web3";

export function getProjectNames() {
  return async dispatch => {
    const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
    axios
      .get(`${config.api_base_url}/db/projects/uniqueprojecttags`, {
        params: { network: localNetwork }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.message === constants.SUCCESS) {
            dispatch({
              type: actionTypes.FETCH_PROJECT_NAMES_SUCCESS,
              payload: response.data.data
            });
          } else {
            dispatch({
              type: actionTypes.FETCH_PROJECT_NAMES_FAILED,
              payload: response.data.reason
            });
          }
        } else {
          dispatch({
            type: actionTypes.FETCH_PROJECT_NAMES_FAILED,
            payload: constants.PROJECT_NAMES_FAILED_MESSAGE
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: actionTypes.FETCH_PROJECT_NAMES_FAILED,
          payload: constants.PROJECT_NAMES_FAILED_MESSAGE
        });
      });
  };
}
