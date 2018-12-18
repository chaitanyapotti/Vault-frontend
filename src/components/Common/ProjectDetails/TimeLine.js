/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React from "react";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { CUILinearProgress, CUICard } from "../../../helpers/material-ui";
import { significantDigits, formatDate } from "../../../helpers/common/projectDetailhelperFunctions";

const TimeLine = props => {
  const { fundsCollected, roundGoal, startDate, endDate } = props || {};
  const progressValue = Math.round((parseFloat(fundsCollected) / parseFloat(roundGoal)) * 100) || 0;
  // Calculate the progress of time
  const totalDays = Math.round((endDate > startDate ? endDate - startDate : 0) / 86400 / 1000);
  const leftDays = Math.round((endDate > new Date() ? endDate - new Date() : 0) / 86400 / 1000);
  const timeProgress = significantDigits((parseFloat(totalDays - leftDays) / parseFloat(totalDays)) * 100);
  const text = progressValue > 100 ? `Round 1 overflow by ${progressValue - 100}%` : `${progressValue} % Goal reached`;
  const className = progressValue <= 100 ? "txt-m text-right text--secondary" : "txt-m text-right text--danger";
  return (
    <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
      <Row>
        <Col lg={6}>
          <div className="txt-xxxl text--primary">DAICO Timeline</div>
        </Col>
        <Col lg={6} className={className}>
          {text}
        </Col>
      </Row>

      <Row className="push--top">
        <Col lg={4} className="txt-m push-half-h--bottom">
          Funds Collected
        </Col>
        <Col lg={4} className="txt-m push-half-h--bottom text-center">
          {significantDigits(fundsCollected)} ETH
        </Col>
        <Col lg={4} className="txt-m push-half-h--bottom text-right">
          {significantDigits(roundGoal)} ETH Goal
        </Col>
      </Row>
      <CUILinearProgress style={{ height: 7, borderRadius: 7 }} value={progressValue} />
      <Row className="push--top">
        <Col lg={5} className="txt-m push-half-h--bottom">
          Started on: {formatDate(startDate)}
        </Col>
        <Col lg={3} className="txt-m push-half-h--bottom text-center">
          Days Left: {leftDays} days
        </Col>
        <Col lg={4} className="txt-m push-half-h--bottom text-right">
          Ends on: {formatDate(endDate)}
        </Col>
      </Row>
      <CUILinearProgress style={{ height: 7, borderRadius: 7 }} value={timeProgress} />
    </CUICard>
  );
};

export default TimeLine;
