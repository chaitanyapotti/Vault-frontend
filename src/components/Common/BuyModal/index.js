import React from "react";
import { DialogContentText } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CUIFormInput } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { formatCurrencyNumber, formatFromWei, getEtherScanHashLink } from "../../../helpers/common/projectDetailhelperFunctions";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
import { CustomToolTip } from "../FormComponents";

const BuyModal = props => {
  const {
    open,
    onClose,
    roundInfo,
    tokenTag,
    buyTokensOnClick,
    onChange,
    inputText,
    buyButtonSpinning,
    buyButtonTransactionHash,
    remainingAllocation,
    tokensSold,
    r1TokenGoal,
    r1Rate,
    minimumEtherContribution,
    network
  } = props || {};
  const { tokenRate } = roundInfo || {};
  const parsedInput = parseFloat(inputText);
  const labelValue = formatCurrencyNumber(parsedInput * parseFloat(tokenRate), 0);
  const link = getEtherScanHashLink(buyButtonTransactionHash, network);
  const round1Residue = parseFloat(r1TokenGoal) - parseFloat(tokensSold);
  const otherRoundResidue =
    formatFromWei((parseFloat(roundInfo.tokenCount) - parseFloat(roundInfo.totalTokensSold)) / parseFloat(roundInfo.tokenRate), 18) - parsedInput;
  const disabledTitle =
    parsedInput < formatFromWei(minimumEtherContribution, 4)
      ? "Min Contribution not satisfied"
      : isNaN(parsedInput)
      ? "Invalid Input"
      : parsedInput * parseFloat(tokenRate) > remainingAllocation || otherRoundResidue < 0
      ? "Can't buy that amount"
      : "";
  const isDisabled =
    parsedInput * parseFloat(tokenRate) > remainingAllocation ||
    isNaN(parsedInput) ||
    parsedInput < formatFromWei(minimumEtherContribution, 4) ||
    otherRoundResidue < 0;
  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle>
          <div className="buyModalText">Buy Tokens</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="buyModalText">Enter the amount of ether for which you want to purchase the token</DialogContentText>
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
          <p>
            {labelValue} {tokenTag}
          </p>
          {parsedInput * parseFloat(r1Rate) > round1Residue ? (
            <div className="txt-m text-right text--danger">
              Your order is overflowing out of Round 1, and part of your order will go to round 2. You may recieve lesser tokens than expected.
            </div>
          ) : null}
        </DialogContent>
        <DialogActions>
          {buyButtonTransactionHash !== "" ? (
            <div className="hli">
              <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            </div>
          ) : (
            <div className="hli">
              <CustomToolTip title={disabledTitle} disabled={isDisabled}>
                <span>
                  <LoadingButton onClick={buyTokensOnClick} loading={buyButtonSpinning} disabled={isDisabled}>
                    Buy
                  </LoadingButton>
                </span>
              </CustomToolTip>
            </div>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuyModal;
