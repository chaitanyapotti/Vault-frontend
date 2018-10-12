import React from "react";
import { CUICard, CUIFormInput, CUIButton } from "../../../../helpers/material-ui";
import { CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS } from "../../../../static/js/variables";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import SocialLinks from "../../../Common/SocialLinks";
import ReqType from "./ReqType";

class FundReq extends React.Component {
  getObject1 = () => {
    const { data } = this.props || {};
    const { poll1 } = data || {};
    const { amount, consensus, endTime } = poll1 || {};
    return endTime ? <ReqType amount={amount} consensus={consensus} endTime={new Date(endTime).toDateString()} /> : <span> Nothing deployed</span>;
  };
  getObject2 = () => {
    const { data } = this.props || {};
    const { poll2 } = data || {};
    const { amount, consensus, endTime } = poll2 || {};
    return endTime ? <ReqType amount={amount} consensus={consensus} endTime={new Date(endTime).toDateString()} /> : <span> Nothing deployed</span>;
  };
  getObject2 = () => {};
  render() {
    return (
      <div>
        <CUICard style={{ padding: "40px 50px" }}>{this.getObject1()}</CUICard>
        <CUICard style={{ padding: "40px 50px" }}>{this.getObject2()}</CUICard>
      </div>
    );
  }
}

export default FundReq;
