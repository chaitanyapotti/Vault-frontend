import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";

export function priceFetched(price, ticker) {
  return {
    payload: { price, ticker },
    type: actionTypes.PRICE_FETCHED
  };
}

export function fetchPrice(ticker) {
  return dispatch => {
    console.log("erre");
    axios
      .get(`${config.api_base_url}/coinprice`, {
        params: { ticker }
      })
      .then(response => {
        if (response.status === 200) {
          const { data } = response.data || {};
          const { quote } = data || {};
          const { USD } = quote || {};
          const { price } = USD || "200";
          dispatch(priceFetched(price, ticker));
        } else {
          dispatch(priceFetched("200"));
        }
      })
      .catch(err => console.error(err.message));
  };
}
