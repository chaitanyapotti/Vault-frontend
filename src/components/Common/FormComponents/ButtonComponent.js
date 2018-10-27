import React from "react";
import { CUIButton } from "../../../helpers/material-ui";

const ButtonComponent = props => (
  <CUIButton
    className={props.type !== "danger" ? "btn bg--primary txt-p-vault txt-dddbld text--white" : "btn bg--danger txt-p-vault txt-dddbld text--white"}
    label={props.label}
    id={props.label}
    type="raised"
    labelStyle={{ padding: "8px 16px" }}
    disabled={props.disabled}
    onClick={() => {
      props.onClick();
    }}
    {...props}
  />
);

export default ButtonComponent;
