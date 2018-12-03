import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
import { getSignInStatusText, getEtherScanHashLink } from "../../../helpers/common/projectDetailhelperFunctions";
import BtnLoader from "../../Loaders/BtnLoader";
import { CustomToolTip } from "../FormComponents";

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
    incrementTapButtonTransactionHash,
    signinStatusFlag,
    ownerAddress,
    userLocalPublicAddress,
    tapPollConsensus,
    onTapPollsHistoryClick,
    network
  } = props || {};
  const link = getEtherScanHashLink(deployTapPollButtonTransactionHash, network);
  const disabledMsg = getSignInStatusText(signinStatusFlag, ownerAddress === userLocalPublicAddress);
  const isDisabled = !canIncreaseTap;
  const tapWarningText = "Can't increase tap now";
  const tapDeployText = "Can't deploy now";
  const tapIncrementLink = getEtherScanHashLink(incrementTapButtonTransactionHash, network);
  return (
    <div>
      <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
        <Row>
          <Col className="txt-xxxl text--primary" lg={8}>
            Tap Increment
          </Col>
          <Col className="push-half--top text-right" lg={4}>
            <LoadingButton className="text--black lnktags btn-link" type="text" onClick={onTapPollsHistoryClick}>
              View Tap History
            </LoadingButton>
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
          <Col lg={6}>
            {!isPermissioned ? (
              <div className="hli">
                <CustomToolTip title={disabledMsg} id="btn-disabled" placement="bottom" disabled>
                  <div>
                    <LoadingButton style={{ padding: "0 40px" }} disabled>
                      Increase Tap
                    </LoadingButton>
                  </div>
                </CustomToolTip>
              </div>
            ) : incrementTapButtonTransactionHash !== "" ? (
              <a href={ensureHttpUrl(tapIncrementLink)} target="_blank" rel="noreferrer noopener">
                <span className="hli">
                  <LoadingButton style={{ padding: "0 40px" }} type="pending" onClick={() => console.log("Sent to etherscan")}>
                    Status
                  </LoadingButton>
                </span>
              </a>
            ) : !tapPollConsensus ? (
              <span width="20">
                <BtnLoader width={45} height={9} />
              </span>
            ) : (
              <div className="hli">
                <CustomToolTip title={tapWarningText} id="btn-disabled" placement="bottom" disabled={isDisabled}>
                  <span className="hli">
                    <LoadingButton
                      style={{ padding: "0 40px" }}
                      onClick={onIncrementTapClick}
                      loading={incrementTapButtonSpinning}
                      disabled={isDisabled}
                    >
                      Increase Tap
                    </LoadingButton>
                  </span>
                </CustomToolTip>
              </div>
            )}
          </Col>
          <Col lg={6} className="text-right">
            {!isPermissioned ? (
              <div className="hli">
                <CustomToolTip title={disabledMsg} id="btn-disabled" placement="bottom" disabled>
                  <span>
                    <LoadingButton style={{ padding: "0 40px" }} disabled>
                      Deploy Tap Poll
                    </LoadingButton>
                  </span>
                </CustomToolTip>
              </div>
            ) : deployTapPollButtonTransactionHash !== "" ? (
              <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                <span className="hli">
                  <LoadingButton style={{ padding: "0 40px" }} type="pending" onClick={() => console.log("Sent to etherscan")}>
                    Status
                  </LoadingButton>
                </span>
              </a>
            ) : !tapPollConsensus ? (
              <span width="20">
                <BtnLoader width={45} height={9} />
              </span>
            ) : (
              <div className="hli">
                <CustomToolTip title={tapDeployText} id="btn-disabled" placement="bottom" disabled={!canDeployTapPoll}>
                  <span className="hli">
                    <LoadingButton
                      style={{ padding: "0 40px" }}
                      onClick={onDeployTapPollClick}
                      loading={deployTapPollButtonSpinning}
                      disabled={!canDeployTapPoll}
                    >
                      Deploy Tap Poll
                    </LoadingButton>
                  </span>
                </CustomToolTip>
              </div>
            )}
          </Col>
        </Row>
      </CUICard>
    </div>
  );
};

export default IssuerTapCard;
