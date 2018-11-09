import React, { Component } from "react";
import { Divider } from "@material-ui/core";
import { CUICard } from "../../../../helpers/material-ui";
import IssuerReqType from "./IssuerReqType";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";

class IssuerFundReq extends Component {
  getObject1 = () => {
    const { data, details, tokensUnderGovernance } = this.props || {};
    const { poll1 } = data || {};
    const { amount, consensus, endTime, address } = poll1 || {};
    const requiredData = details ? details.filter(x => x.address === address) : [];
    const { name, description, startDate } = requiredData[0] || {};
    return endTime ? (
      <IssuerReqType
        amount={amount}
        consensus={consensus}
        endTime={endTime}
        name={name}
        description={description}
        startDate={startDate}
        tokensUnderGovernance={tokensUnderGovernance}
      />
    ) : null;
  };

  getObject2 = () => {
    const { data, details, tokensUnderGovernance } = this.props || {};
    const { poll2 } = data || {};
    const { amount, consensus, endTime, address } = poll2 || {};
    const requiredData = details ? details.filter(x => x.address === address) : [];
    const { name, description, startDate } = requiredData[0] || {};
    return endTime ? (
      <IssuerReqType
        amount={amount}
        consensus={consensus}
        endTime={endTime}
        name={name}
        description={description}
        startDate={startDate}
        tokensUnderGovernance={tokensUnderGovernance}
      />
    ) : null;
  };

  render() {
    return (
      <div>
        <CUICard style={{ padding: "40px 50px" }}>
          <div className="txt-xxxl text--primary">Exceptional Fund Requests</div>
          <Divider />
          <Row className="push-top--35">
            <Col lg={12} className="txt">
              {this.getObject1()}
            </Col>
          </Row>
          {this.getObject2() !== null ? <Divider /> : null}
          <Row className="push-top--35">
            <Col lg={12} className="txt">
              {this.getObject2()}
            </Col>
          </Row>
        </CUICard>
      </div>
    );
  }
}

export default IssuerFundReq;
