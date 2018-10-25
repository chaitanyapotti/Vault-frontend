import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";

export function isAlreadyWhiteListed(receipt) {
  return {
    payload: { receipt },
    type: "WHITELIST_CHECK"
  };
}

export function onWhiteListClick(version, contractName, contractAddress) {
  return async dispatch => {
    const accounts = await web3.eth.getAccounts();
    axios
      .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: contractName } })
      .then(res => {
        const { data } = res.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
        // to send country attributes of the user
        instance.methods
          .requestMembership([])
          .send({ from: accounts[0] })
          .on("error", error => console.error(error.message))
          .then(receipt => dispatch(isAlreadyWhiteListed(receipt.status === "0x1")));
      })
      .catch(err => console.error(err.message));
  };
}

export function checkWhiteList(version, contractAddress) {
  return async dispatch => {
    // doesn't call the blockchain => non-blocking
    const network = await web3.eth.net.getNetworkType();
    const accounts = await web3.eth.getAccounts();
    const address = await web3.utils.toChecksumAddress(contractAddress);
    axios
      .get(`${config.api_base_url}/web3/membershiptoken/iscurrentmember`, {
        params: { version: version.toString(), network, address, useraddress: accounts[0] }
      })
      .then(response => {
        if (response.status === 200) {
          const { data } = response.data;
          dispatch(isAlreadyWhiteListed(data === "true"));
        } else {
          console.error("api response error");
          dispatch(isAlreadyWhiteListed(false));
        }
      })
      .catch(err => {
        console.error(err.message);
        dispatch(isAlreadyWhiteListed(false));
      });
  };
}
