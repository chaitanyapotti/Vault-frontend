import React, { PureComponent } from 'react';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import  DateTimePicker from 'material-ui-pickers/DateTimePicker';

class DTPicker extends PureComponent {
  render() {
    const { selectedDate, handleDateChange } = this.props;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          value={selectedDate}
          ampm={false}
          onChange={handleDateChange}
          label="Start Date & time"
          style={{margin: "16px 0 8px"}}
          format="yyyy/MM/dd kk:mm"
          mask={[/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M']}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default DTPicker;