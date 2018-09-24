import React from 'react';
import {RadioButton, TextField} from '../../components/Common/FormComponents';
import {Col, Row} from '../../helpers/react-flexbox-grid';


const DaicoDetails = () =>
  <div>
    <div>DAICO Details</div>
    <div>Kill Frequency</div>
    <div><RadioButton/></div>
    <Row>
      <Col md={3}>
        <TextField header="Total Kill Attempts"/>
      </Col>
      <Col md={3}>
        <TextField header="Kill Threshold"/>
      </Col>
      <Col md={3}>
        <TextField header="Vote Saturation Limit"/>
      </Col>
    </Row>
    
    <Row>
      <Col md={3}>
        <TextField header="Initial Tap"/>
      </Col>
      <Col md={3}>
        <TextField header="Tap Increment Quanta"/>
      </Col>
    </Row>
    <TextField header="Issuer's Comment"/>
  </div>;

export default DaicoDetails;