import React, { Component } from "react";
import { DialogContentText } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CUIFormInput, CUIFormInputLabel } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { ButtonComponent } from "../FormComponents";
import { renderAutocompleteInput } from "../../../helpers/material-ui/helpers";

class BuyModal extends Component {
  state = {
    inputText: ""
  };

  onChangeName = e => {
    this.setState({ inputText: e.target.value });
  };

  render() {
    const { open, onClose, price, tokenTag, buyTokensOnClick } = this.props || {};
    const { inputText } = this.state || {};
    const labelValue = (parseFloat(inputText) * parseFloat(price) * Math.pow(10, 18) || 0).toPrecision(2);
    return (
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Buy Tokens</DialogTitle>
          <DialogContentText>Enter the amount of ether for which you want to purchase the token</DialogContentText>
          <DialogContent>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Token Amount"
              inputLabel="Token Amount"
              inputPlaceholder="amount in ETH"
              inputValue={inputText}
              textFocus
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeName}
            />
            <p>
              {labelValue} {tokenTag}
            </p>
          </DialogContent>
          <DialogActions>
            <ButtonComponent label="Buy" onClick={buyTokensOnClick} />
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default BuyModal;
