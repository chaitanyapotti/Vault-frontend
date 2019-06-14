export const CS_COLORS = {
  TRANSPARENT: "transparent",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  LIGHT_PRIMARY: "#71BA6D",
  PRIMARY: "#4ca9fc",
  SECONDARY: "#ffffff",
  SUCCESS: "#599A02",
  DANGER: "#E53A42",
  BG_PRIMARY: "#E1423E",
  G_PRIMARY: "#51505D",
  G_SECONDARY: "#72727D",
  G_TERTIARY: "#95959D",
  G_DIVIDER: "#DFE0E3",
  HOVER_COLOR: "#F4F4F4",
  PROGRESS_BAR_SECONDARY: "#eaeaea",
  CARD_CRITERIA_TITLE_COLOR: "#ffffff",
  BADGE_COLOR: "#971212",
  LINK_COLOR: "#58A354",
  SELECT_TEXT: "#E3534F"
};

export const CS_FONT_SIZE = {
  DEFAULT: "16px",
  XS: "12px",
  S: "14px",
  M: "18px",
  L: "20px",
  XL: "24px",
  XXL: "28px",
  XXXL: "30px"
};

export const CUIButtonType = {
  RAISED: "contained",
  FLAT: "flat",
  FAB: "fab",
  OUTLINED: "outlined",
  DEFAULT: "default",
  CONTAINED: "contained",
  PENDING: "pending",
  DANGER: "danger",
  TEXT: "text"
};

export const CUIButtonSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large"
};

export const CUIPrefixSuffixType = {
  PREFIX: "startAdornment",
  SUFFIX: "endAdornment"
};

export const CUIColor = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  INHERIT: "inherit",
  DEFAULT: "default",
  ERROR: "error"
};

export const CUIButtonColor = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DEFAULT: "default"
};

export const CUIDialogMaXWidth = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  FALSE: false
};

export const CUICardType = {
  RAISED: "raised"
};

export const CUIPosition = {
  FIXED: "fixed",
  ABSOLUTE: "absolute",
  STICKY: "sticky",
  STATIC: "static"
};

export const CUIInputColor = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DEFAULT: "default"
};

export const CUIInputType = {
  CHECKBOX: "checkbox",
  RADIO: "radio",
  RADIOGROUP: "radioGroup",
  EMAIL: "email",
  PASSWORD: "password",
  TEL: "tel",
  TEXT: "text",
  FILE: "file",
  SELECT: "select",
  ICON_SELECT: "iconSelect",
  AUTO_COMPLETE: "autocomplete",
  NUMBER: "number"
};

export const CUIFormFieldType = {
  TWO_SELECT: "twoselect",
  MULTI_SELECT: "multiselect",
  SINGLE_SELECT: "singleselect",
  DROPDOWN: "DROPDOWN",
  RANGE_SLIDER: "RANGE_SLIDER"
};

export const CUIModalTemplateType = {
  NONE: "none",
  PROFILEPHOTOUPLOAD: "profilePhotoUpload",
  FORGOTPASSWORD: "forgotPassword",
  PROFILEACTION: "profileAction",
  SEARCH: "search",
  SEARCHCARD: "searchCard",
  INTERESTCELEBRATION: "interestCelebration",
  DELETEPHOTO: "deletePhoto",
  PROFILE_DELETE: "deleteProfile",
  PARTNER_PREFERENCES_UPDATE: "partnerPreferencesUpdate",
  RESET_PASSWORD: "resetPassword"
};

export const CUIInputMargin = {
  DENSE: "dense",
  NORMAL: "normal",
  NONE: "none"
};

export const CUIProgressType = {
  DETERMINATE: "determinate",
  INDETERMINATE: "indeterminate",
  BUFFER: "buffer",
  QUERY: "query"
};

export const CUIModalTransition = {
  UP: "up",
  DOWN: "down",
  RIGHT: "right",
  LEFT: "left"
};

export const getOutlinedRaisedBtnStyle = color => ({
  color,
  display: "block",
  textAlign: "left",
  fontWeight: 400,
  border: "0px"
});

export const getOutlineRaisedSearchBtn = (color, height, borderRadius) => ({
  color,
  height,
  display: "block",
  fontWeight: 500,
  margin: "5px 0 15px 0",
  border: "0px",
  borderRadius,
  boxShadow: "0 1px 6px rgba(0, 0, 0, .1), 0 1px 4px rgba(0, 0, 0, .1)"
});
