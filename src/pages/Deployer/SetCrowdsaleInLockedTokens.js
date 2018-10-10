import React, { Component } from "react";

class SetCrowdsaleInLockedTokens extends Component {
  render() {
    return (
      <div>
        <label>Let's set crowdsale address in Locked Tokens Contract</label>
        <button label="Set crowdsale Address" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default SetCrowdsaleInLockedTokens;
