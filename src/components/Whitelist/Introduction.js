import React, { Component } from "react";
import { ButtonComponent } from "../Common/FormComponents";

class Introduction extends Component {
  render() {
    const { onClickNext, disabledFlag } = this.props || {};
    return (
      <div>
        <div className="txt-m txt-dbld text--left">Step 1: Introduction</div>
        <div className="txt push--top">
          To be whitelisted you must complete the following steps if you have any questions and concerns during the KYC process, please email{" "}
          <span>admin@electus.network</span> or drop us a message in our Telegram channel.
        </div>
        <span className="float--right">
          <ButtonComponent label="Next" onClick={() => onClickNext()} disabled={disabledFlag} />
        </span>
      </div>
    );
  }
}

export default Introduction;
