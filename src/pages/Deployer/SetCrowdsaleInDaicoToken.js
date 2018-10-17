import React, { Component } from 'react';

class SetCrowdsaleInDaicoToken extends Component {
  render() {
    return (
      <div>
        <label>Let's set crowdsale address in Daico Token Contract</label>
        <button label="Set crowdsale address" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default SetCrowdsaleInDaicoToken;
