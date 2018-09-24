import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }
  
  handleChange = (e) => {
    this.setState({value: e.target.value});
  };
  
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">{this.props.header}</Label>
          <Input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            name={this.state.value}
            id={this.state.value}
            placeholder="Enter text"
          />
        </FormGroup>
      </Form>
    );
  }
}

export default TextField;