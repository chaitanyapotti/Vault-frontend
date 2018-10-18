/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  etherCollected: 0,
  roundInfo: {},
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

    case actionTypes.ETHER_COLLECTED:
      const { receipt } = action.payload;
      return {
        ...state,
        etherCollected: receipt,
      };

    case actionTypes.ROUND_INFO_RECEIVED:
      const { rec } = action.payload;
      return {
        ...state,
        roundInfo: rec,
      };

    default:
      return state;
  }
}
