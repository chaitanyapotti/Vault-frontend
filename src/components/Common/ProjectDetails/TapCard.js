import React, { Component } from "react";
import { CUICard, CUIFormInput, CUIButton } from "../../../helpers/material-ui";
import { CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../../Common/SocialLinks";
import ButtonComponent from '../FormComponents/ButtonComponent';

class TapCard extends Component {
  render() {
    const { currentTapAmount, tapIncrementUnit, incrementApproval } = this.props || {};
    return (
      <div>
        <CUICard style={{ padding: "40px 50px" }}>
          <div className="txt-xxxl text--primary">Tap Increment</div>
          <Row className="push-top--35">
            <Col lg={6} className="txt">
              Current Tap Amount: <span className="text--secondary">{currentTapAmount} ETH</span>{" "}
            </Col>
            <Col lg={6} className="txt">
              Tap increment Factor: <span className="text--secondary">{tapIncrementUnit}%</span>{" "}
            </Col>
          </Row>

          <Row>
            <Col lg={12} className="txt">
              Increment Approval: <span className="text--secondary">{incrementApproval}%</span>{" "}
            </Col>
          </Row>
          <div className="text-right">
            <ButtonComponent
                type='danger'
                onClick={()=> this.uploadDaico()}
                label="Approve"
            />
          </div>
        </CUICard>
      </div>
    );
  }
}

export default TapCard;
