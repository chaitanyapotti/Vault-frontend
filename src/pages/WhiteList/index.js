import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid } from "../../helpers/react-flexbox-grid";
import CustomizedStepper from "../../components/Common/CustomizedStepper";
import { ButtonComponent } from "../../components/Common/FormComponents";
import { CUICard, CUIDivider } from "../../helpers/material-ui";
import { Introduction, EthWallet, TC, BuyersInformation, UploadDocuments, Submit, OtpVerification } from "../../components/Whitelist";
import {
  fetchUserFormStates,
  backButtonAction,
  nextButtonAction,
  saveUserFormStates,
  verifyPhoneNumber
} from "../../actions/userRegistrationActions";
import Loader from "../../components/Loaders/loader";

class WhiteList extends Component {
  componentDidMount() {
    let interval;
    if (!this.props.userLocalPublicAddress) {
      interval = setInterval(() => {
        if (this.props.userLocalPublicAddress) {
          this.props.fetchUserFormStates(this.props.userLocalPublicAddress);
          clearInterval(interval);
        }
      }, 1000);
    } else {
      this.props.fetchUserFormStates(this.props.userLocalPublicAddress);
      clearInterval(interval);
    }
  }

  getSteps = () => [
    "Introducton",
    "ETH Wallet",
    "Term & Conditions",
    "Mobile Number Verification",
    "Buyers Information",
    "Upload Documents",
    "Submit"
  ];

  handleOtpVerification = () => {
    const { verifyPhoneNumber: verifyNumber, otpFromServer, otpFromUser, phoneNumber, countryCode, userLocalPublicAddress, isIssuerFlag } =
      this.props || {};
    verifyNumber(otpFromServer, otpFromUser, userLocalPublicAddress, phoneNumber, countryCode);
  };

  getDisabledStatus = () => {
    const {
      conditionOneAccepted,
      conditionTwoAccepted,
      activeStep: getActiveStep,
      addressLine1,
      addressLine2,
      city,
      citizenship,
      userState,
      postalCode,
      country,
      typeOfDocument,
      documentNumber,
      dateOfIssuance,
      dateOfExpiration,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      passportUrl,
      selfieUrl,
      addressUrl,
      passportFileName,
      selfieFileName,
      addressFileName
    } = this.props || {};
    switch (getActiveStep) {
      case 2:
        return !conditionOneAccepted || !conditionTwoAccepted;
      case 3:
        return false;
      case 4:
        return (
          addressLine1 === "" ||
          addressLine2 === "" ||
          city === "" ||
          citizenship === "" ||
          userState === "" ||
          postalCode === "" ||
          country === "" ||
          typeOfDocument === "" ||
          documentNumber === "" ||
          !dateOfIssuance ||
          !dateOfExpiration ||
          firstName === "" ||
          lastName === "" ||
          gender === "" ||
          !dateOfBirth
        );
      case 5:
        return (
          passportUrl === "" || selfieUrl === "" || addressUrl === "" || (passportFileName === "" || selfieFileName === "" || addressFileName === "")
        );
      case 6:
        return true;
      default:
        return false;
    }
  };

  getBackDisabledStatus = () => {
    const { activeStep: getActiveStep } = this.props || {};
    switch (getActiveStep) {
      case 0:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  getVerifyTokenStatus = () => {
    const { activeStep: getActiveStep } = this.props || {};
    switch (getActiveStep) {
      case 3:
        return true;
      default:
        return false;
    }
  };

  getStepContent = () => {
    switch (this.props.activeStep) {
      case 0:
        return (
          <div className="wht-lst-info-cnt">
            <Introduction />
          </div>
        );
      case 1:
        return (
          <div className="wht-lst-info-cnt">
            <EthWallet />
          </div>
        );
      case 2:
        return (
          <div className="wht-lst-info-cnt">
            <TC />
          </div>
        );
      case 3:
        return (
          <div className="wht-lst-info-cnt">
            <OtpVerification />
          </div>
        );
      case 4:
        return (
          <div className="wht-lst-info-cnt">
            <BuyersInformation />
          </div>
        );
      case 5:
        return (
          <div className="wht-lst-info-cnt">
            <UploadDocuments />
          </div>
        );
      case 6:
        return (
          <div className="wht-lst-info-cnt">
            {" "}
            <Submit />{" "}
          </div>
        );
      default:
        return <div>Default ka kuch karo</div>;
    }
  };

  handleBack = () => {
    const { activeStep: getActiveStep, backButtonAction: BackAction } = this.props || {};
    BackAction(getActiveStep);
    // this.setState(state => ({
    //   activeStep: state.activeStep - 1,
    // }));
  };

  handleNext = () => {
    const { activeStep: getActiveStep, nextButtonAction: nextAction } = this.props || {};
    nextAction(getActiveStep);
    // this.setState(state => ({
    //     activeStep: state.activeStep + 1,
    //   }));
  };

  handleSave = () => {
    console.log("user registration data: ", this.props.userRegistrationData);
    this.props.saveUserFormStates(this.props.userRegistrationData, this.props.userLocalPublicAddress);
  };

  render() {
    const {
      otpFromServer,
      otpFromUser,
      isIssuerChecked,
      isMetamaskNetworkChecked,
      isMetamaskInstallationChecked,
      isUserDefaultAccountChecked,
      isVaultMembershipChecked,
      signinStatusFlag
    } = this.props || {};
    return (
      <div>
        {isIssuerChecked && isMetamaskNetworkChecked && isMetamaskInstallationChecked && isUserDefaultAccountChecked && isVaultMembershipChecked ? (
          <div>
            {signinStatusFlag === 3 ? (
              <div>
                {this.props.userLocalPublicAddress ? (
                  <Grid>
                    <CUICard style={{ padding: "40px 40px", marginBottom: "40px" }}>
                      <CustomizedStepper getStepContent={this.getStepContent} getSteps={this.getSteps} activeStep={this.props.activeStep} />
                      <div className="push-top--50">
                        <CUIDivider />
                      </div>
                      <div className="push--top text--center">
                        <ButtonComponent label="Back" onClick={this.handleBack} disabled={this.getBackDisabledStatus()} />
                        <span className="push--left">
                          <ButtonComponent label="Save" onClick={this.handleSave} />
                        </span>
                        {this.getVerifyTokenStatus() ? (
                          <span className="push--left">
                            <ButtonComponent
                              label="Verify OTP"
                              onClick={this.handleOtpVerification}
                              disabled={otpFromServer === "" || otpFromUser === ""}
                            />
                          </span>
                        ) : (
                          <span className="push--left">
                            <ButtonComponent label="Next" onClick={this.handleNext} disabled={this.getDisabledStatus()} />
                          </span>
                        )}
                      </div>
                    </CUICard>
                  </Grid>
                ) : (
                  <Grid>
                    <Loader rows={6} />
                  </Grid>
                )}
              </div>
            ) : (
              this.props.history.push("/")
            )}
          </div>
        ) : (
          <Grid>
            <Loader rows={6} />
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userRegistrationData } = state || {};
  const {
    userLocalPublicAddress,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked,
    signinStatusFlag
  } = state.signinManagerData || {};
  const {
    activeStep,
    conditionOneAccepted,
    conditionTwoAccepted,
    phoneNumber,
    countryCode,
    otpFromUser,
    otpFromServer,
    otpVerificationSuccessful,
    addressLine1,
    addressLine2,
    city,
    citizenship,
    userState,
    postalCode,
    country,
    typeOfDocument,
    documentNumber,
    dateOfIssuance,
    dateOfExpiration,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    passportUrl,
    selfieUrl,
    addressUrl,
    passportFileName,
    selfieFileName,
    addressFileName
  } = state.userRegistrationData || {};
  return {
    userLocalPublicAddress,
    activeStep,
    userRegistrationData,
    conditionOneAccepted,
    conditionTwoAccepted,
    phoneNumber,
    countryCode,
    otpFromUser,
    otpFromServer,
    otpVerificationSuccessful,
    addressLine1,
    addressLine2,
    city,
    citizenship,
    userState,
    postalCode,
    country,
    typeOfDocument,
    documentNumber,
    dateOfIssuance,
    dateOfExpiration,
    firstName,
    lastName,
    gender,
    dateOfBirth,
    passportUrl,
    selfieUrl,
    addressUrl,
    passportFileName,
    selfieFileName,
    addressFileName,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked,
    signinStatusFlag
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUserFormStates,
      backButtonAction,
      nextButtonAction,
      saveUserFormStates,
      verifyPhoneNumber
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhiteList);
