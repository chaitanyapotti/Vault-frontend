import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const selectInputStyle = {
    formControl: {
      paddingBottom: "10px",
      margin: "30px 0 0 0",
      position: "relative",
      width: '100%'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    font:{
        fontSize: '14px'
    }
};

class CUISelectInput extends React.Component {
  
  render() {
    const { classes, data, label, value, onChange } = this.props;
    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel style={{fontSize: '14px'}} htmlFor="age-simple">{label}</InputLabel>
          <Select
            value={value}
            onChange={onChange}
            inputProps={{
              id: {label},
            }}
            style={{fontSize: '14px'}}
          >
            {data.map((item, index) => 
                <MenuItem key={index} value={item.value} style={{fontSize: '14px'}}>
                    {item.value}
                </MenuItem>
            )}
          </Select>
        </FormControl>
      </form>
    );
  }
}

CUISelectInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(selectInputStyle)(CUISelectInput);
