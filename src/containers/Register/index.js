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
  isIssuerFlagToggled
} from "../../actions/signinManagerActions";

class Register extends Component {
  handleSendOtp = event => {
    this.props.sendOtp(this.props.phoneNumber, this.props.countryCode);
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
    console.log("click", data);
    this.props.isIssuerFlagToggled();
  };

  handleOtpChanged = (event, data) => {
    this.props.userOtpChanged(data.value);
  };

  render() {
    return (
      <div>
        This is registration form
        <Form>
          <Form.Group inline>
            <Form.Field>
              <label>Phone Number</label>
              <Input placeholder="(xxx)" onChange={this.handleCountryCodeChanged} />
            </Form.Field>
            <Form.Field>
              <Input placeholder="xxxxxxxxxxx" onChange={this.handlePhoneNumberChanged} />
            </Form.Field>
            <Form.Field>
              <label>Please check if you are an Issuer</label>
              <Checkbox toggle onClick={this.handleIssuerFlagToggled} checked={this.props.isIssuerFlag} />
            </Form.Field>
            <Form.Field>
              <Button onClick={this.handleSendOtp}> Send OTP</Button>
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
        {this.props.otpVerificationSuccessful ? <div>OTP Verification Successful. Welcome to the Vault</div> : <div>OTP Verification Failed.</div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { phoneNumber, countryCode, otpFromUser, otpFromServer, otpVerificationSuccessful, isIssuerFlag, userLocalPublicAddress } =
    state.signinManagerData || {};
  return {
    phoneNumber: phoneNumber,
    countryCode,
    otpFromUser,
    otpFromServer,
    otpVerificationSuccessful,
    isIssuerFlag,
    userLocalPublicAddress
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendOtp: sendOtp,
      phoneNumberChanged: phoneNumberChanged,
      countryCodeChanged: countryCodeChanged,
      userOtpChanged: userOtpChanged,
      verifyPhoneNumber: verifyPhoneNumber,
      isIssuerFlagToggled: isIssuerFlagToggled
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);
