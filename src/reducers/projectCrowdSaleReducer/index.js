/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  etherCollected: "",
  roundInfo: {},
  buyButtonSpinning: false,
  r1FinalizeButtonSpinning: false,
  startR1ButtonSpinning: false,
  tokenBalance: "",
  buyButtonTransactionHash: "",
  r1FinalizeButtonTransactionHash: "",
  buyAmount: "",
  userContribution: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_GOVERNANCE_STATES: {
      return {
        ...state,
        tokenBalance: "",
        userContribution: "",
        roundInfo: {},
        etherCollected: ""
      };
    }
    case actionTypes.ETHER_COLLECTED: {
      const { receipt } = action.payload;
      return {
        ...state,
        etherCollected: receipt
      };
    }
    case actionTypes.USER_TOKENS: {
      const { receipt } = action.payload;
      return {
        ...state,
        userContribution: receipt
      };
    }
    case actionTypes.ROUND_INFO_RECEIVED: {
      const { rec } = action.payload;
      return {
        ...state,
        roundInfo: rec
      };
    }

    case actionTypes.R1_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        r1FinalizeButtonTransactionHash: transactionHash
      };
    }

    case actionTypes.BUY_AMOUNT_CHANGED: {
      return {
        ...state,
        buyAmount: action.payload
      };
    }

    case actionTypes.BUY_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        buyButtonTransactionHash: transactionHash
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
    case actionTypes.Start_R1_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        startR1ButtonSpinning: receipt
      };
    }
    default:
      return state;
  }
};
