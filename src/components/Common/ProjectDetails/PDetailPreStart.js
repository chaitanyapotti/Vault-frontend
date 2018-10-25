import React, { Component } from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";

class PDetailPreStart extends Component {
  render() {
    const {
      icoStartDate,
      individualCap,
      voteSaturationLimit,
      killFrequency,
      initialTapAmount,
      tapIncrementUnit,
      hardCapCapitalisation,
      dilutedCapitalisation
    } = this.props || {};
    return (
      <CUICard style={{ padding: "40px 50px" }}>
        <div className="txt-xxxl text--primary">Project Details</div>
        <Row className="push-top--35">
          <Col lg={6} className="txt">
            ICO Start Date: <span className="text--secondary">{icoStartDate}</span>
          </Col>
          <Col lg={6} className="txt">
            Individual Cap: <span className="text--secondary">{individualCap} ETH/person</span>
          </Col>
        </Row>

        <Row className="push-half--top">
          <Col lg={6} className="txt">
            Vote Saturation Limit: <span className="text--secondary">{voteSaturationLimit}%</span>
          </Col>
          <Col lg={6} className="txt">
            Kill Frequency: <span className="text--secondary">{killFrequency}</span>
          </Col>
        </Row>

        <Row className="push-half--top">
          <Col lg={6} className="txt">
            Initial Tap Amount:
            <span className="text--secondary">{initialTapAmount} ETH/month</span>
          </Col>
          <Col lg={6} className="txt">
            Tap Increment Factor:
            <span className="text--secondary">{tapIncrementUnit}</span>
          </Col>
        </Row>

        <Row className="push-half--top">
          <Col lg={6} className="txt">
            Hard Cap Capitalisation: <span className="text--secondary">${hardCapCapitalisation}</span>
          </Col>
          <Col lg={6} className="txt">
            Diluted Capitalisation: <span className="text--secondary">${dilutedCapitalisation}</span>
          </Col>
        </Row>
      </CUICard>
    );
  }
}

export default PDetailPreStart;
