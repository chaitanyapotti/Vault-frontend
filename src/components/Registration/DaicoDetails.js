import React from "react";
import moment from "moment-timezone";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUICard, CUIFormInput } from "../../helpers/material-ui";
import { CUIInputType } from "../../static/js/variables";
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

  onChangeDaicoStart = date => {
    const startDate = moment.utc(date.format("YYYY-MM-DD HH:mm:ss"));
    this.props.daicoStartDateChangedAction(startDate);
  };

  onChangeDaicoEnd = date => {
    const endDate = moment.utc(date.format("YYYY-MM-DD HH:mm:ss"));
    this.props.daicoEndDateChangedAction(endDate);
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

  getEndMinDate = () => {
    let { daicoStartDate } = this.props || {};
    daicoStartDate = new Date(daicoStartDate) || new Date();
    const year = daicoStartDate && daicoStartDate.getFullYear();
    const month = daicoStartDate && daicoStartDate.getMonth();
    const date = daicoStartDate && daicoStartDate.getDate();
    const newDate = new Date(year, month, date);
    return new Date(newDate.setDate(newDate.getDate() + 5));
  };

  getEndMaxDate = () => {
    let { daicoStartDate } = this.props || {};
    daicoStartDate = new Date(daicoStartDate) || new Date();
    const year = daicoStartDate && daicoStartDate.getFullYear();
    const month = daicoStartDate && daicoStartDate.getMonth();
    const date = daicoStartDate && daicoStartDate.getDate();
    const newDate = new Date(year, month, date);
    return new Date(newDate.setMonth(newDate.getMonth() + 2));
  };

  render() {
    const { daicoEndDate, initialFundRelease, maxEtherContribution, initialTapValue, tapIncrementFactor, voteSaturationLimit, allowEditAll } =
      this.props || {};
    const { daicoStartDate } = this.props || {};
    // console.log("daico start date: ", daicoStartDate)
    return (
      <div>
        <CUICard className="card-brdr">
          <div className="txt-xl" style={{ padding: "40px 50px" }}>
            DAICO Details
          </div>
          <hr />
          <div style={{ padding: "20px 50px" }}>
            <Row>
              <Col xs={12} lg={6}>
                {allowEditAll ? (
                  <DTPicker selectedDate={daicoStartDate} disablePast label="Round 1 Start Date" handleDateChange={this.onChangeDaicoStart} />
                ) : (
                  <div>{daicoStartDate}</div>
                )}
              </Col>
              <Col xs={12} lg={6}>
                {allowEditAll ? (
                  <DTPicker
                    selectedDate={daicoEndDate}
                    // minDate={this.getEndMinDate()}
                    // maxDate={this.getEndMaxDate()}
                    label="Round 1 End Date"
                    handleDateChange={this.onChangeDaicoEnd}
                  />
                ) : (
                  <div>{daicoEndDate}</div>
                )}
              </Col>
            </Row>
            <Row>
              <Col xs={12} lg={6}>
                <CUIFormInput
                  required
                  inputType={CUIInputType.TEXT}
                  full
                  forceNumDec
                  inputName="Initial Fund Release"
                  inputLabel="Initial Fund Release"
                  inputPlaceholder="Eg. 100"
                  inputValue={initialFundRelease}
                  disabled={!allowEditAll}
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
                  forceNumDec
                  inputName="Max Ether Contribution"
                  inputLabel="Max Ether Cap (ETH)"
                  inputPlaceholder="Eg. 5"
                  inputValue={maxEtherContribution}
                  disabled={!allowEditAll}
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
                  forceNumDec
                  inputName="Initial Tap Value"
                  inputLabel="Initial Tap (ETH/Mo)"
                  inputPlaceholder="Eg. 100"
                  inputValue={initialTapValue}
                  disabled={!allowEditAll}
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
                  forceNumDec
                  inputName="Tap Increment Factor"
                  inputLabel="Tap Increment Factor"
                  inputPlaceholder="Eg. 1.5"
                  inputValue={tapIncrementFactor}
                  disabled={!allowEditAll}
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
                  forceNumDec
                  inputName="Vote Saturation Limit"
                  inputLabel="Vote Saturation Limit"
                  inputPlaceholder="Eg. 0.05%"
                  inputValue={voteSaturationLimit}
                  disabled={!allowEditAll}
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
          </div>
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
    allowEditAll,
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
    allowEditAll,
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
