import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";

export function priceFetched(data) {
  return {
    payload: { data },
    type: actionTypes.PRICE_FETCHED
  };
}

export function fetchPrice(ticker) {
  return dispatch => {
    axios
      .get(`${config.api_base_url}/coinprice`, {
        params: { ticker }
      })
      .then(response => {
        if (response.status === 200) {
          const { data } = response.data || {};
          dispatch(priceFetched(data));
        } else {
          dispatch(priceFetched({}));
        }
      })
      .catch(err => {
        console.error(err.message);
        dispatch(priceFetched({}));
      });
  };
}
