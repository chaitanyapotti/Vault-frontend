/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  refundByKillButtonSpinning: false,
  refundBySoftCapFailSpinning: false,
  refundByKillButtonTransactionHash: "",
  refundBySoftcapfailButtonTransactionHash: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REFUND_BY_KILL_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        refundByKillButtonSpinning: receipt
      };
    }
    case actionTypes.REFUND_BY_KILL_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        refundByKillButtonTransactionHash: transactionHash
      };
    }
    case actionTypes.REFUND_BY_SOFTCAPFAIL_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        refundBySoftcapfailButtonTransactionHash: transactionHash
      };
    }
    
    case actionTypes.REFUND_BY_SOFT_CAP_FAIL_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        refundBySoftCapFailSpinning: receipt
      };
    }
    default:
      return state;
  }
};
