import React, { Component } from "react";
import { connect } from "react-redux";
import { ButtonComponent } from "../Common/FormComponents";

class Done extends Component {
  handleSelect = event => {
    this.setState({ wallet: event.target.value });
  };

  render() {
    // const {wallet} = this.state || {};
    return (
      <div>
        <div className="txt-m txt-dbld text--left">Registration sent for approval</div>
        {/* <div className="txt push--top">
                    Please state a valid Ethereum wallet address from which you will be sending Ethers and to which you will receive respective tokens.
                </div> */}
        <div className="push--top">
          {this.props.isVaultMember ? (
            <div>{this.props.history.push("/registration")}</div>
          ) : (
            <div>We will approve your membership request automatically in some time. Please revisit and reload in approximately 5 minutes.</div>
          )}
        </div>
        <span className="float--right">
          <ButtonComponent label="Home" onClick={() => this.props.history.push("/")} />
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userLocalPublicAddress, isVaultMember } = state.signinManagerData || {};
  return {
    userLocalPublicAddress,
    isVaultMember
  };
};

export default connect(mapStateToProps)(Done);
