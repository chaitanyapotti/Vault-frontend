import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { CUIModal, CUIModalActions, CUIModalContent } from "../../../helpers/material-ui";
import { ButtonComponent } from "../FormComponents";

class AlertModal extends Component {
    render() { 
        const{open, children, handleClose, link} = this.props || {};
        return ( 
        <div>
            <CUIModal open={open}>
                <CUIModalContent>
                    {children}
                </CUIModalContent>
                <CUIModalActions>
                    <ButtonComponent onClick={handleClose}  label="Close" />
                    <Link to={link}><ButtonComponent label="Ok" onClick="return false;" /></Link>
                </CUIModalActions>
            </CUIModal>
        </div> );
    }
}
 
export default AlertModal;