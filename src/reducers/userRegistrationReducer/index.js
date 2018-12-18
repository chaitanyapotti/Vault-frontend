/* global document, window */
/* eslint no-underscore-dangle: 0 */
import actionTypes from "../../action_types";
import { countryList } from "../../constants";
import { validateEmail } from "../../helpers/common/validationHelperFunctions";

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
  email: "",
  gender: "",
  dateOfBirth: null,
  citizenship: "",
  countryIndex: 0,
  activeStep: 0,
  phoneNumber: "",
  countryCode: "",
  otpFromUser: "",
  otpFromServer: "",
  otpVerificationSuccessful: false,
  isIssuerFlag: false,
  isVaultMember: false,
  otpFailed: false,
  otpFailedMessage: "",
  conditionOneAccepted: false,
  conditionTwoAccepted: false,
  conditionThreeAccepted: false,
  conditionFourAccepted: false,
  vaultMembershipRequested: false,
  vaultMembershipRequestChecked: false,
  isVaultMembershipButtonSpinning: false,
  vaultMembershipRequestTransactionHash: "",
  errors: {}
};

export default function(state = initialState, action) {
  const localErrors = JSON.parse(JSON.stringify(state.errors));
  switch (action.type) {
    case actionTypes.VAULT_MEMBERSHIP_BUTTON_SPINNING: {
      const { receipt } = action.payload;
      return {
        ...state,
        isVaultMembershipButtonSpinning: receipt
      };
    }
    case actionTypes.VAULT_MEMBERSHIP_REQUEST_TRANSACTION_HASH_RECEIVED: {
      const { transactionHash } = action.payload;
      return {
        ...state,
        vaultMembershipRequestTransactionHash: transactionHash
      };
    }
    case actionTypes.UPLOADING_PASSPORT_DOC: {
      return {
        ...state,
        passportFileName: action.payload
      };
    }

    case actionTypes.VAULT_MEMBERSHIP_REQUEST_CHECK_SUCCESS: {
      return {
        ...state,
        vaultMembershipRequested: action.payload,
        vaultMembershipRequestChecked: true,
        activeStep: 7
      };
    }

    case actionTypes.VAULT_MEMBERSHIP_REQUEST_CHECK_FAILED: {
      return {
        ...state,
        vaultMembershipRequested: action.payload,
        vaultMembershipRequestChecked: true
      };
    }

    case actionTypes.UPLOADING_SELFIE: {
      return {
        ...state,
        selfieFileName: action.payload
      };
    }

    case actionTypes.UPLOADING_ADDRESS_DOC: {
      return {
        ...state,
        addressFileName: action.payload
      };
    }

    case actionTypes.USER_FORM_SUBMISSION_SUCCESS: {
      return {
        ...state
      };
    }

    case actionTypes.USER_EMAIL_CHANGED: {
      if (validateEmail(action.payload)) {
        localErrors[actionTypes.USER_EMAIL_CHANGED] = "";
      } else {
        localErrors[actionTypes.USER_EMAIL_CHANGED] = "Not a valid email";
      }
      return {
        ...state,
        email: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.VAULT_MEMBERSHIP_CHECK: {
      return {
        ...state,
        vaultMembershipRequested: true
      };
    }

    case actionTypes.CONDITION_ONE_CHANGED: {
      return {
        ...state,
        conditionOneAccepted: action.payload
      };
    }

    case actionTypes.CONDITION_TWO_CHANGED: {
      return {
        ...state,
        conditionTwoAccepted: action.payload
      };
    }

    case actionTypes.CONDITION_THREE_CHANGED: {
      return {
        ...state,
        conditionThreeAccepted: action.payload
      };
    }

    case actionTypes.CONDITION_FOUR_CHANGED: {
      return {
        ...state,
        conditionFourAccepted: action.payload
      };
    }

    case actionTypes.OTP_SENT_TO_USER_SUCCESS: {
      if (action.payload !== "") {
        localErrors[actionTypes.PHONE_NUMBER_CHANGED] = "";
      }
      if (action.payload !== "") {
        localErrors[actionTypes.USER_OTP_INPUT_CHANGED] = "";
      }
      return {
        ...state,
        otpFailed: false,
        otpFromServer: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.OTP_SENT_TO_USER_FAILED: {
      if (action.payload !== "") {
        localErrors[actionTypes.PHONE_NUMBER_CHANGED] = "The given phone number is invalid or already registered with another public address.";
      }
      if (action.payload !== "") {
        localErrors[actionTypes.USER_OTP_INPUT_CHANGED] = "";
      }
      return {
        ...state,
        otpFailed: true,
        otpFailedMessage: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.PHONE_NUMBER_CHANGED: {
      if (action.payload) {
        localErrors[actionTypes.PHONE_NUMBER_CHANGED] = "";
      }
      return {
        ...state,
        phoneNumber: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.COUNTRY_CODE_CHANGED: {
      let citizenship = "";
      let countryIndex = 0;
      const countryCodeAlpha2 = action.payload
        .slice(-4)
        .replace("(", "")
        .replace(")", "");
      const item = countryList.findIndex(x => x.code === countryCodeAlpha2);
      if (item > 0) {
        countryIndex = item;
        citizenship = countryList[item].name;
      }
      return {
        ...state,
        countryCode: action.payload,
        citizenship,
        countryIndex
      };
    }

    case actionTypes.USER_OTP_INPUT_CHANGED: {
      console.log(action.payload, "ppppp");
      if (action.payload) {
        localErrors[actionTypes.USER_OTP_INPUT_CHANGED] = "";
      }
      return {
        ...state,
        otpFromUser: action.payload,
        errors: localErrors
      };
    }

    case actionTypes.PHONE_VERIFICATION_SUCCESS: {
      return {
        ...state,
        otpVerificationSuccessful: true,
        activeStep: 4
      };
    }

    case actionTypes.PHONE_VERIFICATION_FAILED: {
      if (action.payload !== "") {
        localErrors[actionTypes.USER_OTP_INPUT_CHANGED] = action.payload;
      }
      return {
        ...state,
        otpVerificationSuccessful: false,
        errors: localErrors,
        countryCode: "",
        phoneNumber: "",
        otpFromServer: ""
      };
    }

    case actionTypes.PHONE_VERIFICATION_ERROR: {
      if (action.payload !== "") {
        localErrors[actionTypes.USER_OTP_INPUT_CHANGED] = action.payload;
      }
      return {
        ...state,
        phoneOrAddressExists: true,
        errors: localErrors,
        otpFromServer: ""
      };
    }

    case actionTypes.IS_ISSUER_FLAG_TOGGLED: {
      const isIssuerFlag = state.isIssuerFlag;
      return {
        ...state,
        isIssuerFlag: !isIssuerFlag
      };
    }

    case actionTypes.BACK_BUTTON_PRESSED: {
      return { ...state, activeStep: action.payload };
    }

    case actionTypes.NEXT_BUTTON_PRESSED: {
      return { ...state, activeStep: action.payload };
    }

    case actionTypes.USER_FORM_STATES_SUCCESS: {
      console.log("user form details: ", action.payload);
      if ("state" in action.payload) {
        const { state: oldState } = action.payload;
        return { ...oldState, errors: {}, vaultMembershipRequestChecked: false };
      }
      return { ...state };
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
      // today = new Date();
      // currentYear = today.getFullYear();
      // currentMonth = today.getMonth();
      // currentDay = today.getDate();
      // birth = new Date(action.payload);
      // birthYear = birth.getFullYear();
      // birthMonth = birth.getMonth();
      // birthday = birth.getDate();
      // age = currentYear - birthYear;
      // ageMonth = currentMonth - birthMonth;
      // ageDay = currentDay - birthday;
      // if ((age === 18 && ageMonth <= 0 && ageDay <= 0) || age < 18) {
      //   localErrors[actionTypes.DATE_OF_BIRTH_CHANGED] = "Age should be greater than 18";
      // } else {
      //   localErrors[actionTypes.DATE_OF_BIRTH_CHANGED] = "";
      // }
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
