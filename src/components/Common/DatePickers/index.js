import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "16px"
  },
  textField: {
    width: "100%"
  }
});

function DatePickers(props) {
  const { classes, label, handleDateChange, selectedDate } = props;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label={label}
        type="date"
        full="true"
        defaultValue={selectedDate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleDateChange}
      />
    </form>
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DatePickers);
