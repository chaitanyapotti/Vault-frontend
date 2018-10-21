import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { checkUserRegistration, fetchCurrentAccount, checkVaultMembership } from "../../actions/signinManagerActions";


class SigninManager extends Component {
  constructor(props) {
    super(props);
    this.interval = null;
  }

  initAddressPoll() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.props.fetchCurrentAccount(this.props.userPreviousLocalPublicAddress);
      }, 1000);
    }
  }

  componentDidMount() {
    this.initAddressPoll();
  }

  render() {
    return (
      <div>
        {/* <p>User is registered: {this.props.userRegistered.toString()}</p>
                <p>User Address: {this.props.userServerPublicAddress}</p>
                <p>User is issuer: {this.props.userIsIssuer.toString()}</p> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userRegistered, userServerPublicAddress, userIsIssuer, userLocalPublicAddress, userPreviousLocalPublicAddress } =
    state.signinManagerData || {};
  return {
    userRegistered: userRegistered,
    userServerPublicAddress: userServerPublicAddress,
    userIsIssuer: userIsIssuer,
    userLocalPublicAddress: userLocalPublicAddress,
    userPreviousLocalPublicAddress: userPreviousLocalPublicAddress
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      checkUserRegistration: checkUserRegistration,
      fetchCurrentAccount: fetchCurrentAccount,
      checkVaultMembership:checkVaultMembership 
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(SigninManager);
