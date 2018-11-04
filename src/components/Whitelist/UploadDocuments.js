import React, { Component } from 'react';
import { Row, Col } from '../../helpers/react-flexbox-grid';
import { CUIDivider } from '../../helpers/material-ui';

class UploadDocuments extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
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
                    <Col lg={6} className="upld-img-plachldr">
                        <div>Space for Image display</div>
                    </Col>
                    <Col lg={6}>
                        <div className="txt-m txt-dbld push-top--50">Upload Passport Document</div>
                        <div className="push-half"><input name="thumbnail" type="file" accept="image/*" onChange={this.thumbnailChanged} /></div>
                        <div className="txt">Accepted file types: jpg, png, gif, jpeg</div>
                        <div className="txt push--top">2 MB maximum file size</div>
                    </Col>
                </Row>
                <div className="push--top"><CUIDivider/></div>

                <div className="txt-m txt-dbld push--top">Selfie Requirements</div>
                <ul className="txt push--top">
                    <li>Passport send in colour photograph</li>
                    <li>It should be clear headshot image</li>
                </ul>

                <Row className="push--top">
                    <Col lg={6} className="upld-img-plachldr">
                        <div>Space for Image display</div>
                    </Col>
                    <Col lg={6}>
                        <div className="txt-m txt-dbld push-top--50">Upload Selfie</div>
                        <div className="push-half"><input name="thumbnail" type="file" accept="image/*" onChange={this.thumbnailChanged} /></div>
                        <div className="txt">Accepted file types: jpg, png, gif, jpeg</div>
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
                    <Col lg={6} className="upld-img-plachldr">
                        <div className="txt-m txt-dbld">Upload Proof of Address</div>
                    </Col>
                    <Col lg={6}>
                        <div className="txt-m txt-dbld push-top--50">Upload Proof of Address</div>
                        <div className="push-half"><input name="thumbnail" type="file" accept="image/*" onChange={this.thumbnailChanged} /></div>
                        <div className="txt">Accepted file types: jpg, png, gif, jpeg</div>
                        <div className="txt push--top">2 MB maximum file size</div>
                    </Col>
                </Row>
            </div> 
        );
    }
}
 
export default UploadDocuments;