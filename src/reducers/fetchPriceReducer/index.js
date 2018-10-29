import actionTypes from "../../action_types";

const initialState = {
  prices: { ETH: 200 }
};

export default function(state = initialState, action) {
  const localPrices = JSON.parse(JSON.stringify(state.prices));
  switch (action.type) {
    case actionTypes.PRICE_FETCHED: {
      const { price, ticker } = action.payload || {};
      localPrices[ticker] = price;
      return {
        ...state,
        prices: localPrices
      };
    }
    default:
      return state;
  }
}
