import actionTypes from "../../action_types";

const initialState = {
  searchResult: {}
};

export default function(state = initialState, action) {
  let localSearchResult = JSON.parse(JSON.stringify(state.searchResult));
  switch (action.type) {
    case actionTypes.SEARCH_RESULT_FETCHED: {
      const { data } = action.payload || {};
      localSearchResult = data;
      return {
        ...state,
        searchResult: localSearchResult
      };
    }
    default:
      return state;
  }
}
