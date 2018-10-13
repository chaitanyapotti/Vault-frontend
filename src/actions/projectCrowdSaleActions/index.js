import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";

export function etherCollected(receipt) {
  return {
    payload: { receipt: receipt },
    type: "ETHER_COLLECTED"
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
      .then(async response => dispatch(etherCollected(web3.utils.fromWei(response, "ether"))))
      .catch(err => console.error(err.message));
  };
}

export function onWhiteListClick(version, contractName, contractAddress) {
  return async dispatch => {
    const network = await web3.eth.net.getNetworkType();
    web3.eth.getAccounts().then(accounts =>
      axios
        .get(config.api_base_url + "/web3/membershiptoken/iscurrentmember", {
          params: { version: version.toString(), network: network, address: contractAddress, useraddress: accounts[0] }
        })
        .then(response => {
          if (response.status === 200) {
            const { data } = response.data;
            if (data === "true") {
              console.log("herer");
              dispatch(isAlreadyWhiteListed(true));
            } else {
              axios.get(config.api_base_url + "/web3/contractdata/", { params: { version: version.toString(), name: contractName } }).then(res => {
                const { data } = res.data || {};
                const { abi } = data || {};
                const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
                instance.methods
                  .requestMembership([])
                  .send({ from: accounts[0] })
                  .on("error", error => console.error(error.message))
                  .then(receipt => dispatch(isAlreadyWhiteListed(receipt.status === "0x1")));
              });
            }
          }
        })
        .catch(err => console.error(err.message))
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
