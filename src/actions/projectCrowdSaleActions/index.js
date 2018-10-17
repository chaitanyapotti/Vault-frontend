import axios from 'axios';
import config from '../../config';
import web3 from '../../helpers/web3';

export function etherCollected(receipt) {
  return {
    payload: { receipt },
    type: 'ETHER_COLLECTED',
  };
}

export function roundInfoReceived(data) {
  return {
    payload: { rec: data },
    type: 'ROUND_INFO_RECEIVED',
  };
}

export function getEtherCollected(version, contractAddress) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/web3/pollfactory/totaletherraised`, {
        params: { version: version.toString(), network, address: contractAddress },
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(etherCollected(web3.utils.fromWei(data, 'ether')));
      })
      .catch(err => console.error(err.message));
  };
}

export function getRoundTokensSold(version, contractAddress, round) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/web3/crowdsale/round/details`, {
        params: { version: version.toString(), network, address: contractAddress, round },
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(roundInfoReceived(data));
      })
      .catch(err => console.error(err.message));
  };
}

export function buyTokens(contractAddress) {
  return dispatch => {
    web3.eth.getAccounts().then(accounts =>
      web3.eth
        .sendTransaction({
          from: accounts[0],
          to: contractAddress,
          value: web3.utils.toWei('1', 'ether'),
        })
        .then(response => console.log(response)),
    );
  };
}
