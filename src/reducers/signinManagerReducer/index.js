/* global document, window */
/* eslint no-underscore-dangle: 0 */
import types from "../../action_types";

export const initialState = {
    userRegistered: false,
    userServerPublicAddress: '',
    userIsIssuer: false,
    userLocalPublicAddress: '',
    userPreviousLocalPublicAddress: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.USER_REGISTRATION_CHECK_SUCCESS:
            const { publicAddress } = action.payload || ''
            const { isIssuer } = action.payload || false
            return {
                ...state,
                userRegistered: true,
                userServerPublicAddress: publicAddress,
                userIsIssuer: isIssuer,
                userPreviousLocalPublicAddress: publicAddress
            };
        case types.USER_LOCAL_ACCOUNT_ADDRESS:
            return {
                ...state,
                userLocalPublicAddress: action.payload, 
                userPreviousLocalPublicAddress: action.payload
            }
        case types.USER_DEFAULT_ACCOUNT_CHANGED:
            return {
                ...state, 
                userRegistered: false,
                userIsIssuer: false,
                userServerPublicAddress: '',
                userLocalPublicAddress: action.payload,
                userPreviousLocalPublicAddress: action.payload
            }
        default:
            return state;
    }
}
