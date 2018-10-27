import actionTypes from "../../action_types";

export const initialState = {
  isCurrentMember: false,
  buttonSpinning: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        buttonSpinning: receipt
      };
    }
    case actionTypes.WHITELIST_CHECK: {
      const { receipt } = action.payload;
      return {
        ...state,
        isCurrentMember: receipt
      };
    }
    default:
      return state;
  }
};
