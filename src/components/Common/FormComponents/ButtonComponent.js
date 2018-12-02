import React from "react";
import { CUIButton } from "../../../helpers/material-ui";

const ButtonComponent = props => (
  <CUIButton
    className={
      props.type === "danger"
        ? "btn bg--danger txt-p-vault txt-dddbld text--white"
        : props.type === "pending"
        ? "btn bg--pending txt-p-vault txt-dddbld text--white"
        : "btn bg--primary txt-p-vault txt-dddbld text--white"
    }
    label={props.label}
    id={props.label}
    disabled={props.disabled}
    type={props.type ? props.type : "contained"}
    // labelStyle={{ padding: "6px 16px" }}
    onClick={() => {
      props.onClick();
    }}
    {...props}
  />
);

export default ButtonComponent;
