import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuList from "@material-ui/core/MenuList";
import PropTypes from "../../PropTypes";

/**
 * @Component Menu
 *
 * @param props and their values
 *
 * @returns { CUIMenu, CUIMenuList }
 *
 * @constructor MaterialUI Menu, CUIMenuList
 *
 * @Example
 *
 *<CUIMenu open={true} onClick={this.handleClose.bind(this)}>
 *   <CUIMenuList>
 *      <CUIMenuItem  onClick={this.handleMenuItem.bind(this)}/>
 *      <CUIMenuItem  onClick={this.handleMenuItem.bind(this)}/>
 *      <CUIMenuItem  onClick={this.handleMenuItem.bind(this)}/>
 *   </CUIMenuList>
 *</CUIMenu>
 *
 *
 * @Material-Menu@API https://material-ui.com/api/list/
 * @Material-MenuItem@API https://material-ui.com/api/menu-item/
 * @Material-MenuList@API https://material-ui.com/api/menu-list/
 */

const CUIMenu = props => <Menu {...props} />;

CUIMenu.defaultProps = {
  children: null,
  open: false,
  onClose: () => {},
};

CUIMenu.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

/** *********************** CUIMenuList ************************ */
const CUIMenuList = props => {
  const menuListProps = {
    style: props.style,
    className: props.className,
  };
  return <MenuList {...menuListProps}>{props.children}</MenuList>;
};

CUIMenuList.defaultProps = {
  style: {},
  className: "",
};

CUIMenuList.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
  className: PropTypes.string,
};

export { CUIMenu, CUIMenuList };
