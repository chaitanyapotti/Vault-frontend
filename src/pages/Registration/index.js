/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Warning from "@material-ui/icons/Warning";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { IdentityDetails, DaicoDetails, Distribution } from "../../components/Registration";
import {
  validateAdminName,
  validateLength,
  validateEmail,
  isUpperCase,
  validateTwitterLink,
  validateFacebookLink,
  validateWebsiteUrl,
  validateGitLink,
  validateMediumLink,
  validateTelegramLink,
  validateProjectNameLength,
  validateTokenTagLength,
  alphaOnly,
  validateMaxEtherContribution,
  validateTapIncrementFactor,
  validateVoteSaturationLimit,
  validateDate,
  validateTotalSaleTokens,
  validateTokenPriceFactor,
  checkMetaMask,
  validateUniqueName
} from "../../helpers/common/validationHelperFunctions";
import { newProjectRegistration, saveProjectStates } from "../../actions/projectRegistrationActions";
import { getProjectNames } from "../../actions/projectNamesActions";
import { getTokenTags } from "../../actions/tokenTagsActions";
import { ButtonComponent } from "../../components/Common/FormComponents";
import AlertModal from "../../components/Common/AlertModal";
import actionTypes from "../../action_types";

class Registration extends Component {
  state = {
    modalOpen: false,
    modalMessage: ""
  };

  componentDidMount() {
    const { getProjectNames: fetchProjectNames, getTokenTags: fetchTokenTags } = this.props || {};
    fetchProjectNames();
    fetchTokenTags();
  }

  handlePublishDaico = e => {
    const {
      initialFundRelease,
      round1TargetEth,
      initialTapValue,
      newProjectRegistration: projectRegistration,
      projectRegistrationData: registrationData,
      userLocalPublicAddress: localAddress,
      saveProjectStates: saveProjectStates
    } = this.props || {};
    if (parseFloat(initialFundRelease) > 0.1 * parseFloat(round1TargetEth)) {
      this.setState({ modalOpen: true, modalMessage: "Initial  Fund Release Should be less than 10 percent of Round1 Target(ETH)" });
    } else if (parseFloat(initialTapValue) >= parseFloat(initialFundRelease)) {
      this.setState({ modalOpen: true, modalMessage: "Initial Tap Value Should be less than Initial Fund Release" });
    } else {
      projectRegistration(registrationData, localAddress);
      saveProjectStates(registrationData, localAddress);
    }
  };

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const {
      adminName,
      adminEmail,
      projectName,
      projectDescription,
      erc20TokenTag,
      websiteLink,
      telegramLink,
      githubLink,
      mediumLink,
      facebookLink,
      twitterLink,
      teamAddress,
      maxEtherContribution,
      tapIncrementFactor,
      voteSaturationLimit,
      initialFundRelease,
      initialTapValue,
      daicoStartDate,
      daicoEndDate,
      round1TargetUSD,
      round1TargetEth,
      round2TargetUSD,
      round2TargetEth,
      round3TargetUSD,
      round3TargetEth,
      tokenPriceFactor,
      projectNames,
      tokenTags,
      errors
    } = this.props || {};
    console.log(teamAddress, "t");
    const { modalOpen, modalMessage } = this.state;
    return (
      <Grid>
        <Row className="push--top">
          <Col xs={12} lg={7}>
            <IdentityDetails />
          </Col>
          <Col xs={12} lg={5}>
            <div style={{ textAlign: "center" }}>
              <ButtonComponent
                style={{ width: "85%" }}
                label="Publish DAICO"
                onClick={this.handlePublishDaico}
                disabled={
                  errors[actionTypes.ADMIN_NAME_CHANGED] !== "" ||
                  !validateLength(adminName) ||
                  !validateLength(projectDescription) ||
                  !validateLength(projectName) ||
                  errors[actionTypes.ADMIN_EMAIL_CHANGED] !== "" ||
                  errors[actionTypes.FACEBOOK_LINK_CHANGED] !== "" ||
                  errors[actionTypes.MEDIUM_LINK_CHANGED] !== "" ||
                  errors[actionTypes.GITHUB_LINK_CHANGED] !== "" ||
                  errors[actionTypes.TWITTER_LINK_CHANGED] !== "" ||
                  errors[actionTypes.WEBSITE_LINK_CHANGED] !== "" ||
                  errors[actionTypes.TELEGRAM_LINK_CHANGED] !== "" ||
                  isUpperCase(erc20TokenTag) ||
                  !validateLength(erc20TokenTag) ||
                  !validateTokenTagLength(erc20TokenTag) ||
                  errors[actionTypes.TEAM_ADDRESS_CHANGED] !== "" ||
                  !validateProjectNameLength(projectName) ||
                  !alphaOnly(erc20TokenTag) ||
                  !alphaOnly(projectName) ||
                  validateMaxEtherContribution(maxEtherContribution) ||
                  !validateLength(maxEtherContribution) ||
                  validateVoteSaturationLimit(voteSaturationLimit) ||
                  !validateLength(voteSaturationLimit) ||
                  validateTapIncrementFactor(tapIncrementFactor) ||
                  !validateLength(tapIncrementFactor) ||
                  !validateLength(initialTapValue) ||
                  !validateLength(initialFundRelease) ||
                  !validateLength(round1TargetEth) ||
                  !validateLength(round1TargetUSD) ||
                  !validateLength(round2TargetEth) ||
                  !validateLength(round2TargetUSD) ||
                  !validateLength(round3TargetEth) ||
                  !validateLength(round3TargetUSD) ||
                  !validateLength(tokenPriceFactor) ||
                  !validateDate(daicoStartDate) ||
                  !validateDate(daicoEndDate) ||
                  !validateTokenPriceFactor(tokenPriceFactor) ||
                  validateUniqueName(projectNames, projectName) ||
                  validateUniqueName(tokenTags, erc20TokenTag)
                }
              />
            </div>
            <div className="push--top">
              <DaicoDetails />
            </div>
          </Col>
        </Row>

        <Row className="push--top push--bottom">
          <Col xs={12} lg={7}>
            <Distribution />
          </Col>
        </Row>
        <AlertModal open={modalOpen} handleClose={this.handleClose}>
          <div className="text--center text--danger">
            <Warning style={{ width: "2em", height: "2em" }} />
          </div>
          <div className="text--center push--top">{modalMessage}</div>
        </AlertModal>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { projectRegistrationData } = state || {};
  const { userLocalPublicAddress } = state.signinManagerData || {};
  const {
    adminName,
    adminEmail,
    projectName,
    erc20TokenTag,
    projectDescription,
    websiteLink,
    telegramLink,
    githubLink,
    mediumLink,
    facebookLink,
    twitterLink,
    teamAddress,
    initialFundRelease,
    maxEtherContribution,
    initialTapValue,
    tapIncrementFactor,
    voteSaturationLimit,
    daicoStartDate,
    daicoEndDate,
    round1TargetUSD,
    round1TargetEth,
    round2TargetUSD,
    round2TargetEth,
    round3TargetUSD,
    round3TargetEth,
    tokenPriceFactor,
    totalSaleTokens,
    errors,
    projectNames,
    tokenTags
  } = state.projectRegistrationData || {};
  return {
    projectRegistrationData,
    userLocalPublicAddress,
    adminName,
    adminEmail,
    projectName,
    erc20TokenTag,
    projectDescription,
    websiteLink,
    telegramLink,
    githubLink,
    mediumLink,
    facebookLink,
    twitterLink,
    teamAddress,
    errors,
    initialFundRelease,
    maxEtherContribution,
    initialTapValue,
    tapIncrementFactor,
    voteSaturationLimit,
    daicoStartDate,
    daicoEndDate,
    round1TargetUSD,
    round1TargetEth,
    round2TargetUSD,
    round2TargetEth,
    round3TargetUSD,
    round3TargetEth,
    totalSaleTokens,
    tokenPriceFactor,
    projectNames,
    tokenTags
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      newProjectRegistration,
      saveProjectStates, 
      getProjectNames,
      getTokenTags
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
