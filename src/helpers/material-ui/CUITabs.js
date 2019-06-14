/* eslint react/require-default-props: 0 */
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "../../PropTypes";
import { CUIColor } from "../../static/js/variables";

/**
 * @Component Tabs
 *
 * @param props and their values
 *  variant: type : enum --> determinate | indeterminate | buffer | query for both progress bar and only static for circular.
 *  color: displayColor --> primary | secondary
 *  value: number  -->  Value between 0 and 100.
 *
 *  size : number | string --> The size of the circle. Default is 40.
 *  thickness:  The thickness of the circle. Default is 3.6.
 *
 * @returns { CUITabs }
 * @constructor MaterialUI Tabs
 * @Example
 *<Tabs value={value} onChange={this.handleChange} indicatorColor={CUIColor.PRIMARY} scroll={false}>
 *     <Tab label="Item One"  icon={<PhoneIcon />}/>
 *     <Tab label="Item Two" disabled/>
 *     <Tab label="Item Three" value={value} disabled icon={<span className='icon'/>}/>
 *</Tabs>
 *
 * @Material-Tabs@API https://material-ui.com/api/tabs/
 * @Material-Tab@API https://material-ui.com/api/tab/
 *
 */

const CUITabs = props => {
  const { iconList, full, scroll, style, indicatorColor, textColor, value, onChange } = props || {};
  const tabsProps = { indicatorColor, textColor, value, scrollable: scroll, fullWidth: full, onChange, style };

  return (
    <Tabs {...tabsProps}>
      {iconList.map(option => {
        const tabProps = {
          key: option.key,
          value: option.value,
          label: option.label,
          style
        };

        return <Tab {...tabProps} />;
      })}
    </Tabs>
  );
};

CUITabs.defaultProps = {
  style: {},
  icon: null,
  label: "",
  iconList: [],
  full: false,
  scroll: false,
  indicatorColor: CUIColor.SECONDARY,
  textColor: CUIColor.INHERIT
};

CUITabs.propTypes = {
  style: PropTypes.shape({}),
  icon: PropTypes.node,
  label: PropTypes.string,
  full: PropTypes.bool,
  scroll: PropTypes.bool,
  textColor: PropTypes.cuiColor,
  value: PropTypes.string.isRequired
};

export default CUITabs;
