/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  upcomingDaicosTable: [],
  showUpcomingDaicosLoader: true,
  upcomingDaicosRetrieveFailureMessage: "",
  upcomingDaicosRetrievedSuccessFully: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPCOMING_DAICOS_SUCCESS:
      return {
        ...state,
        showUpcomingDaicosLoader: false,
        upcomingDaicosTable: action.payload,
        upcomingDaicosRetrievedSuccessFully: true
      };

    case actionTypes.UPCOMING_DAICOS_FAILED:
      return {
        ...state,
        showUpcomingDaicosLoader: false,
        upcomingDaicosRetrieveFailureMessage: action.payload,
        upcomingDaicosRetrievedSuccessFully: false
      };

    case actionTypes.SHOW_UPCOMING_DAICOS_LOADER:
      return {
        ...state,
        showUpcomingDaicosLoader: true,
        upcomingDaicosRetrievedSuccessFully: false
      };

    default:
      return state;
  }
}
