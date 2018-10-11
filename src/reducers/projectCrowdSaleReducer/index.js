/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  etherCollected: 0,
  r1Info: {}
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
        etherCollected: receipt
      };

    case actionTypes.ROUND1_INFO_RECEIVED:
      const { rec } = action.payload;
      return {
        ...state,
        r1Info: rec
      };

    default:
      return state;
  }
}
