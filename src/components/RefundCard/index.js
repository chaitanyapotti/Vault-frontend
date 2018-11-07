import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../helpers/material-ui";
import LoadingButton from "../Common/LoadingButton";

const RefundCard = props => {
  const { signinStatusFlag, treasuryStateNumber, tokenBalance, label, refundBySoftCapFailSpinning, refundByKillButtonSpinning, onRefundClick } =
    props || {};
  return (
    <div className="push-top--50">
      <CUICard style={{ padding: "40px 40px", width: "450px", margin: "0 auto" }}>
        <div className="text-center sbhdr-txt push--bottom txt-xl">{label}</div>
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
      </CUICard>
    </div>
  );
};

export default RefundCard;
