import React, { Component } from 'react';

class CreateKillPolls extends Component {
  render() {
    return (
      <div>
        <label>Let's Create Kill Polls</label>
        <button label="Create Kill Polls" onClick={this.props.onClick} />
      </div>
    );
  }
}

export default CreateKillPolls;
