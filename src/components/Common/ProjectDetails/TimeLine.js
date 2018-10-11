/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { Grid, Row, Col } from "../../../helpers/react-flexbox-grid";
import { CUILinearProgress } from "../../../helpers/material-ui";

class TimeLine extends Component {
  render() {
    const { fundsCollected, roundGoal, startDate, endDate } = this.props || {};
    return (
      <Grid>
        <div className="txt-xxxl text--primary">DAICO Timeline</div>
        <Row className="push--top">
          <Col lg={6} className="txt-m push-half-h--bottom">
            {parseFloat(fundsCollected) / parseFloat(roundGoal)} % Goal reached
          </Col>
        </Row>
        <Row>
          <Col lg={6}>Funds Collected</Col>
          <Col lg={6} className="txt-m push-half-h--bottom">
            {fundsCollected} ETH
          </Col>
          <Col lg={6} className="txt-m push-half-h--bottom">
            {roundGoal} ETH Goal
          </Col>
        </Row>

        <div>
          <CUILinearProgress style={{ height: 7, borderRadius: 7 }} value={70} />
        </div>

        <Row className="push--top">
          <Col lg={6} className="txt-m push-half-h--bottom">
            Started on: {startDate.toDatestring()}
          </Col>
          <Col lg={6} className="txt-m push-half-h--bottom">
            Ends on: {endDate.toDatestring()}
          </Col>
          <Col lg={6} className="txt-m push-half-h--bottom">
            Days Left: {Math.round(Math.abs(endDate - new Date()) / 86400)} days
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
