import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import LoadingButton from "../LoadingButton";

const SpendCurve = props => {
  const {
    
  } = props || {};
  return (
    <div>
      <CUICard style={{ padding: "40px 50px" }}>
        <div className="txt-xxxl text--primary">Spend Curve</div>
            Spend Curve
      </CUICard>
    </div>
  );
};

export default SpendCurve;
