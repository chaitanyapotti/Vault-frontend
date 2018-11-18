import React from "react";
// import Lodable from 'react-loadable';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
// import ComponentLoader from '../../../components/Common/ModuleLoader/ComponentLoader';

// export const Downshift = Lodable({
//   loader: () => import(/* webpackChunkName: "Downshift" */ 'downshift'),
// });

const selectIcon = (iconColor, style) => () => {
  const defaultStyle = {
    position: "absolute",
    bottom: 10,
    right: 10,
    pointerEvents: "none"
  };
  return (
    <span style={{ ...defaultStyle, ...style }}>
      <span>
        <svg width="9px" height="5px" viewBox="0 0 9 5" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <defs />
          <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="icons8-sort-down-filled" fill={iconColor} fillRule="nonzero">
              <polygon id="Shape" points="0 0 4.5 5 9 0" />
            </g>
          </g>
        </svg>
      </span>
    </span>
  );
};

const renderAutocompleteInput = inputProps => {
  const { ref, ...other } = inputProps;
  return <TextField InputProps={{ inputRef: ref }} {...other} />;
};

const handleInputKeydown = (event, onKeyDownSelector, forceNumeric, forceNumDec, forceAlpha) => {
  if (onKeyDownSelector) {
    if (event.keyCode === 13) {
      const submitButton = document.getElementById(onKeyDownSelector);
      submitButton.click();
    }
  }

  if (forceNumDec) {
    // Allow: backspace, delete, tab and escape
    if (
      event.keyCode === 46 ||
      event.keyCode === 8 ||
      event.keyCode === 9 ||
      event.keyCode === 27 ||
      event.keyCode === 190 ||
      // Allow: Ctrl+A
      (event.keyCode === 65 && event.ctrlKey === true) ||
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)
    ) {
      // let it happen, don't do anything
    } else if (event.shiftKey || ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105))) {
      // Ensure that it is a number and stop the keypress
      event.preventDefault();
    }
  }

  if (forceAlpha) {
    // Allow: backspace, delete, tab and escape, capslock
    if (
      event.keyCode === 46 ||
      event.keyCode === 8 ||
      event.keyCode === 9 ||
      event.keyCode === 27 ||
      event.keyCode === 190 ||
      event.keyCode === 20 ||
      event.keyCode === 32 || //space
      // Allow: Ctrl+A
      (event.keyCode === 65 && event.ctrlKey === true) ||
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)
    ) {
      // let it happen, don't do anything
    } else if (event.keyCode < 65 || event.keyCode > 90) {
      // Ensure that it is a number and stop the keypress
      event.preventDefault();
    }
  }

  if (forceNumeric) {
    // Allow: backspace, delete, tab and escape
    if (
      event.keyCode === 46 ||
      event.keyCode === 8 ||
      event.keyCode === 9 ||
      event.keyCode === 27 ||
      // event.keyCode === 190 ||
      // Allow: Ctrl+A
      (event.keyCode === 65 && event.ctrlKey === true) ||
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)
    ) {
      // let it happen, don't do anything
    } else if (event.shiftKey || ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105))) {
      // Ensure that it is a number and stop the keypress
      event.preventDefault();
    }
  }
};

const getCUIPrefixSuffix = (type, children) =>
  type && {
    [type]: <InputAdornment>{children}</InputAdornment>
  };

const selectLabelStyle = (style, underline) => ({
  style: {
    ...style
  },
  disableUnderline: underline
});

export { selectIcon, handleInputKeydown, renderAutocompleteInput, getCUIPrefixSuffix, selectLabelStyle };
