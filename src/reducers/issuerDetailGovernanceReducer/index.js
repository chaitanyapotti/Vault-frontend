import actionTypes from "../../action_types";

export const initialState = {
  startNewRoundButtonSpinning: false,
  deployTapPollButtonSpinning: false,
  incrementTapButtonSpinning: false,
  deployXfrButtonSpinning: false,
  withdrawXfrButtonSpinning: false,
  withdrawButtonSpinning: false,
  currentWithdrawableAmount: "0",
  xfrTitleText: "",
  xfrAmountText: "",
  xfrDescriptionText: "",
  withdrawableAmount: "",
  startR1ButtonTransactionHash: "",
  startNewRoundButtonTransactionHash: "",
  deployTapPollButtonTransactionHash: "",
  incrementTapButtonTransactionHash: "",
  deployXfrPollTransactionHash: "",
  withdrawXfrButtonTransactionHash: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.XFR_TITLE_CHANGED: {
      return {
        ...state,
        xfrTitleText: action.payload
      };
    }

    case actionTypes.WITHDRAW_XFR_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        withdrawXfrButtonTransactionHash: transactionHash
      };
    }

    case actionTypes.START_R1_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        whitelistButtonTransactionHash: transactionHash
      };
    }

    case actionTypes.WITHDRAW_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        withdrawButtonTransactionHash: transactionHash
      };
    }

    case actionTypes.DEPLOY_XFR_POLL_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        deployXfrPollTransactionHash: transactionHash
      };
    }

    case actionTypes.INCREMENT_TAP_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        incrementTapButtonTransactionHash: transactionHash
      };
    }

    case actionTypes.DEPLOY_TAP_POLL_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        deployTapPollButtonTransactionHash: transactionHash
      };
    }

    case actionTypes.XFR_AMOUNT_CHANGED: {
      return {
        ...state,
        xfrAmountText: action.payload
      };
    }
    case actionTypes.XFR_DESCRIPTION_CHANGED: {
      return {
        ...state,
        xfrDescriptionText: action.payload
      };
    }
    case actionTypes.WITHDRAW_AMOUNT_CHANGED: {
      return {
        ...state,
        withdrawableAmount: action.payload
      };
    }
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
        deployXfrButtonSpinning: receipt
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
