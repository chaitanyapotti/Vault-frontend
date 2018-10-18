import React from "react";
import { CUICard } from "../../../../helpers/material-ui";
import ReqType from "./ReqType";

class FundReq extends React.Component {
  getObject1 = () => {
    const { data } = this.props || {};
    const { poll1 } = data || {};
    const { amount, consensus, endTime } = poll1 || {};
    return endTime ? (
      <ReqType amount={amount} consensus={consensus} endTime={new Date(endTime).toDateString()} />
    ) : (
      <span> Nothing deployed</span>
    );
  };

  getObject2 = () => {
    const { data } = this.props || {};
    const { poll2 } = data || {};
    const { amount, consensus, endTime } = poll2 || {};
    return endTime ? (
      <ReqType amount={amount} consensus={consensus} endTime={new Date(endTime).toDateString()} />
    ) : (
      <span> Nothing deployed</span>
    );
  };

  getObject2 = () => {};

  render() {
    console.log("props in fund req", this.props);
    return (
      <div>
        <CUICard style={{ padding: "40px 50px" }}>{this.getObject1()}</CUICard>
        <CUICard style={{ padding: "40px 50px" }}>{this.getObject2()}</CUICard>
      </div>
    );
  }
}

export default FundReq;
