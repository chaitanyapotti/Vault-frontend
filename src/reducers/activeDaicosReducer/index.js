/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from '../../action_types';

export const initialState = {
    activeDaicosTable: [],
    showActiveDaicosLoader: true,
    activeDaicosRetreiveFailureMessage: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.ACTIVE_DAICOS_SUCCESS:
            return {
                ...state,
                showActiveDaicosLoader: false,
                activeDaicosTable: action.payload
            };
        case actionTypes.ACTIVE_DAICOS_FAILED:
            return {
                ...state,
                showActiveDaicosLoader: false,
                activeDaicosRetreiveFailureMessage: action.payload
            };
        default:
            return state;
    }
}