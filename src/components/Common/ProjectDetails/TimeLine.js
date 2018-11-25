/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React from "react";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { CUILinearProgress, CUICard } from "../../../helpers/material-ui";

const TimeLine = props => {
  const { fundsCollected, roundGoal, startDate, endDate } = props || {};
  const progressValue = Math.round((parseFloat(fundsCollected) / parseFloat(roundGoal)) * 100);
  // Calculate the progress of time
  const totalDays = Math.round((endDate > startDate ? endDate - startDate : 0) / 86400 / 1000);
  const leftDays = Math.round((endDate > new Date() ? endDate - new Date() : 0) / 86400 / 1000);
  const timeProgress = Math.round((parseFloat(totalDays - leftDays) / parseFloat(totalDays)) * 100);
  const text = progressValue > 100 ? `Round 1 overflow by ${progressValue - 100}%` : `${progressValue} % Goal reached`;
  const className = progressValue <= 100 ? "txt-m text-right text--secondary" : "txt-m text-right text--danger";
  return (
    <CUICard className="card-brdr" style={{ padding: "40px 50px" }} columns={1}>
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
          {fundsCollected} ETH
        </Col>
        <Col lg={4} className="txt-m push-half-h--bottom text-right">
          {roundGoal} ETH Goal
        </Col>
      </Row>

      <div>
        <CUILinearProgress style={{ height: 7, borderRadius: 7 }} value={progressValue} />
      </div>

      <Row className="push--top">
        <Col lg={4} className="txt-m push-half-h--bottom">
          Started on: {startDate.toDateString()}
        </Col>
        <Col lg={4} className="txt-m push-half-h--bottom text-center">
          Days Left: {leftDays} days
        </Col>
        <Col lg={4} className="txt-m push-half-h--bottom text-right">
          Ends on: {endDate.toDateString()}
        </Col>
      </Row>

      <div>
        <CUILinearProgress style={{ height: 7, borderRadius: 7 }} value={timeProgress} />
      </div>
    </CUICard>
  );
};

export default TimeLine;
