import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";

export function isAlreadyWhiteListed(receipt) {
  return {
    payload: { receipt },
    type: "WHITELIST_CHECK"
  };
}

export function onWhiteListClick(version, contractName, contractAddress, userLocalPublicAddress) {
  return async dispatch => {
    // check vault membership first
    axios
      .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: contractName } })
      .then(res => {
        const { data } = res.data || {};
        const { abi } = data || {};
        const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
        // TODO: to send country attributes of the user
        instance.methods
          .requestMembership([])
          .send({ from: userLocalPublicAddress })
          .on("error", error => {
            console.error(error.message);
            dispatch(isAlreadyWhiteListed(false));
          })
          .then(receipt => dispatch(isAlreadyWhiteListed(receipt.status === "0x1")));
      })
      .catch(err => {
        console.error(err.message);
        dispatch(isAlreadyWhiteListed(false));
      });
  };
}

export function checkWhiteList(version, contractAddress, userLocalPublicAddress) {
  return async dispatch => {
    // doesn't call the blockchain => non-blocking
    const network = await web3.eth.net.getNetworkType();
    const address = await web3.utils.toChecksumAddress(contractAddress);
    axios
      .get(`${config.api_base_url}/web3/membershiptoken/iscurrentmember`, {
        params: { version: version.toString(), network, address, useraddress: userLocalPublicAddress }
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
