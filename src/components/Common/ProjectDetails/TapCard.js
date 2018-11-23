import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";

const TapCard = props => {
  const {
    currentTapAmount,
    onTapPollsHistoryClick,
    tapIncrementUnit,
    incrementApproval,
    onTapClick,
    tapVoteStatus,
    tapButtonSpinning,
    onRevokeTapClick,
    signinStatusFlag,
    canTapClick,
    tapPollConsensus,
    tapButtonTransactionHash
  } = props || {};
  const link = `https://rinkeby.etherscan.io/tx/${tapButtonTransactionHash}`;
  return (
    <div>
      <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
        <Row>
          <Col className="txt-xxxl text--primary" lg={8}>
            Tap Increment
          </Col>
          <Col className="push-half--top text-right" lg={4}>
            <a id="lnktag" className="text--black" rel="noreferrer noopener" onClick={onTapPollsHistoryClick}>
              View Tap History
            </a>
          </Col>
        </Row>
        <Row className="push-top--35">
          <Col lg={6} className="txt">
            <div className="txt-bold">Current Tap Amount: </div>
            <div className="text--secondary">{currentTapAmount} ETH/month</div>{" "}
          </Col>
          <Col lg={6} className="txt">
            <div className="txt-bold">Tap increment Factor: </div>
            <div className="text--secondary">{tapIncrementUnit}</div>{" "}
          </Col>
        </Row>

        <Row className="push-half--top">
          <Col lg={12} className="txt">
            <div className="txt-bold">Increment Approval: </div>
            <div className="text--secondary">{incrementApproval}%</div>{" "}
          </Col>
        </Row>
        <Row className="push--top">
          <Col lg={12} className="text-right hl">
            <div className="text-right">
              {signinStatusFlag <= 3 ? (
                <div className="hli">
                  <Tooltip title="This feature is only for Vault Members" id="btn-disabled">
                    <div>
                      <LoadingButton style={{ padding: "0 40px" }} disabled>
                        Approve
                      </LoadingButton>
                    </div>
                  </Tooltip>
                </div>
              ) : tapPollConsensus === "No Poll" ? (
                <div className="text--secondary txt"> Tap Poll Not Deployed </div>
              ) : tapButtonTransactionHash !== "" ? (
                <div className="hli">
                  <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                    <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                      Status
                    </LoadingButton>
                  </a>
                </div>
              ) : tapVoteStatus === "true" ? (
                <LoadingButton
                  style={{ padding: "0 40px" }}
                  onClick={onRevokeTapClick}
                  type="danger"
                  loading={tapButtonSpinning}
                  disabled={!canTapClick}
                >
                  Reject
                </LoadingButton>
              ) : (
                <LoadingButton style={{ padding: "0 40px" }} onClick={onTapClick} loading={tapButtonSpinning} disabled={!canTapClick}>
                  Approve
                </LoadingButton>
              )}
            </div>
          </Col>
        </Row>
      </CUICard>
    </div>
  );
};

export default TapCard;
