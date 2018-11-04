import React from "react";
import { Link } from "react-router-dom";
import { CUIModal, CUIModalActions, CUIModalContent } from "../../../helpers/material-ui";
import { ButtonComponent } from "../FormComponents";
import LoadingButton from "../LoadingButton";

const AlertModal = props => {
  const {
    open,
    children,
    handleClose,
    link,
    onProceedClick,
    metamask,
    killButtonSpinning,
    tapButtonSpinning,
    xfr1ButtonSpinning,
    xfr2ButtonSpinning
  } = props || {};
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
      ) : metamask ? (
        <CUIModal open={open}>
          <CUIModalContent>{children}</CUIModalContent>
          <CUIModalActions>
            <ButtonComponent onClick={handleClose} label="Close" />
            <LoadingButton onClick={onProceedClick} loading={killButtonSpinning || tapButtonSpinning || xfr1ButtonSpinning || xfr2ButtonSpinning}>
              Proceed
            </LoadingButton>
          </CUIModalActions>
        </CUIModal>
      ) : (
        <CUIModal open={open}>
          <CUIModalContent>{children}</CUIModalContent>
          <CUIModalActions>
            <ButtonComponent onClick={handleClose} label="Close" />
          </CUIModalActions>
        </CUIModal>
      )}
    </div>
  );
};

export default AlertModal;
