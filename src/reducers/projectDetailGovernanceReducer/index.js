/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
  tokenBalance: "0",
  tokensUnderGovernance: "0",
  remainingEtherBalance: "0",
  killPollIndex: "0",
  totalSupply: "0",
  killConsensus: "0",
  tapPollConsensus: "0",
  currentTap: "0",
  xfrData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case actionTypes.MEMBERSHIP_ASSIGNED:
    //   return {
    //     ...state,
    //     membershipAssigned: true
    //   };

    // case actionTypes.MEMBERSHIP_FAILED:
    //   return {
    //     ...state,
    //     membershipAssigned: false
    //   };
    case actionTypes.TOKENS_UNDER_GOVERNANCE_RECEIVED:
      const { rec } = action.payload;
      return {
        ...state,
        tokensUnderGovernance: rec
      };
    case actionTypes.KILL_POLL_INDEX_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        killPollIndex: receipt
      };
    }
    case actionTypes.REMAINING_ETHER_BALANCE_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        remainingEtherBalance: receipt
      };
    }
    case actionTypes.TOTAL_SUPPLY_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        totalSupply: receipt
      };
    }
    case actionTypes.KILL_CONSENSUS_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        killConsensus: receipt
      };
    }
    case actionTypes.TAP_CONSENSUS_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        tapPollConsensus: receipt
      };
    }
    case actionTypes.CURRENT_TAP_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        currentTap: receipt
      };
    }
    case actionTypes.XFR_DATA_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        xfrData: receipt
      };
    }
    default:
      return state;
  }
}
