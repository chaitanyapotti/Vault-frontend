import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";

const IssuerTapCard = props => {
  const {
    currentTapAmount,
    tapIncrementUnit,
    incrementApproval,
    isPermissioned,
    canIncreaseTap,
    incrementTapButtonSpinning,
    deployTapPollButtonSpinning,
    canDeployTapPoll,
    onIncrementTapClick,
    onDeployTapPollClick
  } = props || {};
  return (
    <div>
      <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
        <div className="txt-xxxl text--primary">Tap Increment</div>
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
          <Col lg={6}>
            {!isPermissioned || !canIncreaseTap ? (
              <div className="hli">
                <Tooltip title="This feature is only for Vault Issuer Members" id="btn-disabled">
                  <div>
                    <LoadingButton style={{padding: '0 40px'}} disabled>Increase Tap</LoadingButton>
                  </div>
                </Tooltip>
              </div>
            ) : (
              <span className="hli">
                <LoadingButton style={{padding: '0 40px'}} onClick={onIncrementTapClick} loading={incrementTapButtonSpinning} disabled={!canIncreaseTap}>
                  Increase Tap
                </LoadingButton>
              </span>
            )}
          </Col>
          <Col lg={6} className="text-right">
            {!isPermissioned || !canDeployTapPoll ? (
              <div className="hli">
                <Tooltip title="This feature is only for Vault Issuer Members" id="btn-disabled">
                  <LoadingButton style={{padding: '0 40px'}} disabled>Deploy Tap Poll</LoadingButton>
                </Tooltip>
              </div>
            ) : (
              <span className="hli">
                <LoadingButton style={{padding: '0 40px'}} onClick={onDeployTapPollClick} loading={deployTapPollButtonSpinning} disabled={!canDeployTapPoll}>
                  Deploy Tap Poll
                </LoadingButton>
              </span>
            )}
          </Col>
        </Row>
      </CUICard>
    </div>
  );
};

export default IssuerTapCard;
