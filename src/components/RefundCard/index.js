import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../helpers/material-ui";
import LoadingButton from "../Common/LoadingButton";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";

const RefundCard = props => {
  const { signinStatusFlag, treasuryStateNumber, tokenBalance, label, refundBySoftCapFailSpinning, refundByKillButtonSpinning, onRefundClick } =
    props || {};
  return (
    <div className="push-top--50">
      <Grid>
        <Row>
          <Col lg={12}>
            <CUICard style={{ padding: "40px 50px" }}>
              <Grid>
                <Row>
                  <Col lg={8}>
                    <div className="text-center sbhdr-txt push--bottom txt-xl">{label}</div>
                  </Col>
                  <Col lg={4}>
                    <div className="text--center">
                      {signinStatusFlag <= 3 ? (
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
