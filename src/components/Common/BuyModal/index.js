import React, { Component } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CUIModal, CUIFormInput } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { ButtonComponent } from "../FormComponents";

class BuyModal extends Component {
    state = {
        open: false,
    };
    
    handleClickOpen = () => {
    this.setState({ open: true });
    };
    
    handleClose = () => {
    this.setState({ open: false });
    };
    render() { 
        return ( 
        <div>
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Enter the amount you want to buy?</DialogTitle>
                <DialogContent>
                    <CUIFormInput
                        inputType={CUIInputType.TEXT}
                        full
                        inputName="Token Amount"
                        inputLabel="Token Amount"
                        inputPlaceholder="500 ETH"
                        //   inputValue={this.props.adminName}
                        textFocus
                        // onBlur={this.onBlurAge}
                        // error={this.state.errorAgeText !== ''}
                        // helperText={this.state.errorAgeText}
                        // onKeyDownSelector="Admin"
                        //   onChange={this.onChangeName}
                    />
                </DialogContent>
                <DialogActions>
                    <ButtonComponent  label="Buy" />
                </DialogActions>
            </Dialog>
        </div> );
    }
}
 
export default BuyModal;