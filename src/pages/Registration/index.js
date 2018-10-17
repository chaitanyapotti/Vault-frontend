/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from 'react';
import { Grid, Row, Col } from '../../helpers/react-flexbox-grid';
import { IdentityDetails, DaicoDetails, Distribution } from '../../components/Registration';

class Registration extends Component {
  render() {
    return (
      <Grid>
        <Row className="push--top">
          <Col xs={12} lg={7}>
            <IdentityDetails />
          </Col>
          <Col xs={12} lg={5}>
            <DaicoDetails />
          </Col>
        </Row>

        <Row className="push--top push--bottom">
          <Col xs={12} lg={7}>
            <Distribution />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Registration;
