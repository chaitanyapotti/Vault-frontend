import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  sendOtp,
  countryCodeChanged,
  phoneNumberChanged,
  userOtpChanged,
  verifyPhoneNumber,
  isIssuerFlagToggled,
  checkVaultMembership,
  requestVaultMembership
} from "../../actions/signinManagerActions";
import { CUICard, CUIFormInput, CUIFormInputLabel } from "../../helpers/material-ui";
import { CUIInputType, CUIInputColor } from "../../static/js/variables";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import LoadingButton from "../../components/Common/LoadingButton";
import { ButtonComponent } from "../../components/Common/FormComponents";

class Register extends Component {
  componentDidMount() {
    if (this.props.userLocalPublicAddress) {
      this.props.checkVaultMembership(this.props.userLocalPublicAddress);
    }
  }

  handleSendOtp = event => {
    this.props.sendOtp(this.props.phoneNumber, this.props.countryCode);
  };

  handleVaultMembershipTransaction = event => {
    this.props.requestVaultMembership(this.props.userLocalPublicAddress);
  };

  handlePhoneNumberChanged = (event, data) => {
    this.props.phoneNumberChanged(data.value);
  };

  handleCountryCodeChanged = (event, data) => {
    this.props.countryCodeChanged(data.value);
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

  handleIssuerFlagToggled = (event, data) => {
    this.props.isIssuerFlagToggled();
  };

  handleOtpChanged = (event, data) => {
    this.props.userOtpChanged(data.value);
  };

  render() {
    return (
      <div>
        {this.props.isVaultMember ? (
          <div>You are already a vault member.</div>
        ) : this.props.isPhoneNumberVerified ? (
          vaultPaymentPendingStatus ? (
            <div>Your approval is pending at our end. Our team shall process it at the earliest possible.</div>
          ) : vaultMembershipRequestTransactionHash !== "" ? (
            <div className="hli">
              <a href={link} target="_blank" rel="noreferrer noopener">
                <LoadingButton style={{ padding: "0 40px" }} type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            </div>
          ) : (
            <div>
              <LoadingButton style={{ padding: "0 40px" }} onClick={this.handleVaultMembershipTransaction} loading={isVaultMembershipButtonSpinning}>
                Request Vault Membership
              </LoadingButton>
            </div>
          )
        ) : (
          <Grid>
            <CUICard className="card-brdr" style={{ padding: "40px 40px", width: "450px", margin: "0 auto" }}>
              <div>
                <div className="sbhdr-txt push--bottom txt-xl">Phone Number Registration form</div>
                <Row>
                  <Col xs={12} lg={4}>
                    <CUIFormInput
                      inputType={CUIInputType.TEXT}
                      full
                      inputName="Country Code"
                      inputLabel="Country Code"
                      inputPlaceholder="+91"
                      onChange={this.handleCountryCodeChanged}
                    />
                  </Col>
                  <Col xs={12} lg={8}>
                    <CUIFormInput
                      inputType={CUIInputType.TEXT}
                      full
                      inputName="Phone Number"
                      inputLabel="Phone Number"
                      inputPlaceholder="9096xxxxxx"
                      onChange={this.handlePhoneNumberChanged}
                    />
                  </Col>
                </Row>
                <Row className="push--top">
                  <Col>
                    <ButtonComponent label="Send OTP" onClick={this.handleSendOtp} />
                  </Col>
                </Row>

                <Row className="push--top">
                  <Col>
                    <CUIFormInputLabel
                      control={
                        <CUIFormInput
                          inputType={CUIInputType.CHECKBOX}
                          inputColor={CUIInputColor.PRIMARY}
                          inputChecked={this.props.isIssuerFlag}
                          onChange={this.handleIssuerFlagToggled}
                        />
                      }
                      label="Please check if you are an Issuer"
                    />
                  </Col>
                </Row>

                {/* <Row className="push--top"><Col><CUIDivider /></Col></Row> */}

                <Row>
                  <Col xs={12} lg={4}>
                    <CUIFormInput
                      inputType={CUIInputType.TEXT}
                      full
                      inputName="OTP"
                      inputLabel="OTP"
                      inputPlaceholder="1234"
                      onChange={this.handleOtpChanged}
                    />
                  </Col>
                </Row>
                <Row className="push--top">
                  <Col>
                    <ButtonComponent label="Verify OTP" onClick={this.handleOtpVerification} />
                  </Col>
                </Row>

                {this.props.otpVerificationSuccessful ? (
                  <div className="push--top">OTP Verification Successful. Welcome to the Vault</div>
                ) : (
                  <div className="push--top">OTP Verification Failed.</div>
                )}
              </div>
            </CUICard>
          </Grid>
        )}

        <div />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    phoneNumber,
    countryCode,
    otpFromUser,
    otpFromServer,
    otpVerificationSuccessful,
    isIssuerFlag,
    userLocalPublicAddress,
    isVaultMember,
    isPhoneNumberVerified,
    vaultPaymentPendingStatus
  } = state.signinManagerData || {};
  return {
    phoneNumber,
    countryCode,
    otpFromUser,
    otpFromServer,
    otpVerificationSuccessful,
    isIssuerFlag,
    userLocalPublicAddress,
    isVaultMember,
    isPhoneNumberVerified,
    vaultPaymentPendingStatus
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
      isIssuerFlagToggled,
      checkVaultMembership,
      requestVaultMembership
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
