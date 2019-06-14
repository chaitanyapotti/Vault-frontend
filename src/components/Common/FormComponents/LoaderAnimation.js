import React from "react";

const LoaderAnimation = props => (
  <div className={props.comp ? "circle-loader load-complete" : "circle-loader"}>
    <div className="checkmark draw" style={props.comp ? { display: "block" } : {}} />
  </div>
);

export default LoaderAnimation;

// Use example:
// <ButtonComponent><LoaderAnimation comp="true"/></ButtonComponent>
