/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  featuredProjects: [],
  featuredProjectsRetrieveFailureMessage: "",
  showFeaturedProjectsLoader: true,
  featuredProjectsRetrievedSuccessfully: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FEATURED_PROJECTS_SUCCESS:
      return {
        ...state,
        showFeaturedProjectsLoader: false,
        featuredProjects: action.payload,
        featuredProjectsRetrievedSuccessfully: true
      };
    case actionTypes.FEATURED_PROJECTS_FAILURE:
      return {
        ...state,
        showFeaturedProjectsLoader: false,
        featuredProjectsRetrieveFailureMessage: action.payload,
        featuredProjectsRetrievedSuccessfully: false
      };

    case actionTypes.SHOW_FEATURED_PROJECTS_ACTION_LOADER:
      return {
        ...state,
        showFeaturedProjectsLoader: true,
        featuredProjectsRetrievedSuccessfully: false
      };

    default:
      return state;
  }
}
