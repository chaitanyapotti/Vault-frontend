import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";

const PDetailGovernance = props => {
  const {
    yourTokens,
    yourVoteShare,
    voteSaturationLimit,
    killAttemptsLeft,
    killFrequency,
    nextKillAttempt,
    yourTokenValue,
    yourRefundValue,
    totalRefundableBalance,
    killConsensus,
    onKillClick,
    killVoteStatus,
    killButtonSpinning,
    onRevokeKillClick,
    signinStatusFlag,
    canUnlockTokens,
    onUnlockTokensClick,
    onKillPollsHistoryClick
  } = props || {};
  console.log(canUnlockTokens);
  return (
    <CUICard style={{ padding: "40px 50px" }}>
      <div className="txt-xxxl text--primary">Project Details</div>
      <Row className="push-top--35">
        <Col lg={6} className="txt">
          Your Tokens: <span className="text--secondary">{yourTokens}</span>
        </Col>
        <Col lg={6} className="txt">
          Your Vote Weight: <span className="text--secondary">{yourVoteShare}%</span>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          Vote Saturation Limit: <span className="text--secondary">{voteSaturationLimit}%</span>
        </Col>
        <Col lg={6} className="txt">
          Kill Attempts Left: <span className="text--secondary">{killAttemptsLeft}</span>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          Kill Frequency: <span className="text--secondary">{killFrequency}</span>
        </Col>
        <Col lg={6} className="txt">
          Next Kill Attempt: <span className="text--secondary">{nextKillAttempt}</span>
        </Col>
      </Row>
      <Row className="push-half--top">
        <Col lg={6} className="txt">
          Your Token Value: <span className="text--secondary">{yourTokenValue}</span>
        </Col>
        <Col lg={6} className="txt">
          your Refund Value: <span className="text--secondary">{yourRefundValue}</span>
        </Col>
      </Row>

      <Row className="push-top--35 txt txt-g-secondary ">
        <Col lg={12}>
          Total Refundable Balance: <span className="text--secondary">{totalRefundableBalance} ETH</span>
        </Col>
      </Row>
      <Row className="txt txt-g-secondary">
        <Col lg={12}>
          Kill Consensus: <span className="text--secondary">{killConsensus}%</span>
        </Col>
      </Row>
      <Row>
        <Col lg={6} className="push--top">
          <LoadingButton onClick={onUnlockTokensClick} disabled={canUnlockTokens}>
            Unlock All Tokens
          </LoadingButton>
        </Col>
        <Col lg={6} className="push--top text-right">
          {signinStatusFlag <= 3 ? (
            <Tooltip title="This feature is only for Vault Members" id="btn-disabled">
              <div>
                <LoadingButton disabled>Kill Project</LoadingButton>
              </div>
            </Tooltip>
          ) : killVoteStatus === "false" ? (
            <LoadingButton onClick={onKillClick} type="danger" loading={killButtonSpinning} disabled={parseFloat(yourTokens) <= 0}>
              Vote in Kill Poll
            </LoadingButton>
          ) : (
            <LoadingButton onClick={onRevokeKillClick} loading={killButtonSpinning} disabled={parseFloat(yourTokens) <= 0}>
              UnVote in Kill Poll
            </LoadingButton>
          )}
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="push--top text-right">
          <LoadingButton onClick={onKillPollsHistoryClick}>Kill Polls History</LoadingButton>
        </Col>
      </Row>
    </CUICard>
  );
};

export default PDetailGovernance;
