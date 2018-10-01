/* eslint camelcase: 0 */

import React, {Component} from 'react';
import {Col, Grid, Row} from '../../../helpers/react-flexbox-grid';
import {TextField} from '../../Common/FormComponents';

class HeaderPartial extends Component {
  render() {
    return (
    <div className="hdr-cnt">
      <Grid>
        <Row>
          <Col md={9}>
            <div className="hl">
              <div className="hli"><span className="hdr-logo"/></div>
              <div className="hli">
                <TextField inputClass="srch-box"/>
              </div>
              <div className="hli">
                <span className="txt-xl txt-dddbld hover-anim">Projects</span>
              </div>
              <div className="hli">
                <span className="txt-xl txt-dddbld hover-anim">Governance</span>
              </div>
              <div className="hli">
                <span className="txt-xl txt-dddbld hover-anim">Publish ICO</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="float--right">
              <div>Signed in as: 0x56dnd...837jd9</div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
    );
  }
}

export default HeaderPartial;   
