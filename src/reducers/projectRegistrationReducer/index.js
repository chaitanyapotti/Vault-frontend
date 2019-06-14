/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";
import {
  validateAdminName,
  validateEmail,
  validateWebsiteUrl,
  validateProjectNameLength,
  validateTokenTagLength,
  validateMaxEtherContribution,
  validateTapIncrementFactor,
  validateVoteSaturationLimit,
  validateR2BonusRange,
  validateUniqueName,
  validateDecimal,
  validateEntityPercentage,
  validateOneDecimal,
  validateProjectDescription
} from "../../helpers/common/validationHelperFunctions";

import { significantDigits } from "../../helpers/common/projectDetailhelperFunctions";

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
  redditLink: "",
  twitterLink: "",
  initialFundRelease: "",
  daicoRounds: "",
  daicoStartDate: null,
  daicoEndDate: null,
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
  r1Bonus: "",
  r2Bonus: "",
  nonSaleDistribution: [],
  project_id: "",
  teamAddress: "",
  maxEtherContribution: "",
  initialTapValue: "",
  tapIncrementFactor: "",
  voteSaturationLimit: "",
  saleEntities: [],
  nonSaleEntities: [{ entityName: "Unallocated", entityPercentage: 50, entityAddress: "NA" }],
  unallocatedTokensPer: 50,
  entityName: "",
  entityPercentage: "",
  entityAddress: "",
  projectNames: [],
  projectNamesRetrieveFailureMessage: "",
  tokenTags: [],
  tokenTagsRetrieveFailureMessage: "",
  whitepaperPDF: "",
  whitepaperPDFName: "",
  whitepaperUrl: "",
  uploadingWhitepaper: false,
  thumbnailImage: "",
  thumbnailImageName: "", 
  uploadingThumbnail: false,
  thumbnailUrl: "",
  allowEditAll: false,
  manageDaico: false,
  projectStatesReceived: false,
  errors: {
    [actionTypes.ADMIN_NAME_CHANGED]: "",
    [actionTypes.ADMIN_EMAIL_CHANGED]: "",
    [actionTypes.INITIAL_FUND_RELEASE_CHANGED]: ""
  }
};

export default function(state = initialState, action) {
  const localErrors = JSON.parse(JSON.stringify(state.errors));
  switch (action.type) {

    case actionTypes.USER_DETAILS: {
      const { firstName, lastName, email }  = action.payload || {}
      return { 
        ...state, adminName: firstName + " " +  lastName, adminEmail: email 
      }
    }


    case actionTypes.PROJECT_STATES_SUCCESS: {
      const { allowEditAll } = state || false
      const { manageDaico } = state || false
      const { ethPrice } = state || 210
      const { adminName } = state || ""
      if ('state' in action.payload){
        const { state: oldState } = action.payload
        return { ...oldState, project_id: "", allowEditAll: allowEditAll, projectStatesReceived: true, manageDaico: manageDaico, ethPrice:ethPrice, adminName: adminName}
      }else{
        return {
          ...state, project_id: "", allowEditAll: allowEditAll, projectStatesReceived: true, manageDaico: manageDaico, adminName: adminName
        }
      }
    }

    case actionTypes.PRICE_FETCHED: {
      const { data } = action.payload || {};
      const { price, tokenTag: ticker, change } = data || {};
      if (ticker==='ETH'){
        return { 
          ...state, 
          ethPrice: price
        }
      }
      return {
        ...state
      }
    }

    case actionTypes.PROJECT_STATES_FAILED: {
      return {
        ...state, projectStatesReceived: true
      }
    }

    case actionTypes.PROJECT_DEPLOYMENT_INDICATOR_SUCCESS:{
      let allowEditAll = false
      let manageDaico = false
      if ('currentDeploymentIndicator' in action.payload){
        manageDaico = true
      }else{
        allowEditAll = true
      }
      return {
        ...state, allowEditAll: allowEditAll, manageDaico: manageDaico
      }
    }

    case actionTypes.FETCH_PROJECT_NAMES_SUCCESS: {
      return {
        ...state,
        projectNames: action.payload
      };
    }
    case actionTypes.FETCH_PROJECT_NAMES_FAILED: {
      return {
        ...state,
        projectNamesRetrieveFailureMessage: action.payload
      };
    }
    case actionTypes.FETCH_TOKEN_TAGS_SUCCESS: {
      return {
        ...state,
        tokenTags: action.payload
      };
    }
    case actionTypes.FETCH_TOKEN_TAGS_FAILED: {
      return {
        ...state,
        tokenTagsRetrieveFailureMessage: action.payload
      };
    }

    case actionTypes.THUMBNAIL_CHANGED: {
      return { ...state, thumbnailImage: action.payload, thumbnailImageName: action.payload.name };
    }

    case actionTypes.UPLOADING_THUMBNAIL: {
      return { ...state, uploadingThumbnail : true}
    }

    case actionTypes.THUMBNAIL_UPLOAD_SUCCESS: {
      return { ...state, uploadingThumbnail: false, thumbnailUrl: action.payload}
    }

    case actionTypes.THUMBNAIL_UPLOAD_FAILED: {
      return { ...state, uploadingThumbnail: false, thumbnailUrl: ""}
    }

    case actionTypes.WHITEPAPER_CHANGED: {
      return { ...state, whitepaperPDF: action.payload, whitepaperPDFName:action.payload.name }
    }

    case actionTypes.UPLOADING_WHITEPAPER: {
      return { ...state, uploadingWhitepaper: true}
    }

    case actionTypes.WHITEPAPER_UPLOAD_SUCCESS: {
      return { ...state, uploadingWhitepaper: false, whitepaperUrl: action.payload}
    }

    case actionTypes.WHITEPAPER_UPLOAD_FAILED: {
      return { ...state, uploadingWhitepaper: false, whitepaperUrl: ""}
    }

    case actionTypes.NON_SALE_ENTITY_EDIT: {
      let nonSaleEntities = state.nonSaleEntities;
      let editEntity = nonSaleEntities.splice(action.payload[3], 1);
      var unallocIndex = 100
      for (const obj in nonSaleEntities) {
        if (nonSaleEntities[obj].entityName === "Unallocated") {
          unallocIndex = obj;
        }
      }
      if (unallocIndex !== 100) {
        nonSaleEntities.splice(unallocIndex, 1);
      }
      // if (nonSaleEntities.indexOf({ entityName: "Unallocated" }) != -1){
      //   nonSaleEntities.splice(nonSaleEntities.indexOf({ entityName: "Unallocated" }), 1);
      // }
      const { entityName, entityAddress, entityPercentage } = editEntity[0] || "";
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
        } 
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
          } 
            return {
              ...state,
              nonSaleEntities: nonSaleEntities,
              entityName: "",
              entityPercentage: "",
              entityAddress: "",
              unallocatedTokensPer: unallocatedTokensPer- action.payload.entityPercentage
            }
          
        
      } else {
        return {
          ...state
        };
      }
    }

    case actionTypes.CALCULATE_TOKENS: {
      // B1, B2 => R1,R2 (Ri=1+(Bi/100))
      const { r1Bonus, round1TargetEth, round2TargetEth, round3TargetEth, r2Bonus } = state || {};
      var round3Rate = 100;
      var round2Rate = (1+parseFloat(r2Bonus)/100)*round3Rate;
      var round1Rate = (1+parseFloat(r1Bonus)/100)*round3Rate;
      var round1N = round1Rate * parseFloat(round1TargetEth);
      var round2N = round2Rate * parseFloat(round2TargetEth);
      var round3N = round3Rate * parseFloat(round3TargetEth);
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
        round1Tokens: significantDigits(round1Tokens),
        round2Tokens: significantDigits(round2Tokens),
        round3Tokens: significantDigits(round3Tokens),
        round1Rate: significantDigits(round1Rate * K),
        round2Rate: significantDigits(round2Rate * K),
        round3Rate: significantDigits(round3Rate * K),
        totalSaleTokens: significantDigits(totalSaleTokens),
        saleEntities: saleEntities
      };
    }

    case actionTypes.ENTITY_ADDRESS_CHANGED: {
      const { isValid, value } = action.payload;
      localErrors[actionTypes.ENTITY_ADDRESS_CHANGED] = isValid ? "" : "Not a Valid Address";
      return {
        ...state,
        entityAddress: value,
        errors: localErrors
      };
    }

    case actionTypes.ENTITY_NAME_CHANGED: {
      return {
        ...state,
        entityName: action.payload
      };
    }

    case actionTypes.ENTITY_PERCENTAGE_CHANGED: {
      if (validateEntityPercentage(parseFloat(action.payload))) {
        localErrors[actionTypes.ENTITY_PERCENTAGE_CHANGED] = "Should be in between 1 & 50";
      } else if (!validateDecimal(action.payload)) {
        localErrors[actionTypes.ENTITY_PERCENTAGE_CHANGED] = "Only 1 Decimal Allowed";
      } else {
        localErrors[actionTypes.ENTITY_PERCENTAGE_CHANGED] = "";
      }
      return {
        ...state,
        entityPercentage: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.R1_BONUS_CHANGED: {
      // if (!validateR1BonusRange(parseFloat(action.payload))) {
      //   localErrors[actionTypes.R1_BONUS_CHANGED] = "Should be in between 1 & 100";
      // } else {
      //   localErrors[actionTypes.R1_BONUS_CHANGED] = "";
      // }
      return {
        ...state,
        r1Bonus: action.payload
      };
    }

    case actionTypes.R2_BONUS_CHANGED: {
      if (!validateR2BonusRange(parseFloat(action.payload))) {
        localErrors[actionTypes.R2_BONUS_CHANGED] = "Should be in between 1 & 100";
      } else {
        localErrors[actionTypes.R2_BONUS_CHANGED] = "";
      }
      return {
        ...state,
        r2Bonus: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.PROJECT_REGISTRATION_SUCCESS: {
      return {
        ...state,
        project_id: action.payload,
        manageDaico: true,
        currentDeploymentIndicator: 0
      };
    }

    case actionTypes.PROJECT_METADATA_SUCCESS: {
      return {
        ...state, 
        project_id: action.payload
      }
    }

    case actionTypes.ADMIN_NAME_CHANGED: {
      if (!validateAdminName(action.payload)) {
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
      const { projectNames } = state || {};
      if (!validateProjectNameLength(action.payload)) {
        localErrors[actionTypes.PROJECT_NAME_CHANGED] = "Length should be less than 32 ";
      } else if (validateUniqueName(projectNames, action.payload)) {
        localErrors[actionTypes.PROJECT_NAME_CHANGED] = "project name is not unique ";
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
      const { tokenTags } = state || {};
      if (!validateTokenTagLength(action.payload)) {
        localErrors[actionTypes.ERC20_TAG_CHANGED] = "Should have 3-6 characters";
      } else if (validateUniqueName(tokenTags, action.payload.toUpperCase())) {
        localErrors[actionTypes.ERC20_TAG_CHANGED] = "token tag is not unique";
      } else {
        localErrors[actionTypes.ERC20_TAG_CHANGED] = "";
      }
      return {
        ...state,
        erc20TokenTag: action.payload.toUpperCase(),
        errors: localErrors
      };
    }

    case actionTypes.PROJECT_DESCRIPTION_CHANGED: {
      if (!validateProjectDescription(action.payload)) {
        localErrors[actionTypes.PROJECT_DESCRIPTION_CHANGED] = "Length should be less than 140 ";
      } else {
        localErrors[actionTypes.PROJECT_DESCRIPTION_CHANGED] = "";
      }
      return {
        ...state,
        projectDescription: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.WEBSITE_LINK_CHANGED: {
      if (validateWebsiteUrl(action.payload)) {
        localErrors[actionTypes.WEBSITE_LINK_CHANGED] = "";
      } else {
        localErrors[actionTypes.WEBSITE_LINK_CHANGED] = "Not a valid website link";
      }
      return {
        ...state,
        websiteLink: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.TELEGRAM_LINK_CHANGED: {
      return {
        ...state,
        telegramLink: action.payload
      };
    }

    case actionTypes.GITHUB_LINK_CHANGED: {
      return {
        ...state,
        githubLink: action.payload
      };
    }

    case actionTypes.MEDIUM_LINK_CHANGED: {
      return {
        ...state,
        mediumLink: action.payload
      };
    }

    case actionTypes.REDDIT_LINK_CHANGED: {
      return {
        ...state,
        redditLink: action.payload
      };
    }

    case actionTypes.TWITTER_LINK_CHANGED: {
      return {
        ...state,
        twitterLink: action.payload
      };
    }

    case actionTypes.TEAM_ADDRESS_CHANGED: {
      const { isValid } = action.payload;
      localErrors[actionTypes.TEAM_ADDRESS_CHANGED] = isValid ? "" : "Not a Valid Address";
      return {
        ...state,
        teamAddress: action.payload.value,
        errors: localErrors
      };
    }

    case actionTypes.INITIAL_FUND_RELEASE_CHANGED: {
      if (parseFloat(action.payload) < 10 && !validateOneDecimal(action.payload)) {
        localErrors[actionTypes.INITIAL_FUND_RELEASE_CHANGED] = "Only 2 Decimals Allowed";
      } else if (parseFloat(action.payload)>=10 && !validateOneDecimal(action.payload)){
        localErrors[actionTypes.INITIAL_FUND_RELEASE_CHANGED] = "Only 1 Decimal Allowed";
      } else if (parseFloat(action.payload)===0){
        localErrors[actionTypes.INITIAL_FUND_RELEASE_CHANGED] = "should be greater than zero";
      } else {
        localErrors[actionTypes.INITIAL_FUND_RELEASE_CHANGED] = "";
      }
      return {
        ...state,
        initialFundRelease: action.payload,
        errors: localErrors
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
      if (parseFloat(action.payload)<10 && !validateOneDecimal(action.payload)) {
        localErrors[actionTypes.MAX_ETHER_CONTRIBUTION_CHANGED] = "Only 2 Decimals Allowed";
      } else if (parseFloat(action.payload)>=10 && !validateOneDecimal(action.payload)){
        localErrors[actionTypes.MAX_ETHER_CONTRIBUTION_CHANGED] = "Only 1 Decimal Allowed";
      } else if (validateMaxEtherContribution(parseFloat(action.payload))) {
        localErrors[actionTypes.MAX_ETHER_CONTRIBUTION_CHANGED] = "should be greater than 0.1";
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
      if (parseFloat(action.payload)<10 && !validateOneDecimal(action.payload)) {
        localErrors[actionTypes.INITIAL_TAP_VALUE_CHANGED] = "Only 2 Decimals Allowed";
      } else if (parseFloat(action.payload)>=10 && !validateOneDecimal(action.payload)){
        localErrors[actionTypes.INITIAL_TAP_VALUE_CHANGED] = "Only 1 Decimal Allowed";
      } else if (parseFloat(action.payload)===0){
        localErrors[actionTypes.INITIAL_TAP_VALUE_CHANGED] = "should be greater than zero";
      } else {
        localErrors[actionTypes.INITIAL_TAP_VALUE_CHANGED] = "";
      }
      return {
        ...state,
        initialTapValue: action.payload,
        errors: localErrors
      };
    }


    case actionTypes.TAP_INCREMENT_FACTOR_CHANGED: {
      if (validateTapIncrementFactor(parseFloat(action.payload))) {
        localErrors[actionTypes.TAP_INCREMENT_FACTOR_CHANGED] = "Should be in between 1 and 2";
      } else if (!validateDecimal(action.payload)) {
        localErrors[actionTypes.TAP_INCREMENT_FACTOR_CHANGED] = "Only two decimals allowed";
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
      if (validateVoteSaturationLimit(parseFloat(action.payload))) {
        localErrors[actionTypes.VOTE_SATURATION_LIMIT_CHANGED] = "Should be in between 0.01 & 5";
      } else if (!validateDecimal(action.payload)){
        localErrors[actionTypes.VOTE_SATURATION_LIMIT_CHANGED] = "only two decimals allowed";
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
      }
        return {
          ...state,
          round1TargetUSD: "",
          round1TargetEth: ""
        };
    }

    case actionTypes.ROUND1_TARGET_ETH_CHANGED: {
      if (action.payload) {
        return {
          ...state,
          round1TargetUSD:
            parseFloat(action.payload) * parseFloat(state.ethPrice).toFixed(2),
          round1TargetEth: parseFloat(action.payload)
         };
        } return {
          ...state,
          round1TargetUSD: "",
          round1TargetEth: ""
        };
    }

    case actionTypes.ROUND2_TARGET_USD_CHANGED: {
      if (action.payload) {
        return {
          ...state,
          round2TargetUSD: parseFloat(action.payload),
          round2TargetEth: (
            parseFloat(action.payload) / parseFloat(state.ethPrice)
          ).toFixed(4),
          errors: localErrors
        };
      } 
        return {
          ...state,
          round2TargetUSD: "",
          round2TargetEth: ""
        };
    }

    case actionTypes.ROUND2_TARGET_ETH_CHANGED: {
      if (action.payload) {
        return {
          ...state,
          round2TargetUSD:
            parseFloat(action.payload) * parseFloat(state.ethPrice).toFixed(2),
          round2TargetEth: parseFloat(action.payload),
          errors: localErrors
        };
      } 
        return {
          ...state,
          round2TargetUSD: "",
          round2TargetEth: ""
        };
    }

    case actionTypes.ROUND3_TARGET_USD_CHANGED: {
      if (action.payload) {
        return {
          ...state,
          round3TargetUSD: parseFloat(action.payload),
          round3TargetEth: (
            parseFloat(action.payload) / parseFloat(state.ethPrice)
          ).toFixed(4),
          errors: localErrors
        };
      } 
        return {
          ...state,
          round3TargetUSD: "",
          round3TargetEth: ""
        };
    }

    case actionTypes.ROUND3_TARGET_ETH_CHANGED: {
      if (action.payload) {
        return {
          ...state,
          round3TargetUSD:
            parseFloat(action.payload) * parseFloat(state.ethPrice).toFixed(2),
          round3TargetEth: parseFloat(action.payload),
          errors: localErrors
        };
      } 
        return {
          ...state,
          round3TargetUSD: "",
          round3TargetEth: ""
        };
      
    }

    default: {
      return { ...state };
    }
  }
}
