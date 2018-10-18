import axios from "axios";
import actionTypes from '../../action_types';
import config from "../../config";
import constants from "../../constants";

export function newProjectRegistration(projectData, userLocalPublicAddress) {
  let projectObject = {
        projectName: projectData.projectName,
    description: projectData.projectDescription,
        startDateTime: projectData.daicoStartDate,
    r1EndTime: projectData.daicoEndDate,
        adminName: projectData.adminName,
    email: projectData.adminEmail,
        urls: {
            website: projectData.websiteLink,
            github: projectData.githubLink,
      facebook: projectData.facebookLink,
            telegram: projectData.telegramLink,
            twitter: projectData.twitterLink,
            medium: projectData.mediumLink
        },
        tokenTag: projectData.erc20TokenTag,
    rounds: [
            { tokenCount: projectData.round1Tokens, tokenRate: projectData.round1Rate },
            { tokenCount: projectData.round2Tokens, tokenRate: projectData.round2Rate },
            { tokenCount: projectData.round3Tokens, tokenRate: projectData.round3Rate }
        ],
        daicoRounds: projectData.daicoRounds,
        initialFundRelease: projectData.initialFundRelease,
        ownerAddress: userLocalPublicAddress,
        minimumEtherContribution: "100000000000000000",
    maximumEtherContribution: "5000000000000000000",
    foundationDetails: [
            { address: "0xb758c38326df3d75f1cf0da14bb8220ca4231e74", amount: "5000000000000000000", name: "Vinay Bagul" },
            { address: "0xb71455b02bb8cd42552744b8bd720763711d6d66", amount: "1000000000000000000", name: "Vinay Bagul" },
    ],
        teamAddress: userLocalPublicAddress
    }

  return dispatch => {
        axios.post(`${config.api_base_url}/db/projects/`,
            projectObject
      .then(response => {
            if (response.status == 200) {
          if (response.data.message == constants.SUCCESS) {
                    dispatch({
                        type: actionTypes.PROJECT_REGISTRATION_SUCCESS,
              payload: response.data.data.project_id,
            });
          } else {
                    dispatch({
                        type: actionTypes.PROJECT_REGISTRATION_FAILED,
              payload: response.data.reason,
            });
          }
            } else {
          dispatch({
                    type: actionTypes.PROJECT_REGISTRATION_FAILED,
                    payload: constants.PROJECT_REGISTRATION_FAILED_MESSAGE
                })
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
                type: actionTypes.PROJECT_REGISTRATION_FAILED,
                payload: constants.PROJECT_REGISTRATION_FAILED_MESSAGE
            })
      });
  };
}

export function adminNameChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.ADMIN_NAME_CHANGED,
            payload: value
        })
    }
}

export function adminEmailChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.ADMIN_EMAIL_CHANGED,
            payload: value
        })
  };
}

export function projectNameChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.PROJECT_NAME_CHANGED,
      payload: value,
    });
  };
}

export function erc20TokenTagChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.ERC20_TAG_CHANGED,
      payload: value,
    });
  };
}

export function projectDescriptionChangedAction(value) {
  return dispatch => {
        dispatch({
      type: actionTypes.PROJECT_DESCRIPTION_CHANGED,
      payload: value,
    });
  };
}

export function websiteLinkAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.WEBSITE_LINK_CHANGED,
      payload: value,
    });
  };
}

export function telegramLinkChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.TELEGRAM_LINK_CHANGED,
      payload: value,
    });
  };
}

export function githubLinkChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.GITHUB_LINK_CHANGED,
      payload: value,
    });
  };
}

export function mediumLinkChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.MEDIUM_LINK_CHANGED,
      payload: value,
    });
  };
}

export function facebookLinkChangedAction(value) {
    return (dispatch) => {
        dispatch({
            type: actionTypes.FACEBOOK_LINK_CHANGED,
            payload: value
        })
  };
}

export function twitterLinkChangedAction(value) {
    return (dispatch) => {
        dispatch({
            type: actionTypes.TWITTER_LINK_CHANGED,
            payload: value
        })
  };
}

export function initialFundReleaseChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.INITIAL_FUND_RELEASE_CHANGED,
            payload: value
        })
    }
}

export function daicoRoundsChangedAction(value) {
  return dispatch => {
    dispatch({
            type: actionTypes.DAICO_ROUNDS_CHANGED,
            payload: value
        })
    }
}

export function daicoStartDateChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.DAICO_START_DATE_CHANGED,
      payload: value,
    });
  };
}

export function daicoEndDateChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.DAICO_END_DATE_CHANGED,
      payload: value,
    });
  };
}

export function round1TokensChangedAction(value) {
  return dispatch => {
        dispatch({
      type: actionTypes.ROUND1_TOKENS_CHANGED,
      payload: value,
    });
  };
}

export function round1RateChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.ROUND1_RATE_CHANGED,
      payload: value,
    });
  };
}

export function round2TokensChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.ROUND2_TOKENS_CHANGED,
      payload: value,
    });
  };
}

export function round2RateChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.ROUND2_RATE_CHANGED,
      payload: value,
    });
  };
}

export function round3TokensChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.ROUND3_TOKENS_CHANGED,
      payload: value,
    });
  };
}

export function round3RateChangedAction(value) {
  return dispatch => {
        dispatch({
            type: actionTypes.ROUND3_RATE_CHANGED,
      payload: value,
    });
  };
}
