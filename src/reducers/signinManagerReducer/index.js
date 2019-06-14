/* global document, window */
/* eslint no-underscore-dangle: 0 */
import types from "../../action_types";

export const initialState = {
  userRegistered: false,
  userServerPublicAddress: "",
  userIsIssuer: false,
  userLocalPublicAddress: "",
  userPreviousLocalPublicAddress: null,
  showRegistrationForm: false,
  otpVerificationSuccessful: false,
  isIssuerFlag: false,
  isVaultMember: false,
  isPhoneNumberVerified: false,
  vaultPaymentPendingStatus: false,
  signinStatusFlag: 0,
  networkName: "",
  metamaskPreviousInstallationState: null,
  metamaskPreviousNetworkName: "",
  isIssuerChecked: false,
  isMetamaskNetworkChecked: false,
  isMetamaskInstallationChecked: false,
  isUserDefaultAccountChecked: false,
  isVaultMembershipChecked: false,
  isDeploymentIndicatorChecked: false,
  deploymentIndicator: null,
  manageDaico: false,
  project_id: "",
  reloadPage: false,
  userDetails: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.PAGE_RELOADING: {
      return {
        ...state,
        reloadPage: false
      };
    }
    case types.PROJECT_REGISTRATION_SUCCESS: {
      return {
        ...state,
        manageDaico: true,
        project_id: action.payload
      };
    }

    case types.PROJECT_DEPLOYMENT_INDICATOR_SUCCESS: {
      let manageDaico = false;
      // const project_id = state.project_id || "";
      const { _id } = action.payload || "";
      if ("currentDeploymentIndicator" in action.payload) {
        manageDaico = true;
      }
      return {
        ...state,
        manageDaico,
        project_id: _id
      };
    }

    case types.USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload
      };
    }

    case types.ISISSUER_CHECK: {
      const isIssuer = action.payload;
      const signinStatusFlag = state.signinStatusFlag;
      if (signinStatusFlag === 4 && isIssuer) {
        return { ...state, signinStatusFlag: 5, isIssuerChecked: true };
      }
      if (isIssuer) {
        return { ...state, userIsIssuer: true, isIssuerChecked: true };
      }
      return { ...state, userIsIssuer: false, isIssuerChecked: true };
    }

    case types.METAMASK_NETWORK: {
      // if (action.payload === "main") {
      return {
        ...state,
        networkName: action.payload,
        metamaskPreviousNetworkName: action.payload,
        isMetamaskNetworkChecked: true
      };
      // }
      // return {
      //   ...state,
      //   signinStatusFlag: 2,
      //   networkName: action.payload,
      //   metamaskPreviousNetworkName: action.payload,
      //   isMetamaskNetworkChecked: true,
      //   isIssuerChecked: true,
      //   isUserDefaultAccountChecked: true,
      //   isVaultMembershipChecked: true
      // };
    }

    case types.METAMASK_INSTALLATION_STATUS_CHECK: {
      if (action.payload) {
        return {
          ...state,
          metamaskPreviousInstallationState: action.payload,
          isMetamaskInstallationChecked: true
        };
      }
      return {
        ...state,
        signinStatusFlag: 0,
        metamaskPreviousInstallationState: action.payload,
        isMetamaskInstallationChecked: true,
        isMetamaskNetworkChecked: true,
        isIssuerChecked: true,
        isUserDefaultAccountChecked: true,
        isVaultMembershipChecked: true
      };
    }

    case types.USER_REGISTRATION_CHECK_SUCCESS: {
      const { publicAddress } = action.payload || "";
      const { isIssuer } = action.payload || false;
      return {
        ...state,
        userRegistered: true,
        userServerPublicAddress: publicAddress,
        userIsIssuer: isIssuer,
        userPreviousLocalPublicAddress: publicAddress
      };
    }

    case types.USER_LOCAL_ACCOUNT_ADDRESS: {
      return {
        ...state,
        userLocalPublicAddress: action.payload,
        userPreviousLocalPublicAddress: action.payload
      };
    }

    case types.USER_DEFAULT_ACCOUNT_CHANGED: {
      // const networkName = state.networkName;
      let { reloadPage, userPreviousLocalPublicAddress } = state || {};
      if (userPreviousLocalPublicAddress && userPreviousLocalPublicAddress !== action.payload && action.payload !== "") {
        reloadPage = true;
      }
      if (action.payload !== "") {
        return {
          ...state,
          userRegistered: false,
          userIsIssuer: false,
          isVaultMember: false,
          userServerPublicAddress: "",
          userLocalPublicAddress: action.payload,
          userPreviousLocalPublicAddress: action.payload,
          isUserDefaultAccountChecked: true,
          reloadPage
        };
      }
      return {
        ...state,
        userRegistered: false,
        userIsIssuer: false,
        isVaultMember: false,
        userServerPublicAddress: "",
        userLocalPublicAddress: "",
        userPreviousLocalPublicAddress: "",
        signinStatusFlag: 1,
        isUserDefaultAccountChecked: true,
        isIssuerChecked: true,
        isMetamaskNetworkChecked: true,
        isVaultMembershipChecked: true,
        reloadPage
      };

      // if (action.payload !== "") {
      //   return {
      //     ...state,
      //     userRegistered: false,
      //     userIsIssuer: false,
      //     isVaultMember: false,
      //     userServerPublicAddress: "",
      //     userLocalPublicAddress: action.payload,
      //     userPreviousLocalPublicAddress: action.payload,
      //     isUserDefaultAccountChecked: true,
      //     signinStatusFlag: 2,
      //     reloadPage
      //   };
      // }
      // return {
      //   ...state,
      //   userRegistered: false,
      //   userIsIssuer: false,
      //   isVaultMember: false,
      //   userServerPublicAddress: "",
      //   userLocalPublicAddress: "",
      //   userPreviousLocalPublicAddress: "",
      //   signinStatusFlag: 1,
      //   isUserDefaultAccountChecked: true,
      //   isIssuerChecked: true,
      //   isMetamaskNetworkChecked: true,
      //   isVaultMembershipChecked: true,
      //   reloadPage
      // };
    }

    case types.SHOW_REGISTRATION_FORM: {
      return {
        ...state,
        showRegistrationForm: true
      };
    }

    case types.HIDE_REGISTRATION_FORM: {
      return {
        ...state,
        showRegistrationForm: false
      };
    }

    case types.VAULT_MEMBERSHIP_CHECK: {
      let signinStatusFlag;
      const userIsIssuer = state.userIsIssuer;
      if (action.payload) {
        if (userIsIssuer) {
          signinStatusFlag = 5;
        } else {
          signinStatusFlag = 4;
        }
      } else {
        signinStatusFlag = 3;
      }
      return {
        ...state,
        isVaultMember: action.payload,
        signinStatusFlag,
        userIsIssuer,
        isVaultMembershipChecked: true
      };
    }

    case types.VAULT_MEMBERSHIP_PAYMENT_CHECK_SUCCESS:
      return {
        ...state,
        vaultPaymentPendingStatus: action.payload
      };

    default:
      return state;
  }
}
