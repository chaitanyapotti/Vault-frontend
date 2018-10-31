import React from "react";
import { Link } from "react-router-dom";
import { CUIModal, CUIModalActions, CUIModalContent } from "../../../helpers/material-ui";
import { ButtonComponent } from "../FormComponents";

const AlertModal = props => {
  const { open, children, handleClose, link } = props || {};
  return (
    <div>
      {link ? (
        <CUIModal open={open}>
          <CUIModalContent>{children}</CUIModalContent>
          <CUIModalActions>
            <ButtonComponent onClick={handleClose} label="Close" />
            <Link to={link}>
              <ButtonComponent label="Ok" onClick="return false;" />
            </Link>
          </CUIModalActions>
        </CUIModal>
      ) : (
        <CUIModal open={open}>
          <CUIModalContent>{children}</CUIModalContent>
          <CUIModalActions>
            <ButtonComponent onClick={handleClose} label="Ok" />
          </CUIModalActions>
        </CUIModal>
      )}
    </div>
  );
};

export default AlertModal;
