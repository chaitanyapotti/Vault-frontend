import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUICard, CUIFormInput, CUIButton } from "../../../helpers/material-ui";
import { CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import {
  round1TokensChangedAction,
  round1RateChangedAction,
  round2TokensChangedAction,
  round2RateChangedAction,
  round3TokensChangedAction,
  round3RateChangedAction,
} from "../../../actions/projectRegistrationActions";

class TokenSale extends React.Component {
  onChangeTknSaleL1 = e => {
    this.props.round1TokensChangedAction(e.target.value);
  };

  onChangeTknRateL1 = e => {
    this.props.round1RateChangedAction(e.target.value);
  };

  onChangeTknSaleL2 = e => {
    this.props.round2TokensChangedAction(e.target.value);
  };

  onChangeTknRateL2 = e => {
    this.props.round2RateChangedAction(e.target.value);
  };

  onChangeTknSaleL3 = e => {
    this.props.round3TokensChangedAction(e.target.value);
  };

  onChangeTknRateL3 = e => {
    this.props.round3RateChangedAction(e.target.value);
  };

  render() {
    return (
      <div>
        <div>Token Sale Distribution</div>
        <hr />
        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Tokens Sold at Level 1"
              inputLabel="Tokens Sold at Level 1"
              inputPlaceholder=""
              inputValue={this.props.round1Tokens}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeTknSaleL1}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Tokens Price at Level 1 (ETH)"
              inputLabel="Tokens Price at Level 1 (ETH)"
              inputPlaceholder=""
              inputValue={this.props.round1Rate}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeTknRateL1}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Tokens Sold at Level 2"
              inputLabel="Tokens Sold at Level 2"
              inputPlaceholder=""
              inputValue={this.props.round2Tokens}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeTknSaleL2}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Tokens Price at Level 2 (ETH)"
              inputLabel="Tokens Price at Level 2 (ETH)"
              inputPlaceholder=""
              inputValue={this.props.round2Rate}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeTknRateL2}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Tokens Sold at Level 3"
              inputLabel="Tokens Sold at Level 3"
              inputPlaceholder=""
              inputValue={this.props.round3Tokens}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeTknSaleL3}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Tokens Price at Level 3 (ETH)"
              inputLabel="Tokens Price at Level 3 (ETH)"
              inputPlaceholder=""
              inputValue={this.props.round3Rate}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeTknRateL3}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { round1Tokens, round1Rate, round2Tokens, round2Rate, round3Tokens, round3Rate } = state.activeDaicosData || {};
  return {
    round1Tokens,
    round1Rate,
    round2Tokens,
    round2Rate,
    round3Tokens,
    round3Rate,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      round1TokensChangedAction,
      round1RateChangedAction,
      round2TokensChangedAction,
      round2RateChangedAction,
      round3TokensChangedAction,
      round3RateChangedAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TokenSale);
