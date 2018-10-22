import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";

export function tokenBalanceReceived(receipt) {
  return {
    payload: { receipt },
    type: "TOKEN_BALANCE_RECEIVED",
  };
}

export function tokensUnderGovernanceReceived(receipt) {
  return {
    payload: { rec: receipt },
    type: "TOKENS_UNDER_GOVERNANCE_RECEIVED",
  };
}

export function killPollIndexReceived(receipt) {
  return {
    payload: { receipt },
    type: "KILL_POLL_INDEX_RECEIVED",
  };
}

export function remainingEtherBalanceReceived(receipt) {
  return {
    payload: { receipt },
    type: "REMAINING_ETHER_BALANCE_RECEIVED",
  };
}

export function totalSupplyReceived(receipt) {
  return {
    payload: { receipt },
    type: "TOTAL_SUPPLY_RECEIVED",
  };
}

export function killConsensusReceived(receipt) {
  return {
    payload: { receipt },
    type: "KILL_CONSENSUS_RECEIVED",
  };
}

export function tapConsensusReceived(receipt) {
  return {
    payload: { receipt },
    type: "TAP_CONSENSUS_RECEIVED",
  };
}

export function currentTapReceived(receipt) {
  return {
    payload: { receipt },
    type: "CURRENT_TAP_RECEIVED",
  };
}

export function xfrDataReceived(receipt) {
  return {
    payload: { receipt },
    type: "XFR_DATA_RECEIVED",
  };
}

export function killPollVote(receipt) {
  return {
    payload: { receipt },
    type: "KILL_POLL_VOTE_RECEIVED",
  };
}

export function votedInKillPoll(receipt) {
  return {
    payload: { receipt },
    type: "VOTED_KILL_POLL",
  };
}

export function revokedVoteInKillPoll(receipt) {
  return {
    payload: { receipt },
    type: "REVOKED_VOTE_KILL_POLL",
  };
}

export function tapPollVote(receipt) {
  return {
    payload: { receipt },
    type: "TAP_POLL_VOTE_RECEIVED",
  };
}

export function votedInTapPoll(receipt) {
  return {
    payload: { receipt },
    type: "VOTED_TAP_POLL",
  };
}

export function revokedVoteInTapPoll(receipt) {
  return {
    payload: { receipt },
    type: "REVOKED_VOTE_TAP_POLL",
  };
}

export function xfrPollVote1(receipt) {
  return {
    payload: { receipt },
    type: "XFR_POLL1_VOTE_RECEIVED",
  };
}

export function votedInXfrPoll1(receipt) {
  return {
    payload: { receipt },
    type: "VOTED_XFR_POLL1",
  };
}

export function revokedVoteInXfrPoll1(receipt) {
  return {
    payload: { receipt },
    type: "REVOKED_VOTE_XFR_POLL1",
  };
}

export function xfrPollVote2(receipt) {
  return {
    payload: { receipt },
    type: "XFR_POLL2_VOTE_RECEIVED",
  };
}

export function votedInXfrPoll2(receipt) {
  return {
    payload: { receipt },
    type: "VOTED_XFR_POLL2",
  };
}

export function revokedVoteInXfrPoll2(receipt) {
  return {
    payload: { receipt },
    type: "REVOKED_VOTE_XFR_POLL2",
  };
}

export function getTokenBalance(version, contractAddress) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    web3.eth.getAccounts().then(accounts =>
      axios
        .get(`${config.api_base_url}/web3/erc20token/tokenbalance`, {
          params: { version: version.toString(), network, address: contractAddress, useraddress: accounts[0] },
        })
        .then(async response => {
          const { data } = response.data;
          dispatch(tokenBalanceReceived(web3.utils.fromWei(data, "ether")));
        })
        .catch(err => console.error(err.message)),
    );
  };
}

export function getTokensUnderGovernance(version, contractAddress) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/web3/erc20token/tokensundergovernance`, {
        params: { version: version.toString(), network, address: contractAddress },
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
    // doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/web3/pollfactory/currentkillpollindex`, {
        params: { version: version.toString(), network, address: contractAddress },
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
    // doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/web3/pollfactory/remainingbalance`, {
        params: { version: version.toString(), network, address: contractAddress },
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
    // doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/web3/erc20token/totalsupply`, {
        params: { version: version.toString(), network, address: contractAddress },
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
    // doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/web3/pollfactory/killconsensus`, {
        params: { version: version.toString(), network, address: contractAddress },
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
    // doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/web3/pollfactory/tappollconsensus`, {
        params: { version: version.toString(), network, address: contractAddress },
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
    // doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/web3/pollfactory/currenttap`, {
        params: { version: version.toString(), network, address: contractAddress },
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
    // doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/web3/pollfactory/xfrpolldata`, {
        params: { version: version.toString(), network, address: contractAddress },
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(xfrDataReceived(data));
      })
      .catch(err => console.error(err.message));
  };
}

// returns a boolean.
export function getKillPollVote(version, contractAddress) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const accounts = await web3.eth.getAccounts();
    axios
      .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
      .then(res => {
        const { data } = res.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
        instance.methods
          .currentKillPoll()
          .call()
          .then(killPollAddress => {
            axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
              const { data } = ipollData.data || {};
              const { abi } = data || {};
              const ipollInstance = new web3.eth.Contract(abi, killPollAddress, { from: accounts[0] });
              ipollInstance.methods
                .voters(accounts[0])
                .call()
                .then(response => {
                  const { voted } = response;
                  dispatch(killPollVote(voted));
                });
            });
          });
      })
      .catch(err => console.error(err.message));
  };
}

// name: PollFactory, address: pollFactoryAddress
export function voteInKillPoll(version, contractAddress) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const accounts = await web3.eth.getAccounts();
    axios
      .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
      .then(res => {
        const { data } = res.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
        instance.methods
          .currentKillPoll()
          .call()
          .then(killPollAddress => {
            axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
              const { data } = ipollData.data || {};
              const { abi } = data || {};
              const ipollInstance = new web3.eth.Contract(abi, killPollAddress, { from: accounts[0] });
              ipollInstance.methods
                .vote(0)
                .send({ from: accounts[0] })
                .then(response => dispatch(votedInKillPoll(response)));
            });
          });
      })
      .catch(err => console.error(err.message));
  };
}

// name: PollFactory, address: pollFactoryAddress
export function revokeVoteInKillPoll(version, contractAddress) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const accounts = await web3.eth.getAccounts();
    axios
      .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
      .then(res => {
        const { data } = res.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
        instance.methods
          .currentKillPoll()
          .call()
          .then(killPollAddress => {
            axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
              const { data } = ipollData.data || {};
              const { abi } = data || {};
              const ipollInstance = new web3.eth.Contract(abi, killPollAddress, { from: accounts[0] });
              ipollInstance.methods
                .revokeVote()
                .send({ from: accounts[0] })
                .then(response => dispatch(revokedVoteInKillPoll(response)));
            });
          });
      })
      .catch(err => console.error(err.message));
  };
}

export function getTapPollVote(version, contractAddress) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const accounts = await web3.eth.getAccounts();
    axios
      .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
      .then(res => {
        const { data } = res.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
        instance.methods
          .tapPoll()
          .call()
          .then(tapPollAddress => {
            axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
              const { data } = ipollData.data || {};
              const { abi } = data || {};
              const ipollInstance = new web3.eth.Contract(abi, tapPollAddress, { from: accounts[0] });
              ipollInstance.methods
                .voters(accounts[0])
                .call()
                .then(response => {
                  const { voted } = response;
                  dispatch(tapPollVote(voted));
                });
            });
          });
      })
      .catch(err => console.error(err.message));
  };
}

// name: PollFactory, address: pollFactoryAddress returns boolean
export function voteInTapPoll(version, contractAddress) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const accounts = await web3.eth.getAccounts();
    axios
      .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
      .then(res => {
        const { data } = res.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
        instance.methods
          .tapPoll()
          .call()
          .then(tapPollAddress => {
            axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
              const { data } = ipollData.data || {};
              const { abi } = data || {};
              const ipollInstance = new web3.eth.Contract(abi, tapPollAddress, { from: accounts[0] });
              ipollInstance.methods
                .vote(0)
                .send({ from: accounts[0] })
                .then(response => dispatch(votedInTapPoll(response)));
            });
          });
      })
      .catch(err => console.error(err.message));
  };
}

// name: PollFactory, address: pollFactoryAddress
export function revokeVoteInTapPoll(version, contractAddress) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const accounts = await web3.eth.getAccounts();
    axios
      .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
      .then(res => {
        const { data } = res.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
        instance.methods
          .tapPoll()
          .call()
          .then(tapPollAddress => {
            axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
              const { data } = ipollData.data || {};
              const { abi } = data || {};
              const ipollInstance = new web3.eth.Contract(abi, tapPollAddress, { from: accounts[0] });
              ipollInstance.methods
                .revokeVote()
                .send({ from: accounts[0] })
                .then(response => dispatch(revokedVoteInTapPoll(response)));
            });
          });
      })
      .catch(err => console.error(err.message));
  };
}

export function getXfrPollVote(version, contractAddress, index) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const accounts = await web3.eth.getAccounts();
    axios
      .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
      .then(res => {
        const { data } = res.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
        instance.methods
          .xfrPollData(index)
          .call()
          .then(xfrPollDetails => {
            const { xfrPollAddress } = xfrPollDetails;
            axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
              const { data } = ipollData.data || {};
              const { abi } = data || {};
              const ipollInstance = new web3.eth.Contract(abi, xfrPollAddress, { from: accounts[0] });
              ipollInstance.methods
                .voters(accounts[0])
                .call()
                .then(response => {
                  const { voted } = response;
                  dispatch(index === 0 ? xfrPollVote1(voted) : xfrPollVote2(voted));
                });
            });
          });
      })
      .catch(err => console.error(err.message));
  };
}

// name: PollFactory, address: pollFactoryAddress returns boolean
export function voteInXfrPoll(version, contractAddress, index) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const accounts = await web3.eth.getAccounts();
    axios
      .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
      .then(res => {
        const { data } = res.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
        instance.methods
          .xfrPollData(index)
          .call()
          .then(xfrPollDetails => {
            const { xfrPollAddress } = xfrPollDetails;
            axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
              const { data } = ipollData.data || {};
              const { abi } = data || {};
              const ipollInstance = new web3.eth.Contract(abi, xfrPollAddress, { from: accounts[0] });
              ipollInstance.methods
                .vote(0)
                .send({ from: accounts[0] })
                .then(response => dispatch(index === 0 ? votedInXfrPoll1(response) : votedInXfrPoll2(response)));
            });
          });
      })
      .catch(err => console.error(err.message));
  };
}

// name: PollFactory, address: pollFactoryAddress
export function revokeVoteInXfrPoll(version, contractAddress, index) {
  return async dispatch => {
    // doesn't call blockchain. await is non blocking
    const accounts = await web3.eth.getAccounts();
    axios
      .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
      .then(res => {
        const { data } = res.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
        instance.methods
          .xfrPollData(index)
          .call()
          .then(xfrPollDetails => {
            const { xfrPollAddress } = xfrPollDetails;
            axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
              const { data } = ipollData.data || {};
              const { abi } = data || {};
              const ipollInstance = new web3.eth.Contract(abi, xfrPollAddress, { from: accounts[0] });
              ipollInstance.methods
                .revokeVote()
                .send({ from: accounts[0] })
                .then(response => dispatch(index === 0 ? revokedVoteInXfrPoll1(response) : revokedVoteInXfrPoll2(response)));
            });
          });
      })
      .catch(err => console.error(err.message));
  };
}
