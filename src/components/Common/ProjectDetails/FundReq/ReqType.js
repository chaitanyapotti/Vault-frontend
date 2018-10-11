import React from "react";
import { CUICard, CUIFormInput, CUIButton } from "../../../../helpers/material-ui";
import { CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS } from "../../../../static/js/variables";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import SocialLinks from "../../../Common/SocialLinks";

class ReqType extends React.Component {
  render() {
    const {
      etherRequested,
      approvalRate,
      endsIn
    } = this.props || {}
    return (
      <div>
        <div>Exceptional Fund Requests</div>
        <Row>
          <Col lg={6}>App Redesign</Col>
          <Col lg={6}>20 Aug 2018</Col>
        </Row>

        <div>
          <div lg={12}>{this.props.etherRequested} ETH</div>
        </div>

        <div>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in
        </div>

        <Row>
          <Col lg={6}>
            Approval Rate:
            <span className="text--secondary"> {this.props.approvalRate}%</span>{" "}
          </Col>
          <Col lg={6}>
            Ends in: <span className="text--secondary">{this.props.endsIn}</span>{" "}
          </Col>
        </Row>

        <div>
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
