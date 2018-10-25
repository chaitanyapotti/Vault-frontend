import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { HeaderPartial, FooterPartial } from "./components/Partials";
import SubHeader from "./components/Common/Subheader";
import { CUIWrapper } from "./helpers/material-ui";

class VaultApp extends React.PureComponent {
  render() {
    return (
      <CUIWrapper>
        <HeaderPartial history={this.props.history} />
        <SubHeader />
        <div className="main-content push-top--35">{this.props.children}</div>
        <FooterPartial />
      </CUIWrapper>
    );
  }
}

VaultApp.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
};

export default withRouter(VaultApp);
