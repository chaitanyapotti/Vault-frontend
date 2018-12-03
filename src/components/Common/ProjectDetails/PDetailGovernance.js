import React from "react";
import { CustomToolTip } from "../FormComponents";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";
import BtnLoader from "../../Loaders/BtnLoader";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
import { getSignInStatusText, getEtherScanHashLink, getEtherScanAddressLink } from "../../../helpers/common/projectDetailhelperFunctions";

const PDetailGovernance = props => {
  const {
    yourTokens,
    yourVoteWeight,
    yourVoteShare,
    voteSaturationLimit,
    killAttemptsLeft,
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
    unlockTokensData,
    onUnlockTokensClick,
    onKillPollsHistoryClick,
    killButtonTransactionHash,
    r1EndTime,
    pollFactoryAddress,
    unlockTokensLoading,
    network
  } = props || {};
  const canUnlockTokens = unlockTokensData && unlockTokensData.length > 0;
  const link = getEtherScanHashLink(killButtonTransactionHash, network);
  const etherscanLink = getEtherScanAddressLink(pollFactoryAddress, network);
  const signinText = getSignInStatusText(signinStatusFlag);
  const warningText = signinStatusFlag < 4 ? signinText : "No unlockable tokens";
  const isDisabled = parseFloat(yourTokens) <= 0;
  const killWarningText = signinStatusFlag < 4 ? signinText : isDisabled ? "Not enough token balance" : "";
  return (
    <CUICard className="fnt-ps card-brdr" style={{ padding: "40px 50px" }}>
      <Row>
        <Col className="txt-xxxl text--primary" lg={6}>
          Project Details
        </Col>
        <Col className="push-half--top text-right" lg={6}>
          <a id="lnktag" className="text--black" href={ensureHttpUrl(etherscanLink)} target="_blank" rel="noreferrer noopener">
            View On Etherscan
          </a>
        </Col>
      </Row>
      <Row>
        <Col className="push-half--top text-right" lg={12}>
          <LoadingButton className="text--black lnktags" type="text" onClick={onKillPollsHistoryClick}>
            Kill Polls History
          </LoadingButton>
        </Col>
      </Row>
      <Row className="push-top--35">
        <Col lg={6} className="txt">
          <div className="txt-bold">Your Tokens:</div>
          <div className="text--secondary">{yourTokens}</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Vote Saturation Limit: </div>
          <div className="text--secondary">{voteSaturationLimit}%</div>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Your Vote Weight: </div>
          <div className="text--secondary">{yourVoteWeight}%</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Your Vote Share: </div>
          <div className="text--secondary">{yourVoteShare}%</div>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Kill Attempts Left:</div>
          <div className="text--secondary">{killAttemptsLeft}</div>
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
          {!unlockTokensLoading || signinStatusFlag < 4 ? (
            <div className="hli">
              <CustomToolTip title={warningText} id="btn-disabled" placement="bottom" disabled={!canUnlockTokens}>
                <span>
                  <LoadingButton style={{ padding: "0 40px" }} onClick={onUnlockTokensClick} disabled={!canUnlockTokens}>
                    Unlock All Tokens
                  </LoadingButton>
                </span>
              </CustomToolTip>
            </div>
          ) : typeof unlockTokensData === "undefined" ? (
            <span width="20">
              <BtnLoader width={45} height={9} />
            </span>
          ) : (
            <LoadingButton style={{ padding: "0 40px" }} type="pending" onClick={() => console.log("pending")}>
              Pending
            </LoadingButton>
          )}
        </Col>
        <Col lg={6} className="push--top text-right">
          {signinStatusFlag < 4 ? (
            <div className="hli">
              <CustomToolTip title={killWarningText} id="btn-disabled" placement="bottom" disabled>
                <span>
                  <LoadingButton style={{ padding: "0 40px" }} type="danger" disabled>
                    Kill Project
                  </LoadingButton>
                </span>
              </CustomToolTip>
            </div>
          ) : typeof killVoteStatus === "undefined" ? (
            <span width="20">
              <BtnLoader width={45} height={9} />
            </span>
          ) : killButtonTransactionHash !== "" ? (
            <div className="hli">
              <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            </div>
          ) : killVoteStatus === "false" && new Date() >= new Date(r1EndTime) ? (
            <div className="hli">
              <CustomToolTip title={killWarningText} id="btn-disabled" placement="bottom" disabled={isDisabled}>
                <span>
                  <LoadingButton style={{ padding: "0 40px" }} onClick={onKillClick} type="danger" loading={killButtonSpinning} disabled={isDisabled}>
                    Vote in Kill Poll
                  </LoadingButton>
                </span>
              </CustomToolTip>
            </div>
          ) : new Date() >= new Date(r1EndTime) ? (
            <div className="hli">
              <CustomToolTip title={killWarningText} id="btn-disabled" placement="bottom" disabled={isDisabled}>
                <span>
                  <LoadingButton style={{ padding: "0 40px" }} onClick={onRevokeKillClick} loading={killButtonSpinning} disabled={isDisabled}>
                    UnVote in Kill Poll
                  </LoadingButton>
                </span>
              </CustomToolTip>
            </div>
          ) : null}
        </Col>
      </Row>
    </CUICard>
  );
};

export default PDetailGovernance;
