/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  etherCollected: 0,
  roundInfo: {},
  buyButtonSpinning: false,
  tokenBalance: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ETHER_COLLECTED: {
      const { receipt } = action.payload;
      return {
        ...state,
        etherCollected: receipt
      };
    }
    case actionTypes.ROUND_INFO_RECEIVED: {
      const { rec } = action.payload;
      return {
        ...state,
        roundInfo: rec
      };
    }
    case actionTypes.BUY_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        buyButtonSpinning: receipt
      };
    }
    case actionTypes.TOKEN_BALANCE_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        tokenBalance: receipt
      };
    }
    default:
      return state;
  }
}
