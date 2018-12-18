import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";
import constants from "../../constants";
import { pollTxHash } from "../helperActions";

export const getVoteHistogramData = (projectid, network) => async dispatch => {
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  // await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/projectweb3/votehistogram`, {
      params: { network, projectid }
    })
    .then(response => {
      const { status, data: voteHistogramData } = response || {};
      const { data, message } = voteHistogramData || {};
      if (status === 200) {
        if (message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.VOTE_HISTOGRAM_DATA_SUCCESS,
            payload: data
          });
        } else {
          dispatch({
            type: actionTypes.VOTE_HISTOGRAM_DATA_FAILED,
            payload: constants.VOTE_HISTOGRAM_DATA_FAILED_MESSAGE
          });
        }
      } else {
        dispatch({
          type: actionTypes.VOTE_HISTOGRAM_DATA_FAILED,
          payload: constants.VOTE_HISTOGRAM_DATA_FAILED_MESSAGE
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: actionTypes.VOTE_HISTOGRAM_DATA_FAILED,
        payload: err.message
      });
    });
};

export const getSpendCurveData = (version, address, crowdsaleaddress, network) => dispatch => {
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  // await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/spendcurve`, {
      params: { address, network, version, crowdsaleaddress }
    })
    .then(response => {
      const { status, data: spendCurveData } = response || {};
      const { data, message } = spendCurveData || {};
      if (status === 200) {
        if (message === constants.SUCCESS) {
          dispatch({
            type: actionTypes.SPEND_CURVE_DATA_SUCCESS,
            payload: data
          });
        } else {
          dispatch({
            type: actionTypes.SPEND_CURVE_DATA_FAILED,
            payload: constants.SPEND_CURVE_DATA_FAILED_MESSAGE
          });
        }
      } else {
        dispatch({
          type: actionTypes.SPEND_CURVE_DATA_FAILED,
          payload: constants.SPEND_CURVE_DATA_FAILED_MESSAGE
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: actionTypes.SPEND_CURVE_DATA_FAILED,
        payload: err.message
      });
    });
};

export const tokensUnderGovernanceReceived = receipt => ({
  payload: { rec: receipt },
  type: actionTypes.TOKENS_UNDER_GOVERNANCE_RECEIVED
});

export const killPollIndexReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.KILL_POLL_INDEX_RECEIVED
});

export const remainingEtherBalanceReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.REMAINING_ETHER_BALANCE_RECEIVED
});

export const totalSupplyReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.TOTAL_SUPPLY_RECEIVED
});

export const killConsensusReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.KILL_CONSENSUS_RECEIVED
});

export const killVoterCountReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.KILL_VOTER_COUNT_RECEIVED
});

export const tapConsensusReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.TAP_CONSENSUS_RECEIVED
});

export const currentTapReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.CURRENT_TAP_RECEIVED
});

export const xfrDataReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.XFR_DATA_RECEIVED
});

export const killPollVote = receipt => ({
  payload: { receipt },
  type: actionTypes.KILL_POLL_VOTE_RECEIVED
});

export const isKillButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.KILL_BUTTON_SPINNING
});

export const tapPollVote = receipt => ({
  payload: { receipt },
  type: actionTypes.TAP_POLL_VOTE_RECEIVED
});

export const isTapButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.TAP_BUTTON_SPINNING
});

export const xfrPollVote = receipt => ({
  payload: { receipt },
  type: actionTypes.XFR_POLL_VOTE_RECEIVED
});

export const isXfr1ButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.XFR1_BUTTON_SPINNING
});

export const isXfr2ButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.XFR2_BUTTON_SPINNING
});

export const isKillFinalizeButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.KILL_FINALIZE_BUTTON_SPINNING
});

export const killPollsHistoryFetchSuccess = receipt => ({
  payload: { receipt },
  type: actionTypes.KILL_POLLS_HISTORY_SUCCESS
});

export const killPollsHistoryFetchFailed = () => ({
  payload: constants.KILL_POLLS_HISTORY_FAILED_MESSAGE,
  type: actionTypes.KILL_POLLS_HISTORY_FAILED
});

export const tapPollsHistoryFetchSuccess = receipt => ({
  payload: { receipt },
  type: actionTypes.TAP_POLLS_HISTORY_SUCCESS
});

export const tapPollsHistoryFetchFailed = () => ({
  payload: constants.TAP_POLLS_HISTORY_FAILED_MESSAGE,
  type: actionTypes.TAP_POLLS_HISTORY_FAILED
});

export const xfrPollsHistoryFetchSuccess = receipt => ({
  payload: { receipt },
  type: actionTypes.XFR_POLLS_HISTORY_SUCCESS
});

export const xfrPollsHistoryFetchFailed = () => ({
  payload: constants.XFR_POLLS_HISTORY_FAILED_MESSAGE,
  type: actionTypes.XFR_POLLS_HISTORY_FAILED
});

export const unlockTokensDataFetch = data => ({
  payload: { receipt: data },
  type: actionTypes.UNLOCK_TOKENS_DATA_FETCHED
});

export const isUnlockTokensButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.UNLOCK_TOKENS_BUTTON_SPINNING
});

export const unlockTokens = (data, version, userLocalPublicAddress, pollFactoryAddress, network) => async dispatch => {
  dispatch(isUnlockTokensButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(async ipollData => {
      const { data: pollData } = ipollData.data || {};
      const { abi } = pollData || {};
      const gasPrice = await web3.eth.getGasPrice();
      const promiseArray = [];
      for (let index = 0; index < data.length; index += 1) {
        const element = data[index];
        const ipollInstance = new web3.eth.Contract(abi, element.address, { from: userLocalPublicAddress });
        promiseArray.push(
          ipollInstance.methods.revokeVote().send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        );
      }
      Promise.all(promiseArray)
        .then(response => {
          console.log(response);
          dispatch(getUnlockTokensData(pollFactoryAddress, userLocalPublicAddress, network));
          dispatch(getKillPollVote(version, pollFactoryAddress, userLocalPublicAddress, network));
          dispatch(getKillConsensus(version, pollFactoryAddress, network));
          dispatch(getTapPollVote(version, pollFactoryAddress, userLocalPublicAddress, network));
          dispatch(getTapPollConsensus(version, pollFactoryAddress, network));
          dispatch(getXfrPollVote(version, pollFactoryAddress, userLocalPublicAddress, network));
          dispatch(getXfrData(version, pollFactoryAddress, network));
          dispatch(isUnlockTokensButtonSpinning(false));
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isUnlockTokensButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isKillButtonSpinning(false));
    });
};

export const getUnlockTokensData = (pollFactoryAddress, userLocalPublicAddress, network) => dispatch => {
  axios
    .get(`${config.api_base_url}/projectweb3/lockedtokens`, {
      params: { pollfactoryaddress: pollFactoryAddress, useraddress: userLocalPublicAddress, network }
    })
    .then(response => {
      const { status, data: pollHistory } = response || {};
      const { data } = pollHistory || {};
      if (status === 200) {
        dispatch(unlockTokensDataFetch(data));
      } else {
        dispatch(unlockTokensDataFetch({}));
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(unlockTokensDataFetch({}));
    });
};

export const getKillPollsHistory = (pollFactoryAddress, network) => async dispatch => {
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/db/projects/history/killpoll`, {
      params: { pollfactoryaddress: pollFactoryAddress, network }
    })
    .then(response => {
      const { status, data: killPollsHistorytData } = response || {};
      const { data, message } = killPollsHistorytData || {};
      if (status === 200) {
        if (message === constants.SUCCESS) {
          dispatch(killPollsHistoryFetchSuccess(data));
        } else {
          dispatch(killPollsHistoryFetchFailed());
        }
      } else {
        dispatch(killPollsHistoryFetchFailed());
      }
    })
    .catch(err => {
      dispatch(killPollsHistoryFetchFailed());
    });
};

export const getTapPollsHistory = (pollFactoryAddress, network) => async dispatch => {
  axios
    .get(`${config.api_base_url}/db/projects/history/tappoll`, {
      params: { pollfactoryaddress: pollFactoryAddress, network }
    })
    .then(response => {
      const { status, data: tapPollsHistorytData } = response || {};
      const { data, message } = tapPollsHistorytData || {};
      if (status === 200) {
        if (message === constants.SUCCESS) {
          dispatch(tapPollsHistoryFetchSuccess(data));
        } else {
          dispatch(tapPollsHistoryFetchFailed());
        }
      } else {
        dispatch(tapPollsHistoryFetchFailed());
      }
    })
    .catch(err => {
      dispatch(tapPollsHistoryFetchFailed());
    });
};

export const getXfrPollsHistory = (pollFactoryAddress, network) => async dispatch => {
  axios
    .get(`${config.api_base_url}/db/projects/history/xfrpoll`, {
      params: { pollfactoryaddress: pollFactoryAddress, network }
    })
    .then(response => {
      const { status, data: xfrPollsHistorytData } = response || {};
      const { data, message } = xfrPollsHistorytData || {};
      if (status === 200) {
        if (message === constants.SUCCESS) {
          dispatch(xfrPollsHistoryFetchSuccess(data));
        } else {
          dispatch(xfrPollsHistoryFetchFailed());
        }
      } else {
        dispatch(xfrPollsHistoryFetchFailed());
      }
    })
    .catch(err => {
      dispatch(xfrPollsHistoryFetchFailed());
    });
};

export const getTokensUnderGovernance = (version, contractAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/erc20token/tokensundergovernance`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(tokensUnderGovernanceReceived(data));
      } else {
        dispatch(tokensUnderGovernanceReceived("0"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(tokensUnderGovernanceReceived("0"));
    });
};

export const getCurrentKillPollIndex = (version, contractAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/currentkillpollindex`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(killPollIndexReceived(data));
      } else {
        dispatch(killPollIndexReceived(0));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(killPollIndexReceived(0));
    });
};

export const getRemainingEtherBalance = (version, contractAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/remainingbalance`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(remainingEtherBalanceReceived(data));
      } else {
        dispatch(remainingEtherBalanceReceived("0"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(remainingEtherBalanceReceived("0"));
    });
};

export const getTotalSupply = (version, contractAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/erc20token/totalsupply`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(totalSupplyReceived(data));
      } else {
        dispatch(totalSupplyReceived("0"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(totalSupplyReceived("0"));
    });
};

export const getKillConsensus = (version, contractAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/killconsensus`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(killConsensusReceived(data));
      } else {
        dispatch(killConsensusReceived("0"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(killConsensusReceived("0"));
    });
};

export const getKillVoterCount = (version, contractAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/killvotecount`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(killVoterCountReceived(data));
      } else {
        dispatch(killVoterCountReceived("0"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(killVoterCountReceived("0"));
    });
};

export const getTapPollConsensus = (version, contractAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/tappollconsensus`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(tapConsensusReceived(data));
      } else {
        dispatch(tapConsensusReceived("0"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(tapConsensusReceived("0"));
    });
};

export const getCurrentTap = (version, contractAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/currenttap`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(currentTapReceived(data));
      } else {
        dispatch(currentTapReceived("0"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(currentTapReceived("0"));
    });
};

export const getXfrData = (version, contractAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/xfrpolldata`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(xfrDataReceived(data));
      } else {
        dispatch(xfrDataReceived({}));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(xfrDataReceived({}));
    });
};

// returns a boolean.
export const getKillPollVote = (version, contractAddress, userLocalPublicAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/killpollvote`, {
      params: { version: version.toString(), network, address: contractAddress, useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(killPollVote(data));
      } else {
        dispatch(killPollVote("false"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(killPollVote("false"));
    });
};

// name: PollFactory, address: pollFactoryAddress
export const voteInKillPoll = (version, contractAddress, userLocalPublicAddress, pollFactoryAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isKillButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(async ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      ipollInstance.methods
        .vote(0)
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isKillButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.KILL_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getKillPollVote(version, pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getUnlockTokensData(pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getKillConsensus(version, pollFactoryAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.KILL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isKillButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.KILL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isKillButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.KILL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isKillButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isKillButtonSpinning(false));
    });
};
// .on("receipt", receipt => {
//   dispatch(getKillPollVote(version, pollFactoryAddress, userLocalPublicAddress));
//   dispatch(getKillConsensus(version, pollFactoryAddress));
//   dispatch(isKillButtonSpinning(false));
// })
// name: PollFactory, address: pollFactoryAddress
export const revokeVoteInKillPoll = (version, contractAddress, userLocalPublicAddress, pollFactoryAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isKillButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(async ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      ipollInstance.methods
        .revokeVote()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isKillButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.KILL_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getKillPollVote(version, pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getUnlockTokensData(pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getKillConsensus(version, pollFactoryAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.KILL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isKillButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.KILL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isKillButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.KILL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isKillButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isKillButtonSpinning(false));
    });
};

export const getTapPollVote = (version, contractAddress, userLocalPublicAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/tappollvote`, {
      params: { version: version.toString(), network, address: contractAddress, useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(tapPollVote(data));
      } else {
        dispatch(tapPollVote("false"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(tapPollVote("false"));
    });
};

// name: PollFactory, address: pollFactoryAddress returns boolean
export const voteInTapPoll = (version, contractAddress, userLocalPublicAddress, pollFactoryAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isTapButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(async ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      ipollInstance.methods
        .vote(0)
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isTapButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.TAP_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getTapPollVote(version, pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getUnlockTokensData(pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getTapPollConsensus(version, pollFactoryAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.TAP_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isTapButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.TAP_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isTapButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.TAP_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isTapButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isTapButtonSpinning(false));
    });
};

// name: PollFactory, address: pollFactoryAddress
export const revokeVoteInTapPoll = (version, contractAddress, userLocalPublicAddress, pollFactoryAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isTapButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(async ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      ipollInstance.methods
        .revokeVote()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isTapButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.TAP_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getTapPollVote(version, pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getUnlockTokensData(pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getTapPollConsensus(version, pollFactoryAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.TAP_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isTapButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.TAP_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isTapButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.TAP_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isTapButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isTapButtonSpinning(false));
    });
};

export const getXfrPollVote = (version, contractAddress, userLocalPublicAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  // const network = "rinkeby";
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/xfrpollvote`, {
      params: { version: version.toString(), network, address: contractAddress, useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(xfrPollVote(data));
      } else {
        dispatch(xfrPollVote("false"));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(xfrPollVote("false"));
    });
};

// name: PollFactory, address: pollFactoryAddress returns boolean
export const voteInXfr1Poll = (version, contractAddress, userLocalPublicAddress, pollFactoryAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isXfr1ButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(async ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      ipollInstance.methods
        .vote(0)
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isXfr1ButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.XFR1_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getXfrPollVote(version, pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getUnlockTokensData(pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getXfrData(version, pollFactoryAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR1_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isXfr1ButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR1_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isXfr1ButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR1_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isXfr1ButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isXfr1ButtonSpinning(false));
    });
};

// .on("receipt", receipt => {
//   dispatch(getXfrPollVote(version, pollFactoryAddress, userLocalPublicAddress));
//   dispatch(getXfrData(version, pollFactoryAddress));
//   dispatch(isXfr1ButtonSpinning(false));
// })

export const voteInXfr2Poll = (version, contractAddress, userLocalPublicAddress, pollFactoryAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isXfr2ButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(async ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      ipollInstance.methods
        .vote(0)
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isXfr2ButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.XFR2_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getXfrPollVote(version, pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getUnlockTokensData(pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getXfrData(version, pollFactoryAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR2_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isXfr2ButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR2_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isXfr2ButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR2_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isXfr2ButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isXfr2ButtonSpinning(false));
    });
};

// name: PollFactory, address: pollFactoryAddress returns boolean
export const revokeVoteInXfr1Poll = (version, contractAddress, userLocalPublicAddress, pollFactoryAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isXfr1ButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(async ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      ipollInstance.methods
        .revokeVote()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isXfr1ButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.XFR1_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getXfrPollVote(version, pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getUnlockTokensData(pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getXfrData(version, pollFactoryAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR1_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isXfr1ButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR1_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isXfr1ButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR1_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isXfr1ButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isXfr1ButtonSpinning(false));
    });
};

export const revokeVoteInXfr2Poll = (version, contractAddress, userLocalPublicAddress, pollFactoryAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isXfr2ButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(async ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      ipollInstance.methods
        .revokeVote()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isXfr2ButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.XFR2_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getXfrPollVote(version, pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getUnlockTokensData(pollFactoryAddress, userLocalPublicAddress, network));
                dispatch(getXfrData(version, pollFactoryAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR2_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isXfr2ButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR2_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isXfr2ButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.XFR2_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isXfr2ButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isXfr2ButtonSpinning(false));
    });
};

export const finalizeKill = (version, pollFactoryAddress, userLocalPublicAddress, network) => dispatch => {
  dispatch(isKillFinalizeButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(async ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, pollFactoryAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      ipollInstance.methods
        .executeKill()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isKillFinalizeButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.KILL_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getCurrentKillPollIndex(version, pollFactoryAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.KILL_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isKillFinalizeButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.KILL_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isKillFinalizeButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.KILL_FINALIZE_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isKillFinalizeButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isKillFinalizeButtonSpinning(false));
    });
};
