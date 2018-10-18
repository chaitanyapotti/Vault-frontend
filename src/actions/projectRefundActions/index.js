import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";

export function refundSuccess(receipt) {
  return {
    payload: { receipt },
    type: "REFUND_SUCCESS"
  };
}

export function onRefundClick(version, currentRoundNumber, contractAddress) {
  return dispatch => {
    web3.eth.getAccounts().then(accounts => {
      if (currentRoundNumber === "5") {
        axios
          .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
          .then(res => {
            const { data } = res.data || {};
            const { abi } = data || {};
            const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
            instance.methods
              .refundBySoftcapFail()
              .send({ from: accounts[0] })
              .on("error", error => console.error(error.message))
              .then(receipt => dispatch(refundSuccess(receipt.status === "0x1")));
          })
          .catch(err => console.log(err.message));
      } else {
        axios
          .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
          .then(res => {
            const { data } = res.data || {};
            const { abi } = data || {};
            const instance = new web3.eth.Contract(abi, contractAddress, { from: accounts[0] });
            instance.methods
              .refundByKill()
              .send({ from: accounts[0] })
              .on("error", error => console.error(error.message))
              .then(receipt => dispatch(refundSuccess(receipt.status === "0x1")));
          })
          .catch(err => console.log(err.message));
      }
    });
  };
}
