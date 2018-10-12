import React from "react";
import { CUICard, CUIFormInput, CUIButton } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";

class PDetailCrowdSale extends React.Component {
  render() {
    const {
      individualCap,
      voteSaturationLimit,
      killFrequency,
      initialTapAmount,
      initialFundRelease,
      tapIncrementUnit,
      hardCapCapitalisation,
      dilutedCapitalisation
    } = this.props || {};
    return (
      <CUICard style={{ padding: "40px 50px" }}>
        <div>Project Details</div>
        <Row>
          <Col lg={6}>
            Individual Cap: <span className="text--secondary">{individualCap} ETH/person</span>
          </Col>
          <Col lg={6}>
            Kill Frequency: <span className="text--secondary">{killFrequency}</span>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            Vote Saturation Limit: <span className="text--secondary">{voteSaturationLimit}%</span>
          </Col>
          <Col lg={6}>
            Initial Fund Release
            <span className="text--secondary">
              {initialFundRelease}
              ETH
            </span>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            Initial Tap Amount:
            <span className="text--secondary">{initialTapAmount} ETH</span>
          </Col>
          <Col lg={6}>
            Tap Increment Unit:
            <span className="text--secondary">{tapIncrementUnit} %</span>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            Hard Capitalisation: <span className="text--secondary">{hardCapCapitalisation}$</span>
          </Col>
          <Col lg={6}>
            Diluted Capitalisation: <span className="text--secondary">{dilutedCapitalisation}$</span>
          </Col>
        </Row>
      </CUICard>
    );
  }
}

export default PDetailCrowdSale;
