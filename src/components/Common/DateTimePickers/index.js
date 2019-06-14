import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: 200
  }
});

function DateTimePickers(props) {
  const { classes, label, handleDateChange, selectedDate } = props;
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label={label}
        type="datetime-local"
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

DateTimePickers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateTimePickers);
