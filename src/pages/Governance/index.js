import React, { Component } from "react";
import UserTokens from "../../containers/UserTokens";

class Governance extends Component {
  render() {
    return (
      <div>
        <UserTokens history={this.props.history} />
      </div>
    );
  }
}

export default Governance;
