import React, { Component } from "react";
import UserTokens from "../../containers/UserTokens";
import {Grid} from "../../helpers/react-flexbox-grid";
class Governance extends Component {
  render() {
    return (
      <Grid>
        <UserTokens history={this.props.history} />
      </Grid>
    );
  }
}

export default Governance;
