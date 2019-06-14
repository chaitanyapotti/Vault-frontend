import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";
import web3 from "../../helpers/web3";

export function searchResultFetched(data) {
  return {
    payload: { data },
    type: actionTypes.SEARCH_RESULT_FETCHED
  };
}

export function searchTextChangeAction(data) {
  return dispatch => {
    dispatch({
      type: actionTypes.SEARCH_TEXT_CHANGED,
      payload: data
    });
  };
}

export function getSearchResults(q) {
  return async dispatch => {
    dispatch({
      type: actionTypes.SEARCH_TEXT_CHANGED,
      payload: q
    });
    const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
    axios
      .get(`${config.api_base_url}/db/projects/search`, {
        params: { q, network: localNetwork }
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
