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
  withdrawXfrButtonTransactionHash: "",
  withdrawButtonTransactionHash: "",
  isXfr1DescriptionEditable: false,
  isXfr2DescriptionEditable: false,
  xfr1Description: null,
  xfr2Description: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EDIT_XFR1_DESCRIPTION_CHANGED: {
      return {
        ...state,
        isXfr1DescriptionEditable: action.payload
      };
    }

    case actionTypes.EDIT_XFR2_DESCRIPTION_CHANGED: {
      return {
        ...state,
        isXfr2DescriptionEditable: action.payload
      };
    }

    case actionTypes.XFR1_DESCRIPTION_CHANGED: {
      return {
        ...state,
        xfr1Description: action.payload
      };
    }

    case actionTypes.XFR2_DESCRIPTION_CHANGED: {
      return {
        ...state,
        xfr2Description: action.payload
      };
    }

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

    case actionTypes.START_NEW_ROUND_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        startNewRoundButtonTransactionHash: transactionHash
      };
    }

    case actionTypes.START_R1_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        startR1ButtonTransactionHash: transactionHash
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
