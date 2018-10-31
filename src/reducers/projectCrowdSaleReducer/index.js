/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  etherCollected: 0,
  roundInfo: {},
  buyButtonSpinning: false,
  r1FinalizeButtonSpinning: false,
  tokenBalance: ""
};

export default (state = initialState, action) => {
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
    case actionTypes.R1_FINALIZE_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        r1FinalizeButtonSpinning: receipt
      };
    }
    default:
      return state;
  }
};
