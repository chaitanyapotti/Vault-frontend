import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUICard, CUIFormInput, CUIButton } from "../../helpers/material-ui";
import { CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS } from "../../static/js/variables";
import { Row, Col } from "../../helpers/react-flexbox-grid";
import {
  initialFundReleaseChangedAction,
  maxEtherContributionChangedAction,
  initialTapValueChangedAction,
  // daicoRoundsChangedAction,
  daicoStartDateChangedAction,
  daicoEndDateChangedAction,
  tapIncrementFactorChangedAction,
  voteSaturationLimitChangedAction
} from "../../actions/projectRegistrationActions";
import actionTypes from "../../action_types";
import DTPicker from "../Common/DTPicker";

class DaicoDetails extends React.Component {
  state = {
    selectedDate: null
  };

  handleDateChange = date => {
    console.log("date", date);
    this.setState({ selectedDate: date });
  };

  onChangeIniFundVal = e => {
    this.props.initialFundReleaseChangedAction(e.target.value);
  };

  onChangeMaxEtherContribution = e => {
    this.props.maxEtherContributionChangedAction(e.target.value);
  };

  onChangeInitialTapValue = e => {
    this.props.initialTapValueChangedAction(e.target.value);
  };

  onChangeTapIncrementFactor = e => {
    this.props.tapIncrementFactorChangedAction(e.target.value);
  };

  onChangeVoteSaturationLimit = e => {
    this.props.voteSaturationLimitChangedAction(e.target.value);
  };

  // onSelectDaicoRounds = e => {
  //   console.log(e.target.value);
  //   this.props.daicoRoundsChangedAction(e.target.value);
  // };

  onChangeDaicoStart = e => {
    this.props.daicoStartDateChangedAction(e.target.value);
  };

  onChangeDaicoEnd = e => {
    this.props.daicoEndDateChangedAction(e.target.value);
  };

  uploadDaico = () => {
    console.log("upload DAICO button action");
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.getErrorMsg();
    }
  }

  getErrorMsg = propName => {
    if (this.props.errors) {
      if (this.props.errors.hasOwnProperty(propName)) {
        return this.props.errors[propName];
      }
      return "";
    }
    return "";
  };

  render() {
    return (
      <div>
        <CUICard style={{ padding: "40px 50px" }}>
          <div className="txt-xl">DAICO Details</div>
          <hr />
          <Row>
            <Col xs={12} lg={6}>
              <DTPicker selectedDate={this.state.selectedDate} handleDateChange={this.handleDateChange} />
            </Col>
            <Col xs={12} lg={6}>
              <CUIFormInput
                required
                inputType={CUIInputType.TEXT}
                full
                inputName="Round 1 End Date"
                inputLabel="Round 1 End Date"
                inputPlaceholder="Eg. 25-10-2018"
                inputValue={this.props.daicoEndDate}
                // onBlur={this.onBlurAge}
                // error={this.state.errorAgeText !== ''}
                // helperText={this.state.errorAgeText}
                // onKeyDownSelector="Admin"
                onChange={this.onChangeDaicoEnd}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={6}>
              <CUIFormInput
                required
                inputType={CUIInputType.TEXT}
                full
                inputName="Initial Fund Release"
                inputLabel="Initial Fund Release"
                inputPlaceholder="Eg. 100"
                inputValue={this.props.initialFundRelease}
                textFocus
                // onBlur={this.onBlurAge}
                // error={this.state.errorAgeText !== ''}
                // helperText={this.state.errorAgeText}
                // onKeyDownSelector="Admin"
                onChange={this.onChangeIniFundVal}
                error={!!this.getErrorMsg(actionTypes.INITIAL_FUND_RELEASE_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.INITIAL_FUND_RELEASE_CHANGED)}
              />
            </Col>
            <Col xs={12} lg={6}>
              <CUIFormInput
                required
                inputType={CUIInputType.TEXT}
                full
                inputName="Max Ether Contribution"
                inputLabel="Max Ether Cap (ETH)"
                inputPlaceholder="Eg. 5"
                inputValue={this.props.maxEtherContribution}
                textFocus
                // onBlur={this.onBlurAge}
                // error={this.state.errorAgeText !== ''}
                // helperText={this.state.errorAgeText}
                // onKeyDownSelector="Admin"
                onChange={this.onChangeMaxEtherContribution}
                error={!!this.getErrorMsg(actionTypes.MAX_ETHER_CONTRIBUTION_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.MAX_ETHER_CONTRIBUTION_CHANGED)}
              />
            </Col>
            {/* <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.SELECT}
                iconColor={CS_COLORS.G_DIVIDER}
                full
                inputLabel="DAICO Rounds"
                inputValue={this.props.daicoRounds}
                items={[{ value: "3", primaryText: "3" }, { value: "2", primaryText: "2" }, { value: "1", primaryText: "1" }]}
                onChange={this.onSelectDaicoRounds}
              />
            </Col> */}
          </Row>
          <Row>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                required
                full
                inputName="Initial Tap Value"
                inputLabel="Initial Tap (ETH/Mo)"
                inputPlaceholder="Eg. 100"
                inputValue={this.props.initialTapValue}
                textFocus
                // onBlur={this.onBlurAge}
                // error={this.state.errorAgeText !== ''}
                // helperText={this.state.errorAgeText}
                // onKeyDownSelector="Admin"
                onChange={this.onChangeInitialTapValue}
                error={!!this.getErrorMsg(actionTypes.INITIAL_TAP_VALUE_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.INITIAL_TAP_VALUE_CHANGED)}
              />
            </Col>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                required
                full
                inputName="Tap Increment Factor"
                inputLabel="Tap Increment Factor"
                inputPlaceholder="Eg. 1.5"
                inputValue={this.props.tapIncrementFactor}
                textFocus
                // onBlur={this.onBlurAge}
                // error={this.state.errorAgeText !== ''}
                // helperText={this.state.errorAgeText}
                // onKeyDownSelector="Admin"
                onChange={this.onChangeTapIncrementFactor}
                error={!!this.getErrorMsg(actionTypes.TAP_INCREMENT_FACTOR_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.TAP_INCREMENT_FACTOR_CHANGED)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                required
                full
                inputName="Vote Saturation Limit"
                inputLabel="Vote Saturation Limit"
                inputPlaceholder="Eg. 0.05%"
                inputValue={this.props.voteSaturationLimit}
                textFocus
                // onBlur={this.onBlurAge}
                // error={this.state.errorAgeText !== ''}
                // helperText={this.state.errorAgeText}
                // onKeyDownSelector="Admin"
                onChange={this.onChangeVoteSaturationLimit}
                error={!!this.getErrorMsg(actionTypes.VOTE_SATURATION_LIMIT_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.VOTE_SATURATION_LIMIT_CHANGED)}
              />
            </Col>
          </Row>
        </CUICard>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    initialFundRelease,
    daicoRounds,
    daicoStartDate,
    daicoEndDate,
    maxEtherContribution,
    initialTapValue,
    tapIncrementFactor,
    voteSaturationLimit,
    errors
  } = state.projectRegistrationData || {};
  return {
    initialFundRelease,
    daicoRounds,
    daicoStartDate,
    daicoEndDate,
    maxEtherContribution,
    initialTapValue,
    tapIncrementFactor,
    voteSaturationLimit,
    errors
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      initialFundReleaseChangedAction,
      // daicoRoundsChangedAction,
      daicoStartDateChangedAction,
      daicoEndDateChangedAction,
      maxEtherContributionChangedAction,
      initialTapValueChangedAction,
      tapIncrementFactorChangedAction,
      voteSaturationLimitChangedAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DaicoDetails);
