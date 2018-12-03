import React, { Component } from "react";
import { Divider } from "@material-ui/core";
import { CUICard } from "../../../../helpers/material-ui";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import ReqType from "./ReqType";
import LoadingButton from "../../LoadingButton";
import { getEtherScanHashLink } from "../../../../helpers/common/projectDetailhelperFunctions";

class FundReq extends Component {
  getObject1 = () => {
    const {
      data,
      details,
      xfrVoteData,
      signinStatusFlag,
      onRevokeXfr1Click,
      onXfr1Click,
      xfr1ButtonSpinning,
      tokensUnderGovernance,
      canXfrClick,
      xfr1ButtonTransactionHash,
      network
    } = this.props || {};
    const link = getEtherScanHashLink(xfr1ButtonTransactionHash, network);
    const { poll1 } = data || {};
    const { amount, consensus, endTime, address } = poll1 || {};
    const requiredData = details && details.length > 0 && address ? details.filter(x => x.address.toUpperCase() === address.toUpperCase()) : [];
    const { name, description, startDate } = requiredData[0] || {};
    const requiredVote = Array.isArray(xfrVoteData) ? xfrVoteData.filter(x => x.address === address) : [];
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
      xfr2ButtonTransactionHash,
      network
    } = this.props || {};
    const { poll2 } = data || {};
    const { amount, consensus, endTime, address } = poll2 || {};
    const requiredData = details ? details.filter(x => x.address === address) : [];
    const { name, description, startDate } = requiredData[0] || {}; //
    const requiredVote = Array.isArray(xfrVoteData) ? xfrVoteData.filter(x => x.address === address) : [];
    const { voted } = requiredVote[0] || false;
    const xfr2Link = getEtherScanHashLink(xfr2ButtonTransactionHash, network);
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
    const obj1 = this.getObject1();
    const obj2 = this.getObject2();
    return (
      <div>
        <CUICard className="card-brdr">
          <Row style={{ padding: "40px 50px" }}>
            <Col className="txt-xxxl text--primary" lg={8}>
              Exceptional Fund Requests
            </Col>
            <Col className="push-half--top text-right txt-no-wrp" lg={4}>
              <LoadingButton className="text--black lnktags" type="text" onClick={onXfrPollHistoryClick}>
                View XFR History
              </LoadingButton>
            </Col>
          </Row>
          {obj1 !== null ? (
            <div>
              <Divider />
              <Row className="push-top--35">
                <Col lg={12} className="txt">
                  {obj1}
                </Col>
              </Row>
            </div>
          ) : null}
          {obj2 !== null ? (
            <div>
              <Divider />
              <Row className="push-top--35">
                <Col lg={12} className="txt">
                  {obj2}
                </Col>
              </Row>
            </div>
          ) : null}
          {obj1 === null && obj2 === null ? (
            <Row>
              <Col lg={12} className="txt text-center">
                <div style={{ padding: "40px 20px" }}>Xfr Poll not deployed</div>
              </Col>
            </Row>
          ) : null}
        </CUICard>
      </div>
    );
  }
}

export default FundReq;
