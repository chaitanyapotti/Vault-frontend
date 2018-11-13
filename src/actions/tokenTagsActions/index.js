import axios from "axios";
import actionTypes from "../../action_types";
import config from "../../config";
import constants from "../../constants";

export function getTokenTags() {
  return dispatch =>
    axios
      .get(`${config.api_base_url}/db/projects/uniqueprojecttags`)
      .then(response => {
        if (response.status === 200) {
          if (response.data.message === constants.SUCCESS) {
            dispatch({
              type: actionTypes.FETCH_TOKEN_TAGS_SUCCESS,
              payload: response.data.data
            });
          } else {
            dispatch({
              type: actionTypes.FETCH_TOKEN_TAGS_FAILED,
              payload: response.data.reason
            });
          }
        } else {
          dispatch({
            type: actionTypes.FETCH_TOKEN_TAGS_FAILED,
            payload: constants.TOKEN_TAGS_FAILED_MESSAGE
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: actionTypes.FETCH_TOKEN_TAGS_FAILED,
          payload: constants.TOKEN_TAGS_FAILED_MESSAGE
        });
      });
}