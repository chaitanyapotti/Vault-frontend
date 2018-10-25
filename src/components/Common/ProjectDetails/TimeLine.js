/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { Grid, Row, Col } from "../../../helpers/react-flexbox-grid";
import { CUILinearProgress } from "../../../helpers/material-ui";

class TimeLine extends Component {
  render() {
    const { fundsCollected, roundGoal, startDate, endDate } = this.props || {};
    const progressValue = Math.round((fundsCollected / roundGoal) * 100);
    console.log(progressValue, "dsddsd");
    return (
      <Grid>
        <Row>
          <Col lg={6}>
            <div className="txt-xxxl text--primary">DAICO Timeline</div>
          </Col>
          <Col lg={6} className="txt-m text-right text--secondary">
            {parseFloat(fundsCollected) / parseFloat(roundGoal)} % Goal reached
          </Col>
        </Row>

        <Row className="push--top">
          <Col lg={4} className="txt-m push-half-h--bottom">
            Funds Collected
          </Col>
          <Col lg={4} className="txt-m push-half-h--bottom">
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
          <Col lg={4} className="txt-m push-half-h--bottom ">
            Days Left: {Math.round(Math.abs(endDate - new Date()) / 86400 / 1000)} days
          </Col>
          <Col lg={4} className="txt-m push-half-h--bottom text-right">
            Ends on: {endDate.toDateString()}
          </Col>
        </Row>

        <div>
          <CUILinearProgress style={{ height: 7, borderRadius: 7 }} value={50} />
        </div>
      </Grid>
    );
  }
}

export default TimeLine;
