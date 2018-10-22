import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";

// export function requestedMembershipSuccess() {
//   return {
//     payload: {},
//     type: "MEMBERSHIP_ASSIGNED"
//   };
// }

// export function requestedMembershipFailure() {
//   return {
//     payload: {},
//     type: "MEMBERSHIP_FAILED"
//   };
// }

export function isAlreadyWhiteListed(receipt) {
  return {
    payload: { receipt },
    type: "WHITELIST_CHECK",
  };
}

export function onWhiteListClick(version, contractName, contractAddress) {
  return async dispatch => {
    const network = await web3.eth.net.getNetworkType();
    web3.eth.getAccounts().then(accounts =>
      axios
        .get(`${config.api_base_url}/web3/membershiptoken/iscurrentmember`, {
          params: { version: version.toString(), network, address: contractAddress, useraddress: accounts[0] },
        })
        .then(response => {
          if (response.status === 200) {
            const { data } = response.data;
            if (data === "true") {
              console.log("herer");
              dispatch(isAlreadyWhiteListed(true));
            } else {
              axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: contractName } }).then(res => {
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
        .catch(err => console.error(err.message)),
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
