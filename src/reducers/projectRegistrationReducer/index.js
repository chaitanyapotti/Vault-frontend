/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from '../../action_types';

export const initialState = {
    adminName: '',
    adminEmail: '',
    projectName: '',
    erc20TokenTag: '',
    projectDescription: '',
    websiteLink: '',
    telegramLink: '',
    githubLink: '',
    mediumLink: '',
    facebookLink: '',
    twitterLink: '',
    initialFundRelease: '',
    daicoRounds: '',
    daicoStartDate: '',
    daicoEndDate: '',
    round1Tokens: '',
    round1Rate: '',
    round2Tokens: '',
    round2Rate: '',
    round3Tokens: '',
    round3Rate: '',
    nonSaleDistribution: [],
    project_id: ''
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actionTypes.PROJECT_REGISTRATION_SUCCESS:
            return {
                ...state,
                project_id: action.payload
            }

        case actionTypes.ADMIN_NAME_CHANGED:
            return {
                ...state,
                adminName: action.payload
            }
        case actionTypes.ADMIN_EMAIL_CHANGED:
            return {
                ...state,
                adminEmail: action.payload
            }
        case actionTypes.PROJECT_NAME_CHANGED:
            return {
                ...state,
                projectName: action.payload
            }
        case actionTypes.ERC20_TAG_CHANGED:
            return {
                ...state,
                erc20TokenTag: action.payload
            }
        case actionTypes.PROJECT_DESCRIPTION_CHANGED:
            return {
                ...state,
                projectDescription: action.payload
            }
        case actionTypes.WEBSITE_LINK_CHANGED:
            return {
                ...state,
                websiteLink: action.payload
            }
        case actionTypes.TELEGRAM_LINK_CHANGED:
            return {
                ...state,
                telegramLink: action.payload
            }
        case actionTypes.GITHUB_LINK_CHANGED:
            return {
                ...state,
                githubLink: action.payload
            }
        case actionTypes.MEDIUM_LINK_CHANGED:
            return {
                ...state,
                mediumLink: action.payload
            }
        case actionTypes.FACEBOOK_LINK_CHANGED:
            return {
                ...state,
                facebookLink: action.payload
            }
        case actionTypes.TWITTER_LINK_CHANGED:
            return {
                ...state,
                twitterLink: action.payload
            }
        case actionTypes.INITIAL_FUND_RELEASE_CHANGED:
            return {
                ...state,
                initialFundRelease: action.payload
            }
        case actionTypes.DAICO_ROUNDS_CHANGED:
            return {
                ...state,
                daicoRounds: action.payload
            }
        case actionTypes.DAICO_START_DATE_CHANGED:
            return {
                ...state,
                daicoStartDate: action.payload
            }
        case actionTypes.DAICO_END_DATE_CHANGED:
            return {
                ...state,
                daicoEndDate: action.payload
            }
        case actionTypes.ROUND1_TOKENS_CHANGED:
            return {
                ...state,
                round1Tokens: action.payload
            }
        case actionTypes.ROUND1_RATE_CHANGED:
            return {
                ...state,
                round1Rate: action.payload
            }
        case actionTypes.ROUND2_TOKENS_CHANGED:
            return {
                ...state,
                round2Tokens: action.payload
            }
        case actionTypes.ROUND2_RATE_CHANGED:
            return {
                ...state,
                round2Rate: action.payload
            }
        case actionTypes.ROUND3_TOKENS_CHANGED:
            return {
                ...state,
                round3Tokens: action.payload
            }
        case actionTypes.ROUND3_RATE_CHANGED:
            return {
                ...state,
                round3Rate: action.payload
            }

        default:
            return state;
    }
}