/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, {Component} from 'react';
import {Grid, Row, Col} from '../../../helpers/react-flexbox-grid';
import { CUILinearProgress } from '../../../helpers/material-ui';

class TimeLine extends Component {
  render() {
    return (
      <Grid>
        <div className="txt-xxxl text--primary">DAICO Timeline</div>
        <Row className="push--top">
          <Col lg={6} className="txt-m push-half-h--bottom">
            Funds Collected
          </Col>
          <Col lg={6} className="txt-m push-half-h--bottom">
            3,500 ETH Goal
          </Col>
        </Row>

        <div>
            <CUILinearProgress style={{ height: 7, borderRadius: 7 }} value={70}/>
        </div>

        <Row className="push--top">
          <Col lg={6} className="txt-m push-half-h--bottom">
            Started on: 3rd Aug 2018
          </Col>
          <Col lg={6} className="txt-m push-half-h--bottom">
            Ends on: 23rd Aug 2018
          </Col>
        </Row>

        <div>
            <CUILinearProgress style={{ height: 7, borderRadius: 7 }} value={50}/>
        </div>
      </Grid>
    );
  }
}

export default TimeLine;
