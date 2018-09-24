import React from 'react';
import {ButtonComponent, TextField} from '../../components/Common/FormComponents';
import {Col, Row} from '../../helpers/react-flexbox-grid';


const TokenDistribution = () =>
  <div>
    <div>Token Distribution</div>
    <Row>
      <Col md={3}>
        <TextField header="Total Tokens"/>
      </Col>
      <Col md={3}>
        <TextField header="Fundraise Goals ($)"/>
      </Col>
      <Col md={3}>
        <TextField header="ICO Begin Date"/>
      </Col>
      <Col md={3}>
        <TextField header="ICO End Date"/>
      </Col>
    </Row>
    <Row>
      <Col md={3}>
        <TextField header="For Sale"/>
      </Col>
      <Col md={3}>
        <TextField header="Foundation"/>
      </Col>
      <Col md={3}>
        <TextField header="Team"/>
      </Col>
      <Col md={3}>
        <TextField header="Advisors"/>
      </Col>
    </Row>
    <Row>
      <Col mdOffset={6} md={6}>
        <div className="hl">
          <div className="hli">
            <ButtonComponent type="square" label="Save"/>
          </div>
          <div className="hli">
            <ButtonComponent type="square" label="Generate"/>
          </div>
        </div>
      </Col>
    </Row>
  </div>;

export default TokenDistribution;