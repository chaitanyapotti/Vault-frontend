import React, { Component } from 'react';

class DeployLockedTokens extends Component {
  render() {
    return (
      <div>
        <label>Let's deploy Locked Tokens Contract</label>
        <button label="Deploy Locked Tokens" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default DeployLockedTokens;
