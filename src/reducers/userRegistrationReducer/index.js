/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";

export const initialState = {
    passportUrl: "",
    passportFileName: "",
    selfieUrl: "",
    selfieFileName: "",
    addressUrl: "",
    addressFileName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    userState: "",
    postalCode: "",
    country: "",
    typeOfDocument: "",
    documentNumber: "",
    dateOfIssuance: null,
    dateOfExpiration: null,
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: null,
    citizenship: "",
    activeStep: 0,
    phoneNumber: "",
    countryCode: "",
    otpFromUser: "",
    otpFromServer: "",
    otpVerificationSuccessful: false,
    isIssuerFlag: false,
    isVaultMember: false,
    isPhoneNumberVerified: false,
    otpFailed: false,
    otpFailedMessage: "",
    conditionOneAccepted: false, 
    conditionTwoAccepted: false,
    vaultMembershipRequested: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actionTypes.UPLOADING_PASSPORT_DOC:{
            return {
                ...state, 
                passportFileName: action.payload
            }
        }

        case actionTypes.UPLOADING_SELFIE:{
            return {
                ...state, 
                selfieFileName: action.payload
            }
        }

        case actionTypes.UPLOADING_ADDRESS_DOC:{
            return {
                ...state, 
                addressFileName: action.payload
            }
        }

        case actionTypes.USER_FORM_SUBMISSION_SUCCESS: {
            console.log("user form submitted")
            return {
                ...state
            }
        }

        case actionTypes.VAULT_MEMBERSHIP_CHECK: {
            return {
                ...state,
                vaultMembershipRequested: true
            }
        }

        case actionTypes.CONDITION_ONE_CHANGED: {
            return {
                ...state, 
                conditionOneAccepted: action.payload
            }
        }

        case actionTypes.CONDITION_TWO_CHANGED: {
            return {
                ...state, 
                conditionTwoAccepted: action.payload
            }
        }

        case actionTypes.OTP_SENT_TO_USER_SUCCESS:{
            return {
              ...state,
              otpFailed: false,
              otpFromServer: action.payload
            };
          }
      
          case actionTypes.OTP_SENT_TO_USER_FAILED:{
            return {
              ...state,
              otpFailed: true,
              otpFailedMessage: action.payload
            };
          }

          case actionTypes.PHONE_NUMBER_CHANGED:{
            return {
              ...state,
              phoneNumber: action.payload
            };
          }

          case actionTypes.COUNTRY_CODE_CHANGED:{
            return {
              ...state,
              countryCode: action.payload
            };
          }

          case actionTypes.USER_OTP_INPUT_CHANGED:{
            return {
              ...state,
              otpFromUser: action.payload
            };
          }

          case actionTypes.PHONE_VERIFICATION_SUCCESS: {
            return {
              ...state,
              otpVerificationSuccessful: true,
              activeStep: 4
            };
          }

          case actionTypes.PHONE_VERIFICATION_FAILED:{
            return {
              ...state,
              otpVerificationSuccessful: false
            };
          }

          case actionTypes.PHONE_VERIFICATION_ERROR: {
              return {
                  ...state, 
                  phoneOrAddressExists: true
              }
          }

          case actionTypes.IS_ISSUER_FLAG_TOGGLED: {
            const isIssuerFlag = state.isIssuerFlag;
            return {
              ...state,
              isIssuerFlag: !isIssuerFlag
            };
          }

          case actionTypes.PHONE_NUMBER_IS_VERIFIED:{
            return {
              ...state,
              isPhoneNumberVerified: true
            };
          }
            
      
          case actionTypes.PHONE_NUMBER_IS_NOT_VERIFIED:{
            return {
              ...state,
              isPhoneNumberVerified: false
            };
          }


        case actionTypes.BACK_BUTTON_PRESSED: {
            return { ...state, activeStep: action.payload }
        }

        case actionTypes.NEXT_BUTTON_PRESSED: {
            return { ...state, activeStep: action.payload }
        }

        case actionTypes.USER_FORM_STATES_SUCCESS: {
            console.log("user form details: ", action.payload)
            if ('state' in action.payload) {
                const { state: oldState } = action.payload
                return { ...oldState }
            } else {
                return { ...state }
            }
        }

        case actionTypes.PASSPORT_UPLOAD_SUCCESS: {
            return {
                ...state,
                passportUrl: action.payload
            };
        }

        case actionTypes.SELFIE_UPLOAD_SUCCESS: {
            return {
                ...state,
                selfieUrl: action.payload
            };
        }

        case actionTypes.ADDRESS_DOC_UPLOAD_SUCCESS: {
            return {
                ...state,
                addressUrl: action.payload
            };
        }

        case actionTypes.ADDRESS_LINE1_CHANGED: {
            return {
                ...state,
                addressLine1: action.payload
            };
        }

        case actionTypes.ADDRESS_LINE2_CHANGED: {
            return {
                ...state,
                addressLine2: action.payload
            };
        }

        case actionTypes.CITY_CHANGED: {
            return {
                ...state,
                city: action.payload
            };
        }

        case actionTypes.USER_STATE_CHANGED: {
            return {
                ...state,
                userState: action.payload
            };
        }

        case actionTypes.POSTAL_CODE_CHANGED: {
            return {
                ...state,
                postalCode: action.payload
            };
        }

        case actionTypes.COUNTRY_CHANGED: {
            return {
                ...state,
                country: action.payload
            };
        }

        case actionTypes.TYPE_OF_DOCUMENT_CHANGED: {
            return {
                ...state,
                typeOfDocument: action.payload
            };
        }

        case actionTypes.DOCUMENT_NUMBER_CHANGED: {
            return {
                ...state,
                documentNumber: action.payload
            };
        }

        case actionTypes.DATE_OF_ISSUANCE_CHANGED: {
            return {
                ...state,
                dateOfIssuance: action.payload
            };
        }

        case actionTypes.DATE_OF_EXPIRATION_CHANGED: {
            return {
                ...state,
                dateOfExpiration: action.payload
            };
        }

        case actionTypes.FIRST_NAME_CHANGED: {
            return {
                ...state,
                firstName: action.payload
            };
        }

        case actionTypes.LAST_NAME_CHANGED: {
            return {
                ...state,
                lastName: action.payload
            };
        }

        case actionTypes.GENDER_CHANGED: {
            return {
                ...state,
                gender: action.payload
            };
        }

        case actionTypes.DATE_OF_BIRTH_CHANGED: {
            return {
                ...state,
                dateOfBirth: action.payload
            };
        }

        case actionTypes.CITIZENSHIP_CHANGED: {
            return {
                ...state,
                citizenship: action.payload
            };
        }



        default:
            return state;
    }
}
