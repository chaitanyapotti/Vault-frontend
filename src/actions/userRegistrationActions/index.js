import axios from "axios";
import FormData from "form-data";
import actionTypes from "../../action_types";
import config from "../../config";
import constants from "../../constants";

const httpClient = axios.create();


export function saveUserFormStates(userFormData, userLocalPublicAddress) {
    return dispatch =>
        axios
            .post(`${config.api_base_url}/db/users/formstates?useraddress=${userLocalPublicAddress}`, userFormData)
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
}

export function fetchUserFormStates(userLocalPublicAddress){
    return dispatch => 
    axios
      .get(`${config.api_base_url}/db/users/formstates`, { params: { useraddress: userLocalPublicAddress } })
      .then( response => {
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
      }).catch(error => {
        console.log(error)
        dispatch({
          type: actionTypes.USER_FORM_STATES_FAILED,
          payload: constants.USER_FORM_STATES_FAILED_MESSAGE
        });
      })
  }

export function uploadPassportDocAction(passportDoc, userLocalPublicAddress, doctype) {
    const form = new FormData();
    form.append("file", passportDoc);
    return dispatch => {
        dispatch({
            type: actionTypes.UPLOADING_PASSPORT_DOC,
            payload: true
        });
        httpClient({
            method: "post",
            url: `${config.api_base_url}/db/users/document/upload?useraddress=${userLocalPublicAddress}&doctype=${doctype}`,
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
    return dispatch => {
        dispatch({
            type: actionTypes.UPLOADING_SELFIE,
            payload: true
        });
        httpClient({
            method: "post",
            url: `${config.api_base_url}/db/users/document/upload?useraddress=${userLocalPublicAddress}&doctype=${doctype}`,
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
    return dispatch => {
        dispatch({
            type: actionTypes.UPLOADING_ADDRESS_DOC,
            payload: true
        });
        httpClient({
            method: "post",
            url: `${config.api_base_url}/db/users/document/upload?useraddress=${userLocalPublicAddress}&doctype=${doctype}`,
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
