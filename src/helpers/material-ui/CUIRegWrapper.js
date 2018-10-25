import React from "react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { customRegTheme } from "../../static/js/theme";
import PropTypes from "../../PropTypes";

const theme = createMuiTheme(customRegTheme);

const styles = {
  container: {
    backgroundImage: "linear-gradient(-179deg, #FF5454 1%, #FF7C46 100%)",
    height: "100vh",
    minHeight: "500px",
  },
  interruption: {
    backgroundImage: "linear-gradient(-179deg, #FF5454 1%, #FF7C46 100%)",
    backgroundColor: "transparent",
    boxShadow: "none",
  },
};

class CUIRegWrapper extends React.PureComponent {
  renderStyle = () => {
    switch (this.props.type) {
      case "interruption":
        return styles.interruption;
      default:
        return styles.container;
    }
  };

  render() {
    const newStyle = { ...this.renderStyle(), ...this.props.style };
    return (
      <MuiThemeProvider theme={theme}>
        <div id={this.props.id} style={newStyle}>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

CUIRegWrapper.defaultProps = {
  id: "cuiWrapper",
  style: {},
};

CUIRegWrapper.propTypes = {
  id: PropTypes.string,
  style: PropTypes.shape(),
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default CUIRegWrapper;
