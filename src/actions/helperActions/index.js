import web3 from "../../helpers/web3";

export const pollTxHash = (latestTxHash, successFn, failFn, pendingFn, errorFn) => dispatch => {
  let txHash = latestTxHash;
  const myTimer = setInterval(() => {
    if (txHash === "0x") clearInterval(myTimer);
    web3.eth
      .getTransactionReceipt(latestTxHash)
      .then(result => {
        if (result !== null) {
          // update ctr address in db and update txhash to "0x"
          if (result.status) {
            console.log("success fn called");
            successFn();
            txHash = "0x";
          }
          // redotx;  set txHash to 0x
          else {
            failFn();
            txHash = "0x";
          }
        } else {
          // wait for tx to complete - keep spinner rotating
          console.log("pending fn called");
          pendingFn();
        }
      })
      .catch(err => {
        console.log("error fn called");
        console.error(err.message);
        errorFn();
        txHash = "0x";
      });
  }, 2000);
};

export const pollTxHashResult = (latestTxHash, successFn, failFn, pendingFn, errorFn) => dispatch => {
  let txHash = latestTxHash;
  const myTimer = setInterval(() => {
    if (txHash === "0x") clearInterval(myTimer);
    web3.eth
      .getTransactionReceipt(latestTxHash)
      .then(result => {
        if (result !== null) {
          // update ctr address in db and update txhash to "0x"
          if (result.status) {
            console.log("success fn called");
            successFn(result);
            txHash = "0x";
          }
          // redotx;  set txHash to 0x
          else {
            failFn();
            txHash = "0x";
          }
        } else {
          // wait for tx to complete - keep spinner rotating
          console.log("pending fn called");
          pendingFn();
        }
      })
      .catch(err => {
        console.log("error fn called");
        console.error(err.message);
        errorFn();
        txHash = "0x";
      });
  }, 2000);
};
