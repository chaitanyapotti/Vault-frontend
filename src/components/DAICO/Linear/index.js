/* eslint camelcase: 0 */

import React, {Component} from 'react';
import {Col, Grid, Row} from '../../../helpers/react-flexbox-grid';

class Linear extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <div className="hl">
              <img className="hli" src="https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg"
                   width="120" height="120"/>
              <div className="hli d-cnt">
                <div className="daico-name">OmiseGo</div>
                <div className="daico-type">Step Function DAICO</div>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="d-lnr-rstrt-msg">
              <div>Investors from USA & China are NOT allowed</div>
              <div>Accredited Investors from USA are allowed</div>
            </div>
          </Col>
          <div className="txt-p-vault d-lnr-dscrptn-mrgn">
            OmiseGO enables financial inclusion and interoperability through the public, decentralized OMG network
          </div>
          <Col md={6}>
            <div className="hl">
              <div className="hli">
                <div>1 OMG = 0.00986 ETH</div>
                <div>Individual Cap: 3 ETH Total</div>
              </div>
              <div className="hli">
                <button>
                  Get Whitelisted
                </button>
              </div>
            </div>
            <div>HardCap Capitalization: $30mn</div>
            <div>Diluted Capitalization: $60mn</div>
          </Col>
          <Col>
            <div className="hli">
              <button className="hli">Website</button>
              <button className="hli">Whitepaper</button>
            </div>
            <div>Kill Threshold: 75% vote Saturation Level: 0.5%</div>
            <div>Spend Line</div>
          </Col>
          {/*<SocialLinks/>*/}
        </Row>
      </Grid>
    );
  }
}

Linear.defaultProps = {
  daico_name: 'OmiseGo',
  daico_type: 'Step Function DAICO',
};

export default Linear;

//<MUIButton label="Buy" type="contained"
// style={{backgroundImage: `linear-gradient(58deg, #e83a3a 0%, #e8661f 43%, #e8840b 80%, #e89004 100%)`}}/>
