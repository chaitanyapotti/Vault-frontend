import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";

export function searchResultFetched(data) {
  return {
    payload: { data },
    type: actionTypes.SEARCH_RESULT_FETCHED
  };
}

export function getSearchResults(q) {
  console.log("calling action");
  return dispatch => {
    axios
      .get(`${config.api_base_url}/db/projects/search`, {
        params: { q }
      })
      .then(response => {
        if (response.status === 200) {
          const { data } = response.data || {};
          dispatch(searchResultFetched(data));
        } else {
          dispatch(searchResultFetched({}));
        }
      })
      .catch(err => {
        console.error(err.message);
        dispatch(searchResultFetched({}));
      });
  };
}
