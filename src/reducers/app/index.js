/* global document, window */
/* eslint no-underscore-dangle: 0 */
import types from '../../action_types';

export const initialState = {
    appInit: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.APP_INIT:
            return {
                ...state,
                appInit: true
            };
        default:
            return state;
    }
}