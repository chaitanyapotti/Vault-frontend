/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  refundSuccess: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REFUND_SUCCESS:
      const { receipt } = action.payload;
      return {
        ...state,
        refundSuccess: receipt,
      };

    default:
      return state;
  }
}
