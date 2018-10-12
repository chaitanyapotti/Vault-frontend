import React, { Component } from "react";

class DeployDaicoToken extends Component {
  render() {
    return (
      <div>
        <label>Let's deploy Daico Token Contract</label>
        <button label="Deploy Daico Token" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default DeployDaicoToken;
