import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PropTypes from "../../PropTypes";
import { CUIColor } from "../../static/js/variables";

/**
 * @Component ButtonIcon
 *
 * @param props and their values:*
 *  children  --> Type: node viz. Icon Element
 *  color -->  default | primary | secondary | inherit
 *
 * @returns { CUIButtonIcon }
 *
 * @constructor MaterialUI IconButton..
 *
 * @Example
 *
 * <CUIButtonIcon onClick={onClick} color={CUIColor.PRIMARY} style={{margin: 0}}>{iconElement}</CUIButtonIcon>
 *
 * @Material-IconButton@API https://material-ui.com/api/icon-button/#iconbutton
 *
 */

const CUIButtonIcon = props => <IconButton {...props}>{props.children}</IconButton>;

CUIButtonIcon.defaultProps = {
  color: CUIColor.DEFAULT,
};
CUIButtonIcon.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.cuiColor,
};

export default CUIButtonIcon;
