/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";
// import { significantDigits } from "../../helpers/common/projectDetailhelperFunctions"

export const initialState = {
  tokenBalance: "",
  tokensUnderGovernance: "0",
  remainingEtherBalance: "0",
  killPollIndex: "0",
  totalSupply: "0",
  killConsensus: "",
  tapPollConsensus: "",
  currentTap: "0",
  xfrData: {},
  xfrVoteData: [],
  killPollsHistoryData: [],
  killPollsHistoryRetrieveFailureMessage: "",
  tapPollsHistoryData: [],
  tapPollsHistoryRetrieveFailureMessage: "",
  xfrPollsHistoryData: [],
  xfrPollsHistoryRetrieveFailureMessage: "",
  spendCurveData: {
    allXfrData: [
      {
        consensus: "625000000",
        timestamp: 1540883901,
        xfrAddress: "0xEfA52B1F0b90f0747d91607e3ca5fD3249F97A42"
      }
    ],
    tapData: [
      {
        amount: 385802469136 * 1.5,
        timestamp: 1540684800
      },
      {
        amount: 385802469136 * 1.5 * 1.5,
        timestamp: 1541030400
      }
    ],
    withdrawData: [{ amount: "0.5", timestamp: 1540425600 }, { amount: "0.5", timestamp: 1541222822 }],
    withdrawXfrData: [
      {
        amount: "0.3",
        timestamp: 1540857600
      }
    ]
  },
  voteHistogramData: {},
  totalVotes: 0,
  collectiveVoteWeight: 0,
  xfr1ButtonTransactionHash: "",
  killButtonTransactionHash: "",
  killFinalizeTransactionHash: "",
  xfr2ButtonTransactionHash: "",
  tapButtonTransactionHash: "",
  unlockTokensData: undefined,
  unlockTokensLoading: false,
  killVoterCount: "0"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLEAR_GOVERNANCE_STATES: {
      return {
        ...state,
        unlockTokensData: undefined
      };
    }
    case actionTypes.VOTE_HISTOGRAM_DATA_SUCCESS: {
      // console.log("vote histogram data: " ,action.payload)
      const { binDict, collectiveVoteWeight } = action.payload || {};
      const histArray = [];
      let totalVotes = 0;
      for (const key in binDict) {
        const d = binDict[key];
        // d["max"] = significantDigits(d["max"])
        // d["min"] = significantDigits(d["min"])
        totalVotes += d.voters;
        histArray.push(d);
      }
      return { ...state, voteHistogramData: histArray, totalVotes, collectiveVoteWeight };
    }

    case actionTypes.KILL_VOTER_COUNT_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        killVoterCount: receipt
      };
    }

    case actionTypes.KILL_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        killFinalizeTransactionHash: transactionHash
      };
    }

    case actionTypes.UNLOCK_TOKENS_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        unlockTokensLoading: receipt
      };
    }

    case actionTypes.XFR2_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        xfr2ButtonTransactionHash: transactionHash
      };
    }

    case actionTypes.XFR1_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        xfr1ButtonTransactionHash: transactionHash
      };
    }

    case actionTypes.TAP_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        tapButtonTransactionHash: transactionHash
      };
    }
    case actionTypes.KILL_BUTTON_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        killButtonTransactionHash: transactionHash
      };
    }
    case actionTypes.TOKENS_UNDER_GOVERNANCE_RECEIVED: {
      const { rec } = action.payload;
      return {
        ...state,
        tokensUnderGovernance: rec
      };
    }
    case actionTypes.KILL_POLL_INDEX_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        killPollIndex: receipt
      };
    }
    case actionTypes.KILL_POLLS_HISTORY_SUCCESS: {
      const { receipt } = action.payload;
      return {
        ...state,
        killPollsHistoryData: receipt
      };
    }
    case actionTypes.KILL_POLLS_HISTORY_FAILED: {
      const { receipt } = action.payload;
      return {
        ...state,
        killPollsHistoryRetrieveFailureMessage: receipt
      };
    }

    case actionTypes.TAP_POLLS_HISTORY_SUCCESS: {
      const { receipt } = action.payload;
      return {
        ...state,
        tapPollsHistoryData: receipt
      };
    }
    case actionTypes.TAP_POLLS_HISTORY_FAILED: {
      const { receipt } = action.payload;
      return {
        ...state,
        tapPollsHistoryRetrieveFailureMessage: receipt
      };
    }
    case actionTypes.XFR_POLLS_HISTORY_SUCCESS: {
      const { receipt } = action.payload;
      return {
        ...state,
        xfrPollsHistoryData: receipt
      };
    }
    case actionTypes.XFR_POLLS_HISTORY_FAILED: {
      const { receipt } = action.payload;
      return {
        ...state,
        xfrPollsHistoryRetrieveFailureMessage: receipt
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
    case actionTypes.KILL_POLL_VOTE_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        killVoteData: receipt
      };
    }
    case actionTypes.TAP_POLL_VOTE_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        tapVoteData: receipt
      };
    }
    case actionTypes.KILL_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        killButtonSpinning: receipt
      };
    }
    case actionTypes.TAP_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        tapButtonSpinning: receipt
      };
    }
    case actionTypes.XFR_POLL_VOTE_RECEIVED: {
      const { receipt } = action.payload;
      return {
        ...state,
        xfrVoteData: receipt
      };
    }
    case actionTypes.XFR1_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        xfr1ButtonSpinning: receipt
      };
    }
    case actionTypes.XFR2_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        xfr2ButtonSpinning: receipt
      };
    }
    case actionTypes.KILL_FINALIZE_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        killFinalizeButtonSpinning: receipt
      };
    }
    case actionTypes.UNLOCK_TOKENS_DATA_FETCHED: {
      const { receipt } = action.payload;
      return {
        ...state,
        unlockTokensData: receipt
      };
    }
    default:
      return state;
  }
};
