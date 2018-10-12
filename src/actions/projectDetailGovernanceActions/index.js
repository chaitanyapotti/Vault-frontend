import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";

export function tokenBalanceReceived(receipt) {
  return {
    payload: { receipt: receipt },
    type: "TOKEN_BALANCE_RECEIVED"
  };
}

export function tokensUnderGovernanceReceived(receipt) {
  return {
    payload: { rec: receipt },
    type: "TOKENS_UNDER_GOVERNANCE_RECEIVED"
  };
}

export function killPollIndexReceived(receipt) {
  return {
    payload: { receipt: receipt },
    type: "KILL_POLL_INDEX_RECEIVED"
  };
}

export function remainingEtherBalanceReceived(receipt) {
  return {
    payload: { receipt: receipt },
    type: "REMAINING_ETHER_BALANCE_RECEIVED"
  };
}

export function totalSupplyReceived(receipt) {
  return {
    payload: { receipt: receipt },
    type: "TOTAL_SUPPLY_RECEIVED"
  };
}

export function killConsensusReceived(receipt) {
  return {
    payload: { receipt: receipt },
    type: "KILL_CONSENSUS_RECEIVED"
  };
}

export function tapConsensusReceived(receipt) {
  return {
    payload: { receipt: receipt },
    type: "TAP_CONSENSUS_RECEIVED"
  };
}

export function currentTapReceived(receipt) {
  return {
    payload: { receipt: receipt },
    type: "CURRENT_TAP_RECEIVED"
  };
}

export function xfrDataReceived(receipt) {
  return {
    payload: { receipt: receipt },
    type: "XFR_DATA_RECEIVED"
  };
}

export function getTokenBalance(version, contractAddress) {
  return async dispatch => {
    //doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    web3.eth.getAccounts().then(accounts =>
      axios
        .get(config.api_base_url + "/web3/erc20token/tokenbalance", {
          params: { version: version.toString(), network: network, address: contractAddress, useraddress: accounts[0] }
        })
        .then(async response => {
          const { data } = response.data;
          dispatch(tokenBalanceReceived(web3.utils.fromWei(data, "ether")));
        })
        .catch(err => console.error(err.message))
    );
  };
}

export function getTokensUnderGovernance(version, contractAddress) {
  return async dispatch => {
    //doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(config.api_base_url + "/web3/erc20token/tokensundergovernance", {
        params: { version: version.toString(), network: network, address: contractAddress }
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(tokenBalanceReceived(web3.utils.fromWei(data, "ether")));
      })
      .catch(err => console.error(err.message));
  };
}

export function getCurrentKillPollIndex(version, contractAddress) {
  return async dispatch => {
    //doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(config.api_base_url + "/web3/pollfactory/currentkillpollindex", {
        params: { version: version.toString(), network: network, address: contractAddress }
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(killPollIndexReceived(data));
      })
      .catch(err => console.error(err.message));
  };
}

export function getRemainingEtherBalance(version, contractAddress) {
  return async dispatch => {
    //doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(config.api_base_url + "/web3/pollfactory/remainingbalance", {
        params: { version: version.toString(), network: network, address: contractAddress }
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(remainingEtherBalanceReceived(data));
      })
      .catch(err => console.error(err.message));
  };
}

export function getTotalSupply(version, contractAddress) {
  return async dispatch => {
    //doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(config.api_base_url + "/web3/erc20token/totalsupply", {
        params: { version: version.toString(), network: network, address: contractAddress }
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(totalSupplyReceived(data));
      })
      .catch(err => console.error(err.message));
  };
}

export function getKillConsensus(version, contractAddress) {
  return async dispatch => {
    //doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(config.api_base_url + "/web3/pollfactory/killconsensus", {
        params: { version: version.toString(), network: network, address: contractAddress }
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(killConsensusReceived(data));
      })
      .catch(err => console.error(err.message));
  };
}

export function getTapPollConsensus(version, contractAddress) {
  return async dispatch => {
    //doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(config.api_base_url + "/web3/pollfactory/tappollconsensus", {
        params: { version: version.toString(), network: network, address: contractAddress }
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(tapConsensusReceived(data));
      })
      .catch(err => console.error(err.message));
  };
}

export function getCurrentTap(version, contractAddress) {
  return async dispatch => {
    //doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(config.api_base_url + "/web3/pollfactory/currenttap", {
        params: { version: version.toString(), network: network, address: contractAddress }
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(currentTapReceived(data));
      })
      .catch(err => console.error(err.message));
  };
}

export function getXfrData(version, contractAddress) {
  return async dispatch => {
    //doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(config.api_base_url + "/web3/pollfactory/xfrpolldata", {
        params: { version: version.toString(), network: network, address: contractAddress }
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(xfrDataReceived(data));
      })
      .catch(err => console.error(err.message));
  };
}
