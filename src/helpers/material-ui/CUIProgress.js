/* eslint react/require-default-props: 0 */
// eslint-disable-line no-static-element-interactions

import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CUIColor, CUIProgressType } from "../../static/js/variables";
import PropTypes from "../../PropTypes";

/**
 * @Component Progress Bar
 *
 * @param props and their values
 *  variant: type : enum --> determinate | indeterminate | buffer | query for both progress bar and only static for circular.
 *  color: displayColor --> primary | secondary
 *  value: number  -->  Value between 0 and 100.
 *
 *  size : number | string --> The size of the circle. Default is 40.
 *  thickness:  The thickness of the circle. Default is 3.6.
 *
 * @returns { CUIList, CUIListItem }
 * @constructor MaterialUI List, ListItem
 *
 * @Example
 *
 * CircularProgressBar  --> <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} />
 *
 * LinearProgressBar --> <LinearProgress color="secondary" variant="query" />
 
 *
 * @Material-CircularProgress@API https://material-ui.com/api/circular-progress/
 * @Material-LinearProgress@API https://material-ui.com/api/linear-progress/
 *
 */

export const CUILinearProgress = ({ style, color, value }) => (
  <LinearProgress variant={CUIProgressType.DETERMINATE} style={style} color={color} value={value} />
);

CUILinearProgress.defaultProps = {
  style: {},
  color: CUIColor.SECONDARY,
};

CUILinearProgress.propTypes = {
  style: PropTypes.shape({}),
  color: PropTypes.cuiColor,
  value: PropTypes.number.isRequired,
};

export const CUICircularProgress = ({ displayColor, className }) => (
  <div className="loader">
    <CircularProgress color={displayColor} className={className} size={40} thickness={4} />
  </div>
);

CUICircularProgress.defaultProps = {
  displayColor: CUIColor.PRIMARY,
  className: "",
};
CUICircularProgress.propTypes = {
  displayColor: PropTypes.cuiColor,
  className: PropTypes.string,
};
