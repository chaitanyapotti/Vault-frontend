import React, { Component } from 'react';

class RouteToMain extends Component {
  render() {
    return (
      <div>
        <label>Deployment is done. Click here to be redirected to home page</label>
        <button onClick={this.props.onClick}>Redirect Home </button>
      </div>
    );
  }
}

export default RouteToMain;
