import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  noMaxWidth: {
    maxWidth: "none"
  },
  fonts: {
    "font-size": "16px",
    padding: "10px 15px 10px 15px",
    maxWidth: 500
  }
});

const CustomToolTip = props => {
  const { classes, title, children, id, placement, disabled } = props || {};
  return (
    <div>
      {disabled === true ? (
        <div>
          <Tooltip title={title} classes={{ tooltip: classes.fonts }} id={id} placement={placement}>
            {children}
          </Tooltip>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

CustomToolTip.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomToolTip);
