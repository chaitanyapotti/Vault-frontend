import axios from "axios";
import FormData from "form-data";
import actionTypes from "../../action_types";
import config from "../../config";
import web3 from "../../helpers/web3";
import constants from "../../constants";
import { pollTxHash } from "../helperActions";

const httpClient = axios.create();

export const postUserFormData = async (userRegistrationData, userLocalPublicAddress) => {
  const network = await web3.eth.net.getNetworkType();
  const userFormObject = {};
  userFormObject.address = {
    addressLine1: userRegistrationData.addressLine1,
    addressLine2: userRegistrationData.addressLine2
  };
  userFormObject.isIssuer = userRegistrationData.isIssuerFlag;
  userFormObject.city = userRegistrationData.city;
  userFormObject.userState = userRegistrationData.userState;
  userFormObject.postalCode = userRegistrationData.postalCode;
  userFormObject.country = userRegistrationData.country;
  userFormObject.typeOfDocument = userRegistrationData.typeOfDocument;
  userFormObject.documentNumber = userRegistrationData.documentNumber;
  userFormObject.dateOfIssuance = userRegistrationData.dateOfIssuance;
  userFormObject.dateOfExpiration = userRegistrationData.dateOfExpiration;
  userFormObject.firstName = userRegistrationData.firstName;
  userFormObject.lastName = userRegistrationData.lastName;
  userFormObject.gender = userRegistrationData.gender;
  userFormObject.dateOfBirth = userRegistrationData.dateOfBirth;
  userFormObject.citizenship = userRegistrationData.citizenship;
  userFormObject.isVaultMember = false;
  userFormObject.network = network;
  userFormObject.email = userRegistrationData.email;
  return dispatch =>
    axios
      .post(`${config.api_base_url}/db/users?useraddress=${userLocalPublicAddress}`, userFormObject)
      .then(response => {
        if (response.status === 200) {
          if (response.data.message === constants.SUCCESS) {
            dispatch({
              type: actionTypes.USER_FORM_SUBMISSION_SUCCESS,
              payload: response.data.data
            });
          } else {
            dispatch({
              type: actionTypes.USER_FORM_SUBMISSION_FAILED,
              payload: response.data.reason
            });
          }
        } else {
          dispatch({
            type: actionTypes.USER_FORM_SUBMISSION_FAILED,
            payload: constants.USER_FORM_SUBMISSION_FAILED_MESSAGE
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: actionTypes.PROJECT_REGISTRATION_FAILED,
          payload: constants.PROJECT_REGISTRATION_FAILED_MESSAGE
        });
      });
};

export const requestVaultMembership = (userLocalPublicAddress, isIssuer, countryIndex) => async dispatch => {
  const network = await web3.eth.net.getNetworkType();
  const vault_contract_address = config.vault_contract_address[network];
  const vault_version = config.vault_version[network];
  let param2 = 2;
  let ethers = "0.0015";
  if (isIssuer) {
    param2 = 1;
    ethers = "0.5015";
  }

  axios
    .get(`${config.api_base_url}/web3/membershiptoken/iscurrentmember`, {
      params: { version: vault_version, network, address: vault_contract_address, useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        if (data === "true") {
          dispatch(isAlreadyVaultMember(true));
        } else {
          dispatch({
            type: actionTypes.VAULT_MEMBERSHIP_BUTTON_SPINNING,
            payload: { receipt: true }
          });
          axios.get(`${config.api_base_url}/web3/contractdata/`, { params: { version: config.vault_version, name: "Vault" } }).then(async res => {
            const { data: byteData } = res.data || {};
            const { abi } = byteData || {};
            const gasPrice = await web3.eth.getGasPrice();
            const instance = new web3.eth.Contract(abi, vault_contract_address, { from: userLocalPublicAddress });
            instance.methods
              .requestMembership([(countryIndex + 1).toString(), param2])
              .send({
                from: userLocalPublicAddress,
                value: web3.utils.toWei(ethers, "ether"),
                gasPrice: (parseFloat(gasPrice) + 2000000000).toString()
              })
              .on("transactionHash", transactionHash => {
                dispatch({
                  payload: { receipt: false },
                  type: actionTypes.VAULT_MEMBERSHIP_BUTTON_SPINNING
                });
                dispatch({
                  payload: { transactionHash },
                  type: actionTypes.VAULT_MEMBERSHIP_REQUEST_TRANSACTION_HASH_RECEIVED
                });
                dispatch(
                  pollTxHash(
                    transactionHash,
                    () => {
                      dispatch({
                        type: actionTypes.VAULT_MEMBERSHIP_REQUEST_CHECK_SUCCESS,
                        payload: true
                      });
                      dispatch({
                        payload: { transactionHash: "" },
                        type: actionTypes.VAULT_MEMBERSHIP_REQUEST_TRANSACTION_HASH_RECEIVED
                      });
                    },
                    () => {
                      dispatch({
                        payload: { receipt: false },
                        type: actionTypes.VAULT_MEMBERSHIP_BUTTON_SPINNING
                      });
                      dispatch({
                        type: actionTypes.VAULT_MEMBERSHIP_REQUEST_CHECK_FAILED,
                        payload: false
                      });
                      dispatch({
                        payload: { transactionHash: "" },
                        type: actionTypes.VAULT_MEMBERSHIP_REQUEST_TRANSACTION_HASH_RECEIVED
                      });
                    },
                    () => {},
                    () => {
                      dispatch({
                        type: actionTypes.VAULT_MEMBERSHIP_REQUEST_CHECK_FAILED,
                        payload: false
                      });
                      dispatch({
                        payload: { transactionHash: "" },
                        type: actionTypes.VAULT_MEMBERSHIP_REQUEST_TRANSACTION_HASH_RECEIVED
                      });
                    }
                  )
                );
              })
              .catch(err => {
                console.error(err.message);
                dispatch({
                  type: actionTypes.VAULT_MEMBERSHIP_PAYMENT_CHECK_SUCCESS,
                  payload: false
                });
                dispatch({
                  payload: { transactionHash: "" },
                  type: actionTypes.VAULT_MEMBERSHIP_REQUEST_TRANSACTION_HASH_RECEIVED
                });
                dispatch({
                  payload: { receipt: false },
                  type: actionTypes.VAULT_MEMBERSHIP_BUTTON_SPINNING
                });
              });
          });
        }
      }
    })
    .catch(err => console.error(err.message));
};

export function isAlreadyVaultMember(receipt) {
  return {
    type: actionTypes.VAULT_MEMBERSHIP_CHECK,
    payload: receipt
  };
}

export const checkVaultMembership = userLocalPublicAddress => async dispatch => {
  const network = await web3.eth.net.getNetworkType();
  const vault_contract_address = config.vault_contract_address[network];
  const vault_version = config.vault_version[network];
  axios
    .get(`${config.api_base_url}/web3/membershiptoken/iscurrentmember`, {
      params: { version: vault_version, network, address: vault_contract_address, useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        const { data } = response.data;
        if (data === "true") {
          dispatch(isAlreadyVaultMember(true));
        } else {
          dispatch(isAlreadyVaultMember(false));
        }
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch(isAlreadyVaultMember(false));
    });
};

export const hasVaultMembershipRequested = userLocalPublicAddress => async dispatch => {
  const network = await web3.eth.net.getNetworkType();
  const vault_contract_address = config.vault_contract_address[network];
  const vault_version = config.vault_version[network];
  axios
    .get(`${config.api_base_url}/web3/vaulttoken/ismembershipapprovalpending`, {
      params: { version: vault_version, network, address: vault_contract_address, useraddress: userLocalPublicAddress }
    })
    .then(response => {
      if (response.status === 200) {
        if (response.data.data === "true") {
          dispatch({
            type: actionTypes.VAULT_MEMBERSHIP_REQUEST_CHECK_SUCCESS,
            payload: true
          });
        } else {
          dispatch({
            type: actionTypes.VAULT_MEMBERSHIP_REQUEST_CHECK_FAILED,
            payload: false
          });
        }
      } else {
        dispatch({
          type: actionTypes.VAULT_MEMBERSHIP_REQUEST_CHECK_FAILED,
          payload: false
        });
      }
    })
    .catch(err => {
      console.error(err.message);
      dispatch({
        type: actionTypes.VAULT_MEMBERSHIP_REQUEST_CHECK_FAILED,
        payload: false
      });
    });
};

export const sendOtp = (phoneNumber, countryCode) => {
  console.log("sending otp");
  return async dispatch => {
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/db/users/otp`, { params: { phoneNumber: phoneNumber.toString(), countryCode: countryCode.toString(), network } })
      .then(response => {
        if (response.status === 200) {
          if (response.data.message === constants.SUCCESS) {
            console.log(response.data.data.otp, "1");
            dispatch({
              type: actionTypes.OTP_SENT_TO_USER_SUCCESS,
              payload: response.data.data.otp
            });
            dispatch({
              type: actionTypes.USER_OTP_INPUT_CHANGED,
              payload: ""
            });
          } else {
            console.log(response.data.reason, "2");
            dispatch({
              type: actionTypes.OTP_SENT_TO_USER_FAILED,
              payload: response.data.reason
            });
            dispatch({
              type: actionTypes.USER_OTP_INPUT_CHANGED,
              payload: ""
            });
          }
        } else {
          console.log(constants.OTP_FAILED_MESSAGE, "3");
          dispatch({
            type: actionTypes.OTP_SENT_TO_USER_FAILED,
            payload: constants.OTP_FAILED_MESSAGE
          });
          dispatch({
            type: actionTypes.USER_OTP_INPUT_CHANGED,
            payload: ""
          });
        }
      })
      .catch(err => {
        console.log(constants.OTP_FAILED_MESSAGE, "4");
        dispatch({
          type: actionTypes.OTP_SENT_TO_USER_FAILED,
          payload: constants.OTP_FAILED_MESSAGE
        });
        dispatch({
          type: actionTypes.USER_OTP_INPUT_CHANGED,
          payload: ""
        });
      });
  };
};

export function verifyPhoneNumber(serverOtp, userOtp, publicAddress, phoneNumber, countryCode) {
  return async dispatch => {
    if (serverOtp.toString() === userOtp.toString()) {
      const network = await web3.eth.net.getNetworkType();
      axios
        .post(`${config.api_base_url}/db/users/register/phone?network=${network}`, {
          publicaddress: publicAddress,
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
                type: actionTypes.PHONE_VERIFICATION_ERROR,
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

export function emailChangedAction(email) {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_EMAIL_CHANGED,
      payload: email
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

export function saveUserFormStates(userFormData, userLocalPublicAddress) {
  return async dispatch => {
    const network = await web3.eth.net.getNetworkType();
    axios
      .post(`${config.api_base_url}/db/users/formstates?useraddress=${userLocalPublicAddress}&network=${network}`, userFormData)
      .then(response => {
        if (response.status === 200) {
          if (response.data.message === constants.SUCCESS) {
            dispatch({
              type: actionTypes.USER_FORM_STATES_SAVED_SUCCESS,
              payload: response.data.data
            });
          } else {
            dispatch({
              type: actionTypes.USER_FORM_STATES_SAVED_FAILED,
              payload: response.data.reason
            });
          }
        } else {
          dispatch({
            type: actionTypes.USER_FORM_STATES_SAVED_FAILED,
            payload: constants.USER_FORM_STATES_SAVED_FAILED_MESSAGE
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: actionTypes.USER_FORM_STATES_SAVED_FAILED,
          payload: constants.USER_FORM_STATES_SAVED_FAILED_MESSAGE
        });
      });
  };
}

export function fetchUserFormStates(userLocalPublicAddress) {
  return async dispatch => {
    const network = await web3.eth.net.getNetworkType();
    axios
      .get(`${config.api_base_url}/db/users/formstates`, { params: { useraddress: userLocalPublicAddress, network } })
      .then(response => {
        if (response.status === 200) {
          if (response.data.message === constants.SUCCESS) {
            dispatch({
              type: actionTypes.USER_FORM_STATES_SUCCESS,
              payload: response.data.data
            });
          } else {
            dispatch({
              type: actionTypes.USER_FORM_STATES_FAILED,
              payload: response.data.reason
            });
          }
        } else {
          dispatch({
            type: actionTypes.USER_FORM_STATES_FAILED,
            payload: constants.USER_FORM_STATES_FAILED_MESSAGE
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: actionTypes.USER_FORM_STATES_FAILED,
          payload: constants.USER_FORM_STATES_FAILED_MESSAGE
        });
      });
  };
}

export function uploadPassportDocAction(passportDoc, userLocalPublicAddress, doctype) {
  const form = new FormData();
  form.append("file", passportDoc);
  const name = passportDoc.name || "";
  return async dispatch => {
    const network = await web3.eth.net.getNetworkType();
    dispatch({
      type: actionTypes.UPLOADING_PASSPORT_DOC,
      payload: name
    });
    httpClient({
      method: "post",
      url: `${config.api_base_url}/db/users/document/upload?useraddress=${userLocalPublicAddress}&doctype=${doctype}&network=${network}`,
      data: form,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.PASSPORT_UPLOAD_SUCCESS,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: actionTypes.PASSPORT_UPLOAD_FAILED,
            payload: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.PASSPORT_UPLOAD_FAILED,
          payload: err.message
        });
      });
  };
}

export function uploadSelfieAction(selfie, userLocalPublicAddress, doctype) {
  const form = new FormData();
  form.append("file", selfie);
  const name = selfie.name || "";
  return async dispatch => {
    const network = await web3.eth.net.getNetworkType();
    dispatch({
      type: actionTypes.UPLOADING_SELFIE,
      payload: name
    });
    httpClient({
      method: "post",
      url: `${config.api_base_url}/db/users/document/upload?useraddress=${userLocalPublicAddress}&doctype=${doctype}&network=${network}`,
      data: form,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.SELFIE_UPLOAD_SUCCESS,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: actionTypes.SELFIE_UPLOAD_FAILED,
            payload: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.SELFIE_UPLOAD_FAILED,
          payload: err.message
        });
      });
  };
}

export function uploadAddressDocAction(addressDoc, userLocalPublicAddress, doctype) {
  const form = new FormData();
  form.append("file", addressDoc);
  const name = addressDoc.name || "";
  return async dispatch => {
    const network = await web3.eth.net.getNetworkType();
    dispatch({
      type: actionTypes.UPLOADING_ADDRESS_DOC,
      payload: name
    });
    httpClient({
      method: "post",
      url: `${config.api_base_url}/db/users/document/upload?useraddress=${userLocalPublicAddress}&doctype=${doctype}&network=${network}`,
      data: form,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: actionTypes.ADDRESS_DOC_UPLOAD_SUCCESS,
            payload: response.data.data
          });
        } else {
          dispatch({
            type: actionTypes.ADDRESS_DOC_UPLOAD_FAILED,
            payload: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: actionTypes.ADDRESS_DOC_UPLOAD_FAILED,
          payload: err.message
        });
      });
  };
}

export function backButtonAction(currentStep) {
  let nextStep = 0;
  if (currentStep <= 0) {
    nextStep = 0;
  } else {
    nextStep = currentStep - 1;
  }
  return dispatch => {
    dispatch({
      type: actionTypes.BACK_BUTTON_PRESSED,
      payload: nextStep
    });
  };
}

export function nextButtonAction(currentStep) {
  let nextStep = 0;
  if (currentStep >= 7) {
    nextStep = 7;
  } else {
    nextStep = currentStep + 1;
  }
  return dispatch => {
    dispatch({
      type: actionTypes.NEXT_BUTTON_PRESSED,
      payload: nextStep
    });
  };
}

export function conditionOneAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.CONDITION_ONE_CHANGED,
      payload: value
    });
  };
}

export function conditionTwoAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.CONDITION_TWO_CHANGED,
      payload: value
    });
  };
}

export function conditionThreeAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.CONDITION_THREE_CHANGED,
      payload: value
    });
  };
}

export function conditionFourAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.CONDITION_FOUR_CHANGED,
      payload: value
    });
  };
}

export function addressLine1ChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ADDRESS_LINE1_CHANGED,
      payload: value
    });
  };
}

export function addressLine2ChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.ADDRESS_LINE2_CHANGED,
      payload: value
    });
  };
}

export function cityChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.CITY_CHANGED,
      payload: value
    });
  };
}

export function stateChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_STATE_CHANGED,
      payload: value
    });
  };
}

export function postalCodeChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.POSTAL_CODE_CHANGED,
      payload: value
    });
  };
}

export function countryChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.COUNTRY_CHANGED,
      payload: value
    });
  };
}

export function typeOfDocumentChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.TYPE_OF_DOCUMENT_CHANGED,
      payload: value
    });
  };
}

export function documentNumberChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.DOCUMENT_NUMBER_CHANGED,
      payload: value
    });
  };
}

export function dateOfIssuanceChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.DATE_OF_ISSUANCE_CHANGED,
      payload: value
    });
  };
}

export function dateOfExpirationChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.DATE_OF_EXPIRATION_CHANGED,
      payload: value
    });
  };
}

export function firstNameChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.FIRST_NAME_CHANGED,
      payload: value
    });
  };
}

export function lastNameChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.LAST_NAME_CHANGED,
      payload: value
    });
  };
}

export function genderChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.GENDER_CHANGED,
      payload: value
    });
  };
}

export function dateOfBirthChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.DATE_OF_BIRTH_CHANGED,
      payload: value
    });
  };
}

export function citizenshipChangedAction(value) {
  return dispatch => {
    dispatch({
      type: actionTypes.CITIZENSHIP_CHANGED,
      payload: value
    });
  };
}
