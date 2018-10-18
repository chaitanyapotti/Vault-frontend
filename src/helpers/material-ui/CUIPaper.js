/* eslint react/require-default-props: 0 */
import React from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

/**
 * @Component Paper
 *
 * @param props and thier values
 * elevation --> Shadow depth, corresponds to dp in the spec. It's accepting values between 0 and 24
 * square --> type: Boolean --> If true, rounded corners are disabled
 *
 * @returns { CUIPaper}
 *
 * @constructor MaterialUI Paper
 *
 * @Example
 *
 * <CUIPaper inset style={{ backgroundColor: '#dfe0e3' }}  elevation={2}/>
 *
 * @Material-Paper@API https://material-ui.com/api/paper/
 */

const CUIPaper = props => (
  <Paper className={`${props.type === "intrruption" ? "cs-cui-ppr-intrrup" : "cs-cui-ppr"}`} elevation={0}>
    {props.children}
  </Paper>
);

CUIPaper.defaultProps = {
  className: "",
};
CUIPaper.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

export default CUIPaper;
