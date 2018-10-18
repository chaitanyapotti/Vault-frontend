import React from "react";
import ButtonComponent from "./ButtonComponent";

const DualComponent = props => (
  <div className="hl">
    <div className="hli">
      <ButtonComponent onClick={() => props.onClkBtn1()} label={props.label1} />
    </div>
    <div className="hli push-left--13">
      <ButtonComponent onClick={() => props.onClkBtn2()} label={props.label2} />
    </div>
  </div>
);
export default DualComponent;
