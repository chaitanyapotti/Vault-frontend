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

class WhiteList extends Component {
  componentDidMount() {
    if (this.props.userLocalPublicAddress) {
      this.props.fetchUserFormStates(this.props.userLocalPublicAddress);
    } else {
      this.props.fetchUserFormStates("0xb758c38326Df3D75F1cf0DA14Bb8220Ca4231e74");
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
      addressUrl
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
        return passportUrl === "" || selfieUrl === "" || addressUrl === "";
      default:
        return false;
    }
  };

  getBackDisabledStatus = () => {
    const { activeStep: getActiveStep } = this.props || {};
    switch (getActiveStep) {
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
    const { otpFromServer, otpFromUser } = this.props || {};
    return (
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
                <ButtonComponent label="Verify OTP" onClick={this.handleOtpVerification} disabled={otpFromServer === "" || otpFromUser === ""} />
              </span>
            ) : (
              <span className="push--left">
                <ButtonComponent label="Next" onClick={this.handleNext} disabled={this.getDisabledStatus()} />
              </span>
            )}
          </div>
        </CUICard>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { userRegistrationData } = state || {};
  const { userLocalPublicAddress } = state.signinManagerData || {};
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
    addressUrl
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
    addressUrl
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
