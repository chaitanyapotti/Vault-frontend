import React, { Component } from 'react';
import { CUIFormInput, CUIDivider } from "../../helpers/material-ui";
import {CUIInputType} from "../../static/js/variables";
import {Row, Col} from "../../helpers/react-flexbox-grid";
import DTPicker from "../../components/Common/DTPicker";

class BuyersInformation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedDate: null
         }
    }
    onChangeStreet = () => null;

    render() { 
        const {selectedDate} = this.state || {};
        return ( 
            <div>
                <div className="txt-m txt-dbld text--center">STEP: 4 Buyers Information</div>
                <div className="txt push--top">
                    Due to Anti Money Laundering (AML) regulations. We are obliged to require the following information of every token sale participant.
                </div>
                <div className="txt-m txt-dbld push--top">Your Residential Address</div>
                <div className="txt-m push-top--half">Please share your residential address. In the next step you will be asked to provide the scan of a document proving the residency.</div>
                <div className="push--top"><CUIDivider/></div>
                <div className="txt-m txt-dbld push--top">Address</div>
                <CUIFormInput
                    required
                    inputType={CUIInputType.TEXT}
                    full
                    inputName="Street Address"
                    inputLabel="Street Address"
                    inputPlaceholder="Street No. 3"
                    onChange={this.onChangeStreet}
                />
                
                <CUIFormInput
                    required
                    inputType={CUIInputType.TEXT}
                    full
                    inputName="Address Line 2"
                    inputLabel="Address Line 2"
                    inputPlaceholder="Metamask"
                    onChange={this.onChangeIniFundVal}
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
                            onChange={this.onChangeIniFundVal}
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
                            onChange={this.onChangeIniFundVal}
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
                            onChange={this.onChangeIniFundVal}
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
                            onChange={this.onChangeIniFundVal}
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
                            onChange={this.onChangeIniFundVal}
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
                            onChange={this.onChangeIniFundVal}
                        />
                    </Col>
                </Row>

                <Row className="push--top">
                    <Col lg={6}>
                        <DTPicker 
                            selectedDate={selectedDate} 
                            disablePast={true} 
                            label="Date Of Issuance" 
                            handleDateChange={this.onChangeDaicoStart} 
                        />
                    </Col>

                    <Col lg={6}>
                        <DTPicker 
                            selectedDate={selectedDate} 
                            disablePast={true} 
                            label="Expiration Date" 
                            handleDateChange={this.onChangeDaicoStart} 
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
                            onChange={this.onChangeIniFundVal}
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
                            onChange={this.onChangeIniFundVal}
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
                            onChange={this.onChangeIniFundVal}
                        />
                    </Col>

                    <Col lg={6}>
                        <DTPicker 
                            selectedDate={selectedDate} 
                            disablePast={true} 
                            label="Date of Birth" 
                            handleDateChange={this.onChangeDaicoStart} 
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
                            onChange={this.onChangeIniFundVal}
                        />
                    </Col>
                </Row>
            </div> 
        );
    }
}
 
export default BuyersInformation;