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
      tokensUnderGovernance,
      canXfrClick,
      xfr1ButtonTransactionHash
    } = this.props || {};
    const link = `https://rinkeby.etherscan.io/tx/${xfr1ButtonTransactionHash}`;
    const { poll1 } = data || {};
    const { amount, consensus, endTime, address } = poll1 || {};
    const requiredData = details ? details.filter(x => x.address === address) : [];
    const { name, description, startDate } = requiredData[0] || {};
    console.log(xfrVoteData);
    const requiredVote = Array.isArray(xfrVoteData) ? xfrVoteData.filter(x => x.address === address) : [];
    const { voted } = requiredVote[0] || false;
    console.log(xfr1ButtonTransactionHash, "2");
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
        canXfrClick={canXfrClick}
        link={link}
        xfr1ButtonTransactionHash={xfr1ButtonTransactionHash}
      />
    ) : null;
  };

  getObject2 = () => {
    const {
      data,
      details,
      xfrVoteData,
      signinStatusFlag,
      onRevokeXfr2Click,
      onXfr2Click,
      xfr2ButtonSpinning,
      tokensUnderGovernance,
      canXfrClick,
      xfr2ButtonTransactionHash
    } = this.props || {};
    const { poll2 } = data || {};
    const { amount, consensus, endTime, address } = poll2 || {};
    const requiredData = details ? details.filter(x => x.address === address) : [];
    const { name, description, startDate } = requiredData[0] || {}; //
    const requiredVote = Array.isArray(xfrVoteData) ? xfrVoteData.filter(x => x.address === address) : [];
    const { voted } = requiredVote[0] || false;
    const xfr2Link = `https://rinkeby.etherscan.io/tx/${xfr2ButtonTransactionHash}`;
    console.log(xfr2ButtonTransactionHash, "3");
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
        canXfrClick={canXfrClick}
        xfr2ButtonTransactionHash={xfr2ButtonTransactionHash}
        link={xfr2Link}
      />
    ) : null;
  };

  render() {
    const { onXfrPollHistoryClick } = this.props || {};
    return (
      <div>
        <CUICard className="card-brdr">
          <Row style={{ padding: "40px 50px" }}>
            <Col className="txt-xxxl text--primary" lg={8}>
              Exceptional Fund Requests
            </Col>
            <Col className="push-half--top text-right txt-no-wrp" lg={4}>
              <a rel="noopener" onClick={onXfrPollHistoryClick}>
                View XFR History
              </a>
            </Col>
          </Row>
          <Divider />
          <div>
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
          </div>
        </CUICard>
      </div>
    );
  }
}

export default FundReq;
