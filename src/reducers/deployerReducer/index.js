import types from "../../action_types";

import { tapDataConverted, withdrawDataConverted, withdrawXfrDataConverted } from "../../helpers/common/projectDetailhelperFunctions";

const initialState = {
  projectDetails: null,
  spendableArrays: [],
  spentArray: [],
  xfrDots: [],
  tapDots: [],
  spendableDots: [],
  spentDots: [],
  dateArray: [],
  deployContractButtonSpinning: false,
  deployContractStartButtonSpinning: false
};

export default function(state = initialState, action) {
  let currentProjDetails = JSON.parse(JSON.stringify(state.projectDetails));
  switch (action.type) {
    case types.SPEND_CURVE_DATA_SUCCESS: {
      const today = new Date();
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const { spendableArrays, xfrDots, tapDots, spentArray, spendableDots, spentDots, dateArray, projectDetails } = state || {};
      const { startDateTime, initialFundRelease, initialTapAmount } = projectDetails;
      const daicoStartDate = new Date(startDateTime);
      const daicoStartDateConverted = new Date(daicoStartDate.getFullYear(), daicoStartDate.getMonth(), daicoStartDate.getDate());
      const { tapData, withdrawXfrData, withdrawData } = action.payload || {};
      const tapDataDict = tapDataConverted(tapData);
      const withdrawDataDict = withdrawDataConverted(withdrawData);
      const withdrawXfrDataDict = withdrawXfrDataConverted(withdrawXfrData);
      let currentArray = [];
      let spentValue = 0;
      const keyx = daicoStartDateConverted.getTime().toString();
      if (withdrawDataDict[keyx]) {
        spentValue += withdrawDataDict[keyx];
      }
      spentArray.push({ date: daicoStartDateConverted, ether: spentValue });
      let tapValue = parseFloat(initialTapAmount) * 86400 * Math.pow(10, -18);
      currentArray.push({ date: daicoStartDateConverted, ether: initialFundRelease * Math.pow(10, -18) });
      spendableDots.push({ date: daicoStartDateConverted, ether: initialFundRelease * Math.pow(10, -18) });
      spentDots.push({ date: daicoStartDateConverted, ether: spentValue });
      dateArray.push({ date: daicoStartDateConverted, ether: 0 });
      const newDatex = new Date(daicoStartDateConverted.setDate(daicoStartDateConverted.getDate() + 1));
      for (let d = newDatex; d <= todayDate; d.setDate(d.getDate() + 1)) {
        spentValue = spentArray[spentArray.length - 1].ether;
        const key = d.getTime().toString();
        if (withdrawDataDict[key]) {
          spentValue += withdrawDataDict[key];
        }
        spentArray.push({ date: new Date(d), ether: spentValue });
        let previousEther = 0;
        let currentEther = 0;
        previousEther = currentArray[currentArray.length - 1].ether;
        currentEther = previousEther + tapValue;
        currentArray.push({ date: new Date(d), ether: currentEther });

        if (tapDataDict[key]) {
          tapValue = tapDataDict[key];
          tapDots.push({ date: new Date(d), ether: 0 });
          spendableDots.push({ date: new Date(d), ether: currentEther });
        }

        if (withdrawXfrDataDict[key]) {
          spendableArrays.push(currentArray);
          currentArray = [{ date: new Date(d), ether: currentEther + withdrawXfrDataDict[key] }];
          xfrDots.push({ date: new Date(d), ether: 0 });
        }
        dateArray.push({ date: new Date(d), ether: 0 });
      }
      spendableArrays.push(currentArray);
      let lastArray = [];
      let endOfSpendable = [];
      lastArray = spendableArrays[spendableArrays.length - 1] || [];
      endOfSpendable = lastArray[lastArray.length - 1] || [];
      spendableDots.push({
        date: todayDate,
        ether: endOfSpendable.ether || 0
      });
      spentDots.push(spentArray[spentArray.length - 1]);
      return { ...state };
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
      const { latestTxHash, currentDeploymentIndicator } = action.payload.body || {};
      currentProjDetails.latestTxHash = latestTxHash;
      currentProjDetails.currentDeploymentIndicator = currentDeploymentIndicator;
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
        crowdSaleAddress
      } = action.payload.body || {};
      currentProjDetails.currentDeploymentIndicator = currentDeploymentIndicator;
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
