import types from "../../action_types";

const initialState = {
  projectDetails: null
};

export default function(state = initialState, action) {
  let currentProjDetails = JSON.parse(JSON.stringify(state.projectDetails));
  switch (action.type) {
    case types.PROJECT_DETAILS_FETCHED: {
      const { data } = action.payload || {};
      currentProjDetails = data;
      return {
        ...state,
        projectDetails: currentProjDetails
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
