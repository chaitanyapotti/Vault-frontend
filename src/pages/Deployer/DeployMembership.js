import React, { Component } from "react";

class DeployMembership extends Component {
  render() {
    return (
      <div>
        <label>Let's start deployment</label>
        <button label="Deploy Membership Contract" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default DeployMembership;
