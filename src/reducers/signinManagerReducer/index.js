/* global document, window */
/* eslint no-underscore-dangle: 0 */
import types from "../../action_types";

export const initialState = {
  userRegistered: false,
  userServerPublicAddress: "",
  userIsIssuer: false,
  userLocalPublicAddress: "",
  userPreviousLocalPublicAddress: "",
  otpFromServer: "",
  otpFromUser: "",
  otpFailed: false,
  otpFailedMessage: "",
  showRegistrationForm: false,
  phoneNumber: "",
  countryCode: "",
  otpVerificationSuccessful: false,
  isIssuerFlag: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.USER_REGISTRATION_CHECK_SUCCESS:
      const { publicAddress } = action.payload || "";
      const { isIssuer } = action.payload || false;
      return {
        ...state,
        userRegistered: true,
        userServerPublicAddress: publicAddress,
        userIsIssuer: isIssuer,
        userPreviousLocalPublicAddress: publicAddress
      };
    case types.USER_LOCAL_ACCOUNT_ADDRESS:
      return {
        ...state,
        userLocalPublicAddress: action.payload,
        userPreviousLocalPublicAddress: action.payload
      };
    case types.USER_DEFAULT_ACCOUNT_CHANGED:
      return {
        ...state,
        userRegistered: false,
        userIsIssuer: false,
        userServerPublicAddress: "",
        userLocalPublicAddress: action.payload,
        userPreviousLocalPublicAddress: action.payload
      };

    case types.OTP_SENT_TO_USER_SUCCESS:
      return {
        ...state,
        otpFailed: false,
        otpFromServer: action.payload
      };

    case types.OTP_SENT_TO_USER_FAILED:
      return {
        ...state,
        otpFailed: true,
        otpFailedMessage: action.payload
      };

    case types.SHOW_REGISTRATION_FORM:
      return {
        ...state,
        showRegistrationForm: true
      };

    case types.HIDE_REGISTRATION_FORM:
      return {
        ...state,
        showRegistrationForm: false
      };

    case types.PHONE_NUMBER_CHANGED:
      return {
        ...state,
        phoneNumber: action.payload
      };

    case types.COUNTRY_CODE_CHANGED:
      return {
        ...state,
        countryCode: action.payload
      };

    case types.USER_OTP_INPUT_CHANGED:
      return {
        ...state,
        otpFromUser: action.payload
      };

    case types.PHONE_VERIFICATION_SUCCESS: {
      const { publicAddress } = action.payload || "";
      return {
        ...state,
        otpVerificationSuccessful: true,
        userRegistered: true,
        userServerPublicAddress: publicAddress
      };
    }

    case types.PHONE_VERIFICATION_FAILED:
      return {
        ...state,
        otpVerificationSuccessful: false,
        userRegistered: false
      };

    case types.IS_ISSUER_FLAG_TOGGLED:
      const isIssuerFlag = state.isIssuerFlag;
      return {
        ...state,
        isIssuerFlag: !isIssuerFlag
      };

    case types.VAULT_MEMBERSHIP_CHECK:
      const { result } = action.payload || false;
      return {
        ...state,
        isVaultMember: result
      };

    default:
      return state;
  }
}
