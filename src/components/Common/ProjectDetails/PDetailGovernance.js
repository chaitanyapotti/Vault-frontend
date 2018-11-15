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
    onKillPollsHistoryClick,
    killButtonTransactionHash,
    r1EndTime
  } = props || {};
  const link = `https://rinkeby.etherscan.io/tx/${killButtonTransactionHash}`;
  return (
    <CUICard className="fnt-ps card-brdr" style={{ padding: "40px 50px" }}>
      <Row>
        <Col className="txt-xxxl text--primary" lg={6}>
          Project Details
        </Col>
        <Col className="push-half--top text-right" lg={6}>
          <a rel="noopener" onClick={onKillPollsHistoryClick}>
            Kill Polls History
          </a>
        </Col>
      </Row>
      <Row className="push-top--35">
        <Col lg={6} className="txt">
          <div className="txt-bold">Your Tokens:</div>
          <div className="text--secondary">{yourTokens}</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Your Vote Weight: </div>
          <div className="text--secondary">{yourVoteShare}%</div>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Vote Saturation Limit: </div>
          <div className="text--secondary">{voteSaturationLimit}%</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Kill Attempts Left:</div>
          <div className="text--secondary">{killAttemptsLeft}</div>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Kill Frequency: </div>
          <div className="text--secondary">{killFrequency}</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Next Kill Attempt: </div>
          <div className="text--secondary">{nextKillAttempt}</div>
        </Col>
      </Row>
      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Your Token Value: </div>
          <div className="text--secondary">{yourTokenValue}</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Your Refund Value:</div>
          <div className="text--secondary">{yourRefundValue}</div>
        </Col>
      </Row>

      <Row className="push-top--35 txt txt-g-secondary ">
        <Col lg={6}>
          <div className="txt-bold">Total Refundable Balance:</div>
          <div className="text--secondary">{totalRefundableBalance} ETH</div>
        </Col>
        <Col lg={6}>
          <div className="txt-bold">Kill Consensus: </div>
          <div className="text--secondary">{killConsensus}%</div>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="push--top">
          <LoadingButton style={{ padding: "0 40px" }} onClick={onUnlockTokensClick} disabled={!canUnlockTokens}>
            Unlock All Tokens
          </LoadingButton>
        </Col>
        <Col lg={6} className="push--top text-right">
          {signinStatusFlag <= 3 ? (
            <Tooltip title="This feature is only for Vault Members" id="btn-disabled">
              <div>
                <LoadingButton style={{ padding: "0 40px" }} type="danger" disabled>
                  Kill Project
                </LoadingButton>
              </div>
            </Tooltip>
          ) : killButtonTransactionHash !== "" ? (
            <a href={link} target="_blank" rel="noreferrer noopener">
              <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                Status
              </LoadingButton>
            </a>
          ) : killVoteStatus === "false" && new Date() >= new Date(r1EndTime) ? (
            <LoadingButton
              style={{ padding: "0 40px" }}
              onClick={onKillClick}
              type="danger"
              loading={killButtonSpinning}
              disabled={parseFloat(yourTokens) <= 0}
            >
              Vote in Kill Poll
            </LoadingButton>
          ) : new Date() >= new Date(r1EndTime) ? (
            <LoadingButton
              style={{ padding: "0 40px" }}
              onClick={onRevokeKillClick}
              loading={killButtonSpinning}
              disabled={parseFloat(yourTokens) <= 0}
            >
              UnVote in Kill Poll
            </LoadingButton>
          ) : null}
        </Col>
      </Row>
    </CUICard>
  );
};

export default PDetailGovernance;
