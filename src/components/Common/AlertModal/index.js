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
          <CUIModalContent className="ModalContent">{children}</CUIModalContent>
          <CUIModalActions className="ModalActions">
            <div className="hli">
              <LoadingButton onClick={handleClose}>Close</LoadingButton>
            </div>
            <Link to={link}>
              <div className="hli">
                <ButtonComponent label="Proceed" onClick="return false;" />
              </div>
            </Link>
          </CUIModalActions>
        </CUIModal>
      ) : metamask ? (
        <CUIModal open={open}>
          <CUIModalContent className="ModalContent">{children}</CUIModalContent>
          <CUIModalActions className="ModalActions">
            <div className="hli">
              <LoadingButton onClick={handleClose}>Close</LoadingButton>
            </div>
            <div className="hli">
              <LoadingButton onClick={onProceedClick} loading={killButtonSpinning || tapButtonSpinning || xfr1ButtonSpinning || xfr2ButtonSpinning}>
                Proceed
              </LoadingButton>
            </div>
          </CUIModalActions>
        </CUIModal>
      ) : (
        <CUIModal open={open}>
          <CUIModalContent className="ModalContent">{children}</CUIModalContent>
          <CUIModalActions className="ModalActions">
            <div className="hli">
              <LoadingButton onClick={handleClose}>Close</LoadingButton>
            </div>
          </CUIModalActions>
        </CUIModal>
      )}
    </div>
  );
};

export default AlertModal;
