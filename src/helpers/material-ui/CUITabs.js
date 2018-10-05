/* eslint react/require-default-props: 0 */
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import { CUIBadge } from '../material-ui';
import PropTypes from '../../PropTypes';
import { CUIColor } from '../../static/js/variables';

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
  const { iconList, full, scroll, style, indicatorColor, textColor, value, disabled } = props || {};
  const tabsProps = { indicatorColor, textColor, value, scrollable: scroll, fullWidth: full };

  return (
    <Tabs {...tabsProps}>
      {iconList.map(option => {
        const isActive = option.value === value;
        const isDisabled = isActive && disabled;

        const tabProps = {
          key: option.key,
          disabled: isDisabled,
          value: option.value,
          label: option.label,
          style,
        };

        if (option.isLinkExternal) {
          tabProps.href = option.link;
        } else {
          tabProps.component = Link;
          tabProps.to = option.link;
        }

        return (
          <Tab
            {...tabProps}
            icon={
              <span className={`${option.class}${isActive ? ' active' : ' inactive'}`}>
                {!isActive &&
                  !!option.count &&
                  <CUIBadge badgeColor={CUIColor.PRIMARY} style={{ marginLeft: 5 }} content={option.count > 999 ? '999+' : option.count}>
                    <span />
                  </CUIBadge>}
              </span>
            }
          />
        );
      })}
    </Tabs>
  );
};

CUITabs.defaultProps = {
  style: {},
  icon: null,
  label: '',
  iconList: [],
  full: false,
  scroll: false,
  indicatorColor: CUIColor.SECONDARY,
  textColor: CUIColor.INHERIT,
};

CUITabs.propTypes = {
  style: PropTypes.shape({}),
  icon: PropTypes.node,
  label: PropTypes.string,
  iconList: PropTypes.arrayOf(
    PropTypes.shape({
      class: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }),
  ),
  full: PropTypes.bool,
  scroll: PropTypes.bool,
  indicatorColor: PropTypes.cuiColor,
  textColor: PropTypes.cuiColor,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default CUITabs;
