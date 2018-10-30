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

export const isTapButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.TAP_BUTTON_SPINNING
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

export const getTokensUnderGovernance = (version, contractAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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

export const getCurrentKillPollIndex = (version, contractAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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

export const getRemainingEtherBalance = (version, contractAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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

export const getTotalSupply = (version, contractAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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

export const getKillConsensus = (version, contractAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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

export const getTapPollConsensus = (version, contractAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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

export const getCurrentTap = (version, contractAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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

export const getXfrData = (version, contractAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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
export const getKillPollVote = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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
export const voteInKillPoll = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isKillButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      ipollInstance.methods
        .vote(0)
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(isKillButtonSpinning(false));
          getKillPollVote(version, contractAddress, userLocalPublicAddress);
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isKillButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isKillButtonSpinning(false));
    });
};

// name: PollFactory, address: pollFactoryAddress
export const revokeVoteInKillPoll = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isKillButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      ipollInstance.methods
        .revokeVote()
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(isKillButtonSpinning(false));
          getKillPollVote(version, contractAddress, userLocalPublicAddress);
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isKillButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isKillButtonSpinning(false));
    });
};

export const getTapPollVote = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  const network = "rinkeby";
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
export const voteInTapPoll = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isTapButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      ipollInstance.methods
        .vote(0)
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(isTapButtonSpinning(false));
          getTapPollVote(version, contractAddress, userLocalPublicAddress);
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isTapButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isTapButtonSpinning(false));
    });
};

// name: PollFactory, address: pollFactoryAddress
export const revokeVoteInTapPoll = (version, contractAddress, userLocalPublicAddress) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isTapButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "IPoll" } })
    .then(ipollData => {
      const { data } = ipollData.data || {};
      const { abi } = data || {};
      const ipollInstance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      ipollInstance.methods
        .revokeVote()
        .send({ from: userLocalPublicAddress })
        .on("receipt", receipt => {
          dispatch(isTapButtonSpinning(false));
          getTapPollVote(version, contractAddress, userLocalPublicAddress);
        })
        .on("error", error => {
          console.error(error.message);
          dispatch(isTapButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isTapButtonSpinning(false));
    });
};

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
