import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from "../../PropTypes";

/**
 * @Component FormInputLabel
 *
 * @param props and their values
 * control --> Element
 * label --> string
 *
 * @returns { CUIFormInputLabel }
 *
 * @constructor MaterialUI FormControlLabel
 *
 * @Example
 *
 * <FormControlLabel control={<Checkbox onChange={this.handleChange('checkedA')} value="checkedA" />} label="Register Now" />
 *
 * @Material-FormControlLabel@API https://material-ui.com/api/form-control-label/#formcontrollabel
 */

const CUIFormInputLabel = props => <FormControlLabel control={props.control} label={props.label} />;

CUIFormInputLabel.propTypes = {
  control: PropTypes.element.isRequired,
  label: PropTypes.node.isRequired
};
export default CUIFormInputLabel;
