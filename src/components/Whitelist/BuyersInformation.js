import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput, CUIDivider } from "../../helpers/material-ui";
import { CUIInputType } from "../../static/js/variables";
import { Row, Col } from "../../helpers/react-flexbox-grid";
import DTPicker from "../../components/Common/DTPicker";
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
    citizenshipChangedAction
} from "../../actions/userRegistrationActions";

class BuyersInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: null
        }
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


    render() {
        const { selectedDate } = this.state || {};
        return (
            <div>
                <div className="txt-m txt-dbld text--center">STEP: 4 Buyers Information</div>
                <div className="txt push--top">
                    Due to Anti Money Laundering (AML) regulations. We are obliged to require the following information of every token sale participant.
                </div>
                <div className="txt-m txt-dbld push--top">Your Residential Address</div>
                <div className="txt-m push-top--half">Please share your residential address. In the next step you will be asked to provide the scan of a document proving the residency.</div>
                <div className="push--top"><CUIDivider /></div>
                <div className="txt-m txt-dbld push--top">Address</div>
                <CUIFormInput
                    required
                    inputType={CUIInputType.TEXT}
                    full
                    inputName="Address Line 1"
                    inputLabel="Address Line 1"
                    inputPlaceholder="Street No. 3"
                    onChange={this.onChangeAddressLine1}
                    inputValue={this.props.addressLine1}
                />

                <CUIFormInput
                    required
                    inputType={CUIInputType.TEXT}
                    full
                    inputName="Address Line 2"
                    inputLabel="Address Line 2"
                    inputPlaceholder="Pune"
                    onChange={this.onChangeAddressLine2}
                    inputValue={this.props.addressLine2}
                />

                <Row className="push--top">
                    <Col lg={6}>
                        <CUIFormInput
                            required
                            inputType={CUIInputType.TEXT}
                            full
                            inputName="City"
                            inputLabel="City"
                            inputPlaceholder="Metamask"
                            onChange={this.onChangeCity}
                            inputValue={this.props.city}
                        />
                    </Col>

                    <Col lg={6}>
                        <CUIFormInput
                            required
                            inputType={CUIInputType.TEXT}
                            full
                            inputName="State / Province / Region"
                            inputLabel="State / Province / Region"
                            inputPlaceholder="Metamask"
                            onChange={this.onChangeState}
                            inputValue={this.props.userState}
                        />
                    </Col>
                </Row>

                <Row className="push--top">
                    <Col lg={6}>
                        <CUIFormInput
                            required
                            inputType={CUIInputType.TEXT}
                            full
                            inputName="ZIP / Postal Code"
                            inputLabel="ZIP / Postal Code"
                            inputPlaceholder="Metamask"
                            onChange={this.onChangePostalCode}
                            inputValue={this.props.postalCode}
                        />
                    </Col>

                    <Col lg={6}>
                        <CUIFormInput
                            required
                            inputType={CUIInputType.TEXT}
                            full
                            inputName="Country"
                            inputLabel="Country"
                            inputPlaceholder="Metamask"
                            onChange={this.onChangeCountry}
                            inputValue={this.props.country}
                        />
                    </Col>
                </Row>
                <div className="txt-m txt-dbld push--top">
                    YOUR PASSPORT / ID INFORMATION
                </div>

                <Row className="push--top">
                    <Col lg={6}>
                        <CUIFormInput
                            required
                            inputType={CUIInputType.TEXT}
                            full
                            inputName="Type of Document"
                            inputLabel="Type of Document"
                            inputPlaceholder="Metamask"
                            onChange={this.onChangeTypeOfDocument}
                            inputValue={this.props.typeOfDocument}
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
                            inputValue={this.props.documentNumber}
                        />
                    </Col>
                </Row>

                <Row className="push--top">
                    <Col lg={6}>
                        <DTPicker
                            selectedDate={selectedDate}
                            disablePast={true}
                            label="Date Of Issuance"
                            handleDateChange={this.onChangeDateOfIssuance}
                            selectedDate={this.props.dateOfIssuance}
                        />
                    </Col>

                    <Col lg={6}>
                        <DTPicker
                            selectedDate={selectedDate}
                            disablePast={true}
                            label="Expiration Date"
                            handleDateChange={this.onChangeDateOfExpiration}
                            selectedDate={this.props.dateOfExpiration}
                        />
                    </Col>
                </Row>

                <div className="txt-m txt-dbld push--top">
                    Full Name
                </div>

                <Row className="push--top">
                    <Col lg={6}>
                        <CUIFormInput
                            required
                            inputType={CUIInputType.TEXT}
                            full
                            inputName="First Name"
                            inputLabel="First Name"
                            inputPlaceholder=""
                            onChange={this.onChangeFirstName}
                            inputValue={this.props.firstName}
                        />
                    </Col>

                    <Col lg={6}>
                        <CUIFormInput
                            required
                            inputType={CUIInputType.TEXT}
                            full
                            inputName="Last Name"
                            inputLabel="Last Name"
                            inputPlaceholder=""
                            onChange={this.onChangeLastName}
                            inputValue={this.props.lastName}
                        />
                    </Col>
                </Row>

                <Row className="push--top">
                    <Col lg={6}>
                        <CUIFormInput
                            required
                            inputType={CUIInputType.TEXT}
                            full
                            inputName="Gender"
                            inputLabel="Gender"
                            inputPlaceholder=""
                            onChange={this.onChangeGender}
                            inputValue={this.props.gender}
                        />
                    </Col>

                    <Col lg={6}>
                        <DTPicker
                            selectedDate={selectedDate}
                            disablePast={true}
                            label="Date of Birth"
                            handleDateChange={this.onChangeDateOfBirth}
                            selectedDate={this.props.dateOfBirth}
                        />
                    </Col>
                </Row>

                <Row className="push--top">
                    <Col lg={6}>
                        <CUIFormInput
                            required
                            inputType={CUIInputType.TEXT}
                            full
                            inputName="Country of Citizenship"
                            inputLabel="Country of Citizenship"
                            inputPlaceholder=""
                            onChange={this.onChangeCitizenship}
                            inputValue={this.props.citizenship}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { userLocalPublicAddress } = state.signinManagerData || {};
    const { addressLine1,
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
        citizenship } = state.userRegistrationData || {}
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
        citizenship
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
            citizenshipChangedAction
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyersInformation);