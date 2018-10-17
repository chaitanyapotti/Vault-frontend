import React from 'react';
import { Col, Grid, Row } from '../../../helpers/react-flexbox-grid';

const Subheader = () =>
  <div className="sbhdr-cnt push-top--135">
    <Grid>
      <div className="sbhdr-txt txt-xl txt-bold sbhdr-mrgn-tp">ACCOUNTABLE CROWDFUNDING PLATFORM</div>
      <Row>
        <Col lg={6} className="txt-g-secondary">
          Powered By Electus Protocol
        </Col>
        <Col lg={6} className="text--right txt-g-secondary">
          Learn more about Vault & DAICOs
        </Col>
      </Row>
    </Grid>
  </div>;

export default Subheader;
