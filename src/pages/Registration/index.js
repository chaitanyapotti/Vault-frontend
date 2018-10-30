/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
  validateTotalSaleTokens
} from "../../helpers/common/validationHelperFunctions";
import { newProjectRegistration } from "../../actions/projectRegistrationActions";
import { ButtonComponent } from "../../components/Common/FormComponents";
import { checkMetaMask } from "../../actions/projectRegistrationActions";

class Registration extends Component {
  handlePublishDaico = e => {
    this.props.newProjectRegistration(this.props.projectRegistrationData, this.props.userLocalPublicAddress);
  };

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
      totalSaleTokens
    } = this.props || {};
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
                  !validateAdminName(adminName) ||
                  !validateLength(adminName) ||
                  !validateLength(projectDescription) ||
                  !validateLength(projectName) ||
                  !validateEmail(adminEmail) ||
                  !validateFacebookLink(facebookLink) ||
                  !validateMediumLink(mediumLink) ||
                  !validateGitLink(githubLink) ||
                  !validateTwitterLink(twitterLink) ||
                  !validateWebsiteUrl(websiteLink) ||
                  !validateTelegramLink(telegramLink) ||
                  isUpperCase(erc20TokenTag) ||
                  !validateLength(erc20TokenTag) ||
                  !validateTokenTagLength(erc20TokenTag) ||
                  !checkMetaMask(teamAddress) ||
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
                  validateTotalSaleTokens(totalSaleTokens)
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
    errors
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
    tokenPriceFactor
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      newProjectRegistration
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
