import React, { Component } from "react";
import UserTokens from "../../containers/UserTokens";
import { Grid } from "../../helpers/react-flexbox-grid";

class Governance extends Component {
  render() {
    return (
      <Grid style={{ marginBottom: "50px" }}>
        <UserTokens history={this.props.history} />
      </Grid>
    );
  }
}

export default Governance;
