import React from "react";
import { DialogContentText } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CUIFormInput } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { formatCurrencyNumber } from "../../../helpers/common/projectDetailhelperFunctions";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
import { Grid, Row, Col } from "../../../helpers/react-flexbox-grid";

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
    r1Rate
  } = props || {};
  const { tokenRate } = roundInfo || {};
  const labelValue = formatCurrencyNumber(parseFloat(inputText) * parseFloat(tokenRate), 0);
  const link = `https://rinkeby.etherscan.io/tx/${buyButtonTransactionHash}`;
  const round1Residue = r1TokenGoal - tokensSold;
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
          {inputText * r1Rate > round1Residue ? (
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
              <LoadingButton
                onClick={buyTokensOnClick}
                loading={buyButtonSpinning}
                disabled={parseFloat(inputText) * parseFloat(tokenRate) > remainingAllocation || inputText === ""}
              >
                Buy
              </LoadingButton>
            </div>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuyModal;
