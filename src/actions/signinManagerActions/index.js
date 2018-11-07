import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";
import constants from "../../constants";



export function closeRegistrationFormAction() {
  return dispatch => {
    dispatch({
      type: actionTypes.HIDE_REGISTRATION_FORM,
      payload: null
    });
  };
}

export function openRegistrationFormAction(userRegistered) {
  if (!userRegistered) {
    return dispatch => {
      dispatch({
        type: actionTypes.SHOW_REGISTRATION_FORM,
        payload: null
      });
    };
  }
}

export function checkUserRegistration() {
  return dispatch => {
    web3.eth
      .getAccounts()
      .then(accounts => {
        if (accounts.length > 0) {
          dispatch({
            type: actionTypes.USER_LOCAL_ACCOUNT_ADDRESS,
            payload: accounts[0]
          });
          axios
            .get(`${config.api_base_url}/db/users`, { params: { useraddress: accounts[0] } })
            .then(response => {
              if (response.status === 200) {
                if (response.data.message === constants.SUCCESS) {
                  dispatch({
                    type: actionTypes.USER_REGISTRATION_CHECK_SUCCESS,
                    payload: response.data.data
                  });
                } else {
                  dispatch({
                    type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
                    payload: response.data.reason
                  });
                }
              } else {
                dispatch({
                  type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
                  payload: constants.FAILED_TO_GET_PUBLIC_ADDRESS
                });
              }
            })
            .catch(err => {
              dispatch({
                type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
                payload: constants.FAILED_TO_GET_PUBLIC_ADDRESS
              });
            });
        } else {
          dispatch({
            type: actionTypes.USER_LOGGED_OUT,
            payload: ""
          });
        }
      })
      .catch(err => {
        dispatch({
          type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
          payload: constants.FAILED_TO_GET_PUBLIC_ADDRESS
        });
      });
  };
}

export const checkVaultMembership = userLocalPublicAddress => async dispatch => {
  const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/membershiptoken/iscurrentmember`, {
      params: { version: config.vault_Version, network, address: config.vault_contract_address, useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        if (data === "true") {
          dispatch(isAlreadyVaultMember(true));
        } else {
          dispatch(isAlreadyVaultMember(false));
          dispatch(checkPhoneVerification(userLocalPublicAddress));
        }
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isAlreadyVaultMember(false));
    });
};

export function fetchCurrentAccount(userPreviousLocalPublicAddress, metamaskPreviousNetworkName, 
  metamaskPreviousInstallationState) {
  return dispatch => {
    // console.log("printing current provider: ", web3.currentProvider)
    if (web3.currentProvider === null) {
      if (metamaskPreviousInstallationState=== false){
        return
      }else{
        return dispatch({
          type: actionTypes.METAMASK_INSTALLATION_STATUS_CHECK,
          payload: false
        })
      }
    } else {
      if (metamaskPreviousInstallationState=== true){

      }else{
        dispatch({
          type: actionTypes.METAMASK_INSTALLATION_STATUS_CHECK,
          payload: true
        })
      }
    }
    web3.eth
      .getAccounts()
      .then(accounts => {
        if (accounts.length > 0) {
          web3.eth.net.getNetworkType()
          .then( networkName =>{
            // console.log("printing network: ", networkName)
            if (networkName!== metamaskPreviousNetworkName){
              dispatch({
                type: actionTypes.METAMASK_NETWORK,
                payload: networkName
              })
            }
            if (networkName==='rinkeby'){
              if (accounts[0] !== userPreviousLocalPublicAddress) {
                dispatch({
                  type: actionTypes.USER_DEFAULT_ACCOUNT_CHANGED,
                  payload: accounts[0]
                });
                dispatch(checkVaultMembership(accounts[0]));
                dispatch(checkIssuer(accounts[0]));
              }
            }else{
              if (accounts[0] !== userPreviousLocalPublicAddress) {
                dispatch({
                  type: actionTypes.USER_DEFAULT_ACCOUNT_CHANGED,
                  payload: accounts[0]
                });
              }
            }
          })
        } else {
          if (userPreviousLocalPublicAddress!=""){
            dispatch({
              type: actionTypes.USER_DEFAULT_ACCOUNT_CHANGED,
              payload: ""
            });
          }
          
          // dispatch({
          //   type: actionTypes.USER_LOGGED_OUT,
          //   payload: ""
          // });
        }
      })
      .catch(err => {
        console.log(err)
      });
  };
}


export function isAlreadyVaultMember(receipt) {
  return {
    type: actionTypes.VAULT_MEMBERSHIP_CHECK,
    payload: receipt
  };
};


export function sendOtp(phoneNumber, countryCode) {
  console.log("sending otp");
  return dispatch => {
      axios
          .get(`${config.api_base_url}/db/users/otp`, { params: { phoneNumber: phoneNumber.toString(), countryCode: countryCode.toString() } })
          .then(response => {
              if (response.status === 200) {
                  if (response.data.message === constants.SUCCESS) {
                      dispatch({
                          type: actionTypes.OTP_SENT_TO_USER_SUCCESS,
                          payload: response.data.data.otp
                      });
                  } else {
                      dispatch({
                          type: actionTypes.OTP_SENT_TO_USER_FAILED,
                          payload: response.data.reason
                      });
                  }
              } else {
                  dispatch({
                      type: actionTypes.OTP_SENT_TO_USER_FAILED,
                      payload: constants.OTP_FAILED_MESSAGE
                  });
              }
          })
          .catch(err => {
              dispatch({
                  type: actionTypes.OTP_SENT_TO_USER_FAILED,
                  payload: constants.OTP_FAILED_MESSAGE
              });
          });
  };
}

export function isIssuerFlagToggled() {
  return dispatch => {
      dispatch({
          type: actionTypes.IS_ISSUER_FLAG_TOGGLED,
          payload: null
      });
  };
}

export function phoneNumberChanged(number) {
  return dispatch => {
      dispatch({
          type: actionTypes.PHONE_NUMBER_CHANGED,
          payload: number
      });
  };
}

export function countryCodeChanged(code) {
  return dispatch => {
      dispatch({
          type: actionTypes.COUNTRY_CODE_CHANGED,
          payload: code
      });
  };
}

export function verifyPhoneNumber(serverOtp, userOtp, isIssuer, publicAddress, phoneNumber, countryCode) {
  return dispatch => {
      if (serverOtp.toString() === userOtp.toString()) {
          axios
              .post(`${config.api_base_url}/db/users/register`, {
                  publicaddress: publicAddress,
                  isissuer: isIssuer,
                  phonenumber: phoneNumber,
                  countrycode: countryCode
              })
              .then(response => {
                  if (response.status === 200) {
                      if (response.data.message === constants.SUCCESS) {
                          dispatch({
                              type: actionTypes.PHONE_VERIFICATION_SUCCESS,
                              payload: response.data.data
                          });
                      } else {
                          dispatch({
                              type: actionTypes.PHONE_VERIFICATION_FAILED,
                              payload: response.data.reason
                          });
                      }
                  } else {
                      dispatch({
                          type: actionTypes.PHONE_VERIFICATION_FAILED,
                          payload: constants.PHONE_VERIFICATION_FAILED_MESSAGE
                      });
                  }
              })
              .catch(error => {
                  console.log(error);
                  dispatch({
                      type: actionTypes.PHONE_VERIFICATION_FAILED,
                      payload: constants.PHONE_VERIFICATION_FAILED_MESSAGE
                  });
              });
      } else {
          dispatch({
              type: actionTypes.PHONE_VERIFICATION_FAILED,
              payload: constants.OTP_DID_NOT_MATCH
          });
      }
  };
}

export function userOtpChanged(otp) {
  return dispatch => {
      dispatch({
          type: actionTypes.USER_OTP_INPUT_CHANGED,
          payload: otp
      });
  };
}

export const requestVaultMembership = userLocalPublicAddress => async dispatch => {
  const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/membershiptoken/iscurrentmember`, {
      params: { version: config.vault_Version, network, address: config.vault_contract_address, useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        if (data === "true") {
          dispatch(isAlreadyVaultMember(true));
        } else {
          axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: config.vault_Version, name: "Vault" } }).then(res => {
            const { data } = res.data || {};
            const { abi } = data || {};
            const instance = new web3.eth.Contract(abi, config.vault_contract_address, { from: userLocalPublicAddress });
            instance.methods
              .requestMembership([0, 0])
              .send({ from: userLocalPublicAddress, value: web3.utils.toWei("0.6", "ether") })
              .on("error", error => console.error(error.message))
              .then(receipt => dispatch(isAlreadyVaultMember(receipt.status === "0x1")));
          });
        }
      }
    })
    .catch(err => console.error(err.message));
};



export const checkIssuer = userLocalPublicAddress => dispatch => {
  axios
    .get(`${config.api_base_url}/db/users/isissuer`, {
      params: {useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        if (data) {
          dispatch({
            type: actionTypes.ISISSUER_CHECK,
            payload: data
          });
        } else {
          dispatch({
            type: actionTypes.ISISSUER_CHECK,
            payload: data
          })
        }
      }else{
        dispatch({
          type: actionTypes.ISISSUER_CHECK,
          payload: false
        })
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch({
        type: actionTypes.ISISSUER_CHECK,
        payload: false
      })
    });
};

export const checkVaultMembershipPaymentStatus = userLocalPublicAddress => async dispatch => {
  const network = await web3.eth.net.getNetworkType();
  axios
    .get(`${config.api_base_url}/web3/vaulttoken/ismembershipapprovalpending`, {
      params: { version: config.vault_Version, network, address: config.vault_contract_address, useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        if (response.data === "true") {
          dispatch({
            type: actionTypes.VAULT_MEMBERSHIP_PAYMENT_CHECK_SUCCESS,
            payload: true
          });
        } else {
          dispatch({
            type: actionTypes.VAULT_MEMBERSHIP_PAYMENT_CHECK_SUCCESS,
            payload: false
          });
        }
      } else {
        dispatch({
          type: actionTypes.VAULT_MEMBERSHIP_PAYMENT_CHECK_FAILED,
          payload: false
        });
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch({
        type: actionTypes.VAULT_MEMBERSHIP_PAYMENT_CHECK_FAILED,
        payload: false
      });
    });
};

export const checkPhoneVerification = userLocalPublicAddress => dispatch => {
  axios
      .get(`${config.api_base_url}/db/users/isphoneverified`, { params: { useraddress: userLocalPublicAddress } })
      .then(response => {
          if (response.status === 200) {
              if (response.data.message === constants.SUCCESS) {
                  dispatch({
                      type: actionTypes.PHONE_NUMBER_IS_VERIFIED,
                      payload: true
                  });
                  dispatch(checkVaultMembershipPaymentStatus(userLocalPublicAddress));
              } else {
                  dispatch({
                      type: actionTypes.PHONE_NUMBER_IS_NOT_VERIFIED,
                      payload: false
                  });
              }
          } else {
              dispatch({
                  type: actionTypes.PHONE_NUMBER_IS_NOT_VERIFIED,
                  payload: false
              });
          }
      })
      .catch(err => {
          dispatch({
              type: actionTypes.PHONE_NUMBER_IS_NOT_VERIFIED,
              payload: false
          });
      });
};