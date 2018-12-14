import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchCurrentAccount,  pageReloadingSignal } from "../../actions/signinManagerActions";

class SigninManager extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
  }

  reloadPage = () => {
    window.location.reload();
    this.props.pageReloadingSignal()
  }

  initAddressPoll() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.props.fetchCurrentAccount(
          this.props.userPreviousLocalPublicAddress,
          this.props.metamaskPreviousNetworkName,
          this.props.metamaskPreviousInstallationState
        );
      }, 1000);
    }
  }

  componentDidMount() {
    this.initAddressPoll();
  }

  render() {
    if (this.props.reloadPage){
      this.reloadPage()
    }
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    userRegistered,
    userServerPublicAddress,
    userIsIssuer,
    userLocalPublicAddress,
    userPreviousLocalPublicAddress,
    metamaskPreviousNetworkName,
    metamaskPreviousInstallationState,
    reloadPage
  } = state.signinManagerData || {};
  return {
    userRegistered,
    userServerPublicAddress,
    userIsIssuer,
    userLocalPublicAddress,
    userPreviousLocalPublicAddress,
    metamaskPreviousNetworkName,
    metamaskPreviousInstallationState,
    reloadPage
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchCurrentAccount,
      pageReloadingSignal
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninManager);
