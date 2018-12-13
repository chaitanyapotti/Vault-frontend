import actionTypes from "../../action_types";

export const initialState = {
  isCurrentMember: undefined,
  isMembershipRequestPending: undefined,
  buttonSpinning: false,
  whitelistButtonTransactionHash: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_GOVERNANCE_STATES: {
      return {
        ...state,
        isCurrentMember: undefined,
        isMembershipRequestPending: undefined
      };
    }
    case actionTypes.BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        buttonSpinning: receipt
      };
    }
    case actionTypes.WHITELIST_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        whitelistButtonTransactionHash: transactionHash
      };
    }

    case actionTypes.WHITELIST_CHECK: {
      const { receipt } = action.payload;
      return {
        ...state,
        isCurrentMember: receipt
      };
    }
    case actionTypes.WHITELIST_CHECK_PENDING: {
      const receipt = action.payload;
      return {
        ...state,
        isMembershipRequestPending: receipt
      };
    }
    default:
      return state;
  }
};
