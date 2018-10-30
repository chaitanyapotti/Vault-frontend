import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUICard, CUIFormInput, CUIButton } from "../../../helpers/material-ui";
import { CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS } from "../../../static/js/variables";
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
    this.props.calculateTokens()
  }

  onChangeTokenPriceFactor = e => {
    this.props.tokenPriceFactorChangedAction(e.target.value);
  };

  render() {
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
              inputName="Round1 Target in USD"
              inputLabel="Round1 Target in USD"
              inputPlaceholder=""
              inputValue={this.props.round1TargetUSD}
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
              inputName="Round1 Target in Eth"
              inputLabel="Round1 Target in Eth"
              inputPlaceholder=""
              inputValue={this.props.round1TargetEth}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeRound1TargetEth}
            />
          </Col>
        </Row>
        {
          this.props.round1Tokens>0? <Row>
          <label>
            Total round 1 tokens {this.props.round1Tokens} at {this.props.round1Rate} eth/token
          </label>
        </Row>:null
        }
        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
              full
              inputName="Round2 Target in USD"
              inputLabel="Round2 Target in USD"
              inputPlaceholder=""
              inputValue={this.props.round2TargetUSD}
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
              inputName="Round2 Target in Eth"
              inputLabel="Round2 Target in Eth"
              inputPlaceholder=""
              inputValue={this.props.round2TargetEth}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeRound2TargetEth}
            />
          </Col>
        </Row>
        {
          this.props.round2Tokens>0? <Row>
          <label>
            Total round 2 tokens {this.props.round2Tokens} at {this.props.round2Rate} eth/token
          </label>
        </Row>:null
        }
        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
              full
              inputName="Round3 Target in USD"
              inputLabel="Round3 Target in USD"
              inputPlaceholder=""
              inputValue={this.props.round3TargetUSD}
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
              inputName="Round3 Target in Eth"
              inputLabel="Round3 Target in Eth"
              inputPlaceholder=""
              inputValue={this.props.round3TargetEth}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeRound3TargetEth}
            />
          </Col>
        </Row>
        {
          this.props.round3Tokens>0? <Row>
          <label>
            Total round 3 tokens {this.props.round3Tokens} at {this.props.round3Rate} eth/token
          </label>
         </Row>:null
        }
        <Row>
          <Col>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
              full
              inputName="Token price factor"
              inputLabel="Token price factor"
              inputPlaceholder=""
              inputValue={this.props.tokenPriceFactor}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeTokenPriceFactor}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CUIButton
              type={CUIButtonType.RAISED}
              buttonColor={CUIInputColor.PRIMARY}
              id="calculateTokens"
              label="Calculate"
              // disabled={!this.state.validPassword}
              onClick={this.onCalculateTokenClicked}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  var { round1TargetUSD, round1TargetEth, round2TargetUSD, round2TargetEth, round3TargetUSD, round3TargetEth, tokenPriceFactor,
    round1Tokens,
    round2Tokens,
    round3Tokens,
    round1Rate,
    round2Rate,
    round3Rate,
    totalSaleTokens,
  } = state.projectRegistrationData || {};
  return {
    round1TargetUSD: round1TargetUSD,
    round1TargetEth: round1TargetEth,
    round2TargetUSD: round2TargetUSD,
    round2TargetEth: round2TargetEth,
    round3TargetUSD: round3TargetUSD,
    round3TargetEth: round3TargetEth,
    tokenPriceFactor: tokenPriceFactor,
    round1Tokens: round1Tokens,
    round2Tokens: round2Tokens,
    round3Tokens: round3Tokens,
    round1Rate: round1Rate,
    round2Rate: round2Rate,
    round3Rate: round3Rate,
    totalSaleTokens: totalSaleTokens,
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
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TokenSale);
