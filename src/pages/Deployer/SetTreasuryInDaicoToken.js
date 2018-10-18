import React, { Component } from 'react';

class SetTreasuryInDaicoToken extends Component {
  render() {
    return (
      <div>
        <label>Let's set treasury address in Daico Token Contract</label>
        <button label="Set Treasury Address" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default SetTreasuryInDaicoToken;
