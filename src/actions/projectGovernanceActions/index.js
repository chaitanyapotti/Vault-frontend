import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";
import constants from "../../constants";

export const clearGovernanceStates = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_GOVERNANCE_STATES,
      payload: null
    })
  }
}

export const currentRoundFetchSuccess = receipt => ({
  payload: { receipt },
  type: actionTypes.CURRENT_ROUND_FETCHED
});

export const projectDetailsFetched = data => ({
  payload: { data },
  type: actionTypes.PROJECT_DETAILS_FETCHED
});

export const treasuryStateFetchSuccess = receipt => ({
  payload: { receipt },
  type: actionTypes.TREASURY_STATE_FETCHED
});

// export const killPollsHistoryFetchSuccess = receipt => ({
//   payload: { receipt },
//   type: actionTypes.KILL_POLLS_HISTORY_SUCCESS
// });

// export const killPollsHistoryFetchFailed = () => ({
//   payload: constants.KILL_POLLS_HISTORY_FAILED_MESSAGE,
//   type: actionTypes.KILL_POLLS_HISTORY_FAILED
// });

// export const getKillPollsHistory = projectid => async dispatch => {
//   const network = "rinkeby";
//   // await web3.eth.net.getNetworkType();
//   axios
//     .get(`${config.api_base_url}/projectweb3/xfrPollHistory`, {
//       params: { projectid, network }
//     })
//     .then(response => {
//       const { status, data: killPollsHistorytData } = response || {};
//       const { data, message } = killPollsHistorytData || {};
//       if (status === 200) {
//         if (message === constants.SUCCESS) {
//           dispatch(killPollsHistoryFetchSuccess(data));
//         } else {
//           dispatch(killPollsHistoryFetchFailed());
//         }
//       } else {
//         dispatch(killPollsHistoryFetchFailed());
//       }
//     })
//     .catch(err => {
//       dispatch(killPollsHistoryFetchFailed());
//     });
// };

export const currentRound = projectid => async dispatch => {
  axios
    .get(`${config.api_base_url}/db/projects`, { params: { projectid } })
    .then(async response => {
      const { status, data: projectData } = response || {};
      if (status === 200) {
        const { data } = projectData || {};
        const { version, crowdSaleAddress, pollFactoryAddress } = data || {};
        dispatch(projectDetailsFetched(data));
        const network = "rinkeby";
        axios
          .get(`${config.api_base_url}/web3/crowdsale/currentround`, {
            params: { version: version.toString(), network, address: crowdSaleAddress }
          })
          .then(roundInfo => {
            const { data: currentRoundData } = roundInfo || {};
            if (response.status === 200) {
              const { data: currentRoundInfo } = currentRoundData;
              dispatch(currentRoundFetchSuccess(currentRoundInfo));
            } else {
              dispatch(currentRoundFetchSuccess({}));
            }
          })
          .catch(err => {
            console.log(err.message);
            dispatch(currentRoundFetchSuccess({}));
          });
        axios
          .get(`${config.api_base_url}/web3/pollfactory/state`, {
            params: { version: version.toString(), network, address: pollFactoryAddress }
          })
          .then(stateResponse => {
            const { data: currentRoundData } = stateResponse || {};
            if (response.status === 200) {
              const { data: treasuryRound } = currentRoundData;
              dispatch(treasuryStateFetchSuccess(treasuryRound));
            } else {
              dispatch(treasuryStateFetchSuccess({}));
            }
          })
          .catch(err => {
            dispatch(treasuryStateFetchSuccess({}));
            console.log(err.message);
          });
      } else {
        dispatch(projectDetailsFetched({}));
      }
    })
    .catch(err => {
      dispatch(projectDetailsFetched({}));
      console.log(err.message);
    });
};
