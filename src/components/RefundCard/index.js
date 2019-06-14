import React from "react";
import { CUICard } from "../../helpers/material-ui";
import LoadingButton from "../Common/LoadingButton";
import { Row, Col } from "../../helpers/react-flexbox-grid";
import { ensureHttpUrl } from "../../helpers/common/urlFixerInHref";
import { CustomToolTip } from "../Common/FormComponents";
import { getSignInStatusText, getEtherScanHashLink } from "../../helpers/common/projectDetailhelperFunctions";
import BtnLoader from "../Loaders/BtnLoader";

const RefundCard = props => {
  const {
    signinStatusFlag,
    tokenBalance,
    label,
    refundByKillButtonTransactionHash,
    refundBySoftCapFailSpinning,
    refundByKillButtonSpinning,
    onRefundClick,
    refundBySoftcapfailButtonTransactionHash,
    network
  } = props || {};
  const link =
    refundByKillButtonTransactionHash !== ""
      ? getEtherScanHashLink(refundByKillButtonTransactionHash, network)
      : refundBySoftcapfailButtonTransactionHash !== ""
      ? getEtherScanHashLink(refundBySoftcapfailButtonTransactionHash, network)
      : "";
  const warningText = getSignInStatusText(signinStatusFlag);
  const isDisabled = parseFloat(tokenBalance) === 0;
  const disabledText = parseFloat(tokenBalance) === 0 ? "You don't hold any tokens" : "";
  return (
    <CUICard className="card-brdr push-top--50" style={{ padding: "40px 50px" }}>
      <Row lg={8}>
        <Col>
          <div className="txt-xxxl text--primary">Refund Mode</div>
        </Col>
      </Row>
      <Row className="push-top--50">
        <Col lg={8}>
          <div className="text-left fnt-ps push--bottom txt">{label}</div>
        </Col>
        <Col lg={4}>
          <div className="text--center">
            {signinStatusFlag < 3 ? (
              <div className="hli">
                <CustomToolTip title={warningText} id="btn-disabled" disabled>
                  <span>
                    <LoadingButton style={{ padding: "0 40px" }} disabled>
                      Refund
                    </LoadingButton>
                  </span>
                </CustomToolTip>
              </div>
            ) : refundByKillButtonTransactionHash !== "" || refundBySoftcapfailButtonTransactionHash !== "" ? (
              <div className="hli">
                <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                  <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                    Status
                  </LoadingButton>
                </a>
              </div>
            ) : tokenBalance ? (
              <div className="hli">
                <CustomToolTip title={disabledText} disabled={isDisabled}>
                  <span>
                    <LoadingButton
                      disabled={isDisabled}
                      onClick={onRefundClick}
                      loading={refundByKillButtonSpinning || refundBySoftCapFailSpinning}
                      style={{ padding: "0 40px", minWidth: "200px" }}
                    >
                      Refund
                    </LoadingButton>
                  </span>
                </CustomToolTip>
              </div>
            ) : (
              <span width="20">
                <BtnLoader width={45} height={9} />
              </span>
            )}
          </div>
        </Col>
      </Row>
    </CUICard>
  );
};

export default RefundCard;
