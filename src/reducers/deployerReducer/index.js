import types from "../../action_types";

const initialState = {
  projectDetails: null,
  ts: new Date()
};

export default function(state = initialState, action) {
  let currentProjDetails = state.projectDetails;
  switch (action.type) {
    case types.PROJECT_DETAILS_FETCHED:
      return {
        ...state,
        projectDetails: action.payload.data,
        ts: new Date()
      };

    case types.TRANSACTION_PENDING:
      //keep spinner rotating
      return state;
    case types.TRANSACTION_REDO:
    case types.RECEIVED_TRANSACTION_HASH:
      currentProjDetails.latestTxHash = action.payload.body.latestTxHash;
      currentProjDetails.currentDeploymentIndicator = action.payload.body.currentDeploymentIndicator;
      return {
        ...state,
        projectDetails: currentProjDetails,
        ts: new Date()
      };
    case types.DEPLOYED_CONTRACT:
      currentProjDetails.currentDeploymentIndicator = action.payload.body.currentDeploymentIndicator;
      currentProjDetails.latestTxHash = action.payload.body.latestTxHash;      
      switch (action.payload.body.currentDeploymentIndicator - 1) {
        case 0:
          currentProjDetails.membershipAddress = action.payload.body.membershipAddress;
          break;
        case 1:
          currentProjDetails.daicoTokenAddress = action.payload.body.daicoTokenAddress;
          break;
        case 2:
          currentProjDetails.lockedTokensAddress = action.payload.body.lockedTokensAddress;
          break;
        case 3:
          currentProjDetails.pollFactoryAddress = action.payload.body.pollFactoryAddress;
          break;
        case 4:
          currentProjDetails.crowdSaleAddress = action.payload.body.crowdSaleAddress;
          break;
        default:
          console.log(currentProjDetails);
          break;
      }
      return {
        ...state,
        projectDetails: currentProjDetails,
        ts: new Date()
      };
    default:
      return state;
  }
}
