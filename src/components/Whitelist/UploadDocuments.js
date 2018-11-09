import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col } from '../../helpers/react-flexbox-grid';
import { CUIDivider } from '../../helpers/material-ui';
import { uploadPassportDocAction, uploadSelfieAction, uploadAddressDocAction } from "../../actions/userRegistrationActions";

class UploadDocuments extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    passportDocChanged = e => {
        this.props.uploadPassportDocAction(e.target.files[0], this.props.userLocalPublicAddress, 'passport');
    };

    selfieChanged = e => {
        this.props.uploadSelfieAction(e.target.files[0], this.props.userLocalPublicAddress, 'selfie');
    };

    addressDocChanged = e => {
        this.props.uploadAddressDocAction(e.target.files[0], this.props.userLocalPublicAddress, 'address');
    };

    render() { 
        return ( 
            <div>
                <div className="txt-m txt-dbld text--center">STEP: 5 Upload Documents</div>
                <div className="txt push--top">
                    Please upload copies of personal documents providing identity and residence
                </div>
                <div className="txt-m txt-dbld">ID Document Requiremnents</div>
                <ul className="txt push--top">
                    <li>It can be nationallly recognised passport, your identity card, or driver's license</li>
                </ul>

                <Row className="push--top">
                    {/* <Col lg={6} className="upld-img-plachldr">
                        <div>Space for Image display</div>
                    </Col> */}
                    <Col lg={6}>
                        <div className="txt-m txt-dbld push-top--50">Upload Passport Document</div>
                        <div className="push-half"><input name="passportDoc" type="file" accept="image/*, application/pdf" onChange={this.passportDocChanged} /></div>
                        <div>{this.props.passportFileName}</div>
                        <div className="txt">Accepted file types: jpg, png, jpeg, pdf</div>
                        <div className="txt push--top">2 MB maximum file size</div>
                    </Col>
                </Row>
                <div className="push--top"><CUIDivider/></div>

                <div className="txt-m txt-dbld push--top">Selfie Requirements</div>
                <ul className="txt push--top">
                    <li>Passport size and colour photograph</li>
                    <li>It should be clear headshot image</li>
                </ul>

                <Row className="push--top">
                    {/* <Col lg={6} className="upld-img-plachldr">
                        <div>Space for Image display</div>
                    </Col> */}
                    <Col lg={6}>
                        <div className="txt-m txt-dbld push-top--50">Upload Selfie</div>
                        <div className="push-half"><input name="selfie" type="file" accept="image/*" onChange={this.selfieChanged} /></div>
                        <div>{this.props.selfieFileName}</div>
                        <div className="txt">Accepted file types: jpg, png, jpeg, pdf</div>
                        <div className="txt push--top">2 MB maximum file size</div>
                    </Col>
                </Row>
                <div className="push--top"><CUIDivider/></div>

                <div className="txt-m txt-dbld push--top">Proof of Address Requirements</div>
                <ul className="txt push--top">
                    <li>Utility bill with registered name, no older than 3 months</li>
                    <li>eg. Gas Bill, Phone Bill, Water Bill, Bank Statement etc.</li>
                </ul>

                <Row className="push--top">
                    {/* <Col lg={6} className="upld-img-plachldr">
                        <div className="txt-m txt-dbld">Upload Proof of Address</div>
                    </Col> */}
                    <Col lg={6}>
                        <div className="txt-m txt-dbld push-top--50">Upload Proof of Address</div>
                        <div className="push-half"><input name="addressDoc" type="file" accept="image/*, application/pdf" onChange={this.addressDocChanged} /></div>
                        <div>{this.props.addressFileName}</div>
                        <div className="txt">Accepted file types: jpg, png, jpeg, pdf</div>
                        <div className="txt push--top">2 MB maximum file size</div>
                    </Col>
                </Row>
            </div> 
        );
    }
}

const mapStateToProps = state => {
    const { userLocalPublicAddress } = state.signinManagerData || {};
    const { passportFileName,
        selfieFileName,
        addressFileName } = state.userRegistrationData || {}
    return {
        userLocalPublicAddress,
        passportFileName,
        selfieFileName,
        addressFileName
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            uploadPassportDocAction,
            uploadSelfieAction,
            uploadAddressDocAction
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadDocuments);