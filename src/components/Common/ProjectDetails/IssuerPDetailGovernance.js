import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";

const IssuerPDetailGovernance = props => {
  const { voteSaturationLimit, killAttemptsLeft, killFrequency, nextKillAttempt, totalRefundableBalance, killConsensus } = props || {};
  return (
    <CUICard style={{ padding: "40px 50px" }}>
      <div className="txt-xxxl text--primary">Project Details</div>
      <Row className="push-half--top">
        <Col lg={6} className="txt">
          Vote Saturation Limit: <span className="text--secondary">{voteSaturationLimit}%</span>
        </Col>
        <Col lg={6} className="txt">
          Kill Attempts Left: <span className="text--secondary">{killAttemptsLeft}</span>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          Kill Frequency: <span className="text--secondary">{killFrequency}</span>
        </Col>
        <Col lg={6} className="txt">
          Next Kill Attempt: <span className="text--secondary">{nextKillAttempt}</span>
        </Col>
      </Row>
      <Row className="push-top--35 txt txt-g-secondary ">
        <Col lg={6}>
          Total Refundable Balance: <span className="text--secondary">{totalRefundableBalance} ETH</span>
        </Col>
        <Col lg={6}>
          Kill Consensus: <span className="text--secondary">{killConsensus}%</span>
        </Col>
      </Row>
    </CUICard>
  );
};

export default IssuerPDetailGovernance;
