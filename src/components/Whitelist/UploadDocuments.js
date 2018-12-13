import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Avatar from "@material-ui/core/Avatar";
import { Row, Col } from "../../helpers/react-flexbox-grid";
import { CUIAvatar, CUIChip } from "../../helpers/material-ui";
import { uploadPassportDocAction, uploadSelfieAction, uploadAddressDocAction } from "../../actions/userRegistrationActions";
import { ButtonComponent } from "../Common/FormComponents";

class UploadDocuments extends Component {
  state = {
    selfie: ""
  };

  passportDocChanged = e => {
    if (e.target.files[0]) {
      this.props.uploadPassportDocAction(e.target.files[0], this.props.userLocalPublicAddress, "passport");
    }
  };

  selfieChanged = e => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = event => {
        this.setState({ selfie: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
      this.props.uploadSelfieAction(e.target.files[0], this.props.userLocalPublicAddress, "selfie");
    }
  };

  addressDocChanged = e => {
    this.props.uploadAddressDocAction(e.target.files[0], this.props.userLocalPublicAddress, "address");
  };

  render() {
    const { passportFileName, selfieFileName, addressFileName, onClickNext, disabledFlag, disabledBackStatus, onClickBack, onClickSave } =
      this.props || {};
    const idType = passportFileName && passportFileName.split(".");
    const addressType = addressFileName && addressFileName.split(".");
    const selfieType = selfieFileName && selfieFileName.split(".");
    return (
      <div>
        <div className="txt-m txt-dbld text--left">Step 6: Upload Documents</div>
        <div className="txt push--top">Please upload copies of personal documents providing identity and residence</div>
        <br />
        <br />
        <div className="txt-m txt-dbld">ID Document Requirements</div>
        <div className="txt push--top">Uploaded document can be any of the following,</div>
        <ul className="txt">
          <li>Passport</li>
          <li>Driver's license</li>
          <li>Any other national identity card</li>
        </ul>

        {/* <div className="txt push--top">, your identity card, or driver's license</div> */}

        <Row className="push--top">
          {/* <Col lg={6} className="upld-img-plachldr">
                        <div>Space for Image display</div>
                    </Col> */}
          <Col lg={8}>
            {/* <div className="txt-m txt-dbld push-top--50">Upload Passport Document</div> */}
            <div className="push-half">
              <label htmlFor="passport-upload" className="uploadBtn btn bg--primary txt txt-dddbld text--white">
                <div className="btn-padding">Upload National ID</div>
              </label>
              <input id="passport-upload" name="passportDoc" type="file" accept="image/*, application/pdf" onChange={this.passportDocChanged} />
              <span className="push--left">
                {passportFileName && <CUIChip avatar={<Avatar>{(idType[1]|| "").toUpperCase()}</Avatar>} label={idType[0]} />}
              </span>
            </div>

            <div className="txt">Accepted file types: jpg, png, jpeg, pdf</div>
            <div className="txt">2 MB maximum file size</div>
          </Col>
        </Row>
        {/* <div className="push--top">
          <CUIDivider />
        </div> */}

        <div className="txt-m txt-dbld push-top--50">Selfie Requirements</div>
        <ul className="txt push--top">
          <li>Passport size and colour photograph</li>
          <li>It should be clear headshot image</li>
        </ul>

        <Row className="push--top">
          {/* <Col lg={6} className="upld-img-plachldr">
                        <div>Space for Image display</div>
                    </Col> */}
          <Col lg={8}>
            {/* <div className="txt-m txt-dbld push-top--50">Upload Selfie</div> */}
            <div className="push-half">
              <label htmlFor="selfie-upload" className="uploadBtn btn bg--primary txt txt-dddbld text--white">
                <div className="btn-padding">Upload Selfie</div>
              </label>
              <input id="selfie-upload" type="file" name="selfieDoc" accept="image/*" onChange={this.selfieChanged} />
              <span className="push--left">
                {selfieFileName && this.state.selfie ? null : (
                  <CUIChip avatar={<Avatar>{(selfieType[1]|| "").toUpperCase()}</Avatar>} label={selfieType[0]} />
                )}
              </span>
            </div>
            <div>
              {selfieFileName && this.state.selfie && (
                <CUIAvatar imgSrc={this.state.selfie} style={{ width: "100px", height: "100px", margin: "20px auto" }} />
              )}
            </div>
            <div className="txt">Accepted file types: jpg, png, jpeg, pdf</div>
            <div className="txt">2 MB maximum file size</div>
          </Col>
        </Row>
        <div className="push--top">{/* <CUIDivider /> */}</div>

        <div className="txt-m txt-dbld push-top--50">Proof of Address Requirements</div>
        <ul className="txt push--top">
          <li>Utility bill with registered name, no older than 3 months</li>
          <li>eg. Gas Bill, Phone Bill, Water Bill, Bank Statement etc.</li>
        </ul>

        <Row className="push--top">
          {/* <Col lg={6} className="upld-img-plachldr">
                        <div className="txt-m txt-dbld">Upload Proof of Address</div>
                    </Col> */}
          <Col lg={8}>
            {/* <div className="txt-m txt-dbld push-top--50">Upload Proof of Address</div> */}
            <div className="push-half">
              <label htmlFor="address-upload" className="uploadBtn btn bg--primary txt txt-dddbld text--white">
                <div className="btn-padding">Upload Proof of Address</div>
              </label>
              <input id="address-upload" type="file" accept="image/*, application/pdf" onChange={this.addressDocChanged} />
              <span className="push--left">
                {addressFileName && <CUIChip avatar={<Avatar>{(addressType[1]|| "").toUpperCase()}</Avatar>} label={addressType[0]} />}
              </span>
            </div>
            <div className="txt">Accepted file types: jpg, png, jpeg, pdf</div>
            <div className="txt">2 MB maximum file size</div>
          </Col>
        </Row>
        <span className="float--right">
          <ButtonComponent label="Back" onClick={() => onClickBack()} disabled={disabledBackStatus} />
          <span className="push--left">
            <ButtonComponent label="Save" onClick={() => onClickSave()} />
          </span>
          <span className="push--left">
            {/* <ButtonComponent label="Next" onClick={() => onClickNext()} disabled={disabledFlag} /> */}
            <ButtonComponent label="Next" onClick={() => onClickNext()} />
          </span>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userLocalPublicAddress } = state.signinManagerData || {};
  const { passportFileName, selfieFileName, addressFileName } = state.userRegistrationData || {};
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
