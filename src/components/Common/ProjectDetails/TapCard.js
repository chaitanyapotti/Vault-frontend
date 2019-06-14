import React from "react";
import { CustomToolTip } from "../FormComponents";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
import { getSignInStatusText, getEtherScanHashLink } from "../../../helpers/common/projectDetailhelperFunctions";
import BtnLoader from "../../Loaders/BtnLoader";

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
    tapButtonTransactionHash,
    network
  } = props || {};
  const link = getEtherScanHashLink(tapButtonTransactionHash, network);
  const signinText = getSignInStatusText(signinStatusFlag, network);
  const isDisabled = !canTapClick;
  const tapWarningText = signinStatusFlag < 4 ? signinText : isDisabled ? "Not enough token balance" : "";
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
          <Col lg={12} className="text-right hl">
            <div className="text-right">
              {signinStatusFlag < 4 ? (
                <div className="hli">
                  <CustomToolTip title={tapWarningText} id="btn-disabled" placement="bottom" disabled>
                    <span>
                      <LoadingButton style={{ padding: "0 40px" }} type="danger" disabled>
                        Approve
                      </LoadingButton>
                    </span>
                  </CustomToolTip>
                </div>
              ) : tapPollConsensus === "No Poll" ? (
                <div className="text--secondary txt"> Tap Poll Not Deployed </div>
              ) : typeof tapVoteStatus === "undefined" || !tapPollConsensus ? (
                <span width="20">
                  <BtnLoader width={45} height={9} />
                </span>
              ) : tapButtonTransactionHash !== "" ? (
                <div className="hli">
                  <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                    <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                      Status
                    </LoadingButton>
                  </a>
                </div>
              ) : tapVoteStatus === "true" ? (
                <div className="hli">
                  <CustomToolTip title={tapWarningText} id="btn-disabled" placement="bottom" disabled={isDisabled}>
                    <span>
                      <LoadingButton
                        style={{ padding: "0 40px" }}
                        onClick={onRevokeTapClick}
                        type="danger"
                        loading={tapButtonSpinning}
                        disabled={isDisabled}
                      >
                        Reject
                      </LoadingButton>
                    </span>
                  </CustomToolTip>
                </div>
              ) : (
                <div className="hli">
                  <CustomToolTip title={tapWarningText} id="btn-disabled" placement="bottom" disabled={isDisabled}>
                    <span>
                      <LoadingButton style={{ padding: "0 40px" }} onClick={onTapClick} loading={tapButtonSpinning} disabled={isDisabled}>
                        Approve
                      </LoadingButton>
                    </span>
                  </CustomToolTip>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </CUICard>
    </div>
  );
};

export default TapCard;
