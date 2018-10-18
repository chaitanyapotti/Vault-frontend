import React, { Component } from "react";

class DeployCrowdSale extends Component {
  render() {
    return (
      <div>
        <label>Let's deploy Crowd Sale Contract</label>
        <button label="Deploy Crowd Sale" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default DeployCrowdSale;
