/* eslint camelcase: 0 */

import React, {Component} from 'react';

class LoginScreen extends Component {
  render() {
    return (
      <div className="hr-vr-cntr">
        <div className="hl">
          <div className="hli"><span className="logo"/></div>
          <div className="hli crd-mrgn crd-animation"><span className="metamask-card"/></div>
          <div className="hli crd-mrgn crd-animation"><span className="prvt-key-card"/></div>
          <div className="hli crd-mrgn crd-animation"><span className="sign-in-card"/></div>
          <div className="hli crd-mrgn crd-animation"><span className="attach-json-card"/></div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
