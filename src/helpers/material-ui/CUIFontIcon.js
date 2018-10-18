import React from "react";
import Icon from "@material-ui/core/Icon";
import PropTypes from "../../PropTypes";

/**
 *
 * @param props and thier values
 * fontColor --> color  primary | secondary | action | error | disabled
 *
 * @returns { CUIFontIcon }
 * @constructor MaterialUI FontIcon
 *
 * example
 *
 * <CUIFontIcon styl={{width : '40px', height:'40px'}} color={CUIFontIconColor.PRIMARY} onClick={this.handleClick}>add_shopping_cart</CUIFontIcon>
 *
 * @Material-IconFont@API https://material-ui.com/api/icon/
 */

const CUIFontIcon = props => <Icon {...props}>{props.children}</Icon>;

CUIFontIcon.defaultProps = {
  children: null,
};

CUIFontIcon.propTypes = {
  children: PropTypes.node,
};

export default CUIFontIcon;
