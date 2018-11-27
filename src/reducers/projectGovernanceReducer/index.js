import actionTypes from "../../action_types";

export const initialState = {
  currentRoundNumber: "",
  treasuryStateNumber: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_GOVERNANCE_STATES: {
      return {
        ...state,
        currentRoundNumber: "",
        treasuryStateNumber: ""
      };
    }

    case actionTypes.CURRENT_ROUND_FETCHED: {
      const { receipt } = action.payload;
      return {
        ...state,
        currentRoundNumber: receipt
      };
    }
    case actionTypes.TREASURY_STATE_FETCHED: {
      const { receipt } = action.payload;
      return {
        ...state,
        treasuryStateNumber: receipt
      };
    }
    default:
      return state;
  }
};
