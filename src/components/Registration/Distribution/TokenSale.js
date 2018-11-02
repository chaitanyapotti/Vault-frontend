import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import {
  round1TargetUSDChangedAction,
  round1TargetEthChangedAction,
  round2TargetUSDChangedAction,
  round2TargetEthChangedAction,
  round3TargetUSDChangedAction,
  round3TargetEthChangedAction,
  tokenPriceFactorChangedAction,
  calculateTokens
} from "../../../actions/projectRegistrationActions";
import actionTypes from "../../../action_types";
import { ButtonComponent } from "../../Common/FormComponents";
import { validateTokenPriceFactor, validateLength } from "../../../helpers/common/validationHelperFunctions";

class TokenSale extends React.Component {
  onChangeRound1TargetUSD = e => {
    this.props.round1TargetUSDChangedAction(e.target.value);
  };

  onChangeRound1TargetEth = e => {
    this.props.round1TargetEthChangedAction(e.target.value);
  };

  onChangeRound2TargetUSD = e => {
    this.props.round2TargetUSDChangedAction(e.target.value);
  };

  onChangeRound2TargetEth = e => {
    this.props.round2TargetEthChangedAction(e.target.value);
  };

  onChangeRound3TargetUSD = e => {
    this.props.round3TargetUSDChangedAction(e.target.value);
  };

  onChangeRound3TargetEth = e => {
    this.props.round3TargetEthChangedAction(e.target.value);
  };

  onCalculateTokenClicked = e => {
    this.props.calculateTokens();
  };

  componentDidUpdate(prevProps) {
    const { errors } = this.props || {};
    if (prevProps.errors !== errors) {
      this.getErrorMsg();
    }
  }

  getErrorMsg = propName => {
    const { errors } = this.props || {};
    if (errors) {
      if (errors.hasOwnProperty(propName)) {
        return errors[propName];
      }
      return "";
    }
    return "";
  };

  onChangeTokenPriceFactor = e => {
    this.props.tokenPriceFactorChangedAction(e.target.value);
  };

  render() {
    const {
      round1TargetUSD,
      round1TargetEth,
      round1Rate,
      round2Rate,
      round3Rate,
      round2TargetUSD,
      round2TargetEth,
      round3TargetUSD,
      round3Tokens,
      round2Tokens,
      round1Tokens,
      round3TargetEth,
      tokenPriceFactor,
      errors
    } = this.props || {};
    return (
      <div>
        <div className="txt-xl">Token Sale Distribution</div>
        <hr />
        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
              full
              forceNumeric
              inputName="Round1 Target in USD"
              inputLabel="Round1 Target in USD"
              inputPlaceholder=""
              inputValue={round1TargetUSD}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeRound1TargetUSD}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
              full
              forceNumeric
              inputName="Round1 Target in Eth"
              inputLabel="Round1 Target in Eth"
              inputPlaceholder=""
              inputValue={round1TargetEth}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeRound1TargetEth}
            />
          </Col>
        </Row>
        {round1Tokens > 0 ? (
          <Row>
            <label>
              Total round 1 tokens {round1Tokens} at {round1Rate} eth/token
            </label>
          </Row>
        ) : null}
        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
              full
              forceNumeric
              inputName="Round2 Target in USD"
              inputLabel="Round2 Target in USD"
              inputPlaceholder=""
              inputValue={round2TargetUSD}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeRound2TargetUSD}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
              full
              forceNumeric
              inputName="Round2 Target in Eth"
              inputLabel="Round2 Target in Eth"
              inputPlaceholder=""
              inputValue={round2TargetEth}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeRound2TargetEth}
            />
          </Col>
        </Row>
        {round2Tokens > 0 ? (
          <Row>
            <label>
              Total round 2 tokens {round2Tokens} at {round2Rate} eth/token
            </label>
          </Row>
        ) : null}
        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
              full
              forceNumeric
              inputName="Round3 Target in USD"
              inputLabel="Round3 Target in USD"
              inputPlaceholder=""
              inputValue={round3TargetUSD}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeRound3TargetUSD}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
              full
              forceNumeric
              inputName="Round3 Target in Eth"
              inputLabel="Round3 Target in Eth"
              inputPlaceholder=""
              inputValue={round3TargetEth}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeRound3TargetEth}
            />
          </Col>
        </Row>
        {round3Tokens > 0 ? (
          <Row>
            <label>
              Total round 3 tokens {round3Tokens} at {round3Rate} eth/token
            </label>
          </Row>
        ) : null}
        <Row>
          <Col>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
              full
              forceNumDec
              inputName="Token price factor"
              inputLabel="Token price factor"
              inputPlaceholder=""
              inputValue={tokenPriceFactor}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeTokenPriceFactor}
              error={!!this.getErrorMsg(actionTypes.TOKEN_PRICE_FACTOR_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.TOKEN_PRICE_FACTOR_CHANGED)}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <ButtonComponent
              label="Calculate"
              onClick={this.onCalculateTokenClicked}
              disabled={
                errors[actionTypes.TOKEN_PRICE_FACTOR_CHANGED] !== "" ||
                !validateLength(round1TargetEth) ||
                !validateLength(round1TargetUSD) ||
                !validateLength(round2TargetEth) ||
                !validateLength(round2TargetUSD) ||
                !validateLength(round3TargetEth) ||
                !validateLength(round3TargetUSD) ||
                !validateLength(tokenPriceFactor)
              }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    round1TargetUSD,
    round1TargetEth,
    round2TargetUSD,
    round2TargetEth,
    round3TargetUSD,
    round3TargetEth,
    tokenPriceFactor,
    round1Tokens,
    round2Tokens,
    round3Tokens,
    round1Rate,
    round2Rate,
    round3Rate,
    totalSaleTokens,
    errors
  } = state.projectRegistrationData || {};
  return {
    round1TargetUSD,
    round1TargetEth,
    round2TargetUSD,
    round2TargetEth,
    round3TargetUSD,
    round3TargetEth,
    tokenPriceFactor,
    round1Tokens,
    round2Tokens,
    round3Tokens,
    round1Rate,
    round2Rate,
    round3Rate,
    totalSaleTokens,
    errors
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      round1TargetUSDChangedAction,
      round1TargetEthChangedAction,
      round2TargetUSDChangedAction,
      round2TargetEthChangedAction,
      round3TargetUSDChangedAction,
      round3TargetEthChangedAction,
      tokenPriceFactorChangedAction,
      calculateTokens
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenSale);
