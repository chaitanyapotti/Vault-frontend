import types from '../../action_types';

const initialState = {
  projectDetails: null,
  ts: new Date(),
};

export default function(state = initialState, action) {
  const currentProjDetails = state.projectDetails;
  switch (action.type) {
    case types.PROJECT_DETAILS_FETCHED: {
      const { data } = action.payload || {};
      return {
        ...state,
        projectDetails: data,
        ts: new Date(),
      };
    }
    case types.TRANSACTION_PENDING:
      // keep spinner rotating
      return state;
    case types.TRANSACTION_REDO:
    case types.RECEIVED_TRANSACTION_HASH:
      const { latestTxHash, currentDeploymentIndicator } = action.payload.body || {};
      currentProjDetails.latestTxHash = latestTxHash;
      currentProjDetails.currentDeploymentIndicator = currentDeploymentIndicator;
      return {
        ...state,
        projectDetails: currentProjDetails,
        ts: new Date(),
      };
    case types.DEPLOYED_CONTRACT: {
      const {
        latestTxHash,
        currentDeploymentIndicator,
        membershipAddress,
        daicoTokenAddress,
        lockedTokensAddress,
        pollFactoryAddress,
        crowdSaleAddress,
      } =
        action.payload.body || {};
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
        projectDetails: currentProjDetails,
        ts: new Date(),
      };
    }
    default:
      return state;
  }
}
