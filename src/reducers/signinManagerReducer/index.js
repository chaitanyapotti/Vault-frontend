/* global document, window */
/* eslint no-underscore-dangle: 0 */
import types from "../../action_types";

export const initialState = {
    userRegistered: false,
    userPublicAddress: '',
    userIsIssuer: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.USER_REGISTRATION_CHECK_SUCCESS:
            const { publicAddress } = action.payload || ''
            const { isIssuer } = action.payload || false
            return {
                ...state,
                userRegistered: true,
                userPublicAddress: publicAddress,
                userIsIssuer: isIssuer
            };
        default:
            return state;
    }
}
