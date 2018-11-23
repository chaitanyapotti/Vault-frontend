import React, { PureComponent } from "react";
import DateFnsUtils from "@date-io/date-fns";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import DatePicker from "material-ui-pickers/DatePicker";

class DPicker extends PureComponent {
  render() {
    const { selectedDate, handleDateChange, label, disablePast, minDate, maxDate, disableFuture } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          value={selectedDate}
          ampm={false}
          fullWidth
          onChange={handleDateChange}
          label={label}
          style={{ margin: "16px 0 8px" }}
          format="yyyy/MM/dd"
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

export default DPicker;
