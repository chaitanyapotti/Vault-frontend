import React from "react";
import { CUICard, CUIFormInput, CUIButton } from "../../../../helpers/material-ui";
import { CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS } from "../../../../static/js/variables";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import SocialLinks from "../../../Common/SocialLinks";

class ReqType extends React.Component {
  render() {
    const { amount, consensus, endTime } = this.props || {};
    return (
      <div>
        <div>Exceptional Fund Requests</div>
        <Row className="txt-g-secondary push-top--35 txt-m">
          <Col lg={6}>App Redesign</Col>
          <Col lg={6}>20 Aug 2018</Col>
        </Row>

        <div className="txt-g-secondary txt-m">
          <div lg={12}>{amount} ETH</div>
        </div>

        <div className="push--top txt">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in
        </div>

        <Row className="push--top">
          <Col lg={6} className="txt">
            Approval Rate:
            <span className="text--secondary"> {consensus}%</span>{" "}
          </Col>
          <Col lg={6} className="txt">
            Ends in: <span className="text--secondary">{endTime}</span>{" "}
          </Col>
        </Row>

        <div className="push--top">
          <CUIButton
            type={CUIButtonType.RAISED}
            buttonColor={CUIInputColor.PRIMARY}
            id="Deny"
            label={"Deny"}
            // disabled={!this.state.validPassword}
            onClick={() => {
              this.uploadDaico();
            }}
          />
        </div>
      </div>
    );
  }
}

export default ReqType;
