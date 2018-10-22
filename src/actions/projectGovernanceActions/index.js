import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";

export function currentRoundFetchSuccess(receipt) {
  return {
    payload: { receipt },
    type: "CURRENT_ROUND_FETCHED",
  };
}

export function projectDetailsFetched(data) {
  return {
    payload: { data },
    type: "PROJECT_DETAILS_FETCHED",
  };
}

export function treasuryStateFetchSuccess(data) {
  return {
    payload: { data },
    type: "TREASURY_STATE_FETCHED",
  };
}

export function currentRound(projectid) {
  return async dispatch => {
    axios
      .get(`${config.api_base_url}/db/projects`, { params: { projectid } })
      .then(async response => {
        const { status, data: projectData } = response || {};
        if (status === 200) {
          const { data } = projectData || {};
          const { version, crowdSaleAddress } = data || {};
          dispatch(projectDetailsFetched(data));
          const network = await web3.eth.net.getNetworkType();
          web3.eth.getAccounts().then(accounts => {
            axios
              .get(`${config.api_base_url}/web3/crowdsale/currentround`, {
                params: { version: version.toString(), network, address: crowdSaleAddress, useraddress: accounts[0] },
              })
              .then(response => {
                const { data: currentRoundData } = response || {};
                if (response.status === 200) {
                  const { data } = currentRoundData;
                  dispatch(currentRoundFetchSuccess(data));
                }
              })
              .catch(err => console.log(err.message));
            axios
              .get(`${config.api_base_url}/web3/pollfactory/state`, {
                params: { version: version.toString(), network, address: crowdSaleAddress },
              })
              .then(response => {
                const { data: currentRoundData } = response || {};
                if (response.status === 200) {
                  const { data } = currentRoundData;
                  dispatch(treasuryStateFetchSuccess(data));
                }
              })
              .catch(err => console.log(err.message));
          });
        }
      })
      .catch(err => console.log(err.message));
  };
}

export function treasuryState(crowdSaleAddress) {
  return async dispatch => {
    const network = await web3.eth.net.getNetworkType();
  };
}
