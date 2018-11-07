import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";

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
    canTapClick
  } = props || {};
  return (
    <div>
      <CUICard style={{ padding: "40px 50px" }}>
        <div className="txt-xxxl text--primary">Tap Increment</div>
        <Row className="push-top--35">
          <Col lg={6} className="txt">
            Current Tap Amount: <span className="text--secondary">{currentTapAmount} ETH/month</span>{" "}
          </Col>
          <Col lg={6} className="txt">
            Tap increment Factor: <span className="text--secondary">{tapIncrementUnit}</span>{" "}
          </Col>
        </Row>

        <Row>
          <Col lg={12} className="txt">
            Increment Approval: <span className="text--secondary">{incrementApproval}%</span>{" "}
          </Col>
        </Row>
        <Row className="push--top">
          <Col lg={6} className="text--secondary txt">
            <LoadingButton onClick={onTapPollsHistoryClick}>Tap polls History</LoadingButton>
          </Col>
          <Col lg={6} className="text-right hl">
            <div className="text-right">
              {signinStatusFlag <= 3 ? (
                <Tooltip title="This feature is only for Vault Members" id="btn-disabled">
                  <div>
                    <LoadingButton disabled>Approve</LoadingButton>
                  </div>
                </Tooltip>
              ) : tapVoteStatus === "true" ? (
                <LoadingButton onClick={onRevokeTapClick} type="danger" loading={tapButtonSpinning} disabled={!canTapClick}>
                  Reject
                </LoadingButton>
              ) : (
                <LoadingButton onClick={onTapClick} loading={tapButtonSpinning} disabled={!canTapClick}>
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
