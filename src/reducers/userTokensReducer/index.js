/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from '../../action_types';

export const initialState = {
    userTokensTable: [
        {
            name: "Vault",
            price: 1.89,
            tokens: 2000,
            health: 12897,
            tapIncrement: 12.67,
            killConsensus: 12.67,
            nextKillPollRemainingTime: '5D 12H 12M',
            XFRs: 0
        },
        {
            name: "Vault1",
            price: 2.45,
            tokens: 4000,
            health: 12134,
            tapIncrement: 14.2,
            killConsensus: 11.37,
            nextKillPollRemainingTime: '10D 09H 04M',
            XFRs: 1
        }
    ],
    showUserTokensLoader: false,
    userTokensRetrieveFailureMessage: '',
    userTokensRetrievedSuccessFully: true
};

export default function (state = initialState, action) {
    switch (action.type) {

        // case actionTypes.UPCOMING_DAICOS_SUCCESS:
        //     return {
        //         ...state,
        //         showUpcomingDaicosLoader: false,
        //         upcomingDaicosTable: action.payload,
        //         upcomingDaicosRetrievedSuccessFully: true
        //     };

        // case actionTypes.UPCOMING_DAICOS_FAILED:
        //     return {
        //         ...state,
        //         showUpcomingDaicosLoader: false,
        //         upcomingDaicosRetrieveFailureMessage: action.payload,
        //         upcomingDaicosRetrievedSuccessFully: false
        //     };

        // case actionTypes.SHOW_UPCOMING_DAICOS_LOADER:
        //     return {
        //         ...state,
        //         showUpcomingDaicosLoader: true,
        //         upcomingDaicosRetrievedSuccessFully: false
        //     }

        default:
            return state;
    }
}