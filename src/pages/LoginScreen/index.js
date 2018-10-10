/* eslint camelcase: 0 */

import React, { Component } from "react";
import Login from "./Login";

class LoginScreen extends Component {
  render() {
    return (
      <div className="hr-vr-cntr">
        <div className="hl">
          <div className="hli">
            <span className="logo" />
          </div>
          {/* <div className="hli crd-mrgn crd-animation"><span className="metamask-card"/></div>
          <div className="hli crd-mrgn crd-animation"><span className="prvt-key-card"/></div> */}
          <Login />
        </div>
      </div>
    );
  }
}

export default LoginScreen;
