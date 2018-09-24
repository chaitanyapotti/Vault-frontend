/* eslint camelcase: 0 */

import React, {Component} from 'react';
import {Col, Grid, Row} from '../../helpers/react-flexbox-grid';
import TapSwitch from '../../components/Common/TapSwitch';

class OTPCard extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <div>Amount Requested: 400ETH</div>
            <div>Hiring 5 new engineers & 2 new designers for the development of our decentralised wallet</div>
            <div>Learn more about the proposal</div>
          </Col>
          <Col md={6}>
            <TapSwitch/>
            <div>Approval: 28.01%</div>
            <div>Days Left: 12 (180,765 Blocks)</div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default OTPCard;
