import React from "react";
import { CUICard, CUIFormInput } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
import { getSignInStatusText, getEtherScanHashLink } from "../../../helpers/common/projectDetailhelperFunctions";
import BtnLoader from "../../Loaders/BtnLoader";
import { CustomToolTip } from "../FormComponents";

const IssuerWithdrawCard = props => {
  const {
    currentWithdrawableAmount,
    isPermissioned,
    withdrawButtonSpinning,
    onWithdrawAmountClick,
    inputText,
    onChange,
    withdrawButtonTransactionHash,
    signinStatusFlag,
    ownerAddress,
    userLocalPublicAddress,
    network
  } = props || {};
  const canWithdraw = parseFloat(currentWithdrawableAmount) >= parseFloat(inputText) && parseFloat(inputText) > 0;
  const disabledMsg = getSignInStatusText(signinStatusFlag, ownerAddress === userLocalPublicAddress);
  const canWithdrawText = "Can't withdraw that amount";
  const link = getEtherScanHashLink(withdrawButtonTransactionHash, network);
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
          {!isPermissioned ? (
            <div className="hli">
              <CustomToolTip title={disabledMsg} id="btn-disabled" placement="bottom" disabled>
                <div>
                  <LoadingButton style={{ padding: "0 40px" }} disabled>
                    Withdraw
                  </LoadingButton>
                </div>
              </CustomToolTip>
            </div>
          ) : withdrawButtonTransactionHash !== "" ? (
            <div className="hli">
              <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            </div>
          ) : !currentWithdrawableAmount ? (
            <span width="20">
              <BtnLoader width={45} height={9} />
            </span>
          ) : (
            <div className="hli">
              <CustomToolTip title={canWithdrawText} id="btn-disabled" placement="bottom" disabled={!canWithdraw}>
                <span className="hli">
                  <LoadingButton
                    style={{ padding: "0 40px" }}
                    onClick={onWithdrawAmountClick}
                    loading={withdrawButtonSpinning}
                    disabled={!canWithdraw}
                  >
                    Withdraw
                  </LoadingButton>
                </span>
              </CustomToolTip>
            </div>
          )}
        </div>
      </CUICard>
    </div>
  );
};

export default IssuerWithdrawCard;
