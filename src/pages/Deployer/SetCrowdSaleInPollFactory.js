import React, { Component } from 'react';

class SetCrowdSaleInPollFactory extends Component {
  render() {
    return (
      <div>
        <label>Let's set crowdsale address in Poll factory Contract</label>
        <button label="Set crowdsale Address" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default SetCrowdSaleInPollFactory;
