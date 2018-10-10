/* eslint camelcase: 0 */

import React, {Component} from 'react';
import {Col, Grid, Row} from '../../../helpers/react-flexbox-grid';
import {CUIAppBar} from '../../../helpers/material-ui';

class HeaderPartial extends Component {
  render() {
    return (
      <CUIAppBar style={{height: '129px'}}>  
        <Grid>
          <Row>
            <Col lg={2}>
              <span className="hdr-logo"></span>
            </Col>
          </Row>
        </Grid>
      </CUIAppBar>      
    );
  }
}

export default HeaderPartial;   
