import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import { CUIColor } from "../../static/js/variables";
import PropTypes from "../../PropTypes";

/**
 * @Component List
 * @param props and their values
 *
 * @returns { CUIList, CUIListItem }
 * @constructor MaterialUI List, ListItem
 *
 * @Example
 *<CUIList removePadding={false} style={{margin: 0}} onClick={this.handleClick.bind(this)}>
 *  <CUIListItem button removePadding={true}>
 *    <CUIListItemIcon>
 *        <InboxIcon />
 *    </ListItemIcon>
 *    <CUIListSubheader disableSticky={true} inset={false} color={CUIColor.PRIMARY}/>
 *  </ListItem>
 *</List>
 *
 *
 * @Material-List@API https://material-ui.com/api/list/
 * @Material-ListItem@API https://material-ui.com/api/list-item/
 * @Material-ListItemIcon@API https://material-ui.com/api/list-item-icon/
 * @Material-ListSubheader@API https://material-ui.com/api/list-subheader/
 */
/** *********************** CUIList ************************ */

const CUIList = props => <List {...props}>{props.children}</List>;

CUIList.propTypes = {
  children: PropTypes.node.isRequired,
};

/** *********************** CUIList Item ************************ */

const CUIListItem = props => <ListItem {...props}>{props.children}</ListItem>;

CUIListItem.defaultProps = {
  children: null,
  style: { display: "block" },
  button: true,
};
CUIListItem.propTypes = {
  children: PropTypes.node,
  style: PropTypes.shape({}),
  button: PropTypes.bool,
};

/** *********************** CUIList Item Icon************************ */

const CUIListItemIcon = props => <ListItemIcon>{props.children}</ListItemIcon>;

CUIListItemIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

/** *********************** CUIList Subheader************************ */

const CUIListSubheader = props => {
  const listSubheaderProps = {
    disableSticky: props.removeSticky,
    inset: props.inset,
    color: props.color,
    style: props.style,
    className: props.className,
    onClick: props.onClick,
  };
  return <ListSubheader {...listSubheaderProps}>{props.children}</ListSubheader>;
};

CUIListSubheader.defaultProps = {
  removeSticky: false,
  inset: false,
  style: {},
  className: "",
  color: CUIColor.DEFAULT,
  onClick: () => {},
};
CUIListSubheader.propTypes = {
  children: PropTypes.node.isRequired,
  removeSticky: PropTypes.bool,
  inset: PropTypes.bool,
  style: PropTypes.shape({}),
  color: PropTypes.cuiColor,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
export { CUIList, CUIListItem, CUIListItemIcon, CUIListSubheader };
