/* eslint-disable no-script-url */
import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { CS_FONT_SIZE, CUIButtonColor, CUIButtonType } from "../../static/js/variables";
import PropTypes from "../../PropTypes";

/**
 * @Component Button
 *
 * @param props and their values:*
 *
 *  type  - raised | fab
 *  buttonColor - default | primary | secondary
 *  full - true | false (Button fullWidth)
 *  size  - small | medium | large
 *  disabled - true | false
 *  label - (Button value) viz. children
 *  labelStyle - (Button value style)
 *  fabSmall - true | false (fab button small size)
 *
 * @returns {*} Raised , Flat ,Outlined, Default, Floating Action Button...
 *
 * @constructor MaterialUI Button..
 *
 * @Example
 *
 * Flat button(type not required) - <Button buttonColor={CUIButtonColor.SECONDARY} full={true} disabled={false} size='small' />
 *
 * Raised button(type='raised') - <Button type={CUIButtonType.RAISED} buttonColor={CUIButtonColor.SECONDARY}
 *
 * Outlined button (type='outlined') - <Button type={CUIButtonType.OUTLINED} buttonColor={CUIButtonColor.PRIMARY} fabSmall={true}/>
 *
 * FAB button (type='fab') - <Button type={CUIButtonType.FAB}  buttonColor={CUIButtonColor.PRIMARY} fabSmall={true}/>
 *
 * @Material-Button@API https://material-ui-next.com/api/button/
 */

const CUIButton = props => {
  const { style, type, buttonColor, disabled, className, id, size, full, tabIndex, href, isLink } = props || {};
  const btnProps = {
    style,
    variant: type,
    color: buttonColor,
    disabled,
    className,
    id,
    size,
    fullWidth: full,
    tabIndex
  };

  if (isLink && href) {
    btnProps.href = href;
  } else if (href) {
    btnProps.component = Link;
    btnProps.to = href;
  } else {
    btnProps.onClick = props.onClick;
  }

  return (
    <Button {...btnProps}>
      <div style={props.labelStyle}>{props.children || props.label}</div>
    </Button>
  );
};

CUIButton.defaultProps = {
  children: null,
  labelStyle: {
    textTransform: "none",
    fontSize: CS_FONT_SIZE.S
  },
  className: "",
  disabled: false,
  size: "medium",
  style: {},
  isLink: false,
  label: "",
  type: CUIButtonType.CONTAINED,
  href: undefined,
  id: "",
  isLinkExternal: false,
  tabIndex: 0,
  buttonColor: CUIButtonColor.PRIMARY,
  full: false,
  icon: null,
  actionProps: {},
  to: "",
  component: undefined,
  onClick: () => {}
};

CUIButton.propTypes = {
  type: PropTypes.cuiButtonType,
  children: PropTypes.node,
  component: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.node,
  buttonColor: PropTypes.string,
  labelStyle: PropTypes.shape({}),
  size: PropTypes.cuiButtonSize,
  style: PropTypes.shape({}),
  disabled: PropTypes.bool,
  isLink: PropTypes.bool,
  href: PropTypes.string,
  id: PropTypes.string,
  tabIndex: PropTypes.number,
  full: PropTypes.bool,
  isLinkExternal: PropTypes.bool,
  icon: PropTypes.element,
  to: PropTypes.string,
  actionProps: PropTypes.shape({}),
  onClick: PropTypes.func
};

export default CUIButton;
