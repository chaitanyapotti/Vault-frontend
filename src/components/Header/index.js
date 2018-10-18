/* eslint camelcase: 0 */

import React, { Component } from "react";
import { Col, Grid, Row } from "../../helpers/react-flexbox-grid";

class Header extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={9}>
            <div className="hl">
              <div className="hli">
                <span className="hdr-logo" />
              </div>
              <div className="hli hdr-item-cnt">
                <span className="txt-m txt-dddbld hover-anim">My Investments</span>
              </div>
              <div className="hli hdr-item-cnt">
                <span className="txt-m txt-dddbld hover-anim">Become an issuer</span>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className="float--right">
              <div>Signed in as: 0x56dnd...837jd9</div>
              <div className="vrfy-cnt text--center">
                <div className="vrfy-pdng">
                  <span className="vrfy-icn" />
                  Get verified on Abacus
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Header;
