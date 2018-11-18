import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../helpers/material-ui";
import LoadingButton from "../Common/LoadingButton";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { ensureHttpUrl } from "../../helpers/common/urlFixerInHref";

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
    <div className="push-top--50">
      <Grid>
        <Row>
          <Col lg={12}>
            <CUICard style={{ padding: "40px 50px" }}>
              <Grid>
                <Row>
                  <Col lg={8}>
                    <div className="text-left text--primary sbhdr-txt push--bottom txt-xl">{label}</div>
                  </Col>
                  <Col lg={4}>
                    <div className="text--center">
                      {refundByKillButtonTransactionHash !== "" ? (
                        <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                          <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                            Status
                          </LoadingButton>
                        </a>
                      ) : refundBySoftcapfailButtonTransactionHash !== "" ? (
                        <a href={ensureHttpUrl(refundSoftLink)} target="_blank" rel="noreferrer noopener">
                          <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                            Status
                          </LoadingButton>
                        </a>
                      ) : signinStatusFlag <= 3 ? (
                        <Tooltip title="This feature is only for Vault Members" id="btn-disabled">
                          <div>
                            <LoadingButton disabled>Refund</LoadingButton>
                          </div>
                        </Tooltip>
                      ) : (
                        <LoadingButton
                          disabled={(treasuryStateNumber !== "2" && treasuryStateNumber !== "4") || tokenBalance === "0"}
                          onClick={onRefundClick}
                          loading={refundByKillButtonSpinning || refundBySoftCapFailSpinning}
                        >
                          Refund
                        </LoadingButton>
                      )}
                    </div>
                  </Col>
                </Row>
              </Grid>
            </CUICard>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default RefundCard;
