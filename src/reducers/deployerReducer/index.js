import types from "../../action_types";

import {
  tapDataConverted,
  withdrawDataConverted,
  withdrawXfrDataConverted,
  contributionDataConverted
} from "../../helpers/common/projectDetailhelperFunctions";

const initialState = {
  projectDetails: null,
  spendableArrays: [],
  spentArray: [],
  xfrDots: [],
  tapDots: [],
  spendableDots: [],
  spentDots: [],
  dateArray: [],
  contributionArray: [],
  deployContractButtonSpinning: false,
  deployContractStartButtonSpinning: false,
  pageReloading: false,
  contriArrayReceived: false
};

export default function(state = initialState, action) {
  let currentProjDetails = JSON.parse(JSON.stringify(state.projectDetails));
  switch (action.type) {
    case types.SPEND_CURVE_DATA_SUCCESS: {
      const today = new Date();
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const { projectDetails } = state || {};
      let { spendableArrays, xfrDots, tapDots, spentArray, spendableDots, spentDots, dateArray, contributionArray } = state || {};
      spendableArrays = [];
      spentArray = [];
      xfrDots = [];
      tapDots = [];
      spendableDots = [];
      spentDots = [];
      dateArray = [];
      contributionArray = [];
      const { r1EndedAt, initialFundRelease, initialTapAmount } = projectDetails;
      const daicoStartDate = new Date(r1EndedAt);
      const daicoStartDateConverted = new Date(daicoStartDate.getFullYear(), daicoStartDate.getMonth(), daicoStartDate.getDate());
      const { tapData, withdrawXfrData, withdrawData, contributionData } = action.payload || {};
      const tapDataDict = tapDataConverted(tapData);
      const withdrawDataDict = withdrawDataConverted(withdrawData);
      const withdrawXfrDataDict = withdrawXfrDataConverted(withdrawXfrData);
      const contributionDataDict = contributionDataConverted(contributionData);
      let currentArray = [];
      let spentValue = 0;
      let contributionValue = 0;
      const keyx = daicoStartDateConverted.getTime().toString();
      if (withdrawDataDict[keyx]) {
        spentValue += withdrawDataDict[keyx];
      }
      if (contributionDataDict[keyx]) {
        contributionValue += contributionDataDict[keyx];
      }
      spentArray.push({ date: daicoStartDateConverted.getTime(), ether: spentValue });
      contributionArray.push({ date: daicoStartDateConverted.getTime(), ether: contributionValue });
      let tapValue = parseFloat(initialTapAmount) * 86400 * Math.pow(10, -18);
      currentArray.push({ date: daicoStartDateConverted.getTime(), ether: initialFundRelease * Math.pow(10, -18) });
      spendableDots.push({ date: daicoStartDateConverted.getTime(), ether: initialFundRelease * Math.pow(10, -18) });
      spentDots.push({ date: daicoStartDateConverted.getTime(), ether: spentValue });
      dateArray.push({ date: daicoStartDateConverted.getTime(), ether: 0 });
      const newDatex = new Date(daicoStartDateConverted.setDate(daicoStartDateConverted.getDate() + 1));
      for (let d = newDatex; d <= todayDate; d.setDate(d.getDate() + 1)) {
        spentValue = spentArray[spentArray.length - 1].ether;
        const key = d.getTime().toString();
        if (withdrawDataDict[key]) {
          spentValue += withdrawDataDict[key];
        }
        spentArray.push({ date: new Date(d).getTime(), ether: spentValue });

        contributionValue = contributionArray[contributionArray.length - 1].ether;
        if (contributionDataDict[key]) {
          contributionValue += contributionDataDict[key];
        }
        contributionArray.push({ date: new Date(d).getTime(), ether: contributionValue });

        let previousEther = 0;
        let currentEther = 0;
        previousEther = currentArray[currentArray.length - 1].ether;
        currentEther = previousEther + tapValue;
        currentArray.push({ date: new Date(d).getTime(), ether: currentEther });

        if (tapDataDict[key]) {
          tapValue = tapDataDict[key];
          tapDots.push({ date: new Date(d).getTime(), ether: 0 });
          spendableDots.push({ date: new Date(d).getTime(), ether: currentEther });
        }

        if (withdrawXfrDataDict[key]) {
          spendableArrays.push(currentArray);
          currentArray = [{ date: new Date(d).getTime(), ether: currentEther + withdrawXfrDataDict[key] }];
          xfrDots.push({ date: new Date(d).getTime(), ether: 0 });
        }
        dateArray.push({ date: new Date(d).getTime(), ether: 0 });
      }
      spendableArrays.push(currentArray);
      let lastArray = [];
      let endOfSpendable = [];
      lastArray = spendableArrays[spendableArrays.length - 1] || [];
      endOfSpendable = lastArray[lastArray.length - 1] || [];
      spendableDots.push({
        date: todayDate.getTime(),
        ether: endOfSpendable.ether || 0
      });
      spentDots.push(spentArray[spentArray.length - 1]);
      return {
        ...state,
        spendableArrays,
        spentArray,
        xfrDots,
        tapDots,
        spendableDots,
        spentDots,
        dateArray,
        contributionArray,
        contriArrayReceived: true
      };
    }

    case types.CLEAR_GOVERNANCE_STATES: {
      return {
        ...state,
        projectDetails: null
      };
    }

    case types.CLEAR_PROJECT_DETAILS: {
      return {
        ...state,
        projectDetails: null
      };
    }

    case types.PAGE_RELOADING: {
      return {
        ...state,
        pageReloading: action.payload
      };
    }

    case types.PROJECT_DETAILS_FETCHED: {
      const { data } = action.payload || {};
      currentProjDetails = data;
      return {
        ...state,
        projectDetails: currentProjDetails
      };
    }
    case types.DEPLOY_CONTRACT_BUTTON_SPINNING: {
      const { receipt } = action.payload || {};
      return {
        ...state,
        deployContractButtonSpinning: receipt
      };
    }
    case types.DEPLOY_CONTRACT_START_BUTTON_SPINNING: {
      const { receipt } = action.payload || {};
      return {
        ...state,
        deployContractStartButtonSpinning: receipt
      };
    }
    case types.TRANSACTION_REDO:
    case types.RECEIVED_TRANSACTION_HASH: {
      const { latestTxHash, currentDeploymentIndicator, nonce } = action.payload.body || {};
      currentProjDetails.latestTxHash = latestTxHash;
      currentProjDetails.currentDeploymentIndicator = currentDeploymentIndicator;
      currentProjDetails.nonce = nonce;
      return {
        ...state,
        projectDetails: currentProjDetails
      };
    }
    case types.DEPLOYED_CONTRACT: {
      const {
        latestTxHash,
        currentDeploymentIndicator,
        membershipAddress,
        daicoTokenAddress,
        lockedTokensAddress,
        pollFactoryAddress,
        crowdSaleAddress,
        nonce
      } = action.payload.body || {};
      currentProjDetails.currentDeploymentIndicator = currentDeploymentIndicator;
      currentProjDetails.nonce = nonce;
      currentProjDetails.latestTxHash = latestTxHash;
      switch (currentDeploymentIndicator - 1) {
        case 0:
          currentProjDetails.membershipAddress = membershipAddress;
          break;
        case 1:
          currentProjDetails.daicoTokenAddress = daicoTokenAddress;
          break;
        case 2:
          currentProjDetails.lockedTokensAddress = lockedTokensAddress;
          break;
        case 3:
          currentProjDetails.pollFactoryAddress = pollFactoryAddress;
          break;
        case 4:
          currentProjDetails.crowdSaleAddress = crowdSaleAddress;
          break;
        default:
          console.log(currentProjDetails);
          break;
      }
      return {
        ...state,
        projectDetails: currentProjDetails
      };
    }
    default:
      return state;
  }
}
