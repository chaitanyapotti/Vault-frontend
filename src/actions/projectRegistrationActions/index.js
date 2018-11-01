import axios from "axios";
import FormData from "form-data";
import actionTypes from "../../action_types";
import config from "../../config";
import constants from "../../constants";

const httpClient = axios.create();

export function newProjectRegistration(projectData, userLocalPublicAddress) {
  const foundationDetails = [];
  const { nonSaleEntities, totalSaleTokens } = projectData || [];
  let totalNonSaleTokens = 0;
  if (nonSaleEntities.length > 0) {
    for (let i = 0; i < nonSaleEntities.length; i += 1) {
      foundationDetails.push({
        address: nonSaleEntities[i].entityAddress,
        amount: Math.round((totalSaleTokens * nonSaleEntities[i].entityPercentage) / 50)* Math.pow(10, 18),
        description: nonSaleEntities[i].entityName
      });
      totalNonSaleTokens += Math.round((totalSaleTokens * nonSaleEntities[i].entityPercentage) / 50);
    }
  }
  const projectObject = {
    projectName: projectData.projectName,
    description: projectData.projectDescription,
    startDateTime: projectData.daicoStartDate,
    ownerAddress: userLocalPublicAddress,
    r1EndTime: projectData.daicoEndDate,
    rounds: [
      {
        tokenCount: projectData.round1Tokens * Math.pow(10, 18),
        tokenRate: projectData.round1Rate
      },
      {
        tokenCount: projectData.round2Tokens * Math.pow(10, 18),
        tokenRate: projectData.round2Rate
      },
      {
        tokenCount: projectData.round3Tokens * Math.pow(10, 18),
        tokenRate: projectData.round3Rate
      }
    ],
    minimumEtherContribution: "100000000000000000",
    maximumEtherContribution: Math.round(parseFloat(projectData.maxEtherContribution) * Math.pow(10, 18)),
    foundationDetails,
    initialFundRelease: Math.round(parseFloat(projectData.initialFundRelease) * Math.pow(10, 18)),
    teamAddress: projectData.teamAddress,
    killPollStartDate: projectData.daicoEndDate,
    initialTapAmount: Math.round((parseFloat(projectData.initialTapValue) * Math.pow(10, 18)) / (30 * 86400)),
    tapIncrementFactor: Math.round(parseFloat(projectData.tapIncrementFactor) * 100),
    tokenTag: projectData.erc20TokenTag,
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
    capPercent: Math.round(parseFloat(projectData.voteSaturationLimit) * 100),
    killAcceptancePercent: 80,
    xfrRejectionPercent: 20,
    tapAcceptancePercent: 65,
    network: "rinkeby",
    version: "1",
    totalMintableSupply: projectData.totalSaleTokens + totalNonSaleTokens
  };

  return dispatch =>
    axios
      .post(`${config.api_base_url}/db/projects/`, projectObject)
      .then(response => {
        if (response.status === 200) {
          if (response.data.message === constants.SUCCESS) {
            dispatch({
              type: actionTypes.PROJECT_REGISTRATION_SUCCESS,
              payload: response.data.data.project_id
            });
          } else {
            dispatch({
              type: actionTypes.PROJECT_REGISTRATION_FAILED,
              payload: response.data.reason
            });
          }
        } else {
          dispatch({
            type: actionTypes.PROJECT_REGISTRATION_FAILED,
            payload: constants.PROJECT_REGISTRATION_FAILED_MESSAGE
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: actionTypes.PROJECT_REGISTRATION_FAILED,
          payload: constants.PROJECT_REGISTRATION_FAILED_MESSAGE
        });
      });
}

export function saveProjectStates(projectData, userLocalPublicAddress){
  return dispatch =>
    axios
      .post(`${config.api_base_url}/db/projects/formstates?useraddress=${userLocalPublicAddress}`, projectData)
      .then(response => {
        if (response.status === 200) {
          if (response.data.message === constants.SUCCESS) {
            dispatch({
              type: actionTypes.PROJECT_STATES_SAVED_SUCCESS,
              payload: response.data.data.project_id
            });
          } else {
            dispatch({
              type: actionTypes.PROJECT_STATES_SAVED_FAILED,
              payload: response.data.reason
            });
          }
        } else {
          dispatch({
            type: actionTypes.PROJECT_STATES_SAVED_FAILED,
            payload: constants.PROJECT_STATES_SAVED_FAILED_MESSAGE
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: actionTypes.PROJECT_STATES_SAVED_FAILED,
          payload: constants.PROJECT_STATES_SAVED_FAILED_MESSAGE
        });
      });
}

export function fetchProjectStates(userLocalPublicAddress){
  return dispatch => 
  axios
    .get(`${config.api_base_url}/db/projects/formstates`, { params: { useraddress: userLocalPublicAddress } })
    .then( response => {
      if (response.status === 200) {
        if (response.data.message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.PROJECT_STATES_SUCCESS,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: actionTypes.PROJECT_STATES_FAILED,
            payload: response.data.reason
          });
        }
      } else {
        dispatch({
          type: actionTypes.PROJECT_STATES_FAILED,
          payload: constants.PROJECT_STATES_FAILED_MESSAGE
        });
      }
    }).catch(error => {
      console.log(error)
      dispatch({
        type: actionTypes.PROJECT_STATES_FAILED,
        payload: constants.PROJECT_STATES_FAILED_MESSAGE
      });
    })
}

export function uploadThumbnailAction(thumbnailImage, userLocalPublicAddress, doctype) {
  const form = new FormData();
  form.append("file", thumbnailImage);
  return dispatch => {
    dispatch({
      type: actionTypes.UPLOADING_THUMBNAIL,
      payload: true
    });
    httpClient({
      method: "post",
      url: `${config.api_base_url}/db/projects/document/upload?useraddress=${userLocalPublicAddress}&doctype=${doctype}`,
      data: form,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.THUMBNAIL_UPLOAD_SUCCESS,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: actionTypes.THUMBNAIL_UPLOAD_FAILED,
            payload: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.THUMBNAIL_UPLOAD_FAILED,
          payload: err.message
        });
      });
  };
}

export function thumbnailChangedAction(thumbnailImage) {
  return dispatch => {
    dispatch({
      type: actionTypes.THUMBNAIL_CHANGED,
      payload: thumbnailImage
    });
  };
}

export function uploadWhitepaperAction(whitepaperPDF, userLocalPublicAddress, doctype) {
  const form = new FormData();
  form.append("file", whitepaperPDF);
  return dispatch => {
    dispatch({
      type: actionTypes.UPLOADING_WHITEPAPER,
      payload: true
    });
    httpClient({
      method: "post",
      url: `${config.api_base_url}/db/projects/document/upload?useraddress=${userLocalPublicAddress}&doctype=${doctype}`,
      data: form,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.WHITEPAPER_UPLOAD_SUCCESS,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: actionTypes.WHITEPAPER_UPLOAD_FAILED,
            payload: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.WHITEPAPER_UPLOAD_FAILED,
          payload: err.message
        });
      });
  };
}

export function whitepaperChangedAction(whitepaperPDF) {
  return dispatch => {
    dispatch({
      type: actionTypes.WHITEPAPER_CHANGED,
      payload: whitepaperPDF
    });
  };
}

export function nonSaleEntityEditAction(index) {
  return dispatch => {
    dispatch({
      type: actionTypes.NON_SALE_ENTITY_EDIT,
      payload: index
    });
  };
}

export function addNonSaleEntityAction(entityName, entityPercentage, entityAddress) {
  return dispatch => {
    dispatch({
      type: actionTypes.ADD_NON_SALE_ENTITY,
      payload: {
        entityName,
        entityPercentage,
        entityAddress
      }
    });
  };
}

export function entityNameChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ENTITY_NAME_CHANGED,
      payload: value
    });
  };
}

export function entityPercentageChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ENTITY_PERCENTAGE_CHANGED,
      payload: value
    });
  };
}

export function entityAddressChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ENTITY_ADDRESS_CHANGED,
      payload: value
    });
  };
}

export function teamAddressChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.TEAM_ADDRESS_CHANGED,
      payload: value
    });
  };
}

export function calculateTokens() {
  return dispatch => {
    dispatch({
      type: actionTypes.CALCULATE_TOKENS,
      payload: null
    });
  };
}

export function tokenPriceFactorChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.TOKEN_PRICE_FACTOR_CHANGED,
      payload: value
    });
  };
}

export function adminNameChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ADMIN_NAME_CHANGED,
      payload: value
    });
  };
}

export function adminEmailChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ADMIN_EMAIL_CHANGED,
      payload: value
    });
  };
}

export function projectNameChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.PROJECT_NAME_CHANGED,
      payload: value
    });
  };
}

export function erc20TokenTagChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ERC20_TAG_CHANGED,
      payload: value
    });
  };
}

export function projectDescriptionChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.PROJECT_DESCRIPTION_CHANGED,
      payload: value
    });
  };
}

export function websiteLinkAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.WEBSITE_LINK_CHANGED,
      payload: value
    });
  };
}

export function telegramLinkChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.TELEGRAM_LINK_CHANGED,
      payload: value
    });
  };
}

export function githubLinkChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.GITHUB_LINK_CHANGED,
      payload: value
    });
  };
}

export function mediumLinkChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.MEDIUM_LINK_CHANGED,
      payload: value
    });
  };
}

export function facebookLinkChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.FACEBOOK_LINK_CHANGED,
      payload: value
    });
  };
}

export function twitterLinkChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.TWITTER_LINK_CHANGED,
      payload: value
    });
  };
}

export function initialFundReleaseChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.INITIAL_FUND_RELEASE_CHANGED,
      payload: value
    });
  };
}

export function maxEtherContributionChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.MAX_ETHER_CONTRIBUTION_CHANGED,
      payload: value
    });
  };
}

export function initialTapValueChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.INITIAL_TAP_VALUE_CHANGED,
      payload: value
    });
  };
}

export function tapIncrementFactorChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.TAP_INCREMENT_FACTOR_CHANGED,
      payload: value
    });
  };
}

export function voteSaturationLimitChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.VOTE_SATURATION_LIMIT_CHANGED,
      payload: value
    });
  };
}

// export function daicoRoundsChangedAction(value) {
//   return dispatch => {
//     dispatch({
//       type: actionTypes.DAICO_ROUNDS_CHANGED,
//       payload: value
//     });
//   };
// }

export function daicoStartDateChangedAction(value) {
  console.log(value);
  return dispatch => {
    dispatch({
      type: actionTypes.DAICO_START_DATE_CHANGED,
      payload: value
    });
  };
}

export function daicoEndDateChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.DAICO_END_DATE_CHANGED,
      payload: value
    });
  };
}

export function round1TargetUSDChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ROUND1_TARGET_USD_CHANGED,
      payload: value
    });
  };
}

export function round1TargetEthChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ROUND1_TARGET_ETH_CHANGED,
      payload: value
    });
  };
}

export function round2TargetUSDChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ROUND2_TARGET_USD_CHANGED,
      payload: value
    });
  };
}

export function round2TargetEthChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ROUND2_TARGET_ETH_CHANGED,
      payload: value
    });
  };
}

export function round3TargetUSDChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ROUND3_TARGET_USD_CHANGED,
      payload: value
    });
  };
}

export function round3TargetEthChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ROUND3_TARGET_ETH_CHANGED,
      payload: value
    });
  };
}
