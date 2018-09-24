import React from 'react';
import {ButtonComponent, RadioButton, TextField} from '../../components/Common/FormComponents';
import {Col, Row} from '../../helpers/react-flexbox-grid';


const ProfileDetails = () =>
  <div>
    <div>Profile Details</div>
    <Row>
      <Col md={3}>
        <TextField header="Company Name"/>
      </Col>
      <Col md={2}>
        <TextField header="Token Name"/>
      </Col>
      <Col md={7}>
        <div>DAICO Type</div>
        <div><RadioButton labels={['Linear Spline', 'Step Function']}/></div>
      </Col>
    </Row>
    <TextField header="Description"/>
    <Row>
      <Col md={5}>
        <div className="hl">
          <div className="hli">Display Picture</div>
          <div className="hli"><ButtonComponent type="square" label="Upload"/></div>
        </div>
      </Col>
      <Col md={7}>
        <div className="hl">
          <div className="hli">Whitepaper</div>
          <div className="hli"><ButtonComponent type="oval" label="Upload"/></div>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={3}>
        <TextField header="Social Media"/>
      </Col>
      <Col md={2}>
        <TextField header="URL"/>
      </Col>
      <Col md={7}>
        <ButtonComponent type="square" label="+"/>
      </Col>
      <Col md={12}>FaceBook: https://www.facebook.com/ElectusProtocol</Col>
      <Col md={12}>Website: https://www.electus.network</Col>
    </Row>
  </div>;

export default ProfileDetails;