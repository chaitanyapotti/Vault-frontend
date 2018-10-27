/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  activeDaicosTable: [],
  showActiveDaicosLoader: true,
  activeDaicosRetrieveFailureMessage: "",
  activeDaicosRetrievedSuccessFully: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ACTIVE_DAICOS_SUCCESS:
      return {
        ...state,
        showActiveDaicosLoader: false,
        activeDaicosTable: action.payload,
        activeDaicosRetrievedSuccessFully: true
      };

    case actionTypes.ACTIVE_DAICOS_FAILED:
      return {
        ...state,
        showActiveDaicosLoader: false,
        activeDaicosRetrieveFailureMessage: action.payload,
        activeDaicosRetrievedSuccessFully: false
      };

    case actionTypes.SHOW_ACTIVE_DAICOS_LOADER:
      return {
        ...state,
        showActiveDaicosLoader: true,
        activeDaicosRetrievedSuccessFully: false
      };

    default:
      return state;
  }
}
