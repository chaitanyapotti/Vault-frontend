import React, { PureComponent } from "react";
import MomentUtils from "@date-io/moment";
import moment from "moment-timezone";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import DateTimePicker from "material-ui-pickers/DateTimePicker";

moment.tz.setDefault("UTC");
class UTCUtils extends MomentUtils {
  format(value, formatString) {
    console.log("fora", formatString);
    return moment(value)
      .utc()
      .format(formatString);
  }
}
class DTPicker extends PureComponent {
  render() {
    const { selectedDate, handleDateChange, label, disablePast, minDate, maxDate, disableFuture } = this.props;
    return (
      <MuiPickersUtilsProvider utils={UTCUtils} moment={moment}>
        <DateTimePicker
          value={selectedDate}
          ampm={false}
          fullWidth
          onChange={handleDateChange}
          label={label}
          style={{ margin: "16px 0 8px" }}
          format="Do MMM YYYY | hh:mm A z"
          mask={[/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, " ", /\d/, /\d/, ":", /\d/, /\d/, " ", /a|p/i, "M"]}
          disablePast={disablePast}
          disableFuture={disableFuture}
          minDate={minDate}
          maxDate={maxDate}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default DTPicker;
