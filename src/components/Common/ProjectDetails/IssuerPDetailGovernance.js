import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";

const IssuerPDetailGovernance = props => {
  const { voteSaturationLimit, killAttemptsLeft, killFrequency, nextKillAttempt, totalRefundableBalance, killConsensus } = props || {};
  return (
    <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
      <div className="txt-xxxl text--primary">Project Details</div>
      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Vote Saturation Limit: </div>
          <div className="text--secondary">{voteSaturationLimit}%</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Kill Attempts Left: </div>
          <div className="text--secondary">{killAttemptsLeft}</div>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Kill Frequency: </div>
          <div className="text--secondary">{killFrequency}</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Next Kill Attempt: </div>
          <div className="text--secondary">{nextKillAttempt}</div>
        </Col>
      </Row>
      <Row className="push-top--35 txt txt-g-secondary ">
        <Col lg={6}>
          <div className="txt-bold">Total Refundable Balance: </div>
          <div className="text--secondary">{totalRefundableBalance} ETH</div>
        </Col>
        <Col lg={6}>
          <div className="txt-bold">Kill Consensus: </div>
          <div className="text--secondary">{killConsensus}%</div>
        </Col>
      </Row>
    </CUICard>
  );
};

export default IssuerPDetailGovernance;
