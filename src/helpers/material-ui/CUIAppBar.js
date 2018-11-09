/* eslint react/require-default-props: 0 */
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { CUIPosition, CUIColor } from "../../static/js/variables";
import PropTypes from "../../PropTypes";

/**
 * @Component AppBar
 *
 * @param props and their values
 * appbarcolor --> color --> primary | secondary | default | inherit
 * appBarPosition --> fixed | static | absolute | sticky
 * @returns { CUIAppBar }
 *
 * @constructor MaterialUI AppBar
 *
 * @Example
 *
 * <CUIAppBar appbarcolor={CUIAppBarColor.SECONDARY} appbarposition={CUIAppBarPosition.static} style{{height : '60px'}}></CUIAppBar>
 *
 * @Material-AppBar@API https://material-ui.com/api/app-bar/
 */

const CUIAppBar = props => {
  const appBarProps = {
    color: props.appBarColor,
    position: props.appBarPosition,
    style: props.style,
  };
  return <AppBar {...appBarProps}>{props.children}</AppBar>;
};

CUIAppBar.defaultProps = {
  appBarColor: CUIColor.SECONDARY,
  appBarPosition: CUIPosition.FIXED,
};

CUIAppBar.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape(),
  appBarColor: PropTypes.cuiColor,
  appBarPosition: PropTypes.cuiPosition,
};

export default CUIAppBar;
