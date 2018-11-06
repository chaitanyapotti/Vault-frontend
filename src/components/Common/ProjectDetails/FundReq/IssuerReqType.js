import React from "react";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import { formatFromWei, formatDate, significantDigits } from "../../../../helpers/common/projectDetailhelperFunctions";

const IssuerReqType = props => {
  const { amount, consensus, endTime, description, startDate, name, tokensUnderGovernance } = props || {};
  return (
    <div>
      <div>Exceptional Fund Requests</div>
      <Row className="txt-g-secondary txt-m">
        <Col lg={6}>
          <div>{name}</div>
        </Col>
        <Col lg={6}>
          <div>{formatDate(startDate)}</div>
        </Col>
      </Row>

      <div className="txt-g-secondary txt-m">
        <div lg={12}>{formatFromWei(amount, 3)} ETH</div>
      </div>

      <div className="push--top txt">{description}</div>

      <Row className="push--top">
        <Col lg={6} className="txt">
          Approval Rate:{" "}
          <span className="text--secondary"> {significantDigits(parseFloat(consensus) / parseFloat(tokensUnderGovernance) || 0)}%</span>
        </Col>
        <Col lg={6} className="txt">
          Ends in: <span className="text--secondary">{formatDate(endTime * 1000)}</span>
        </Col>
      </Row>
    </div>
  );
};

export default IssuerReqType;
