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
  ethPrice: 210,
  tokenPriceFactor: 0,
  nonSaleDistribution: [],
  project_id: "",
  teamAddress: "",
  maxEtherContribution: "",
  initialTapValue: "",
  tapIncrementFactor: "",
  voteSaturationLimit: 0,
  totalSaleTokens: 0,
  nonSaleEntities: [
    { entityName: "Unallocated", entityPercentage: 100, entityAddress: "NA" }
  ],
  entityName: "",
  entityPercentage: "",
  entityAddress: "",
  errors: { [actionTypes.ADMIN_NAME_CHANGED]: "" }
};

export default function(state = initialState, action) {
  const localErrors = JSON.parse(JSON.stringify(state.errors));
  switch (action.type) {
    case actionTypes.NON_SALE_ENTITY_EDIT: {
      let nonSaleEntities = state.nonSaleEntities;
      let editEntity = nonSaleEntities.splice(action.payload, 1);
      const { entityName, entityAddress, entityPercentage } =
        editEntity[0] || "";
      if (entityName === "Unallocated") {
        nonSaleEntities.push(editEntity[0]);
        return {
          ...state,
          nonSaleEntities: nonSaleEntities
        };
      } else {
        return {
          ...state,
          entityName: entityName,
          entityPercentage: entityPercentage,
          entityAddress: entityAddress
        };
      }
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

    case actionTypes.ADD_NON_SALE_ENTITY: {
      let nonSaleEntities = state.nonSaleEntities;
      nonSaleEntities.pop();
      if (action.payload) {
        nonSaleEntities.push(action.payload);
        let total = 0;
        for (let i = 0; i < nonSaleEntities.length; i++) {
          total += nonSaleEntities[i]["entityPercentage"];
        }
        if (total < 100) {
          nonSaleEntities.push({
            entityName: "Unallocated",
            entityPercentage: 100 - total,
            entityAddress: "NA"
          });
        }
        return {
          ...state,
          nonSaleEntities: nonSaleEntities,
          entityName: "",
          entityPercentage: "",
          entityAddress: ""
        };
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
      return {
        ...state,
        round1Tokens: round1N * K * Math.pow(10, 18),
        round2Tokens: round2N * K * Math.pow(10, 18),
        round3Tokens: round3N * K * Math.pow(10, 18),
        round1Rate: round1Rate * K,
        round2Rate: round2Rate * K,
        round3Rate: round3Rate * K,
        totalSaleTokens: round1N * K + round2N * K + round3N * K
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
      if (action.payload.length > 5) {
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
      return {
        ...state,
        adminEmail: action.payload
      };
    }

    case actionTypes.PROJECT_NAME_CHANGED: {
      return {
        ...state,
        projectName: action.payload
      };
    }

    case actionTypes.ERC20_TAG_CHANGED: {
      return {
        ...state,
        erc20TokenTag: action.payload
      };
    }

    case actionTypes.PROJECT_DESCRIPTION_CHANGED: {
      return {
        ...state,
        projectDescription: action.payload
      };
    }

    case actionTypes.WEBSITE_LINK_CHANGED: {
      return {
        ...state,
        websiteLink: action.payload
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

    case actionTypes.FACEBOOK_LINK_CHANGED: {
      return {
        ...state,
        facebookLink: action.payload
      };
    }

    case actionTypes.TWITTER_LINK_CHANGED: {
      return {
        ...state,
        twitterLink: action.payload
      };
    }

    case actionTypes.TEAM_ADDRESS_CHANGED: {
      return {
        ...state,
        teamAddress: action.payload
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
      return {
        ...state,
        maxEtherContribution: action.payload
      };
    }

    case actionTypes.INITIAL_TAP_VALUE_CHANGED: {
      return {
        ...state,
        initialTapValue: action.payload
      };
    }

    case actionTypes.TAP_INCREMENT_FACTOR_CHANGED: {
      return {
        ...state,
        tapIncrementFactor: action.payload
      };
    }

    case actionTypes.VOTE_SATURATION_LIMIT_CHANGED: {
      return {
        ...state,
        voteSaturationLimit: action.payload
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
