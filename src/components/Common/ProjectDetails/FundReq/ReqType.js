import React from "react";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import { ButtonComponent } from "../../FormComponents";

class ReqType extends React.Component {
  render() {
    const { amount, consensus, endTime } = this.props || {};
    return (
      <div>
        <div>Exceptional Fund Requests</div>
        <Row className="txt-g-secondary push-top--35 txt-m">
          <Col lg={6}>App Redesign</Col>
          <Col lg={6}>20 Aug 2018</Col>
        </Row>

        <div className="txt-g-secondary txt-m">
          <div lg={12}>{amount} ETH</div>
        </div>

        <div className="push--top txt">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in
        </div>

        <Row className="push--top">
          <Col lg={6} className="txt">
            Approval Rate:
            <span className="text--secondary"> {consensus}%</span>{" "}
          </Col>
          <Col lg={6} className="txt">
            Ends in: <span className="text--secondary">{endTime}</span>{" "}
          </Col>
        </Row>

        <div className="push--top">
          <ButtonComponent type="danger" onClick={() => this.uploadDaico()} label="Deny" />
        </div>
      </div>
    );
  }
}

export default ReqType;
