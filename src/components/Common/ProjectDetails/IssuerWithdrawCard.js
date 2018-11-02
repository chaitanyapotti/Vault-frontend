import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";

const IssuerWithdrawCard = props => {
  const {
    currentWithdrawableAmount,
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
      <CUICard style={{ padding: "40px 50px" }}>
        <div className="txt-xxxl text--primary">Withdraw Amount</div>
        <Row>
          <Col lg={12} className="txt">
            Current Withdrawable Amount: <span className="text--secondary">{currentWithdrawableAmount} ETH</span>
          </Col>
        </Row>
        <div className="text-right">
          {!isPermissioned || !canIncreaseTap ? (
            <div className="hli">
              <Tooltip title="This feature is only for Vault Issuer Members" id="btn-disabled">
                <LoadingButton disabled>Increase Tap</LoadingButton>
              </Tooltip>
            </div>
          ) : (
            <span className="hli">
              <LoadingButton onClick={onIncrementTapClick} loading={incrementTapButtonSpinning} disabled={!canIncreaseTap}>
                Increase Tap
              </LoadingButton>
            </span>
          )}
          {!isPermissioned || !canDeployTapPoll ? (
            <div className="hli">
              <Tooltip title="This feature is only for Vault Issuer Members" id="btn-disabled">
                <LoadingButton disabled>Deploy Tap Poll</LoadingButton>
              </Tooltip>
            </div>
          ) : (
            <span className="hli">
              <LoadingButton onClick={onDeployTapPollClick} loading={deployTapPollButtonSpinning} disabled={!canDeployTapPoll}>
                Deploy Tap Poll
              </LoadingButton>
            </span>
          )}
        </div>
      </CUICard>
    </div>
  );
};

export default IssuerWithdrawCard;
