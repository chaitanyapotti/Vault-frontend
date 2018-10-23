/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

const initialState = {
  prices: { ETH: 200 },
  ts: new Date()
};

export default function(state = initialState, action) {
  const localPrices = state.prices;
  switch (action.type) {
    case actionTypes.PRICE_FETCHED: {
      const { price, ticker } = action.payload || {};
      console.log(price, ticker);
      localPrices[ticker] = price;
      return {
        ...state,
        prices: localPrices,
        ts: new Date()
      };
    }
    default:
      return state;
  }
}
