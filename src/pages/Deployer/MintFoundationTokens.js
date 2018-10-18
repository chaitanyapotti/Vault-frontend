import React, { Component } from 'react';

class MintFoundationTokens extends Component {
  render() {
    return (
      <div>
        <label>Let's Mint foundation tokens</label>
        <button label="Mint foundation tokens" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default MintFoundationTokens;
