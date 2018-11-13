import React, { PureComponent } from "react";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import DateTimePicker from "material-ui-pickers/DateTimePicker";

class DTPicker extends PureComponent {
  render() {
    const { selectedDate, handleDateChange, label, disablePast, minDate, maxDate, disableFuture } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          value={selectedDate}
          ampm={false}
          fullWidth
          onChange={handleDateChange}
          label={label}
          style={{ margin: "16px 0 8px" }}
          format="yyyy/MM/dd kk:mm"
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
