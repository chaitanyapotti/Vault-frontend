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
    onDeployTapPollClick,
    deployTapPollButtonTransactionHash,
    incrementTapButtonTransactionHash
  } = props || {};
  const link = `https://rinkeby.etherscan.io/tx/${deployTapPollButtonTransactionHash}`;
  const tapIncrementLink = `https://rinkeby.etherscan.io/tx/${incrementTapButtonTransactionHash}`;
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
        <div className="text-right">
          {!isPermissioned || !canIncreaseTap ? (
            <div className="hli">
              <Tooltip title="This feature is only for Vault Issuer Members" id="btn-disabled">
                <div>
                  <LoadingButton disabled>Increase Tap</LoadingButton>
                </div>
              </Tooltip>
            </div>
          ) : incrementTapButtonTransactionHash !== "" ? (
            <a href={tapIncrementLink} target="_blank" rel="noreferrer noopener">
              <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                Status
              </LoadingButton>
            </a>
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
          ) : deployTapPollButtonTransactionHash !== "" ? (
            <a href={link} target="_blank" rel="noreferrer noopener">
              <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                Status
              </LoadingButton>
            </a>
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

export default IssuerTapCard;
