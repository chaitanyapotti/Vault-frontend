import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";

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
