/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { Grid, Row, Col } from "../../../helpers/react-flexbox-grid";
import LinearProgressBar from "../LinearProgressBar";

class TimeLine extends Component {
  render() {
    return (
      <Grid>
        <div>DAICO Timeline</div>
        <Row>
          <Col lg={6}>Funds Collected</Col>
          <Col lg={6}>3,500 ETH Goal</Col>
        </Row>

        <div>
          <LinearProgressBar />
        </div>

        <Row>
          <Col lg={6}>Started on: 3rd Aug 2018</Col>
          <Col lg={6}>Ends on: 23rd Aug 2018</Col>
        </Row>

        <div>
          <LinearProgressBar />
        </div>
      </Grid>
    );
  }
}

export default TimeLine;
