import actionTypes from "../../action_types";

export const initialState = {
  startNewRoundButtonSpinning: false,
  deployTapPollButtonSpinning: false,
  incrementTapButtonSpinning: false,
  deployXfrPollButtonSpinning: false,
  withdrawXfrButtonSpinning: false,
  withdrawButtonSpinning: false,
  currentWithdrawableAmount: "0"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_NEW_ROUND_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        startNewRoundButtonSpinning: receipt
      };
    }
    case actionTypes.DEPLOY_TAP_POLL_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        deployTapPollButtonSpinning: receipt
      };
    }
    case actionTypes.INCREMENT_TAP_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        incrementTapButtonSpinning: receipt
      };
    }
    case actionTypes.DEPLOY_XFR_POLL_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        deployXfrPollButtonSpinning: receipt
      };
    }
    case actionTypes.WITHDRAW_XFR_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        withdrawXfrButtonSpinning: receipt
      };
    }
    case actionTypes.WITHDRAW_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        withdrawButtonSpinning: receipt
      };
    }
    case actionTypes.CURRENT_WITHDRAWABLE_AMOUNT_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        currentWithdrawableAmount: receipt
      };
    }
    default:
      return state;
  }
};
