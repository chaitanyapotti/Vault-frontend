import axios from "axios";
import config from "../../config";
import actionTypes from "../../action_types";
import web3 from "../../helpers/web3";

export const clearGovernanceStates = () => dispatch => {
  dispatch({
    type: actionTypes.CLEAR_GOVERNANCE_STATES,
    payload: null
  });
};

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

export const currentRound = (projectid, history = null) => async dispatch => {
  const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
  axios
    .get(`${config.api_base_url}/db/projects`, { params: { projectid, network: localNetwork } })
    .then(async response => {
      const { status, data: projectData } = response || {};
      if (status === 200) {
        const { data } = projectData || {};
        if (data === null && history !== null) history.push("/");
        const { version, crowdSaleAddress, pollFactoryAddress, network } = data || {};
        dispatch(projectDetailsFetched(data));
        // const network = "rinkeby";
        // const network = await web3.eth.net.getNetworkType();
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
              dispatch(currentRoundFetchSuccess(""));
            }
          })
          .catch(err => {
            console.log(err.message);
            dispatch(currentRoundFetchSuccess(""));
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
              dispatch(treasuryStateFetchSuccess(""));
            }
          })
          .catch(err => {
            dispatch(treasuryStateFetchSuccess(""));
            console.log(err.message);
          });
      } else {
        dispatch(projectDetailsFetched({}));
      }
    })
    .catch(err => {
      dispatch(projectDetailsFetched({}));
      console.log(err);
    });
};
