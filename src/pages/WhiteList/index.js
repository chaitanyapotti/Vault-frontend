import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid } from "../../helpers/react-flexbox-grid";
import VerticalStepper from "../../components/Common/VerticalStepper";
import { CUICard } from "../../helpers/material-ui";
import { Introduction, EthWallet, TC, BuyersInformation, UploadDocuments, Submit, OtpVerification, Done } from "../../components/Whitelist";
import {
  fetchUserFormStates,
  backButtonAction,
  nextButtonAction,
  saveUserFormStates,
  verifyPhoneNumber
} from "../../actions/userRegistrationActions";
import Loader from "../../components/Loaders/loader";
import actionTypes from "../../action_types";

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
    "Mobile Verification",
    "Buyers Information",
    "Upload Documents",
    "Submit",
    "Done"
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
      conditionThreeAccepted,
      conditionFourAccepted,
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
      addressFileName,
      email,
      errors
    } = this.props || {};
    switch (getActiveStep) {
      case 2:
        return !conditionOneAccepted || !conditionTwoAccepted || !conditionThreeAccepted || !conditionFourAccepted;
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
          email === "" ||
          !dateOfBirth ||
          errors[actionTypes.USER_EMAIL_CHANGED] !== ""
        );
      case 5:
        return (
          passportUrl === "" || selfieUrl === "" || addressUrl === "" || (passportFileName === "" || selfieFileName === "" || addressFileName === "")
        );
      case 6:
        return true;
      case 7:
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
            <Introduction onClickNext={this.handleNext} disabledFlag={this.getDisabledStatus()} />
          </div>
        );
      case 1:
        return (
          <div className="wht-lst-info-cnt">
            <EthWallet
              onClickNext={this.handleNext}
              onClickBack={this.handleBack}
              disabledFlag={this.getDisabledStatus()}
              disabledBackStatus={this.getBackDisabledStatus()}
            />
          </div>
        );
      case 2:
        return (
          <div className="wht-lst-info-cnt">
            <TC
              onClickNext={this.handleNext}
              onClickBack={this.handleBack}
              disabledFlag={this.getDisabledStatus()}
              disabledBackStatus={this.getBackDisabledStatus()}
            />
          </div>
        );
      case 3:
        return (
          <div className="wht-lst-info-cnt">
            <OtpVerification
              onClickOtp={this.handleOtpVerification}
              onClickBack={this.handleBack}
              disabledBackStatus={this.getBackDisabledStatus()}
            />
          </div>
        );
      case 4:
        return (
          <div className="wht-lst-info-cnt">
            <BuyersInformation onClickSave={this.handleSave} onClickNext={this.handleNext} disabledFlag={this.getDisabledStatus()} />
          </div>
        );
      case 5:
        return (
          <div className="wht-lst-info-cnt">
            <UploadDocuments
              onClickNext={this.handleNext}
              onClickBack={this.handleBack}
              onClickSave={this.handleSave}
              disabledFlag={this.getDisabledStatus()}
              disabledBackStatus={this.getBackDisabledStatus()}
            />
          </div>
        );
      case 6:
        return (
          <div className="wht-lst-info-cnt">
            {" "}
            <Submit onClickBack={this.handleBack} onClickSave={this.handleSave} disabledBackStatus={this.getBackDisabledStatus()} />{" "}
          </div>
        );
      case 7:
        return (
          <div className="wht-lst-info-cnt">
            {" "}
            <Done history={this.props.history} />{" "}
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
    this.props.saveUserFormStates(this.props.userRegistrationData, this.props.userLocalPublicAddress);
    // this.setState(state => ({
    //     activeStep: state.activeStep + 1,
    //   }));
  };

  handleSave = () => {
    // console.log("user registration data: ", this.props.userRegistrationData);
    this.props.saveUserFormStates(this.props.userRegistrationData, this.props.userLocalPublicAddress);
  };

  render() {
    const {
      isIssuerChecked,
      isMetamaskNetworkChecked,
      isMetamaskInstallationChecked,
      isUserDefaultAccountChecked,
      isVaultMembershipChecked,
      signinStatusFlag
    } = this.props || {};
    return (
      <div style={{ marginBottom: "50px" }}>
        {isIssuerChecked && isMetamaskNetworkChecked && isMetamaskInstallationChecked && isUserDefaultAccountChecked && isVaultMembershipChecked ? (
          <div>
            {signinStatusFlag === 3 ? (
              <div>
                {this.props.userLocalPublicAddress ? (
                  <Grid>
                    <CUICard className="card-brdr" style={{ padding: "40px 40px", marginBottom: "40px" }}>
                      <VerticalStepper getStepContent={this.getStepContent} getSteps={this.getSteps} activeStep={this.props.activeStep} />
                      {/* <div className="push-top--50">{ <CUIDivider /> }</div> */}
                      {/* <div className="push--top text--right">
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
                      </div> */}
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
    conditionThreeAccepted,
    conditionFourAccepted,
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
    errors
  } = state.userRegistrationData || {};
  return {
    userLocalPublicAddress,
    activeStep,
    userRegistrationData,
    conditionOneAccepted,
    conditionTwoAccepted,
    conditionThreeAccepted,
    conditionFourAccepted,
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
    signinStatusFlag,
    errors
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
