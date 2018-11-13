import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard, CUIFormInput } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";

const IssuerWithdrawCard = props => {
  const { currentWithdrawableAmount, isPermissioned, withdrawButtonSpinning, onWithdrawAmountClick, inputText, onChange } = props || {};
  const canWithdraw = parseFloat(currentWithdrawableAmount) >= parseFloat(inputText);
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
                  <LoadingButton style={{padding: '0 40px'}} disabled>Withdraw</LoadingButton>
                </div>
              </Tooltip>
            </div>
          ) : (
            <span className="hli">
              <LoadingButton style={{padding: '0 40px'}} onClick={onWithdrawAmountClick} loading={withdrawButtonSpinning} disabled={!canWithdraw}>
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
