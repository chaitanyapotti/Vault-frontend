import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";

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
  type: "REMAINING_ETHER_BALANCE_RECEIVED"
});

export const totalSupplyReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.TOTAL_SUPPLY_RECEIVED
});

export const killConsensusReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.KILL_CONSENSUS_RECEIVED
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

export const votedInKillPoll = receipt => ({
  payload: { receipt },
  type: "VOTED_KILL_POLL"
});

export const revokedVoteInKillPoll = receipt => ({
  payload: { receipt },
  type: "REVOKED_VOTE_KILL_POLL"
});

export const tapPollVote = receipt => ({
  payload: { receipt },
  type: "TAP_POLL_VOTE_RECEIVED"
});

export const votedInTapPoll = receipt => ({
  payload: { receipt },
  type: "VOTED_TAP_POLL"
});

export const revokedVoteInTapPoll = receipt => ({
  payload: { receipt },
  type: "REVOKED_VOTE_TAP_POLL"
});

export const xfrPollVote1 = receipt => ({
  payload: { receipt },
  type: "XFR_POLL1_VOTE_RECEIVED"
});

export const votedInXfrPoll1 = receipt => ({
  payload: { receipt },
  type: "VOTED_XFR_POLL1"
});

export const revokedVoteInXfrPoll1 = receipt => ({
  payload: { receipt },
  type: "REVOKED_VOTE_XFR_POLL1"
});

export const xfrPollVote2 = receipt => ({
  payload: { receipt },
  type: "XFR_POLL2_VOTE_RECEIVED"
});

export const votedInXfrPoll2 = receipt => ({
  payload: { receipt },
  type: "VOTED_XFR_POLL2"
});

export const revokedVoteInXfrPoll2 = receipt => ({
  payload: { receipt },
  type: "REVOKED_VOTE_XFR_POLL2"
});

export const getTokensUnderGovernance = (version, contractAddress) => async dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
  axios
    .get(`${config.api_base_url}/web3/erc20token/tokensundergovernance`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(async response => {
      const { data } = response.data;
      dispatch(tokensUnderGovernanceReceived(web3.utils.fromWei(data, "ether")));
    })
    .catch(err => console.error(err.message));
};

export const getCurrentKillPollIndex = (version, contractAddress) => async dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
  axios
    .get(`${config.api_base_url}/web3/pollfactory/currentkillpollindex`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(async response => {
      const { data } = response.data;
      dispatch(killPollIndexReceived(data));
    })
    .catch(err => console.error(err.message));
};

export const getRemainingEtherBalance = (version, contractAddress) => async dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
  axios
    .get(`${config.api_base_url}/web3/pollfactory/remainingbalance`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(async response => {
      const { data } = response.data;
      dispatch(remainingEtherBalanceReceived(data));
    })
    .catch(err => console.error(err.message));
};

export const getTotalSupply = (version, contractAddress) => async dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
  axios
    .get(`${config.api_base_url}/web3/erc20token/totalsupply`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(async response => {
      const { data } = response.data;
      dispatch(totalSupplyReceived(data));
    })
    .catch(err => console.error(err.message));
};

export const getKillConsensus = (version, contractAddress) => async dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
  axios
    .get(`${config.api_base_url}/web3/pollfactory/killconsensus`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(async response => {
      const { data } = response.data;
      dispatch(killConsensusReceived(data));
    })
    .catch(err => console.error(err.message));
};

export const getTapPollConsensus = (version, contractAddress) => async dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
  axios
    .get(`${config.api_base_url}/web3/pollfactory/tappollconsensus`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(async response => {
      const { data } = response.data;
      dispatch(tapConsensusReceived(data));
    })
    .catch(err => console.error(err.message));
};

export const getCurrentTap = (version, contractAddress) => async dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
  axios
    .get(`${config.api_base_url}/web3/pollfactory/currenttap`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(async response => {
      const { data } = response.data;
      dispatch(currentTapReceived(data));
    })
    .catch(err => console.error(err.message));
};

export const getXfrData = (version, contractAddress) => async dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
  axios
    .get(`${config.api_base_url}/web3/pollfactory/xfrpolldata`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(async response => {
      const { data } = response.data;
      dispatch(xfrDataReceived(data));
    })
    .catch(err => console.error(err.message));
};

// // returns a boolean.
// export function getKillPollVote(version, contractAddress) {
//   return async dispatch => {
//     // doesn't call blockchain. await is non blocking
//     const accounts = await web3.eth.getAccounts();
//     axios
//       .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
//       .then(res => {
//         const { data } = res.data || {};
//         const { abi } = data || {};
//         const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
//         instance.methods
//           .currentKillPoll()
//           .call()
//           .then(killPollAddress => {
//             axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
//               const { data } = ipollData.data || {};
//               const { abi } = data || {};
//               const ipollInstance = new web3.eth.Contract(abi, killPollAddress, { from: accounts[0] });
//               ipollInstance.methods
//                 .voters(accounts[0])
//                 .call()
//                 .then(response => {
//                   const { voted } = response;
//                   dispatch(killPollVote(voted));
//                 });
//             });
//           });
//       })
//       .catch(err => console.error(err.message));
//   };
// }

// // name: PollFactory, address: pollFactoryAddress
// export function voteInKillPoll(version, contractAddress) {
//   return async dispatch => {
//     // doesn't call blockchain. await is non blocking
//     const accounts = await web3.eth.getAccounts();
//     axios
//       .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
//       .then(res => {
//         const { data } = res.data || {};
//         const { abi } = data || {};
//         const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
//         instance.methods
//           .currentKillPoll()
//           .call()
//           .then(killPollAddress => {
//             axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
//               const { data } = ipollData.data || {};
//               const { abi } = data || {};
//               const ipollInstance = new web3.eth.Contract(abi, killPollAddress, { from: accounts[0] });
//               ipollInstance.methods
//                 .vote(0)
//                 .send({ from: accounts[0] })
//                 .then(response => dispatch(votedInKillPoll(response)));
//             });
//           });
//       })
//       .catch(err => console.error(err.message));
//   };
// }

// // name: PollFactory, address: pollFactoryAddress
// export function revokeVoteInKillPoll(version, contractAddress) {
//   return async dispatch => {
//     // doesn't call blockchain. await is non blocking
//     const accounts = await web3.eth.getAccounts();
//     axios
//       .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
//       .then(res => {
//         const { data } = res.data || {};
//         const { abi } = data || {};
//         const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
//         instance.methods
//           .currentKillPoll()
//           .call()
//           .then(killPollAddress => {
//             axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
//               const { data } = ipollData.data || {};
//               const { abi } = data || {};
//               const ipollInstance = new web3.eth.Contract(abi, killPollAddress, { from: accounts[0] });
//               ipollInstance.methods
//                 .revokeVote()
//                 .send({ from: accounts[0] })
//                 .then(response => dispatch(revokedVoteInKillPoll(response)));
//             });
//           });
//       })
//       .catch(err => console.error(err.message));
//   };
// }

// export function getTapPollVote(version, contractAddress) {
//   return async dispatch => {
//     // doesn't call blockchain. await is non blocking
//     const accounts = await web3.eth.getAccounts();
//     axios
//       .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
//       .then(res => {
//         const { data } = res.data || {};
//         const { abi } = data || {};
//         const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
//         instance.methods
//           .tapPoll()
//           .call()
//           .then(tapPollAddress => {
//             axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
//               const { data } = ipollData.data || {};
//               const { abi } = data || {};
//               const ipollInstance = new web3.eth.Contract(abi, tapPollAddress, { from: accounts[0] });
//               ipollInstance.methods
//                 .voters(accounts[0])
//                 .call()
//                 .then(response => {
//                   const { voted } = response;
//                   dispatch(tapPollVote(voted));
//                 });
//             });
//           });
//       })
//       .catch(err => console.error(err.message));
//   };
// }

// // name: PollFactory, address: pollFactoryAddress returns boolean
// export function voteInTapPoll(version, contractAddress) {
//   return async dispatch => {
//     // doesn't call blockchain. await is non blocking
//     const accounts = await web3.eth.getAccounts();
//     axios
//       .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
//       .then(res => {
//         const { data } = res.data || {};
//         const { abi } = data || {};
//         const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
//         instance.methods
//           .tapPoll()
//           .call()
//           .then(tapPollAddress => {
//             axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
//               const { data } = ipollData.data || {};
//               const { abi } = data || {};
//               const ipollInstance = new web3.eth.Contract(abi, tapPollAddress, { from: accounts[0] });
//               ipollInstance.methods
//                 .vote(0)
//                 .send({ from: accounts[0] })
//                 .then(response => dispatch(votedInTapPoll(response)));
//             });
//           });
//       })
//       .catch(err => console.error(err.message));
//   };
// }

// // name: PollFactory, address: pollFactoryAddress
// export function revokeVoteInTapPoll(version, contractAddress) {
//   return async dispatch => {
//     // doesn't call blockchain. await is non blocking
//     const accounts = await web3.eth.getAccounts();
//     axios
//       .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
//       .then(res => {
//         const { data } = res.data || {};
//         const { abi } = data || {};
//         const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
//         instance.methods
//           .tapPoll()
//           .call()
//           .then(tapPollAddress => {
//             axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
//               const { data } = ipollData.data || {};
//               const { abi } = data || {};
//               const ipollInstance = new web3.eth.Contract(abi, tapPollAddress, { from: accounts[0] });
//               ipollInstance.methods
//                 .revokeVote()
//                 .send({ from: accounts[0] })
//                 .then(response => dispatch(revokedVoteInTapPoll(response)));
//             });
//           });
//       })
//       .catch(err => console.error(err.message));
//   };
// }

// export function getXfrPollVote(version, contractAddress, index) {
//   return async dispatch => {
//     // doesn't call blockchain. await is non blocking
//     const accounts = await web3.eth.getAccounts();
//     axios
//       .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
//       .then(res => {
//         const { data } = res.data || {};
//         const { abi } = data || {};
//         const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
//         instance.methods
//           .xfrPollData(index)
//           .call()
//           .then(xfrPollDetails => {
//             const { xfrPollAddress } = xfrPollDetails;
//             axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
//               const { data } = ipollData.data || {};
//               const { abi } = data || {};
//               const ipollInstance = new web3.eth.Contract(abi, xfrPollAddress, { from: accounts[0] });
//               ipollInstance.methods
//                 .voters(accounts[0])
//                 .call()
//                 .then(response => {
//                   const { voted } = response;
//                   dispatch(index === 0 ? xfrPollVote1(voted) : xfrPollVote2(voted));
//                 });
//             });
//           });
//       })
//       .catch(err => console.error(err.message));
//   };
// }

// // name: PollFactory, address: pollFactoryAddress returns boolean
// export function voteInXfrPoll(version, contractAddress, index) {
//   return async dispatch => {
//     // doesn't call blockchain. await is non blocking
//     const accounts = await web3.eth.getAccounts();
//     axios
//       .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
//       .then(res => {
//         const { data } = res.data || {};
//         const { abi } = data || {};
//         const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
//         instance.methods
//           .xfrPollData(index)
//           .call()
//           .then(xfrPollDetails => {
//             const { xfrPollAddress } = xfrPollDetails;
//             axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
//               const { data } = ipollData.data || {};
//               const { abi } = data || {};
//               const ipollInstance = new web3.eth.Contract(abi, xfrPollAddress, { from: accounts[0] });
//               ipollInstance.methods
//                 .vote(0)
//                 .send({ from: accounts[0] })
//                 .then(response => dispatch(index === 0 ? votedInXfrPoll1(response) : votedInXfrPoll2(response)));
//             });
//           });
//       })
//       .catch(err => console.error(err.message));
//   };
// }

// // name: PollFactory, address: pollFactoryAddress
// export function revokeVoteInXfrPoll(version, contractAddress, index) {
//   return async dispatch => {
//     // doesn't call blockchain. await is non blocking
//     const accounts = await web3.eth.getAccounts();
//     axios
//       .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
//       .then(res => {
//         const { data } = res.data || {};
//         const { abi } = data || {};
//         const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
//         instance.methods
//           .xfrPollData(index)
//           .call()
//           .then(xfrPollDetails => {
//             const { xfrPollAddress } = xfrPollDetails;
//             axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } }).then(ipollData => {
//               const { data } = ipollData.data || {};
//               const { abi } = data || {};
//               const ipollInstance = new web3.eth.Contract(abi, xfrPollAddress, { from: accounts[0] });
//               ipollInstance.methods
//                 .revokeVote()
//                 .send({ from: accounts[0] })
//                 .then(response => dispatch(index === 0 ? revokedVoteInXfrPoll1(response) : revokedVoteInXfrPoll2(response)));
//             });
//           });
//       })
//       .catch(err => console.error(err.message));
//   };
// }
