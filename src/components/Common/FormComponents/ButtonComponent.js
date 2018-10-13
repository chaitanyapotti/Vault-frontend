import React from 'react';
import {Button} from 'reactstrap';

class ButtonComponent extends React.Component {
  
  render() {
    return (
      <Button
        className={this.props.type === 'oval' ? "btn-p txt-p-vault txt-dddbld text--white" : "btn-s txt-p-vault txt-dddbld text--white"}
      >
        {this.props.label}
      </Button>
    );
  }
}

export default ButtonComponent;