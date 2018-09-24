/* eslint camelcase: 0 */

import React, {Component} from 'react';
import {Col, Grid, Row} from '../../../helpers/react-flexbox-grid';

class AfterICOLinear extends Component {
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
            <div>1 OMG = 0.00986 ETH</div>
            <button>
              Trade
            </button>
            <div className="hl">
              <div className="hli">
                <div>Kill Threshold: 75%</div>
                <div>Your Balance: 450WAN</div>
                <div>Remaining Funds: $16Mn</div>
                <div>Your Token Value: $4,200</div>
                <div>Your Kill Vote</div>
              </div>
              <div className="hli">
                <div>Vote Saturation Level: 0.5%</div>
                <div>Your Vote Share: 0.0065%</div>
                <div>Your Share: $200</div>
                <div>Days to next kill vote: 38</div>
                <div>Your Tap Increase Vote</div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="hl">
              <div className="hli">Spend Curve</div>
              <div className="hli">Spent</div>
              <div className="hli">Spendable</div>
            </div>
            <div>Vote Share Histogram</div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

AfterICOLinear.defaultProps = {
  daico_name: 'OmiseGo',
  daico_type: 'Step Function DAICO',
};

export default AfterICOLinear;

//<MUIButton label="Buy" type="contained"
// style={{backgroundImage: `linear-gradient(58deg, #e83a3a 0%, #e8661f 43%, #e8840b 80%, #e89004 100%)`}}/>
