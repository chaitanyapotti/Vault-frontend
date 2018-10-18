/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  endedDaicosTable: [],
  showEndedDaicosLoader: true,
  endedDaicosRetrieveFailureMessage: "",
  endedDaicosRetrievedSuccessFully: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ENDED_DAICOS_SUCCESS:
      return {
        ...state,
        showEndedDaicosLoader: false,
        endedDaicosTable: action.payload,
        endedDaicosRetrievedSuccessFully: true,
      };

    case actionTypes.ENDED_DAICOS_FAILED:
      return {
        ...state,
        showEndedDaicosLoader: false,
        endedDaicosRetrieveFailureMessage: action.payload,
        endedDaicosRetrievedSuccessFully: false,
      };

    case actionTypes.SHOW_ENDED_DAICOS_LOADER:
      return {
        ...state,
        showEndedDaicosLoader: true,
        endedDaicosRetrievedSuccessFully: false,
      };

    default:
      return state;
  }
}
