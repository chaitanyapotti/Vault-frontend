import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { customTheme } from "../../static/js/theme";

const theme = createMuiTheme(customTheme);

const CUIWrapper = props => <MuiThemeProvider theme={theme}>{props.children}</MuiThemeProvider>;

CUIWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CUIWrapper;
