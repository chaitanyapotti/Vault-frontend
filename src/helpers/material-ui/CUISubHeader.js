import React from "react";
import PropTypes from "../../PropTypes";

const CUISubHeader = props => <div {...props}>{props.children}</div>;

CUISubHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CUISubHeader;
