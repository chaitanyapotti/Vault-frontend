/* eslint react/require-default-props: 0 */
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import PropTypes from "../../PropTypes";
import { CUIDialogMaXWidth, CUIModalTransition } from "../../static/js/variables";
import CUIWrapper from "./CUIWrapper";

/**
 *
 * @Component Modal
 *
 * fullScreen --> dialogfullscreen = boolean : true | false
 * fullWidth --> dialogfullwidth = boolean  : true | false
 * maxWidth --> dialogMaxWidth = enum : xs | sm | md --> to disable maxWidth : boolean -> false
 * slide --> direction = up | down | right | left
 *
 * @returns {*} CUIDialog
 *
 * @constructor Material UI Dialog..
 *
 * @Example
 *
 * <CUIModal dialogfullscreen={true} dialogfullwidth={true} dialogMaxWidth={md}>
 *    <CUIModalTitle>
 *        {.....Title Content }
 *    </CUIModalTitle>
 *    <CUIModalContent>
 *        {... Body Content}
 *    </CUIModalContent>
 *    <CUIModalActions>
 *        {...Footer Content}
 *    </CUIModalActions>
 * </CUIModal>
 *
 * @Material-Modal@API https://material-ui.com/api/dialog/
 * @Material-ModalTitle@API https://material-ui.com/api/dialog-title/
 * @Material-ModalContent@API https://material-ui.com/api/dialog-content/
 * @Material-ModalActions@API https://material-ui.com/api/dialog-actions/
 * @param props
 */

const TransitionUp = props => <Slide direction={CUIModalTransition.UP} {...props} />;
const TransitionLeft = props => <Slide direction={CUIModalTransition.LEFT} {...props} />;

const getTransitionComponent = transitionDirection => {
  switch (transitionDirection) {
    case CUIModalTransition.LEFT:
      return TransitionLeft;
    default:
      return TransitionUp;
  }
};

const CUIModal = props => {
  const { children, style, dialogFullScreen, dialogFullWidth, dialogMaxWidth, className, width, margin, close, transition, transitionDirection, open } =
    props || {};

  const modalProps = {
    children,
    style,
    open,
    fullScreen: dialogFullScreen,
    fullWidth: dialogFullWidth,
    maxWidth: dialogMaxWidth,
    className,
    onClose: close,
  };

  if (transition) {
    modalProps.TransitionComponent = getTransitionComponent(transitionDirection);
  }

  return (
    <CUIWrapper>
      <Dialog PaperProps={{ style: { width, margin } }} {...modalProps} />
    </CUIWrapper>
  );
};

CUIModal.defaultProps = {
  children: null,
  dialogFullScreen: false,
  dialogFullWidth: false,
  transition: true,
  transitionDirection: CUIModalTransition.UP,
  dialogMaxWidth: CUIDialogMaXWidth.SM,
  width: undefined,
  margin: undefined,
  className: "",
  close: () => {},
};

CUIModal.propTypes = {
  children: PropTypes.node,
  style: PropTypes.shape(),
  dialogFullScreen: PropTypes.bool,
  dialogFullWidth: PropTypes.bool,
  transition: PropTypes.bool,
  transitionDirection: PropTypes.string,
  dialogMaxWidth: PropTypes.cuiDialogMaXWidth,
  className: PropTypes.string,
  width: PropTypes.string,
  margin: PropTypes.number,
  close: PropTypes.func,
};

const CUIModalActions = props => <DialogActions {...props}>{props.children}</DialogActions>;

CUIModalActions.propTypes = {
  children: PropTypes.node.isRequired,
};

const CUIModalTitle = props => <DialogTitle {...props}>{props.children}</DialogTitle>;

CUIModalTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

const CUIModalContent = props => <DialogContent {...props}>{props.children}</DialogContent>;

CUIModalContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CUIModal, CUIModalActions, CUIModalTitle, CUIModalContent };
