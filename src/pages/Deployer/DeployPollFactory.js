import React, { Component } from "react";

class DeployPollFactory extends Component {
  render() {
    return (
      <div>
        <label>Let's deploy Poll Factory Contract</label>
        <button label="Deploy Poll Factory" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default DeployPollFactory;
