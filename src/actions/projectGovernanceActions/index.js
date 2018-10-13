import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";

export function currentRoundFetchSuccess(receipt) {
  return {
    payload: {},
    type: "CURRENT_ROUND_FETCHED"
  };
}

export function currentRound(version, contractName, contractAddress) {
  return dispatch =>
    axios.get(config.api_base_url + "/web3/contractdata/", { params: { version: version.toString(), name: contractName } }).then(response => {
      if (response.status === 200) {
        const { data } = response.data || {};
        const { abi } = data || {};
        web3.eth.getAccounts().then(accounts => {
          return true;
          //   const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
          //   instance.methods
          //     .isCurrentMember(accounts[0])
          //     .call()
          //     .then(receipt => dispatch(currentRoundFetchSuccess(receipt)));
        });
      }
    });
}
