import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";
import { getCurrentTap, getXfrData, getTapPollConsensus } from "../projectDetailGovernanceActions/index";
import { currentRound } from "../projectGovernanceActions/index";
import { getRoundTokensSold } from "../projectCrowdSaleActions/index";
import { pollTxHash, pollTxHashResult } from "../helperActions";

export const isStartNewRoundButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.START_NEW_ROUND_BUTTON_SPINNING
});

export const isStartR1ButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.Start_R1_BUTTON_SPINNING
});

export const isDeployTapPollButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.DEPLOY_TAP_POLL_BUTTON_SPINNING
});

export const isIncrementTapButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.INCREMENT_TAP_BUTTON_SPINNING
});

export const isDeployXfrPollButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.DEPLOY_XFR_POLL_BUTTON_SPINNING
});

export const isWithdrawXfrButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.WITHDRAW_XFR_BUTTON_SPINNING
});

export const isWithdrawButtonSpinning = receipt => ({
  payload: { receipt },
  type: actionTypes.WITHDRAW_BUTTON_SPINNING
});

export const currentWithdrawableAmountReceived = receipt => ({
  payload: { receipt },
  type: actionTypes.CURRENT_WITHDRAWABLE_AMOUNT_RECEIVED
});

export const onEditXfr1DescriptionClick = value => dispatch => {
  dispatch({
    type: actionTypes.EDIT_XFR1_DESCRIPTION_CHANGED,
    payload: value
  });
};

export const onEditXfr2DescriptionClick = value => dispatch => {
  dispatch({
    type: actionTypes.EDIT_XFR2_DESCRIPTION_CHANGED,
    payload: value
  });
};

export const editXfr1Description = (projectid, xfrAddress, description) => async dispatch => {
  const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
  axios
    .patch(`${config.api_base_url}/db/projects/xfrdescription?projectid=${projectid}&address=${xfrAddress}&network=${localNetwork}`, {
      description
    })
    .then(response => dispatch(onEditXfr1DescriptionClick(false)))
    .catch(err => {
      console.log(err);
      dispatch(onEditXfr1DescriptionClick(false));
    });
};

export const editXfr2Description = (projectid, xfrAddress, description) => async dispatch => {
  const localNetwork = web3.eth.currentProvider ? await web3.eth.net.getNetworkType() : "";
  axios
    .patch(`${config.api_base_url}/db/projects/xfrdescription?projectid=${projectid}&address=${xfrAddress}&network=${localNetwork}`, {
      description
    })
    .then(response => dispatch(onEditXfr2DescriptionClick(false)))
    .catch(err => {
      console.log(err);
      dispatch(onEditXfr2DescriptionClick(false));
    });
};

export const startR1 = (version, contractAddress, userLocalPublicAddress, projectid, round, network) => dispatch => {
  dispatch(isStartR1ButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "CrowdSale" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      instance.methods
        .startNewRound()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isStartR1ButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.START_R1_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(currentRound(projectid));
                dispatch(getRoundTokensSold(version, contractAddress, round, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.START_R1_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isStartR1ButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.START_R1_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isStartR1ButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.START_R1_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isStartR1ButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isStartR1ButtonSpinning(false));
    });
};

export const startNewRound = (version, contractAddress, userLocalPublicAddress, projectid, round, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isStartNewRoundButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "CrowdSale" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      instance.methods
        .startNewRound()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isStartNewRoundButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.START_NEW_ROUND_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(currentRound(projectid));
                dispatch(getRoundTokensSold(version, contractAddress, round, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.START_NEW_ROUND_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isStartNewRoundButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.START_NEW_ROUND_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isStartNewRoundButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.START_NEW_ROUND_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isStartNewRoundButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isStartNewRoundButtonSpinning(false));
    });
};

export const deployTapPoll = (version, contractAddress, userLocalPublicAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isDeployTapPollButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      instance.methods
        .createTapIncrementPoll()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isDeployTapPollButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.DEPLOY_TAP_POLL_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getCurrentTap(version, contractAddress, network));
                dispatch(getTapPollConsensus(version, contractAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.DEPLOY_TAP_POLL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isDeployTapPollButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.DEPLOY_TAP_POLL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isDeployTapPollButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.DEPLOY_TAP_POLL_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isDeployTapPollButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isDeployTapPollButtonSpinning(false));
    });
};

export const incrementTap = (version, contractAddress, userLocalPublicAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isIncrementTapButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      instance.methods
        .increaseTap()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isIncrementTapButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.INCREMENT_TAP_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getCurrentTap(version, contractAddress, network));
                dispatch(getTapPollConsensus(version, contractAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.INCREMENT_TAP_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isIncrementTapButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.INCREMENT_TAP_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isIncrementTapButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.INCREMENT_TAP_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isIncrementTapButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isIncrementTapButtonSpinning(false));
    });
};

export const deployXfrPoll = (
  version,
  contractAddress,
  userLocalPublicAddress,
  amount,
  titleText,
  descriptionText,
  projectid,
  network
) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isDeployXfrPollButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const weiAmount = await web3.utils.toWei(amount, "ether");
      const gasPrice = await web3.eth.getGasPrice();
      instance.methods
        .createXfr(weiAmount)
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isDeployXfrPollButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.DEPLOY_XFR_POLL_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHashResult(
              transactionHash,
              result => {
                const address = web3.utils.toChecksumAddress(web3.utils.toHex(web3.utils.toBN(result.logs[0].data)));
                dispatch({
                  type: actionTypes.XFR_TITLE_CHANGED,
                  payload: ""
                });
                dispatch({
                  type: actionTypes.XFR_AMOUNT_CHANGED,
                  payload: ""
                });
                dispatch({
                  type: actionTypes.XFR_DESCRIPTION_CHANGED,
                  payload: ""
                });
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.DEPLOY_XFR_POLL_TRANSACTION_HASH_RECEIVED
                });
                axios
                  .patch(`${config.api_base_url}/db/projects/xfrs?projectid=${projectid}&network=${network}`, {
                    name: titleText,
                    description: descriptionText,
                    address,
                    startDate: new Date()
                  })
                  .then(resp => {
                    dispatch(getXfrData(version, contractAddress, network));
                    dispatch(currentRound(projectid));
                  });
              },
              () => {
                dispatch(isDeployXfrPollButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.DEPLOY_XFR_POLL_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isDeployXfrPollButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.DEPLOY_XFR_POLL_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isDeployXfrPollButtonSpinning(false));
          dispatch({
            payload: { transactionHash: "" },
            type: actionTypes.DEPLOY_XFR_POLL_TRANSACTION_HASH_RECEIVED
          });
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isDeployXfrPollButtonSpinning(false));
    });
};

export const withdrawXfrAmount = (version, contractAddress, userLocalPublicAddress, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isWithdrawXfrButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const gasPrice = await web3.eth.getGasPrice();
      instance.methods
        .withdrawXfrAmount()
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isWithdrawXfrButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.WITHDRAW_XFR_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getXfrData(version, contractAddress, network));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.WITHDRAW_XFR_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isWithdrawXfrButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.WITHDRAW_XFR_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isWithdrawXfrButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.WITHDRAW_XFR_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isWithdrawXfrButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isWithdrawXfrButtonSpinning(false));
    });
};

export const withdrawAmount = (version, contractAddress, userLocalPublicAddress, amount, network) => dispatch => {
  // doesn't call blockchain. await is non blocking
  dispatch(isWithdrawButtonSpinning(true));
  axios
    .get(`${config.api_base_url}/web3/contractdata/`, { params: { version: version.toString(), name: "PollFactory" } })
    .then(async res => {
      const { data } = res.data || {};
      const { abi } = data || {};
      const instance = new web3.eth.Contract(abi, contractAddress, { from: userLocalPublicAddress });
      const weiAmount = await web3.utils.toWei(amount, "ether");
      const gasPrice = await web3.eth.getGasPrice();
      instance.methods
        .withdrawAmount(weiAmount)
        .send({ from: userLocalPublicAddress, gasPrice: (parseFloat(gasPrice) + 2000000000).toString() })
        .on("transactionHash", transactionHash => {
          dispatch(isWithdrawButtonSpinning(false));
          dispatch({
            payload: { transactionHash },
            type: actionTypes.WITHDRAW_BUTTON_TRANSACTION_HASH_RECEIVED
          });
          dispatch(
            pollTxHash(
              transactionHash,
              () => {
                dispatch(getCurrentWithdrawableAmount(version, contractAddress, network));
                dispatch({
                  type: actionTypes.WITHDRAW_AMOUNT_CHANGED,
                  payload: ""
                });
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.WITHDRAW_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {
                dispatch(isWithdrawButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.WITHDRAW_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              },
              () => {},
              () => {
                dispatch(isWithdrawButtonSpinning(false));
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.WITHDRAW_BUTTON_TRANSACTION_HASH_RECEIVED
                });
              }
            )
          );
        })
        .catch(err => {
          console.error(err.message);
          dispatch(isWithdrawButtonSpinning(false));
        });
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isWithdrawButtonSpinning(false));
    });
};

export const getCurrentWithdrawableAmount = (version, contractAddress, network) => dispatch => {
  // const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/pollfactory/withdrawableamount`, {
      params: { version: version.toString(), network, address: contractAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(currentWithdrawableAmountReceived(data));
      } else {
        dispatch(currentWithdrawableAmountReceived({}));
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(currentWithdrawableAmountReceived({}));
    });
};

export function xfrTitleChanged(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.XFR_TITLE_CHANGED,
      payload: value
    });
  };
}

export function xfrAmountChanged(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.XFR_AMOUNT_CHANGED,
      payload: value
    });
  };
}

export function xfrDescriptionChanged(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.XFR_DESCRIPTION_CHANGED,
      payload: value
    });
  };
}

export function xfr1DescriptionChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.XFR1_DESCRIPTION_CHANGED,
      payload: value
    });
  };
}

export function xfr2DescriptionChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.XFR2_DESCRIPTION_CHANGED,
      payload: value
    });
  };
}

export function withdrawAmountChanged(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.WITHDRAW_AMOUNT_CHANGED,
      payload: value
    });
  };
}
