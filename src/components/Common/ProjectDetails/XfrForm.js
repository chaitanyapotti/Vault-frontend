/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { Grid, Row, Col } from "../../../helpers/react-flexbox-grid";
import { CUIFormInput } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { ButtonComponent } from "../FormComponents";

class XfrForm extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Xfr Title"
              inputLabel="Xfr Title"
              inputPlaceholder="App Redesign"
              //   inputValue={this.props.adminName}
              textFocus
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              //   onChange={this.onChangeName}
            />
          </Col>
          <Col lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Xfr Amount"
              inputLabel="Xfr Amount"
              inputPlaceholder="500 ETH"
              //   inputValue={this.props.adminName}
              textFocus
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              //   onChange={this.onChangeName}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              multiline
              rowsMax="4"
              inputName="Description"
              inputLabel="Description"
              inputPlaceholder="Describe aboout fund request briefly"
              textFocus
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col lg={4}>
            <ButtonComponent label="Publish" />
          </Col>
          <Col lg={8}>
            <div className="text--right">This poll will end in 30 days of publishing</div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default XfrForm;
