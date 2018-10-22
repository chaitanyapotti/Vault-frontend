/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  currentRoundNumber: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case actionTypes.MEMBERSHIP_ASSIGNED:
    //   return {
    //     ...state,
    //     membershipAssigned: true
    //   };

    // case actionTypes.MEMBERSHIP_FAILED:
    //   return {
    //     ...state,
    //     membershipAssigned: false
    //   };

    case actionTypes.CURRENT_ROUND_FETCHED:
      const { receipt } = action.payload;
      return {
        ...state,
        currentRoundNumber: receipt
      };

    default:
      return state;
  }
}
