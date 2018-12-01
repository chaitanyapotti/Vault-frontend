import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput, CUIDivider } from "../../helpers/material-ui";
import { CUIInputType } from "../../static/js/variables";
import { Row, Col } from "../../helpers/react-flexbox-grid";
import DPicker from "../Common/DPicker";
import { ButtonComponent } from "../Common/FormComponents";

import {
  addressLine1ChangedAction,
  addressLine2ChangedAction,
  cityChangedAction,
  stateChangedAction,
  postalCodeChangedAction,
  countryChangedAction,
  typeOfDocumentChangedAction,
  documentNumberChangedAction,
  dateOfIssuanceChangedAction,
  dateOfExpirationChangedAction,
  firstNameChangedAction,
  lastNameChangedAction,
  genderChangedAction,
  dateOfBirthChangedAction,
  citizenshipChangedAction,
  saveUserFormStates,
  emailChangedAction
} from "../../actions/userRegistrationActions";

const countryList = require("country-list");

class BuyersInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null
    };
  }

  componentDidMount() {
    this.props.saveUserFormStates(this.props.userRegistrationData, this.props.userLocalPublicAddress);
  }

  onChangeAddressLine1 = e => {
    this.props.addressLine1ChangedAction(e.target.value);
  };

  onChangeAddressLine2 = e => {
    this.props.addressLine2ChangedAction(e.target.value);
  };

  onChangeCity = e => {
    this.props.cityChangedAction(e.target.value);
  };

  onChangeState = e => {
    this.props.stateChangedAction(e.target.value);
  };

  onChangePostalCode = e => {
    this.props.postalCodeChangedAction(e.target.value);
  };

  onChangeCountry = e => {
    this.props.countryChangedAction(e.target.value);
  };

  onChangeTypeOfDocument = e => {
    this.props.typeOfDocumentChangedAction(e.target.value);
  };

  onChangeDocumentNumber = e => {
    this.props.documentNumberChangedAction(e.target.value);
  };

  onChangeDateOfIssuance = date => {
    this.props.dateOfIssuanceChangedAction(date);
  };

  onChangeDateOfExpiration = date => {
    this.props.dateOfExpirationChangedAction(date);
  };

  onChangeFirstName = e => {
    this.props.firstNameChangedAction(e.target.value);
  };

  onChangeLastName = e => {
    this.props.lastNameChangedAction(e.target.value);
  };

  onChangeEmail = e => {
    this.props.emailChangedAction(e.target.value);
  };

  onChangeGender = e => {
    this.props.genderChangedAction(e.target.value);
  };

  onChangeDateOfBirth = date => {
    this.props.dateOfBirthChangedAction(date);
  };

  onChangeCitizenship = e => {
    this.props.citizenshipChangedAction(e.target.value);
  };

  getEndMinDate = () => {
    let { dateOfIssuance } = this.props || {};
    dateOfIssuance = new Date(dateOfIssuance) || new Date();
    const year = dateOfIssuance && dateOfIssuance.getFullYear();
    const month = dateOfIssuance && dateOfIssuance.getMonth();
    const date = dateOfIssuance && dateOfIssuance.getDate();
    const newDate = new Date(year, month, date);
    return new Date(newDate.setDate(newDate.getDate() + 1));
  };

  getStartDate = () => {
    let { dateOfExpiration } = this.props || {};
    dateOfExpiration = new Date(dateOfExpiration) || new Date();
    const year = dateOfExpiration && dateOfExpiration.getFullYear();
    const month = dateOfExpiration && dateOfExpiration.getMonth();
    const date = dateOfExpiration && dateOfExpiration.getDate();
    const newDate = new Date(year, month, date);
    return new Date(newDate.setDate(newDate.getDate() - 1));
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

  getEndMaxDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const newDate = new Date(year - 18, month, date);
    console.log(newDate);
    return newDate;
  };

  render() {
    const { selectedDate } = this.state || {};
    const countryChoices = [];
    const allCountries = countryList.getNames();
    for (let i = 0; i < allCountries.length; i++) {
      countryChoices.push({ value: allCountries[i], primaryText: allCountries[i] });
    }

    const {
      addressLine1,
      addressLine2,
      country,
      userState,
      city,
      postalCode,
      typeOfDocument,
      citizenship,
      documentNumber,
      dateOfBirth,
      dateOfIssuance,
      dateOfExpiration,
      firstName,
      lastName,
      email,
      gender,
      onClickNext,
      disabledFlag,
      onClickSave
    } = this.props || {};
    return (
      <div>
        <div className="txt-m txt-dbld text--left">Step 5: Buyers Information</div>
        <div className="txt push--top">
          Due to Anti Money Laundering (AML) regulations, we are obliged to require the following information of every token sale participant.
        </div>

        <div className="push--top">
          <CUIDivider />
        </div>
        <div className="txt-m txt-dbld push--top">Residential Address</div>
        <div className="txt push-top--half">
          Please share your residential address. In the next step you will be asked to provide the scan of a document proving your residency.
        </div>
        <CUIFormInput
          required
          inputType={CUIInputType.TEXT}
          full
          inputName="Address Line 1"
          inputLabel="Address Line 1"
          inputPlaceholder="Room no. 1041"
          onChange={this.onChangeAddressLine1}
          inputValue={addressLine1}
        />

        <CUIFormInput
          required
          inputType={CUIInputType.TEXT}
          full
          inputName="Address Line 2"
          inputLabel="Address Line 2"
          inputPlaceholder="200 West"
          onChange={this.onChangeAddressLine2}
          inputValue={addressLine2}
        />

        <Row className="push--top">
          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.TEXT}
              full
              forceAlpha
              inputName="City"
              inputLabel="City"
              inputPlaceholder="New York"
              onChange={this.onChangeCity}
              inputValue={city}
            />
          </Col>

          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.TEXT}
              full
              forceAlpha
              inputName="State / Province / Region"
              inputLabel="State / Province / Region"
              inputPlaceholder="New York"
              onChange={this.onChangeState}
              inputValue={userState}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.TEXT}
              full
              forceNumeric
              inputName="ZIP / Postal Code"
              inputLabel="ZIP / Postal Code"
              inputPlaceholder="10282"
              onChange={this.onChangePostalCode}
              inputValue={postalCode}
            />
          </Col>

          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.SELECT}
              full
              inputName="Country"
              inputLabel="Country"
              inputPlaceholder="USA"
              onChange={this.onChangeCountry}
              inputValue={country}
              items={countryChoices}
              // items={[{ value: "USA", primaryText: "USA" }, { value: "INDIA", primaryText: "INDIA" }, { value: "CHINA", primaryText: "CHINA" }]}
            />
          </Col>
        </Row>

        <br />
        <br />
        <div className="txt-m txt-dbld push--top">Passport/ID information</div>

        <Row className="push--top">
          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.SELECT}
              full
              inputName="Type of Document"
              inputLabel="Type of Document"
              inputPlaceholder="PASSPORT"
              onChange={this.onChangeTypeOfDocument}
              inputValue={typeOfDocument}
              items={[{ value: "DRIVER'S LICENSE", primaryText: "DRIVER'S LICENSE" }, { value: "PASSPORT", primaryText: "PASSPORT" }]}
            />
          </Col>

          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.TEXT}
              full
              inputName="Document Number"
              inputLabel="Document Number"
              inputPlaceholder="GB543A32H9"
              onChange={this.onChangeDocumentNumber}
              inputValue={documentNumber}
            />
          </Col>
        </Row>

        <Row className="push--top">
          {dateOfExpiration ? (
            <Col lg={6}>
              <DPicker
                maxDate={this.getStartDate()}
                selectedDate={selectedDate}
                label="Date Of Issuance"
                handleDateChange={this.onChangeDateOfIssuance}
                selectedDate={dateOfIssuance}
              />
            </Col>
          ) : (
            <Col lg={6}>
              <DPicker
                selectedDate={selectedDate}
                label="Date Of Issuance"
                handleDateChange={this.onChangeDateOfIssuance}
                selectedDate={dateOfIssuance}
              />
            </Col>
          )}

          <Col lg={6}>
            <DPicker
              selectedDate={selectedDate}
              label="Expiration Date"
              minDate={this.getEndMinDate()}
              handleDateChange={this.onChangeDateOfExpiration}
              selectedDate={dateOfExpiration}
            />
          </Col>
        </Row>

        <br />
        <br />

        <div className="txt-m txt-dbld push--top">User Details</div>

        <Row className="push--top">
          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.TEXT}
              full
              forceAlpha
              inputName="First Name"
              inputLabel="First Name"
              inputPlaceholder="Mohandas"
              onChange={this.onChangeFirstName}
              inputValue={firstName}
            />
          </Col>

          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.TEXT}
              full
              forceAlpha
              inputName="Last Name"
              inputLabel="Last Name"
              inputPlaceholder="Gandhi"
              onChange={this.onChangeLastName}
              inputValue={lastName}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.SELECT}
              full
              inputName="Gender"
              inputLabel="Gender"
              inputPlaceholder=""
              onChange={this.onChangeGender}
              items={[{ value: "MALE", primaryText: "M" }, { value: "FEMALE", primaryText: "F" }, { value: "OTHER", primaryText: "O" }]}
              inputValue={gender}
            />
          </Col>

          <Col lg={6}>
            <DPicker
              SelectField
              selectedDate={selectedDate}
              disableFuture
              label="Date of Birth"
              handleDateChange={this.onChangeDateOfBirth}
              selectedDate={dateOfBirth}
              maxDate={this.getEndMaxDate()}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.TEXT}
              full
              forceAlpha
              inputName="Email"
              inputLabel="Email"
              inputPlaceholder="mohan@peace.org"
              onChange={this.onChangeEmail}
              inputValue={email}
            />
          </Col>
          {/* <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.SELECT}
              full
              inputName="Country of Citizenship"
              inputLabel="Country of Citizenship"
              inputPlaceholder="USA"
              onChange={this.onChangeCitizenship}
              inputValue={citizenship}
              items={countryChoices}
            />
          </Col> */}
        </Row>
        <span className="float--right">
          <ButtonComponent label="Save" onClick={() => onClickSave()} />
          <span className="push--left">
            <ButtonComponent label="Next" onClick={() => onClickNext()} disabled={disabledFlag} />
          </span>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userRegistrationData } = state || {};
  const { userLocalPublicAddress } = state.signinManagerData || {};
  const {
    addressLine1,
    addressLine2,
    city,
    userState,
    postalCode,
    country,
    typeOfDocument,
    documentNumber,
    dateOfIssuance,
    dateOfExpiration,
    firstName,
    lastName,
    email,
    gender,
    dateOfBirth,
    citizenship,
    errors
  } = state.userRegistrationData || {};
  return {
    userLocalPublicAddress,
    addressLine1,
    addressLine2,
    city,
    userState,
    postalCode,
    country,
    typeOfDocument,
    documentNumber,
    dateOfIssuance,
    dateOfExpiration,
    firstName,
    lastName,
    email,
    gender,
    dateOfBirth,
    citizenship,
    userRegistrationData,
    errors
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addressLine1ChangedAction,
      addressLine2ChangedAction,
      cityChangedAction,
      stateChangedAction,
      postalCodeChangedAction,
      countryChangedAction,
      typeOfDocumentChangedAction,
      documentNumberChangedAction,
      dateOfIssuanceChangedAction,
      dateOfExpirationChangedAction,
      firstNameChangedAction,
      lastNameChangedAction,
      genderChangedAction,
      dateOfBirthChangedAction,
      citizenshipChangedAction,
      saveUserFormStates,
      emailChangedAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyersInformation);
