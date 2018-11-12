import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  sendOtp,
  countryCodeChanged,
  phoneNumberChanged,
  userOtpChanged,
  verifyPhoneNumber,
  checkVaultMembership,
  requestVaultMembership
} from "../../actions/userRegistrationActions";
import { CUICard, CUIFormInput, CUIFormInputLabel } from "../../helpers/material-ui";
import { CUIInputType, CUIInputColor } from "../../static/js/variables";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { ButtonComponent } from "../Common/FormComponents";
import actionTypes from "../../action_types";

class OtpVerification extends Component {
  //   componentDidMount() {
  //     if (this.props.userLocalPublicAddress) {
  //       this.props.checkVaultMembership(this.props.userLocalPublicAddress);
  //     }
  //   }

  handleSendOtp = event => {
    this.props.sendOtp(this.props.phoneNumber, this.props.countryCode);
  };

  handleVaultMembershipTransaction = event => {
    this.props.requestVaultMembership(this.props.userLocalPublicAddress);
  };

  handlePhoneNumberChanged = e => {
    this.props.phoneNumberChanged(e.target.value);
  };

  handleCountryCodeChanged = e => {
    this.props.countryCodeChanged(e.target.value);
  };

  handleOtpVerification = () => {
    this.props.verifyPhoneNumber(
      this.props.otpFromServer,
      this.props.otpFromUser,
      this.props.isIssuerFlag,
      this.props.userLocalPublicAddress,
      this.props.phoneNumber,
      this.props.countryCode
    );
  };

  handleOtpChanged = e => {
    this.props.userOtpChanged(e.target.value);
  };

  getErrorMsg = propName => {
    const { errors } = this.props || {};
    if (errors) {
      if (errors.hasOwnProperty(propName)) {
        return errors[propName];
      }
      return "";
    }
    return "";
  };

  render() {
    const { countryCode, phoneNumber, isPhoneNumberVerified, otpFromServer, otpFromUser } = this.props || {};
    return (
      <div>
        {isPhoneNumberVerified ? (
          <div>Go to next page.</div>
        ) : (
          <Grid>
            <CUICard style={{ padding: "40px 40px", width: "450px", margin: "0 auto" }}>
              <div>
                <div className="sbhdr-txt push--bottom txt-xl">Phone Number Registration form</div>
                <Row>
                  <Col xs={12} lg={4}>
                    <CUIFormInput
                      inputType={CUIInputType.SELECT}
                      full
                      inputName="Country Code"
                      inputLabel="Country Code"
                      inputPlaceholder="+91"
                      inputValue={countryCode}
                      onChange={this.handleCountryCodeChanged}
                      disabled={otpFromServer !== ""}
                      items={[{ value: "+91", primaryText: "+91" }]}
                    />
                  </Col>
                  <Col xs={12} lg={8}>
                    <CUIFormInput
                      inputType={CUIInputType.TEXT}
                      full
                      forceNumeric
                      inputName="Phone Number"
                      inputLabel="Phone Number"
                      inputPlaceholder="9096xxxxxx"
                      inputValue={phoneNumber}
                      onChange={this.handlePhoneNumberChanged}
                      error={!!this.getErrorMsg(actionTypes.PHONE_NUMBER_CHANGED)}
                      helperText={this.getErrorMsg(actionTypes.PHONE_NUMBER_CHANGED)}
                      disabled={otpFromServer !== ""}
                    />
                  </Col>
                </Row>
                <Row className="push--top">
                  <Col>
                    <ButtonComponent label="Send OTP" onClick={this.handleSendOtp} disabled={phoneNumber === "" || otpFromServer !== ""} />
                  </Col>
                </Row>

                {/* <Row className="push--top"><Col><CUIDivider /></Col></Row> */}

                <Row>
                  <Col xs={12} lg={4}>
                    <CUIFormInput
                      inputType={CUIInputType.TEXT}
                      full
                      inputValue={otpFromUser}
                      inputName="OTP"
                      inputLabel="OTP"
                      inputPlaceholder="1234"
                      onChange={this.handleOtpChanged}
                      error={!!this.getErrorMsg(actionTypes.USER_OTP_INPUT_CHANGED)}
                      helperText={this.getErrorMsg(actionTypes.USER_OTP_INPUT_CHANGED)}
                    />
                  </Col>
                </Row>

                {this.props.otpVerificationSuccessful ? (
                  <div className="push--top">OTP Verification Successful. Go to next step.</div>
                ) : (
                  <div>
                    {this.props.phoneOrAddressExists ? <div>Your public address or Phone number already exists with another account.</div> : null}
                  </div>
                )}
              </div>
            </CUICard>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userLocalPublicAddress } = state.signinManagerData || {};
  const {
    phoneNumber,
    countryCode,
    otpFromUser,
    otpFromServer,
    otpVerificationSuccessful,
    isVaultMember,
    isPhoneNumberVerified,
    vaultPaymentPendingStatus,
    phoneOrAddressExists,
    errors
  } = state.userRegistrationData || {};
  return {
    phoneNumber,
    countryCode,
    otpFromUser,
    otpFromServer,
    otpVerificationSuccessful,
    userLocalPublicAddress,
    isVaultMember,
    isPhoneNumberVerified,
    vaultPaymentPendingStatus,
    phoneOrAddressExists,
    errors
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendOtp,
      phoneNumberChanged,
      countryCodeChanged,
      userOtpChanged,
      verifyPhoneNumber,
      checkVaultMembership,
      requestVaultMembership
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OtpVerification);
