import merge from "lodash/merge";
import { CS_COLORS, CUIColor } from "./variables";
import { isMobile } from "../../helpers/common/deviceDetect";

const customTheme = {
  typography: {
    fontFamily: "Montserrat",
    useNextVariants: true
  },
  palette: {
    [CUIColor.PRIMARY]: {
      main: CS_COLORS.PRIMARY,
      light: CS_COLORS.LIGHT_PRIMARY,
      contrastText: CS_COLORS.WHITE,
      dark: CS_COLORS.PRIMARY
    },
    [CUIColor.SECONDARY]: {
      main: CS_COLORS.SECONDARY
    },
    [CUIColor.DEFAULT]: {
      main: CS_COLORS.WHITE
    },
    [CUIColor.ERROR]: {
      main: CS_COLORS.DANGER
    }
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: CS_COLORS.PRIMARY,
        color: CS_COLORS.WHITE
      },
      flatPrimary: {
        backgroundColor: "transparent !important"
      },
      root: {
        "&:hover": {
          backgroundColor: CS_COLORS.HOVER_COLOR
        }
      },
      label: {
        textTransform: "none",
        fontSize: "16px",
        fontWeight: "bold"
      }
    },
    MuiBackdrop: {
      root: {
        opacity: "0.7 !important"
      }
    },
    MuiLinearProgress: {
      colorSecondary: {
        backgroundColor: CS_COLORS.PROGRESS_BAR_SECONDARY
      },
      barColorSecondary: {
        backgroundColor: CS_COLORS.PRIMARY
      },
      barColorPrimary: {
        backgroundColor: CS_COLORS.PRIMARY
      },
      bar: {
        borderRadius: "4px"
      }
    },
    MuiCircularProgress: {
      colorPrimary: {
        color: CS_COLORS.WHITE
      },
      colorSecondary: CS_COLORS.SECONDARY
    },
    MuiSelect: {
      disabled: {
        cursor: "not-allowed !important"
      }
    },
    MuiTabs: {
      indicator: {
        backgroundColor: "#4CA9FC"
      },
      flexContainer: {
        width: "100%"
      }
    },
    MuiTab: {
      root: {
        minWidth: "25% !important",
        textTransform: "none",
        boxSizing: "border-box"
      },
      textColorInherit: {
        opacity: "1 !important",
        color: "rgb(0,0,0) !important"
      },
      labelContainer: {
        padding: "0px !important",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: " nowrap",
        width: "98%",
        textAlign: "center",
        margin: "0px auto"
      },
      labelIcon: {
        height: 56,
        minHeight: 56
      },
      label: {
        fontSize: `16px !important`,
        fontWeight: 400
      },
      selected: {
        color: `rgb(0,0,0) !important`
      }
    },
    MuiMenuItem: {
      selected: {
        backgroundColor: "transparent !important",
        color: CS_COLORS.SELECT_TEXT
      }
    },
    MuiInput: {
      root: {
        color: CS_COLORS.G_PRIMARY
      },
      input: {
        background: "transparent !important"
      },
      disabled: {
        cursor: "not-allowed !important"
      },
      inputType: {
        color: CS_COLORS.G_PRIMARY
      },
      underline: {
        "&:before": {
          borderBottom: `1px solid ${CS_COLORS.G_DIVIDER} !important`
        }
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "none"
      }
    },
    MuiInputLabel: {
      root: {
        color: "rgba(0, 0, 0, 0.35)",
        fontSize: "16px"
      }
    },
    MuiInputBase: {
      input: {
        fontSize: "16px"
      }
    },
    MuiAppBar: {
      root: {
        display: "block"
      },
      colorPrimary: {
        backgroundColor: "#ffffff"
      },
      colorDefault: {
        backgroundColor: CS_COLORS.WHITE
      },
      colorSecondary: {
        backgroundColor: "#ffffff"
      }
    },
    MuiAvatar: {
      root: {
        border: `1px solid ${CS_COLORS.G_DIVIDER}`
      }
    },
    MuiBadge: {
      colorPrimary: {
        position: "relative",
        top: -2,
        left: 12,
        width: "auto",
        height: "auto",
        padding: "0px 5px",
        color: CS_COLORS.WHITE,
        borderRadius: 10,
        backgroundColor: CS_COLORS.BADGE_COLOR
      }
    }
  }
};

const customRegTheme = merge({}, customTheme, {
  palette: {
    text: {
      primary: CS_COLORS.G_PRIMARY
    }
  },
  overrides: {
    MuiButton: {
      root: {
        minHeight: 36,
        borderRadius: 3
      },
      contained: {
        backgroundColor: CS_COLORS.WHITE,
        "&:hover": {
          backgroundColor: isMobile ? CS_COLORS.WHITE : CS_COLORS.HOVER_COLOR
        }
      }
    }
  }
});

export { customTheme, customRegTheme };
