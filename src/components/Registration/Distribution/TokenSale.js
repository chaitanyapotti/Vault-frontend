import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Warning from "@material-ui/icons/Warning";
import { CUIFormInput } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import AlertModal from "../../Common/AlertModal";
import {
  round1TargetUSDChangedAction,
  round1TargetEthChangedAction,
  round2TargetUSDChangedAction,
  round2TargetEthChangedAction,
  round3TargetUSDChangedAction,
  round3TargetEthChangedAction,
  r1BonusChangedAction,
  calculateTokens,
  r2BonusChangedAction
} from "../../../actions/projectRegistrationActions";
import actionTypes from "../../../action_types";
import { ButtonComponent } from "../../Common/FormComponents";
import { validateLength, validateZero } from "../../../helpers/common/validationHelperFunctions";

class TokenSale extends React.Component {
  state = {
    modalOpen: false,
    modalMessage: ""
  };

  handleClose = () => this.setState({ modalOpen: false });

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
    const { r1Bonus, r2Bonus, calculateTokens: calTokens } = this.props || {};
    if (parseFloat(r1Bonus) < parseFloat(r2Bonus)) {
      this.setState({ modalOpen: true, modalMessage: `Round 1 bonus should be atleast as much as the round 2 bonus: ${r2Bonus}%` });
    } else if (parseFloat(r1Bonus) > 100 + 2 * parseFloat(r2Bonus)) {
      this.setState({
        modalOpen: true,
        modalMessage: `Round 1 bonus should be less than ${100 + 2 * r2Bonus}% to prevent a price jump of more than doubling between Round 1 & 2.`
      });
    } else calTokens();
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

  onChangeR1Bonus = e => {
    this.props.r1BonusChangedAction(e.target.value);
  };

  onChangeR2Bonus = e => {
    this.props.r2BonusChangedAction(e.target.value);
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
      r1Bonus,
      r2Bonus,
      allowEditAll,
      errors,
      erc20TokenTag
    } = this.props || {};
    const { modalOpen, modalMessage } = this.state || {};
    return (
      <div>
        <div className="txt-xl" style={{ padding: "40px 50px" }}>
          Token Sale Distribution
        </div>
        <hr />
        <div style={{ padding: "20px 50px" }}>
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
                disabled={!allowEditAll}
                onChange={this.onChangeRound1TargetUSD}
                error={!!this.getErrorMsg(actionTypes.ROUND1_TARGET_USD_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.ROUND1_TARGET_USD_CHANGED)}
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
                disabled={!allowEditAll}
                onChange={this.onChangeRound1TargetEth}
                error={!!this.getErrorMsg(actionTypes.ROUND1_TARGET_ETH_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.ROUND1_TARGET_ETH_CHANGED)}
              />
            </Col>
          </Row>
          {round1Tokens > 0 ? (
            <Row className="push--top">
              <Col lg={12}>
                Total round 1 tokens {round1Tokens} at {round1Rate} {erc20TokenTag}
                /ETH
              </Col>
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
                disabled={!allowEditAll}
                onChange={this.onChangeRound2TargetUSD}
                error={!!this.getErrorMsg(actionTypes.ROUND2_TARGET_USD_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.ROUND2_TARGET_USD_CHANGED)}
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
                disabled={!allowEditAll}
                onChange={this.onChangeRound2TargetEth}
                error={!!this.getErrorMsg(actionTypes.ROUND2_TARGET_ETH_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.ROUND2_TARGET_ETH_CHANGED)}
              />
            </Col>
          </Row>
          {round2Tokens > 0 ? (
            <Row className="push--top">
              <Col lg={12}>
                Total round 2 tokens {round2Tokens} at {round2Rate} {erc20TokenTag}
                /ETH
              </Col>
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
                disabled={!allowEditAll}
                onChange={this.onChangeRound3TargetUSD}
                error={!!this.getErrorMsg(actionTypes.ROUND3_TARGET_USD_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.ROUND3_TARGET_USD_CHANGED)}
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
                disabled={!allowEditAll}
                onChange={this.onChangeRound3TargetEth}
                error={!!this.getErrorMsg(actionTypes.ROUND3_TARGET_ETH_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.ROUND3_TARGET_ETH_CHANGED)}
              />
            </Col>
          </Row>
          {round3Tokens > 0 ? (
            <Row className="push--top">
              <Col lg={12}>
                Total round 3 tokens {round3Tokens} at {round3Rate} {erc20TokenTag}
                /ETH
              </Col>
            </Row>
          ) : null}
          <Row>
            <Col lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                required
                full
                forceNumeric
                inputName="Round1 Bonus"
                inputLabel="Round1 Bonus"
                inputPlaceholder=""
                inputValue={r1Bonus}
                disabled={!allowEditAll}
                onChange={this.onChangeR1Bonus}
                // error={!!this.getErrorMsg(actionTypes.R1_BONUS_CHANGED)}
                // helperText={this.getErrorMsg(actionTypes.R1_BONUS_CHANGED)}
              />
            </Col>
            <Col lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                required
                full
                forceNumeric
                inputName="Round2 Bonus"
                inputLabel="Round2 Bonus"
                inputPlaceholder=""
                inputValue={r2Bonus}
                disabled={!allowEditAll}
                onChange={this.onChangeR2Bonus}
                error={!!this.getErrorMsg(actionTypes.R2_BONUS_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.R2_BONUS_CHANGED)}
              />
            </Col>
          </Row>
          <Row className="push--top">
            <Col lg={12}>
              <ButtonComponent
                label="Calculate"
                style={{ padding: "0 40px" }}
                onClick={this.onCalculateTokenClicked}
                disabled={
                  errors[actionTypes.R2_BONUS_CHANGED] !== "" ||
                  !validateLength(round1TargetEth) ||
                  !validateLength(round1TargetUSD) ||
                  !validateLength(round2TargetEth) ||
                  !validateLength(round2TargetUSD) ||
                  !validateLength(round3TargetEth) ||
                  !validateLength(round3TargetUSD) ||
                  !validateLength(r1Bonus) ||
                  !validateLength(r2Bonus) ||
                  !validateZero(round1TargetUSD) ||
                  !validateZero(round2TargetUSD) ||
                  !validateZero(round3TargetUSD) ||
                  !validateZero(round1TargetEth) ||
                  !validateZero(round2TargetEth) ||
                  !validateZero(round3TargetEth)
                }
              />
            </Col>
          </Row>
        </div>
        <AlertModal open={modalOpen} handleClose={this.handleClose}>
          <div className="text--center text--danger">
            <Warning style={{ width: "2em", height: "2em" }} />
          </div>
          <div className="text--left push--top">{modalMessage}</div>
        </AlertModal>
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
    r1Bonus,
    r2Bonus,
    round1Tokens,
    round2Tokens,
    round3Tokens,
    round1Rate,
    round2Rate,
    round3Rate,
    totalSaleTokens,
    allowEditAll,
    errors,
    ethPrice,
    erc20TokenTag
  } = state.projectRegistrationData || {};
  return {
    round1TargetUSD,
    round1TargetEth,
    round2TargetUSD,
    round2TargetEth,
    round3TargetUSD,
    round3TargetEth,
    r1Bonus,
    r2Bonus,
    round1Tokens,
    round2Tokens,
    round3Tokens,
    round1Rate,
    round2Rate,
    round3Rate,
    totalSaleTokens,
    allowEditAll,
    errors,
    ethPrice,
    erc20TokenTag
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
      r1BonusChangedAction,
      calculateTokens,
      r2BonusChangedAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TokenSale);
