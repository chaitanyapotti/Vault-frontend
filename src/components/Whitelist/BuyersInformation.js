import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput, CUIDivider } from "../../helpers/material-ui";
import { CUIInputType } from "../../static/js/variables";
import { Row, Col } from "../../helpers/react-flexbox-grid";
import DTPicker from "../Common/DTPicker";

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
  saveUserFormStates
} from "../../actions/userRegistrationActions";
const countryList = require('country-list');

class BuyersInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: null
    };
  }

  componentDidMount(){
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

  render() {
    const { selectedDate } = this.state || {};
    console.log("country list: ",countryList.getNames())
    let countryChoices = []
    const allCountries = countryList.getNames()
    for (let i=0; i< allCountries.length; i++){
      countryChoices.push({value: allCountries[i], primaryText: allCountries[i]})
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
      gender
    } = this.props || {};
    return (
      <div>
        <div className="txt-m txt-dbld text--center">STEP: 4 Buyers Information</div>
        <div className="txt push--top">
          Due to Anti Money Laundering (AML) regulations. We are obliged to require the following information of every token sale participant.
        </div>
        <div className="txt-m txt-dbld push--top">Your Residential Address</div>
        <div className="txt-m push-top--half">
          Please share your residential address. In the next step you will be asked to provide the scan of a document proving the residency.
        </div>
        <div className="push--top">
          <CUIDivider />
        </div>
        <div className="txt-m txt-dbld push--top">Address</div>
        <CUIFormInput
          required
          inputType={CUIInputType.TEXT}
          full
          inputName="Address Line 1"
          inputLabel="Address Line 1"
          inputPlaceholder="Street No. 3"
          onChange={this.onChangeAddressLine1}
          inputValue={addressLine1}
        />

        <CUIFormInput
          required
          inputType={CUIInputType.TEXT}
          full
          inputName="Address Line 2"
          inputLabel="Address Line 2"
          inputPlaceholder="Pune"
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
              inputPlaceholder="Metamask"
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
              inputPlaceholder="Metamask"
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
              inputPlaceholder="Metamask"
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
              inputPlaceholder="Metamask"
              onChange={this.onChangeCountry}
              inputValue={country}
              items={countryChoices}
              //items={[{ value: "USA", primaryText: "USA" }, { value: "INDIA", primaryText: "INDIA" }, { value: "CHINA", primaryText: "CHINA" }]}
            />
          </Col>
        </Row>
        <div className="txt-m txt-dbld push--top">YOUR PASSPORT / ID INFORMATION</div>

        <Row className="push--top">
          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.SELECT}
              full
              inputName="Type of Document"
              inputLabel="Type of Document"
              inputPlaceholder="Metamask"
              onChange={this.onChangeTypeOfDocument}
              inputValue={typeOfDocument}
              items={[{ value: "DRIVER LICENSE", primaryText: "DRIVER LICENSE" }, { value: "PASSPORT", primaryText: "PASSPORT" }]}
            />
          </Col>

          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.TEXT}
              full
              inputName="Document Number"
              inputLabel="Document Number"
              inputPlaceholder="Metamask"
              onChange={this.onChangeDocumentNumber}
              inputValue={documentNumber}
            />
          </Col>
        </Row>

        <Row className="push--top">
          {dateOfExpiration ? (
            <Col lg={6}>
              <DTPicker
                maxDate={this.getStartDate()}
                selectedDate={selectedDate}
                label="Date Of Issuance"
                handleDateChange={this.onChangeDateOfIssuance}
                selectedDate={dateOfIssuance}
              />
            </Col>
          ) : (
            <Col lg={6}>
              <DTPicker
                selectedDate={selectedDate}
                label="Date Of Issuance"
                handleDateChange={this.onChangeDateOfIssuance}
                selectedDate={dateOfIssuance}
              />
            </Col>
          )}

          <Col lg={6}>
            <DTPicker
              selectedDate={selectedDate}
              label="Expiration Date"
              minDate={this.getEndMinDate()}
              handleDateChange={this.onChangeDateOfExpiration}
              selectedDate={dateOfExpiration}
            />
          </Col>
        </Row>

        <div className="txt-m txt-dbld push--top">Full Name</div>

        <Row className="push--top">
          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.TEXT}
              full
              forceAlpha
              inputName="First Name"
              inputLabel="First Name"
              inputPlaceholder=""
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
              inputPlaceholder=""
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
              items={[{ value: "MALE", primaryText: "M" }, { value: "FEMALE", primaryText: "F" }]}
              inputValue={gender}
            />
          </Col>

          <Col lg={6}>
            <DTPicker
              selectedDate={selectedDate}
              disableFuture
              label="Date of Birth"
              handleDateChange={this.onChangeDateOfBirth}
              selectedDate={dateOfBirth}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col lg={6}>
            <CUIFormInput
              required
              inputType={CUIInputType.SELECT}
              full
              inputName="Country of Citizenship"
              inputLabel="Country of Citizenship"
              inputPlaceholder=""
              onChange={this.onChangeCitizenship}
              inputValue={citizenship}
              items={countryChoices}
            />
          </Col>
        </Row>
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
    gender,
    dateOfBirth,
    citizenship
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
    gender,
    dateOfBirth,
    citizenship,
    userRegistrationData
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
      saveUserFormStates
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyersInformation);
