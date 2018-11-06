import actionTypes from "../../action_types";

const initialState = {
  prices: { ETH: { price: 200, change: 0 } }
};

export default (state = initialState, action) => {
  const localPrices = JSON.parse(JSON.stringify(state.prices));
  switch (action.type) {
    case actionTypes.PRICE_FETCHED: {
      const { data } = action.payload || {};
      const { price, tokenTag: ticker, change } = data || {};
      localPrices[ticker] = { price, change };
      return {
        ...state,
        prices: localPrices
      };
    }
    default:
      return state;
  }
};
