import React from "react";
import Divider from "@material-ui/core/Divider";
import PropTypes from "../../PropTypes";

/**
 * @Component Divider
 *
 * @param props and thier values
 * dividertheme --> light Boolean true | false -- If true, the divider will have a lighter color.
 * inset --> dividerstyle Boolean true | false -- If true, the divider will be indented.
 *
 * @returns { CUIDivider}
 *
 * @constructor MaterialUI Divider
 *
 * @Example
 *
 * <CUIDivider inset style={{ backgroundColor: '#dfe0e3' }} />
 *
 * @Material-Divider@API https://material-ui.com/api/divider/
 */

const CUIDivider = props => {
  const dividerProps = {
    style: props.style,
    light: props.dividerTheme,
    inset: props.dividerStyle,
    className: props.className,
  };
  return <Divider {...dividerProps} />;
};

CUIDivider.defaultProps = {
  style: {},
  dividerTheme: false,
  dividerStyle: false,
  className: "",
};
CUIDivider.propTypes = {
  style: PropTypes.shape({}),
  dividerTheme: PropTypes.bool,
  dividerStyle: PropTypes.bool,
  className: PropTypes.string,
};

export default CUIDivider;
