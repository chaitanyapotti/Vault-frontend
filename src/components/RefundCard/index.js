import React from "react";
import { CUICard } from "../../helpers/material-ui";
import LoadingButton from "../Common/LoadingButton";
import { Row, Col } from "../../helpers/react-flexbox-grid";
import { ensureHttpUrl } from "../../helpers/common/urlFixerInHref";
import { CustomToolTip } from "../Common/FormComponents";

const RefundCard = props => {
  const {
    signinStatusFlag,
    treasuryStateNumber,
    tokenBalance,
    label,
    refundByKillButtonTransactionHash,
    refundBySoftCapFailSpinning,
    refundByKillButtonSpinning,
    onRefundClick,
    refundBySoftcapfailButtonTransactionHash
  } = props || {};
  const link = `https://rinkeby.etherscan.io/tx/${refundByKillButtonTransactionHash}`;
  const refundSoftLink = `https://rinkeby.etherscan.io/tx/${refundBySoftcapfailButtonTransactionHash}`;
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
            {refundByKillButtonTransactionHash !== "" ? (
              <div className="hli">
                <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                  <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                    Status
                  </LoadingButton>
                </a>
              </div>
            ) : refundBySoftcapfailButtonTransactionHash !== "" ? (
              <div className="hli">
                <a href={ensureHttpUrl(refundSoftLink)} target="_blank" rel="noreferrer noopener">
                  <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                    Status
                  </LoadingButton>
                </a>
              </div>
            ) : signinStatusFlag <= 3 ? (
              <CustomToolTip title="This feature is only for Vault Members" id="btn-disabled" disabled>
                <span>
                  <LoadingButton disabled>Refund</LoadingButton>
                </span>
              </CustomToolTip>
            ) : (
              <LoadingButton
                disabled={(treasuryStateNumber !== "2" && treasuryStateNumber !== "4") || tokenBalance === "0"}
                onClick={onRefundClick}
                loading={refundByKillButtonSpinning || refundBySoftCapFailSpinning}
                style={{ "min-width": "200px" }}
              >
                Refund
              </LoadingButton>
            )}
          </div>
        </Col>
      </Row>
    </CUICard>
  );
};

export default RefundCard;
