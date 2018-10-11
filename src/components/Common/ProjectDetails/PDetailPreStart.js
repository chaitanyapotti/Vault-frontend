import React, { Component } from "react";
import { CUICard, CUIFormInput } from "../../../helpers/material-ui";
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
        <div>Project Details</div>
        <Row>
          <Col lg={6}>
            ICO Start Date: <span className="text--secondary">{icoStartDate}</span>
          </Col>
          <Col lg={6}>
            Individual Cap: <span className="text--secondary">{individualCap} ETH/person</span>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            Vote Saturation Limit: <span className="text--secondary">{voteSaturationLimit}%</span>
          </Col>
          <Col lg={6}>
            Kill Frequency: <span className="text--secondary">{killFrequency}</span>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            Initial Tap Amount:
            <span className="text--secondary">
              {initialTapAmount}
              ETH/month
            </span>
          </Col>
          <Col lg={6}>
            Tap Increment Percent:
            <span className="text--secondary">{tapIncrementUnit}%</span>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            Hard Capitalisation: <span className="text--secondary">${hardCapCapitalisation}</span>
          </Col>
          <Col lg={6}>
            Diluted Capitalisation: <span className="text--secondary">${dilutedCapitalisation}</span>
          </Col>
        </Row>
      </CUICard>
    );
  }
}

export default PDetailPreStart;
