import React, { Component } from "react";
import { Divider } from "@material-ui/core";
import { CUICard } from "../../../../helpers/material-ui";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import ReqType from "./ReqType";

class FundReq extends Component {
  getObject1 = () => {
    const {
      data,
      details,
      onXfrPollHistoryClick,
      xfrVoteData,
      signinStatusFlag,
      onRevokeXfr1Click,
      onXfr1Click,
      xfr1ButtonSpinning,
      tokensUnderGovernance
    } = this.props || {};
    const { poll1 } = data || {};
    const { amount, consensus, endTime, address } = poll1 || {};
    const requiredData = details ? details.filter(x => x.address === address) : [];
    const { name, description, startDate } = requiredData[0] || {};
    const requiredVote = xfrVoteData ? xfrVoteData.filter(x => x.address === address) : [];
    const { voted } = requiredVote[0] || false;
    return endTime ? (
      <ReqType
        amount={amount}
        consensus={consensus}
        endTime={endTime}
        name={name}
        description={description}
        startDate={startDate}
        voted={voted}
        signinStatusFlag={signinStatusFlag}
        onRevokeXfrClick={onRevokeXfr1Click}
        onXfrClick={onXfr1Click}
        xfrButtonSpinning={xfr1ButtonSpinning}
        tokensUnderGovernance={tokensUnderGovernance}
        onXfrPollHistoryClick={onXfrPollHistoryClick}
      />
    ) : null;
  };

  getObject2 = () => {
    const { data, details, xfrVoteData, signinStatusFlag, onRevokeXfr2Click, onXfr2Click, xfr2ButtonSpinning, tokensUnderGovernance } =
      this.props || {};
    const { poll2 } = data || {};
    const { amount, consensus, endTime, address } = poll2 || {};
    const requiredData = details ? details.filter(x => x.address === address) : [];
    const { name, description, startDate } = requiredData[0] || {}; //
    const requiredVote = xfrVoteData ? xfrVoteData.filter(x => x.address === address) : [];
    const { voted } = requiredVote[0] || false;
    return endTime ? (
      <ReqType
        amount={amount}
        consensus={consensus}
        endTime={endTime}
        name={name}
        description={description}
        startDate={startDate}
        voted={voted}
        signinStatusFlag={signinStatusFlag}
        onRevokeXfrClick={onRevokeXfr2Click}
        onXfrClick={onXfr2Click}
        xfrButtonSpinning={xfr2ButtonSpinning}
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

export default FundReq;
