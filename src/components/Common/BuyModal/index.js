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

const BuyModal = props => {
  const { open, onClose, roundInfo, tokenTag, buyTokensOnClick, onChange, inputText, buyButtonSpinning, buyButtonTransactionHash } = props || {};
  const { tokenRate } = roundInfo || {};
  const labelValue = formatCurrencyNumber(parseFloat(inputText) * parseFloat(tokenRate), 0);
  const link = `https://rinkeby.etherscan.io/tx/${buyButtonTransactionHash}`;
  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Buy Tokens</DialogTitle>
        <DialogContentText>Enter the amount of ether for which you want to purchase the token</DialogContentText>
        <DialogContent>
          <CUIFormInput
            inputType={CUIInputType.TEXT}
            full
            inputName="Enter Amount"
            inputLabel="Enter Amount"
            inputPlaceholder="amount in ETH"
            inputValue={inputText}
            textFocus
            // onBlur={this.onBlurAge}
            // error={this.state.errorAgeText !== ''}
            // helperText={this.state.errorAgeText}
            // onKeyDownSelector="Admin"
            onChange={onChange}
          />
          <p>
            {labelValue} {tokenTag}
          </p>
        </DialogContent>
        <DialogActions>
          {buyButtonTransactionHash !== "" ? (
            <a href={link} target="_blank" rel="noreferrer noopener">
              <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                Status
              </LoadingButton>
            </a>
          ) : (
            <LoadingButton onClick={buyTokensOnClick} loading={buyButtonSpinning}>
              Buy
            </LoadingButton>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuyModal;
