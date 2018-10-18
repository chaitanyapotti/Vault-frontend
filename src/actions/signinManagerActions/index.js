import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";
import constants from "../../constants";

export function isIssuerFlagToggled() {
  return dispatch => {
    dispatch({
      type: actionTypes.IS_ISSUER_FLAG_TOGGLED,
      payload: null
    });
  };
}

export function verifyPhoneNumber(serverOtp, userOtp, isIssuer, publicAddress, phoneNumber, countryCode) {
  return dispatch => {
    if (serverOtp === userOtp) {
      axios
        .post(`${config.api_base_url}/db/users/register`, {
          publicaddress: publicAddress,
          isissuer: isIssuer,
          phonenumber: phoneNumber,
          countrycode: countryCode
        })
        .then(response => {
          if (response.status == 200) {
            if (response.data.message == constants.SUCCESS) {
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
  return;
}

export function sendOtp(phoneNumber, countryCode) {
  console.log("sending otp");
  return dispatch => {
    axios
      .get(`${config.api_base_url}/db/users/otp`, { params: { phoneNumber: phoneNumber.toString(), countryCode: countryCode.toString() } })
      .then(response => {
        if (response.status == 200) {
          if (response.data.message == constants.SUCCESS) {
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

export function checkUserRegistration() {
  return dispatch => {
    web3.eth
      .getAccounts()
      .then(accounts => {
        if (accounts.length > 0) {
          dispatch({
            type: actionTypes.USER_LOCAL_ACCOUNT_ADDRESS,
            payload: accounts[0].toLowerCase()
          });
          axios
            .get(`${config.api_base_url}/db/users`, { params: { useraddress: accounts[0].toLowerCase() } })
            .then(response => {
              if (response.status == 200) {
                if (response.data.message == constants.SUCCESS) {
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

export const fetchCurrentAccount = userPreviousLocalPublicAddress =>
  // console.log("every interval", userPreviousLocalPublicAddress)
  dispatch => {
    web3.eth
      .getAccounts()
      .then(accounts => {
        if (accounts.length > 0) {
          if (accounts[0].toLowerCase() !== userPreviousLocalPublicAddress.toLowerCase()) {
            dispatch({
              type: actionTypes.USER_DEFAULT_ACCOUNT_CHANGED,
              payload: accounts[0].toLowerCase()
            });

            axios
              .get(`${config.api_base_url}/db/users`, { params: { useraddress: accounts[0].toLowerCase() } })
              .then(response => {
                console.log(response);
                if (response.status == 200) {
                  if (response.data.message == constants.SUCCESS) {
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
          }
        }
      })
      .catch(err => {
        dispatch({
          type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
          payload: constants.FAILED_TO_GET_PUBLIC_ADDRESS
        });
      });
  };
