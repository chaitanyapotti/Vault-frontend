/* eslint-disable no-undef */
import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { CUIButtonIcon, CUIMenu } from ".";
import { getCUIPrefixSuffix, handleInputKeydown, selectIcon } from "./helpers";
import { CS_COLORS, CUIInputColor, CUIInputMargin, CUIInputType } from "../../static/js/variables";
import PropTypes from "../../PropTypes";

const CUIFormInput = props => {
  const {
    inputType,
    inputName,
    inputLabel,
    inputPlaceholder,
    inputID,
    inputValue: inputVal,
    inputMargin,
    disabled,
    style,
    onChange,
    error,
    helperText,
    required
  } = props || {};

  const cuiTextProps = {
    type: inputType,
    name: inputName,
    label: inputLabel,
    placeholder: inputPlaceholder,
    id: inputID,
    value: inputVal,
    margin: inputMargin,
    disabled,
    style,
    onChange,
    error,
    helperText,
    required
  };

  switch (inputType) {
    case CUIInputType.TEXT:
    case CUIInputType.EMAIL:
    case CUIInputType.NUMBER:
    case CUIInputType.TEL:
    case CUIInputType.PASSWORD:
    case CUIInputType.FILE: {
      const {
        onKeyDownSelector,
        full,
        textFocus,
        labelProps,
        InputProps,
        inputProps,
        inputPrefixSuffix,
        forceNumeric,
        forceNumDec,
        forceAlpha,
        error,
        helperText,
        hintText,
        onBlur,
        onFocus,
        required
      } = props || {};
      cuiTextProps.error = error;
      cuiTextProps.required = required;
      cuiTextProps.helperText = hintText || helperText;
      cuiTextProps.autoFocus = textFocus;
      cuiTextProps.fullWidth = full;
      cuiTextProps.InputLabelProps = labelProps;
      cuiTextProps.InputProps = {
        ...getCUIPrefixSuffix(...inputPrefixSuffix),
        ...InputProps
      };
      cuiTextProps.inputProps = inputProps;
      cuiTextProps.onFocus = onFocus;
      cuiTextProps.onBlur = onBlur;
      cuiTextProps.onKeyDown = e => {
        handleInputKeydown(e, onKeyDownSelector, forceNumeric, forceNumDec, forceAlpha);
      };

      return <TextField {...cuiTextProps} />;
    }

    case CUIInputType.CHECKBOX: {
      const { inputChecked, inputColor } = props || {};
      cuiTextProps.color = inputColor;
      cuiTextProps.checked = inputChecked;
      return <Checkbox {...cuiTextProps} />;
    }

    case CUIInputType.RADIO: {
      const { inputChecked, inputColor } = props || {};
      cuiTextProps.checked = inputChecked;
      cuiTextProps.color = inputColor;
      return <Radio {...cuiTextProps} />;
    }

    // case CUIInputType.AUTO_COMPLETE: {
    //   const {
    //     items,
    //     source,
    //     selected,
    //     error,
    //     helperText,
    //     hintText,
    //     full,
    //     suggestionsClass = 'atcmplt-sggstns',
    //     optionClass = 'atcmplt-sggstn',
    //     render,
    //     onInputChange,
    //     onSelect,
    //     onDelete,
    //     isMultiple,
    //     onBlur,
    //     onFocus,
    //     InputProps,
    //     inputProps,
    //     isInputOpen,
    //   } =
    //     props || {};

    //   const [sourceKey, sourceValue] = source.split('|');

    //   const onAutocomplete = item => {
    //     if (!item) return;
    //     if (isMultiple) {
    //       onInputChange('');
    //     }
    //     cuiTextProps.onChange(item);
    //   };

    //   const handleKeyDown = event => {
    //     const { keyCode } = event;
    //     const { value: inputValue } = cuiTextProps || '';
    //     if (selected.length && !inputValue.length && keyCode === 8) {
    //       const lastItem = selected.slice(-1)[0];
    //       onDelete(lastItem);
    //     }
    //   };

    //   const downshiftProps = {
    //     itemToString: i => (i && i[sourceValue]) || '',
    //     onChange: onAutocomplete,
    //     onSelect,
    //     selectedItem: selected,
    //     defaultSelectedItem: selected,
    //     onInputValueChange: onInputChange,
    //     selectedItemChanged: (prevItem, item) => prevItem[sourceValue] !== item[sourceValue],
    //   };

    //   if (isMultiple) {
    //     InputProps.onKeyDown = handleKeyDown;
    //     downshiftProps.inputValue = cuiTextProps.value;
    //     downshiftProps.isOpen = isInputOpen;
    //   }

    //   if (render) {
    //     downshiftProps.render = render;
    //     return <Downshift {...downshiftProps} />;
    //   }

    //   return (
    //     <Downshift {...downshiftProps}>
    //       {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex, clearSelection }) =>
    //         <div style={{ position: 'relative' }}>
    //           {renderAutocompleteInput({
    //             InputProps: getInputProps({
    //               onChange: clearSelection,
    //               onBlur,
    //               onFocus,
    //               ...InputProps,
    //               style: { flexWrap: 'wrap' },
    //               startAdornment: isMultiple
    //                 ? selectedItem.map(item => <CUIChip key={item.key} tabIndex={-1} label={item.label} onDelete={() => onDelete(item)} />)
    //                 : null,
    //             }),
    //             inputProps,
    //             fullWidth: full,
    //             error,
    //             helperText: helperText || hintText,
    //             ...cuiTextProps,
    //           })}
    //           {isOpen &&
    //             <div className={suggestionsClass}>
    //               {items.filter(i => !inputValue || i[sourceValue].toLowerCase().includes(inputValue.toLowerCase())).map((item, index) =>
    //                 <div
    //                   {...getItemProps({ key: item[sourceKey], index, item })}
    //                   className={`${optionClass}${highlightedIndex === index ? ' selected' : ''}`}
    //                 >
    //                   {item[sourceValue]}
    //                 </div>,
    //               )}
    //             </div>}
    //         </div>}
    //     </Downshift>
    //   );
    // }

    case CUIInputType.SELECT: {
      const { items, full, labelStyle, iconColor, onBlur, iconStyle, onFocus } = props || {};
      cuiTextProps.fullWidth = full;
      cuiTextProps.type = CUIInputType.TEXT;
      cuiTextProps.select = true;
      cuiTextProps.onBlur = onBlur;
      cuiTextProps.onFocus = onFocus;
      cuiTextProps.InputProps = labelStyle;
      cuiTextProps.SelectProps = {
        MenuProps: { style: { maxHeight: 400 } },
        IconComponent: selectIcon(iconColor, iconStyle)
      };
      return (
        <TextField {...cuiTextProps}>
          {items.map(option => (
            <MenuItem key={option.value} value={option.value} style={{ cursor: "pointer" }}>
              {option.primaryText}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    case CUIInputType.ICON_SELECT: {
      const { items, onClick, onClose, iconElement, elementRef, open, listStyle } = props || {};
      return (
        <div>
          <CUIButtonIcon onClick={onClick}>{iconElement}</CUIButtonIcon>

          <CUIMenu PaperProps={{ style: listStyle }} anchorEl={elementRef} onClose={onClose} open={open}>
            {items.map(option => (
              <MenuItem key={option.value} onClick={option.onClick} style={{ padding: "5px 20px" }}>
                {option.primaryText}
              </MenuItem>
            ))}
          </CUIMenu>
        </div>
      );
    }

    default:
      return null;
  }
};

CUIFormInput.defaultProps = {
  inputName: "",
  inputID: "",
  inputPlaceholder: "",
  items: [],
  disabled: false,
  inputLabel: null,
  labelProps: {},
  InputProps: {},
  inputProps: {},
  full: false,
  inputMargin: CUIInputMargin.NORMAL,
  inputChecked: false,
  inputColor: CUIInputColor.SECONDARY,
  error: false,
  labelStyle: {},
  selected: [],
  className: "",
  source: "",
  hintText: "",
  helperText: "",
  inputPrefixSuffix: [],
  textFocus: false,
  iconColor: CS_COLORS.WHITE,
  iconStyle: {},
  iconElement: null,
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string, PropTypes.number)]).isRequired,
  elementRef: null,
  open: false,
  listStyle: {},
  render: undefined,
  onBlur: () => {},
  onSelect: () => {},
  onChange: () => {},
  onClick: () => {},
  onClose: () => {},
  onInputChange: () => {}
};

CUIFormInput.propTypes = {
  inputType: PropTypes.cuiInputType.isRequired,
  inputID: PropTypes.string,
  inputName: PropTypes.string,
  inputLabel: PropTypes.node,
  inputPlaceholder: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape()),
  disabled: PropTypes.bool,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  labelProps: PropTypes.shape({}),
  InputProps: PropTypes.shape({}),
  inputProps: PropTypes.shape({}),
  inputMargin: PropTypes.cuiInputMargin,
  full: PropTypes.bool,
  inputChecked: PropTypes.bool,
  inputColor: PropTypes.cuiColor,
  className: PropTypes.string,
  error: PropTypes.bool,
  labelStyle: PropTypes.shape({}),
  selected: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isMultiple: PropTypes.bool,
  source: PropTypes.string,
  hintText: PropTypes.string,
  helperText: PropTypes.string,
  textFocus: PropTypes.bool,
  iconColor: PropTypes.string,
  iconStyle: PropTypes.shape({}),
  iconElement: PropTypes.node,
  elementRef: PropTypes.shape({}),
  open: PropTypes.bool,
  inputPrefixSuffix: PropTypes.oneOfType([PropTypes.cuiPrefixSuffixType, PropTypes.node]),
  listStyle: PropTypes.shape({}),
  render: PropTypes.func,
  onInputChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSelect: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  onDelete: PropTypes.func
};

export default CUIFormInput;
