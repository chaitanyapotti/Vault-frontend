import React from "react";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import { formatFromWei, formatDate, significantDigits } from "../../../../helpers/common/projectDetailhelperFunctions";

const IssuerReqType = props => {
  const { amount, consensus, endTime, description, startDate, name, tokensUnderGovernance } = props || {};
  return (
    <div style={{padding: '20px 50px'}}>
      <div>Exceptional Fund Requests</div>
      <Row className="txt-g-secondary txt-m push-half--top">
        <Col lg={6}>
          <div>{name}</div>
        </Col>
        <Col lg={6}>
          <div>{formatDate(startDate)}</div>
        </Col>
      </Row>

      <div className="txt-g-secondary txt-m">
        {formatFromWei(amount, 3)} ETH
      </div>

      <div className="push--top txt fnt-ps">{description}</div>

      <Row className="push--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Approval Rate:{" "}</div>
          <div className="text--secondary"> {significantDigits(parseFloat(consensus) / parseFloat(tokensUnderGovernance) || 0)}%</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Ends in: </div>
          <div className="text--secondary">{formatDate(endTime * 1000)}</div>
        </Col>
      </Row>
    </div>
  );
};

export default IssuerReqType;
