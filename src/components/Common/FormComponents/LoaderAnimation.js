import React from 'react';

const LoaderAnimation = (props) => 
    <div class={props.comp ? "circle-loader load-complete" : "circle-loader"}>
        <div class="checkmark draw" style={props.comp ? {display: 'block'}: {}}></div>
    </div>;


export default LoaderAnimation;

// Use example:
// <ButtonComponent><LoaderAnimation comp="true"/></ButtonComponent>