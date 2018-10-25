import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Form, Input, Button, Divider, Checkbox } from "semantic-ui-react";
import {
  sendOtp,
  countryCodeChanged,
  phoneNumberChanged,
  userOtpChanged,
  verifyPhoneNumber,
  isIssuerFlagToggled,
  checkVaultMembership,
  requestVaultMembership,
} from "../../actions/signinManagerActions";
import { CUICard } from "../../helpers/material-ui";
import {Grid} from "../../helpers/react-flexbox-grid";
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
      this.props.countryCode,
    );
  };

  handleIssuerFlagToggled = (event, data) => {
    console.log("click", data);
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
          this.props.vaultPaymentPendingStatus ? (
            <div>Your approval is pending at our end. Our team shall process it at the earliest possible.</div>
          ) : (
            <div>
              <Button onClick={this.handleVaultMembershipTransaction}>Request Vault Membership</Button>
            </div>
          )
        ) : (
          <Grid>
            <CUICard style={{ padding: "40px 40px", width: "450px", margin: '0 auto' }}>
              <div>
                <div className="sbhdr-txt push--bottom txt-xl">Phone Number Registration form</div>
                <Form>
                  <label>Phone Number:</label>
                  <Form.Group inline>
                    <Form.Field>
                      <Input placeholder="+91" onChange={this.handleCountryCodeChanged} />
                    </Form.Field>
                    <Form.Field>
                      <Input placeholder="9096xxxxxx" onChange={this.handlePhoneNumberChanged} />
                    </Form.Field>
                  </Form.Group>

                  <Form.Group inline>
                    <Form.Field>
                      <Button onClick={this.handleSendOtp}> Send OTP</Button>
                    </Form.Field>
                  </Form.Group>

                  <Form.Group inline>
                    <Form.Field>
                      <label style={{position: 'relative', top: '-17px'}}>Please check if you are an Issuer</label>
                      <Checkbox toggle onClick={this.handleIssuerFlagToggled} checked={this.props.isIssuerFlag} />
                    </Form.Field>
                  </Form.Group>

                </Form>
                <Divider />
                <Form>
                  <Form.Field>
                    <label> OTP: </label>
                    <Input placeholder="1234" onChange={this.handleOtpChanged} />
                  </Form.Field>
                  <Form.Field>
                    <Button onClick={this.handleOtpVerification}>Submit</Button>
                  </Form.Field>
                </Form>
                {this.props.otpVerificationSuccessful ? (
                  <div>OTP Verification Successful. Welcome to the Vault</div>
                ) : (
                  <div>OTP Verification Failed.</div>
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
    vaultPaymentPendingStatus,
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
    vaultPaymentPendingStatus,
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
      requestVaultMembership,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
