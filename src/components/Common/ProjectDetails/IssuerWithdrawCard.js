import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard, CUIFormInput } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";

const IssuerWithdrawCard = props => {
  const {
    currentWithdrawableAmount,
    isPermissioned,
    withdrawButtonSpinning,
    onWithdrawAmountClick,
    inputText,
    onChange,
    withdrawButtonTransactionHash
  } = props || {};
  const canWithdraw = parseFloat(currentWithdrawableAmount) >= parseFloat(inputText);
  const link = `https://rinkeby.etherscan.io/tx/${withdrawButtonTransactionHash}`;
  return (
    <div>
      <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
        <div className="txt-xxxl text--primary">Withdraw Amount</div>
        <Row className="push--top">
          <Col lg={12} className="txt">
            Current Withdrawable Amount: <span className="text--secondary">{currentWithdrawableAmount} ETH</span>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className="txt">
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Enter Amount"
              inputLabel="Enter Amount"
              inputPlaceholder="amount in ETH"
              inputValue={inputText}
              textFocus
              onChange={onChange}
            />
          </Col>
        </Row>
        <div className="text-right push--top">
          {!isPermissioned || !canWithdraw ? (
            <div className="hli">
              <Tooltip title="This feature is only for Vault Issuer Members" id="btn-disabled">
                <div>
                  <LoadingButton style={{ padding: "0 40px" }} disabled>
                    Withdraw
                  </LoadingButton>
                </div>
              </Tooltip>
            </div>
          ) : withdrawButtonTransactionHash !== "" ? (
            <div className="hli">
              <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            </div>
          ) : (
            <span className="hli">
              <LoadingButton style={{ padding: "0 40px" }} onClick={onWithdrawAmountClick} loading={withdrawButtonSpinning} disabled={!canWithdraw}>
                Withdraw
              </LoadingButton>
            </span>
          )}
        </div>
      </CUICard>
    </div>
  );
};

export default IssuerWithdrawCard;
