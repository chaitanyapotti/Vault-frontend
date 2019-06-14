import actionTypes from "../../action_types";

const initialState = {
  searchResult: {},
  searchText: "",
  showSearchResultLoader: true
};

export default function(state = initialState, action) {
  let localSearchResult = JSON.parse(JSON.stringify(state.searchResult));
  switch (action.type) {

    case actionTypes.SEARCH_TEXT_CHANGED: {
      return {
        ...state,
        searchText: action.payload
      }
    }

    case actionTypes.SEARCH_RESULT_FETCHED: {
      const { data } = action.payload || {};
      localSearchResult = data;
      return {
        ...state,
        searchResult: localSearchResult,
        showSearchResultLoader: false
      };
    }
    default:
      return state;
  }
}
