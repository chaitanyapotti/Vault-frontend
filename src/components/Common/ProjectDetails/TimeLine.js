/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { Grid, Row, Col } from "../../../helpers/react-flexbox-grid";
import LinearProgressBar from "../LinearProgressBar";

class TimeLine extends Component {
  render() {
    const { fundsCollected, roundGoal, startDate, endDate } = this.props || {};
    return (
      <Grid>
        <div>DAICO Timeline</div>
        <Row>
          <Col lg={6}>{parseFloat(fundsCollected) / parseFloat(roundGoal)} % Goal reached</Col>
        </Row>
        <Row>
          <Col lg={6}>Funds Collected</Col>
          <Col lg={6}>{fundsCollected} ETH</Col>
          <Col lg={6}>{roundGoal} ETH Goal</Col>
        </Row>

        <div>
          <LinearProgressBar />
        </div>

        <Row>
          <Col lg={6}>Started on: {startDate.toDatestring()}</Col>
          <Col lg={6}>Ends on: {endDate.toDatestring()}</Col>
          <Col lg={6}>Days Left: {Math.round(Math.abs(endDate - new Date()) / 86400)} days</Col>
        </Row>

        <div>
          <LinearProgressBar />
        </div>
      </Grid>
    );
  }
}

export default TimeLine;
