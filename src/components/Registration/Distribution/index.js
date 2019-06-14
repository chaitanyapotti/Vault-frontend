import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import TokenSale from "./TokenSale";

class Distribution extends React.Component {
  render() {
    return (
      <div>
        <CUICard className="card-brdr">
          <TokenSale />
        </CUICard>
      </div>
    );
  }
}

export default Distribution;
