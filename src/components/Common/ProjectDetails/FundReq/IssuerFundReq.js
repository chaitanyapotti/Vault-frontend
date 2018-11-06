import React, { Component } from "react";
import { CUICard } from "../../../../helpers/material-ui";
import IssuerReqType from "./IssuerReqType";

class IssuerFundReq extends Component {
  getObject1 = () => {
    const { data, details, tokensUnderGovernance } = this.props || {};
    const { poll1 } = data || {};
    const { amount, consensus, endTime, address } = poll1 || {};
    const requiredData = details ? details.filter(x => x.address === address) : [];
    const { name, description, startDate } = requiredData[0] || {};
    return endTime ? (
      <CUICard style={{ padding: "40px 50px" }}>
        <IssuerReqType
          amount={amount}
          consensus={consensus}
          endTime={endTime}
          name={name}
          description={description}
          startDate={startDate}
          tokensUnderGovernance={tokensUnderGovernance}
        />
      </CUICard>
    ) : null;
  };

  getObject2 = () => {
    const { data, details, tokensUnderGovernance } = this.props || {};
    const { poll2 } = data || {};
    const { amount, consensus, endTime, address } = poll2 || {};
    const requiredData = details ? details.filter(x => x.address === address) : [];
    const { name, description, startDate } = requiredData[0] || {};
    return endTime ? (
      <CUICard style={{ padding: "40px 50px" }}>
        <IssuerReqType
          amount={amount}
          consensus={consensus}
          endTime={endTime}
          name={name}
          description={description}
          startDate={startDate}
          tokensUnderGovernance={tokensUnderGovernance}
        />
      </CUICard>
    ) : null;
  };

  render() {
    return (
      <div>
        {this.getObject1()}
        {this.getObject2()}
      </div>
    );
  }
}

export default IssuerFundReq;
