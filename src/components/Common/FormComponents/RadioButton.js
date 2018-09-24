import React from 'react';
import {CustomInput, FormGroup} from 'reactstrap';

class RadioButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    };
  }
  
  render() {
    const radioLabels = this.props.labels || [];
    return (
      <FormGroup>
        <div>
          {
            radioLabels.map((label, i) =>
              <CustomInput
                type="radio"
                key={i}
                id={label}
                name="radioGroup"
                value='Linear Spline'
                label={label}
                checked={this.state.selected === 'Linear Spline'}
                onChange={(e) => this.setState({selected: e.target.value})}
              />
            )
          }
        </div>
      </FormGroup>
    );
  }
}

export default RadioButton;