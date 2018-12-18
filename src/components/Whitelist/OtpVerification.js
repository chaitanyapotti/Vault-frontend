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
import { CUIFormInput } from "../../helpers/material-ui";
import { CUIInputType } from "../../static/js/variables";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { ButtonComponent } from "../Common/FormComponents";
import ReactSelect from "../Common/ReactSelect";
import actionTypes from "../../action_types";

const countryList = require("country-data");

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

  handleCountryCodeChanged = val => {
    const { value } = val || {};
    this.props.countryCodeChanged(value);
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
    const { countryCode, phoneNumber, otpFromServer, otpFromUser, onClickOtp, disabledBackStatus, onClickBack } = this.props || {};
    const countryChoices = [];
    const allCountries = countryList.countries.all;
    for (let index = 0; index < allCountries.length; index += 1) {
      allCountries[index].countryCallingCodes.forEach(element => {
        countryChoices.push({
          value: `${element} - (${allCountries[index].alpha2})`,
          label: `${element} - ${allCountries[index].name} (${allCountries[index].alpha2})`
        });
      });
    }
    return (
      <div>
        <Grid>
          {/* <CUICard className="card-brdr" style={{ padding: "40px 40px", width: "450px", margin: "0 auto" }}> */}
          <div>
            <div className="txt-m txt-dbld text--left">Step 4: Phone Number Verification</div>
            <Row>
              <Col xs={12} lg={4}>
                <ReactSelect full placeholder="+91" data={countryChoices} inputValue={countryCode} onChange={this.handleCountryCodeChanged} />
                {/* <CUIFormInput
                  inputType={CUIInputType.TEXT}
                  full
                  inputName="Country Code"
                  inputLabel="Country Code"
                  inputPlaceholder="+91"
                  inputValue={countryCode}
                  onChange={this.handleCountryCodeChanged}
                  disabled={otpFromServer !== ""}
                  // items={[{ value: "+91", primaryText: "+91" }]}
                /> */}
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
            {/* <Row>{citizenship.length > 0 ? <div> Country detected: {citizenship}</div> : null}</Row> */}
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

            {/* <Row>
              <Col xs={12}>
                <span style={{ color: "red" }} className="txt">
                  Please provide a phone number belonging to your country of citizenship. Vault’s smart contract will assign your country based on
                  your phone numbers country. Your passport will only be used for manual verification.
                </span>
              </Col>
            </Row> */}

            {this.props.otpVerificationSuccessful ? (
              <div className="push--top">OTP Verification Successful. Go to next step.</div>
            ) : (
              <div>
                {this.props.phoneOrAddressExists ? <div>Your public address or Phone number already exists with another account.</div> : null}
              </div>
            )}
          </div>
          <span className="float--right">
            <ButtonComponent label="Back" onClick={() => onClickBack()} disabled={disabledBackStatus} />
            <span className="push--left">
              <ButtonComponent label="Verify OTP" onClick={() => onClickOtp()} disabled={otpFromServer === "" || otpFromUser === ""} />
            </span>
          </span>
          {/* </CUICard> */}
        </Grid>
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
    vaultPaymentPendingStatus,
    phoneOrAddressExists,
    citizenship,
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
    vaultPaymentPendingStatus,
    phoneOrAddressExists,
    citizenship,
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
