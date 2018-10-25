import React from "react";
import Badge from "@material-ui/core/Badge";
import { CUIColor } from "../../static/js/variables";
import PropTypes from "../../PropTypes";

/**
 * @Component Badge
 *
 * @param props and their values
 * content --> badgeContent --> for eg. content={4}
 * badgeColor --> color --> primary | secondary | default | error
 * children --> node --> <span />
 *
 * @returns { CUIBadge }
 *
 * @constructor MaterialUI badge
 *
 * @Example
 *
 * <CUIBadge badgeColor={CUIColor.PRIMARY} content={option.count}>
 * <span />
 * </CUIBadge>
 *
 * @Material-Badge@API https://material-ui.com/api/badge/
 */

const CUIBadge = props => (
  <Badge color={props.badgeColor} badgeContent={props.content} style={props.style}>
    {props.children}
  </Badge>
);

CUIBadge.defaultProps = {
  badgeColor: CUIColor.DEFAULT,
  style: {},
};

CUIBadge.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  badgeColor: PropTypes.cuiColor,
  style: PropTypes.shape({}),
};

export default CUIBadge;
