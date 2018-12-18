import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";
import constants from "../../constants";
import web3 from "../../helpers/web3";

export function getFeaturedProjects() {
  return async dispatch => {
    const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
    axios
      .get(`${config.api_base_url}/db/projects/featured`, {
        params: { network: localNetwork }
      })
      .then(response => {
        if (response.status === 200) {
          if (response.data.message === constants.SUCCESS) {
            dispatch({
              type: actionTypes.FEATURED_PROJECTS_SUCCESS,
              payload: response.data.data
            });
          } else {
            dispatch({
              type: actionTypes.FEATURED_PROJECTS_FAILURE,
              payload: constants.FEATURED_PROJECTS_FAILED_MESSAGE
            });
          }
        } else {
          dispatch({
            type: actionTypes.FEATURED_PROJECTS_FAILURE,
            payload: constants.FEATURED_PROJECTS_FAILED_MESSAGE
          });
        }
      })
      .catch(err => {
        dispatch({
          type: actionTypes.FEATURED_PROJECTS_FAILURE,
          payload: constants.FEATURED_PROJECTS_FAILED_MESSAGE
        });
      });
  };
}

export function featuredProjectsLoaderAction() {
  return dispatch => {
    dispatch({
      type: actionTypes.SHOW_FEATURED_PROJECTS_ACTION_LOADER,
      payload: null
    });
  };
}
