/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  userTokensTable: [],
  showUserTokensLoader: true,
  userTokensRetrieveFailureMessage: "",
  userTokensRetrievedSuccessFully: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_TOKENS_SUCCESS:
      return {
        ...state,
        showUserTokensLoader: false,
        userTokensTable: action.payload,
        userTokensRetrievedSuccessFully: true
      };

    case actionTypes.USER_TOKENS_FAILED:
      return {
        ...state,
        showUserTokensLoader: false,
        userTokensRetrieveFailureMessage: action.payload,
        userTokensRetrievedSuccessFully: false
      };

    case actionTypes.SHOW_USER_TOKENS_LOADER:
      return {
        ...state,
        showUserTokensLoader: true,
        userTokensRetrievedSuccessFully: false
      };

    default:
      return state;
  }
}
