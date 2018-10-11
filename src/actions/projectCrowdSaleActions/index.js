import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";

export function etherCollected(receipt) {
  return {
    payload: { receipt: receipt },
    type: "ETHER_COLLECTED"
  };
}

export function r1InfoReceived(data) {
  return {
    payload: { rec: data },
    type: "ROUND1_INFO_RECEIVED"
  };
}

export function getEtherCollected(version, contractAddress) {
  return async dispatch => {
    //doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(config.api_base_url + "/web3/pollfactory/totaletherraised", {
        params: { version: version.toString(), network: network, address: contractAddress }
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(etherCollected(web3.utils.fromWei(data, "ether")));
      })
      .catch(err => console.error(err.message));
  };
}

export function getR1TokensSold(version, contractAddress) {
  return async dispatch => {
    //doesn't call blockchain. await is non blocking
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(config.api_base_url + "/web3/crowdsale/round/details", {
        params: { version: version.toString(), network: network, address: contractAddress, round: "0" }
      })
      .then(async response => {
        const { data } = response.data;
        dispatch(r1InfoReceived(data));
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
          value: web3.utils.toWei("1", "ether")
        })
        .then(response => console.log(response))
    );
  };
}

// export function checkWhiteList(version, contractName, contractAddress) {
//   return dispatch =>
//     axios.get(config.api_base_url + "/web3/contractdata/", { params: { version: version.toString(), name: contractName } }).then(response => {
//       if (response.status === 200) {
//         const { data } = response.data || {};
//         const { abi } = data || {};
//         web3.eth.getAccounts().then(accounts => {
//           const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
//           instance.methods
//             .isCurrentMember(accounts[0])
//             .call()
//             .then(receipt => dispatch(isAlreadyWhiteListed(receipt)));
//         });
//       }
//     });
// }
