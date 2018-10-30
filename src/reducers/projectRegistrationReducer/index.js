/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  adminName: "",
  adminEmail: "",
  projectName: "",
  erc20TokenTag: "",
  projectDescription: "",
  websiteLink: "",
  telegramLink: "",
  githubLink: "",
  mediumLink: "",
  facebookLink: "",
  twitterLink: "",
  initialFundRelease: "",
  daicoRounds: "",
  daicoStartDate: "",
  daicoEndDate: "",
  round1TargetUSD: "",
  round1TargetEth: "",
  round2TargetUSD: "",
  round2TargetEth: "",
  round3TargetUSD: "",
  round3TargetEth: "",
  round1Tokens: 0,
  round2Tokens: 0,
  round3Tokens: 0,
  round1Rate: 0,
  round2Rate: 0,
  round3Rate: 100,
  totalSaleTokens: 0,
  ethPrice: 210,
  tokenPriceFactor: "",
  nonSaleDistribution: [],
  project_id: "",
  teamAddress: "",
  maxEtherContribution: "",
  initialTapValue: "",
  tapIncrementFactor: "",
  voteSaturationLimit: "",
  saleEntities: [],
  nonSaleEntities: [
    { entityName: "Unallocated", entityPercentage: 50, entityAddress: "NA" }
  ],
  unallocatedTokensPer: 50,
  entityName: "",
  entityPercentage: "",
  entityAddress: "",
  errors: {
    [actionTypes.ADMIN_NAME_CHANGED]: "",
    [actionTypes.ADMIN_EMAIL_CHANGED]: ""
  }
};

export default function (state = initialState, action) {
  const localErrors = JSON.parse(JSON.stringify(state.errors));
  function validateEmail(email) {
    var re = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    return re.test(email);
  }
  function isUpperCase(str) {
    return str !== str.toUpperCase();
  }
  function validateTwitterLink(twitterLink) {
    var re = /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?[a-zA-Z0-9_]+$/i;
    return re.test(twitterLink);
  }
  function validateFacebookLink(facebookLink) {
    var re = /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;
    return re.test(facebookLink);
  }
  function validateWebsiteUrl(websiteUrl) {
    var re = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/i;
    return re.test(websiteUrl);
  }
  function validateGitLink(gitLink) {
    var re = /^(?:https?:\/\/)?(?:www\.)?github\.com\/(#!\/)?[a-zA-Z0-9_]+$/i;
    return re.test(gitLink);
  }
  function validateMediumLink(mediumLink) {
    var re = /^(?:https?:\/\/)?(?:www\.)?medium\.com\/(@)?[a-zA-Z0-9_]+$/i;
    return re.test(mediumLink);
  }
  function validateTelegramLink(telegramLink) {
    var re = /^(?:https?:\/\/)?(?:www\.)?t\.me\/(#!\/)?[a-zA-Z0-9_]+$/i;
    return re.test(telegramLink);
  }
  switch (action.type) {

    case actionTypes.NON_SALE_ENTITY_EDIT: {
      let nonSaleEntities = state.nonSaleEntities;
      let editEntity = nonSaleEntities.splice(action.payload, 1);
      if (nonSaleEntities.indexOf({ entityName: "Unallocated" }) != -1){
        nonSaleEntities.splice(nonSaleEntities.indexOf({ entityName: "Unallocated" }), 1);
      }
      
      const { entityName, entityAddress, entityPercentage } =
        editEntity[0] || "";
      let unallocatedTokensPer = state.unallocatedTokensPer
      unallocatedTokensPer = unallocatedTokensPer + entityPercentage
      nonSaleEntities.push({
          entityName: "Unallocated",
          entityPercentage: unallocatedTokensPer,
          entityAddress: "NA"
        })
      return {
        ...state,
        unallocatedTokensPer: unallocatedTokensPer, 
        entityName: entityName,
          entityPercentage: entityPercentage,
          entityAddress: entityAddress,
          nonSaleEntities: nonSaleEntities
      }  
    }

    case actionTypes.ADD_NON_SALE_ENTITY: {
      let nonSaleEntities = state.nonSaleEntities;
      let unallocatedTokensPer = state.unallocatedTokensPer;
      // nonSaleEntities.pop();
      
      if (action.payload) {
        if (action.payload.entityPercentage<=0 || isNaN(action.payload.entityPercentage)){
          return {...state}
        }
        var slicedUnallocated = nonSaleEntities.splice(nonSaleEntities.indexOf({ entityName: "Unallocated" }), 1);
        if (unallocatedTokensPer - action.payload.entityPercentage < 0) {
          nonSaleEntities.push(slicedUnallocated[0])
          return { ...state, nonSaleEntities: nonSaleEntities}
        } else {
          nonSaleEntities.push(action.payload);
          if (unallocatedTokensPer - action.payload.entityPercentage> 0) {
            nonSaleEntities.push({
              entityName: "Unallocated",
              entityPercentage: unallocatedTokensPer - action.payload.entityPercentage,
              entityAddress: "NA"
            });
            return {
              ...state,
              nonSaleEntities: nonSaleEntities,
              entityName: "",
              entityPercentage: "",
              entityAddress: "",
              unallocatedTokensPer: unallocatedTokensPer - action.payload.entityPercentage
            }
          } else {
            return {
              ...state,
              nonSaleEntities: nonSaleEntities,
              entityName: "",
              entityPercentage: "",
              entityAddress: "",
              unallocatedTokensPer: unallocatedTokensPer- action.payload.entityPercentage
            }
          }
        }
      } else {
        return {
          ...state
        };
      }
    }

    case actionTypes.CALCULATE_TOKENS: {
      var round3Rate = 100;
      var round2Rate =
        parseFloat(state.tokenPriceFactor).toFixed(1) * round3Rate;
      var round1Rate =
        Math.pow(parseFloat(state.tokenPriceFactor).toFixed(1), 2) * round3Rate;
      var round1N = round1Rate * parseInt(state.round1TargetEth);
      var round2N = round2Rate * parseInt(state.round2TargetEth);
      var round3N = round3Rate * parseInt(state.round3TargetEth);
      var N = round1N + round2N + round3N;
      var K = Math.round(500000000 / N);
      var round1Tokens = round1N * K
      var round2Tokens = round2N * K
      var round3Tokens = round3N * K
      var totalSaleTokens = round1Tokens + round2Tokens + round3Tokens
      var saleEntities = []
      saleEntities.push({ entityName: "Round1", entityPercentage: parseFloat((round1Tokens * 50 / totalSaleTokens).toFixed(2)), entityAddress: "NA" })
      saleEntities.push({ entityName: "Round2", entityPercentage: parseFloat((round2Tokens * 50 / totalSaleTokens).toFixed(2)), entityAddress: "NA" })
      saleEntities.push({ entityName: "Round3", entityPercentage: parseFloat((round3Tokens * 50 / totalSaleTokens).toFixed(2)), entityAddress: "NA" })
      return {
        ...state,
        round1Tokens: round1Tokens,
        round2Tokens: round2Tokens,
        round3Tokens: round3Tokens,
        round1Rate: round1Rate * K,
        round2Rate: round2Rate * K,
        round3Rate: round3Rate * K,
        totalSaleTokens: totalSaleTokens,
        saleEntities: saleEntities
      };
    }

    case actionTypes.ENTITY_ADDRESS_CHANGED: {
      return {
        ...state,
        entityAddress: action.payload
      };
    }

    case actionTypes.ENTITY_NAME_CHANGED: {
      return {
        ...state,
        entityName: action.payload
      };
    }

    case actionTypes.ENTITY_PERCENTAGE_CHANGED: {
      return {
        ...state,
        entityPercentage: action.payload
      };
    }

    case actionTypes.TOKEN_PRICE_FACTOR_CHANGED: {
      const tokenPriceFactor = action.payload || 0;
      return {
        ...state,
        tokenPriceFactor: tokenPriceFactor
      };
    }

    case actionTypes.PROJECT_REGISTRATION_SUCCESS: {
      return {
        ...state,
        project_id: action.payload
      };
    }

    case actionTypes.ADMIN_NAME_CHANGED: {
      if (action.payload.length > 100) {
        localErrors[actionTypes.ADMIN_NAME_CHANGED] = "Can't have such length";
      } else {
        localErrors[actionTypes.ADMIN_NAME_CHANGED] = "";
      }
      return {
        ...state,
        adminName: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.ADMIN_EMAIL_CHANGED: {
      if (validateEmail(action.payload)) {
        localErrors[actionTypes.ADMIN_EMAIL_CHANGED] = "";
      } else {
        localErrors[actionTypes.ADMIN_EMAIL_CHANGED] = "Not a valid email";
      }
      return {
        ...state,
        adminEmail: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.PROJECT_NAME_CHANGED: {
      if (action.payload.length > 32) {
        localErrors[actionTypes.PROJECT_NAME_CHANGED] =
          "Can't have such length";
      } else {
        localErrors[actionTypes.PROJECT_NAME_CHANGED] = "";
      }
      return {
        ...state,
        projectName: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.ERC20_TAG_CHANGED: {
      if (
        action.payload.length < 3 ||
        action.payload.length > 9 ||
        isUpperCase(action.payload.toString())
      ) {
        localErrors[actionTypes.ERC20_TAG_CHANGED] =
          "Should have 3-9 characters in upper case";
      } else {
        localErrors[actionTypes.ERC20_TAG_CHANGED] = "";
      }
      return {
        ...state,
        erc20TokenTag: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.PROJECT_DESCRIPTION_CHANGED: {
      return {
        ...state,
        projectDescription: action.payload
      };
    }

    case actionTypes.WEBSITE_LINK_CHANGED: {
      if (validateWebsiteUrl(action.payload)) {
        localErrors[actionTypes.WEBSITE_LINK_CHANGED] = "";
      } else {
        localErrors[actionTypes.WEBSITE_LINK_CHANGED] =
          "Not a valid website url";
      }
      return {
        ...state,
        websiteLink: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.TELEGRAM_LINK_CHANGED: {
      if (validateTelegramLink(action.payload)) {
        localErrors[actionTypes.TELEGRAM_LINK_CHANGED] = "";
      } else {
        localErrors[actionTypes.TELEGRAM_LINK_CHANGED] =
          "Not a valid telegram url";
      }
      return {
        ...state,
        telegramLink: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.GITHUB_LINK_CHANGED: {
      if (validateGitLink(action.payload)) {
        localErrors[actionTypes.GITHUB_LINK_CHANGED] = "";
      } else {
        localErrors[actionTypes.GITHUB_LINK_CHANGED] = "Not a valid github url";
      }
      return {
        ...state,
        githubLink: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.MEDIUM_LINK_CHANGED: {
      if (validateMediumLink(action.payload)) {
        localErrors[actionTypes.MEDIUM_LINK_CHANGED] = "";
      } else {
        localErrors[actionTypes.MEDIUM_LINK_CHANGED] =
          "Not a valid medium link";
      }
      return {
        ...state,
        mediumLink: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.FACEBOOK_LINK_CHANGED: {
      if (validateFacebookLink(action.payload)) {
        localErrors[actionTypes.FACEBOOK_LINK_CHANGED] = "";
      } else {
        localErrors[actionTypes.FACEBOOK_LINK_CHANGED] =
          "Not a valid facebook link";
      }
      return {
        ...state,
        facebookLink: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.TWITTER_LINK_CHANGED: {
      if (validateTwitterLink(action.payload)) {
        localErrors[actionTypes.TWITTER_LINK_CHANGED] = "";
      } else {
        localErrors[actionTypes.TWITTER_LINK_CHANGED] =
          "Not a valid twitter link";
      }
      return {
        ...state,
        twitterLink: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.TEAM_ADDRESS_CHANGED: {
      if (action.payload.isValid) {
        localErrors[actionTypes.TEAM_ADDRESS_CHANGED] = "";
      } else {
        localErrors[actionTypes.TEAM_ADDRESS_CHANGED] = "Not a valid address";
      }
      return {
        ...state,
        teamAddress: action.payload.value,
        errors: localErrors
      };
    }

    case actionTypes.INITIAL_FUND_RELEASE_CHANGED: {
      return {
        ...state,
        initialFundRelease: action.payload
      };
    }

    // case actionTypes.DAICO_ROUNDS_CHANGED:
    //   return {
    //     ...state,
    //     daicoRounds: action.payload,
    //   };
    case actionTypes.DAICO_START_DATE_CHANGED: {
      return {
        ...state,
        daicoStartDate: action.payload
      };
    }

    case actionTypes.DAICO_END_DATE_CHANGED: {
      return {
        ...state,
        daicoEndDate: action.payload
      };
    }

    case actionTypes.MAX_ETHER_CONTRIBUTION_CHANGED: {
      if (parseFloat(action.payload) < 0.1) {
        localErrors[actionTypes.MAX_ETHER_CONTRIBUTION_CHANGED] =
          "should be greater than 0.1";
      } else {
        localErrors[actionTypes.MAX_ETHER_CONTRIBUTION_CHANGED] = "";
      }
      return {
        ...state,
        maxEtherContribution: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.INITIAL_TAP_VALUE_CHANGED: {
      return {
        ...state,
        initialTapValue: action.payload
      };
    }

    case actionTypes.TAP_INCREMENT_FACTOR_CHANGED: {
      if (parseFloat(action.payload) < 1 || parseFloat(action.payload) > 2) {
        localErrors[actionTypes.TAP_INCREMENT_FACTOR_CHANGED] =
          "should be in between 1 and 2";
      } else {
        localErrors[actionTypes.TAP_INCREMENT_FACTOR_CHANGED] = "";
      }
      return {
        ...state,
        tapIncrementFactor: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.VOTE_SATURATION_LIMIT_CHANGED: {
      if (parseFloat(action.payload) < 0.1 || parseFloat(action.payload) > 10) {
        localErrors[actionTypes.VOTE_SATURATION_LIMIT_CHANGED] =
          "should be in between 0.1 and 10";
      } else {
        localErrors[actionTypes.VOTE_SATURATION_LIMIT_CHANGED] = "";
      }
      return {
        ...state,
        voteSaturationLimit: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.ROUND1_TARGET_USD_CHANGED: {
      if (action.payload) {
        return {
          ...state,
          round1TargetUSD: parseFloat(action.payload),
          round1TargetEth: (
            parseFloat(action.payload) / parseFloat(state.ethPrice)
          ).toFixed(4)
        };
      } else {
        return {
          ...state,
          round1TargetUSD: 0,
          round1TargetEth: 0
        };
      }
    }

    case actionTypes.ROUND1_TARGET_ETH_CHANGED: {
      if (action.payload) {
        return {
          ...state,
          round1TargetUSD:
            parseFloat(action.payload) * parseFloat(state.ethPrice).toFixed(2),
          round1TargetEth: parseFloat(action.payload)
        };
      } else {
        return {
          ...state,
          round1TargetUSD: 0,
          round1TargetEth: 0
        };
      }
    }

    case actionTypes.ROUND2_TARGET_USD_CHANGED: {
      if (action.payload) {
        return {
          ...state,
          round2TargetUSD: parseFloat(action.payload),
          round2TargetEth: (
            parseFloat(action.payload) / parseFloat(state.ethPrice)
          ).toFixed(4)
        };
      } else {
        return {
          ...state,
          round2TargetUSD: 0,
          round2TargetEth: 0
        };
      }
    }

    case actionTypes.ROUND2_TARGET_ETH_CHANGED: {
      if (action.payload) {
        return {
          ...state,
          round2TargetUSD:
            parseFloat(action.payload) * parseFloat(state.ethPrice).toFixed(2),
          round2TargetEth: parseFloat(action.payload)
        };
      } else {
        return {
          ...state,
          round2TargetUSD: 0,
          round2TargetEth: 0
        };
      }
    }

    case actionTypes.ROUND3_TARGET_USD_CHANGED: {
      if (action.payload) {
        return {
          ...state,
          round3TargetUSD: parseFloat(action.payload),
          round3TargetEth: (
            parseFloat(action.payload) / parseFloat(state.ethPrice)
          ).toFixed(4)
        };
      } else {
        return {
          ...state,
          round3TargetUSD: 0,
          round3TargetEth: 0
        };
      }
    }

    case actionTypes.ROUND3_TARGET_ETH_CHANGED: {
      if (action.payload) {
        return {
          ...state,
          round3TargetUSD:
            parseFloat(action.payload) * parseFloat(state.ethPrice).toFixed(2),
          round3TargetEth: parseFloat(action.payload)
        };
      } else {
        return {
          ...state,
          round3TargetUSD: 0,
          round3TargetEth: 0
        };
      }
    }

    default: {
      return { ...state };
    }
  }
}
