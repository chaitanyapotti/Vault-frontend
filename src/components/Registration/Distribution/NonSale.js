import React from "react";
import { CUIFormInput, CUIButton } from "../../../helpers/material-ui";
import { CUIInputType, CUIButtonType, CUIInputColor } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { ButtonComponent } from "../../Common/FormComponents";

class NonSale extends React.Component {
  state = {
    noOfTkns: "",
  };

  onChangeNoOfTkns = e => {
    this.setState({
      noOfTkns: e.target.value,
    });
  };

  render() {
    return (
      <div className="push-top--50">
        <div className="txt-xl">Non Sale Distribution</div>
        <hr />
        <div>
          <div>1. 4500 ETH - Bug Bounty</div>
          <div>2. 3500 ETH - Team</div>
        </div>
        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Number of Tokens"
              inputLabel="Number of Tokens"
              inputPlaceholder=""
              inputValue={this.state.noOfTkns}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeNoOfTkns}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Receiver"
              inputLabel="Receiver"
              inputPlaceholder=""
              inputValue={this.state.inifundValue}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeIniFundVal}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="push--top">
              <ButtonComponent
                label="Add To token Distribution Chart"
                style={{width: '100%'}}
                onClick={this.uploadDaico}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NonSale;
