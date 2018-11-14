import React, { Component } from "react";
import { Divider } from "@material-ui/core";
import { CUICard } from "../../../../helpers/material-ui";
import IssuerReqType from "./IssuerReqType";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";

class IssuerFundReq extends Component {
  getObject1 = () => {
    const { data, details, tokensUnderGovernance, onEditDescriptionClick } = this.props || {};
    const { poll1 } = data || {};
    const { amount, consensus, endTime, address } = poll1 || {};
    const requiredData = details && details.length > 0 && address ? details.filter(x => x.address.toUpperCase() === address.toUpperCase()) : [];
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
        onEditDescriptionClick={onEditDescriptionClick}
      />
    ) : null;
  };

  getObject2 = () => {
    const { data, details, tokensUnderGovernance, onEditDescriptionClick } = this.props || {};
    const { poll2 } = data || {};
    const { amount, consensus, endTime, address } = poll2 || {};
    const requiredData = details && details.length > 0 && address ? details.filter(x => x.address.toUpperCase() === address.toUpperCase()) : [];
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
        onEditDescriptionClick={onEditDescriptionClick}
      />
    ) : null;
  };

  render() {
    const xfr1 = this.getObject1();
    const xfr2 = this.getObject2();
    return xfr1 !== null || xfr2 !== null ? (
      <div>
        <CUICard className="card-brdr">
          <div style={{ padding: "40px 50px" }} className="txt-xxxl text--primary">
            Exceptional Fund Requests
          </div>
          <Divider />
          <Row className="push-top--35">
            <Col lg={12} className="txt">
              {xfr1}
            </Col>
          </Row>
          {xfr2 ? <Divider /> : null}
          <Row className="push-top--35">
            <Col lg={12} className="txt">
              {xfr2}
            </Col>
          </Row>
        </CUICard>
      </div>
    ) : null;
  }
}

export default IssuerFundReq;
