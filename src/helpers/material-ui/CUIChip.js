import React from "react";
import Chip from "@material-ui/core/Chip";
import PropTypes from "../../PropTypes";

/**
 *
 * @param props and their values
 * label (Chip Value)
 * onDelete
 *
 * @returns { CUIChip }
 * @constructor MaterialUI Chip
 *
 * example
 *
 * <CUIchip label="" onDelete={this.handleDelete} />
 *
 * @Material-IconFont@API https://material-ui.com/api/chip/
 */

const CUIChip = props => {
  const { label, onDelete, style } = props;
  return <Chip label={label} onDelete={onDelete} style={style} {...props} />;
};

CUIChip.defaultProps = {
  style: {
    margin: "0px 2px 4px",
    color: "#72727d",
    backgroundColor: "#f1f1f2",
    fontSize: "14px"
  }
};
CUIChip.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  style: PropTypes.shape()
};

export default CUIChip;
