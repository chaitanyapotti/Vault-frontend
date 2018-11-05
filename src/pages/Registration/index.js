/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Warning from "@material-ui/icons/Warning";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { IdentityDetails, DaicoDetails, Distribution } from "../../components/Registration";
import {
  validateLength,
  isUpperCase,
  validateProjectNameLength,
  validateTokenTagLength,
  alphaOnly,
  validateMaxEtherContribution,
  validateTapIncrementFactor,
  validateVoteSaturationLimit,
  validateDate,
  validateUniqueName,
  validateTotalSaleTokens
} from "../../helpers/common/validationHelperFunctions";
import { newProjectRegistration, saveProjectStates, fetchProjectStates, fetchProjectDeploymentIndicator } from "../../actions/projectRegistrationActions";
import { getProjectNames } from "../../actions/projectNamesActions";
import { getTokenTags } from "../../actions/tokenTagsActions";
import { ButtonComponent } from "../../components/Common/FormComponents";
import AlertModal from "../../components/Common/AlertModal";
import actionTypes from "../../action_types";

class Registration extends Component {
  state = {
    modalOpen: false,
    modalMessage: "",
    calculateTokensModal: false
  };

  handleCalculateTokensOpen = () => this.setState({ calculateTokensModal: true });

  componentDidMount() {
    const { getProjectNames: fetchProjectNames, getTokenTags: fetchTokenTags, userLocalPublicAddress, signinStatusFlag } = this.props || {};
    if (signinStatusFlag!=5){
      this.props.history.push({
        pathname: `/`
      })
    }
    if (userLocalPublicAddress) {
      this.props.fetchProjectStates(userLocalPublicAddress);
      this.props.fetchProjectDeploymentIndicator(userLocalPublicAddress);
    } else {
      this.props.fetchProjectStates("0xb758c38326Df3D75F1cf0DA14Bb8220Ca4231e74");
      this.props.fetchProjectDeploymentIndicator("0xb758c38326Df3D75F1cf0DA14Bb8220Ca4231e74");
    }
    fetchProjectNames();
    fetchTokenTags();
    window.addEventListener("scroll", this.checkOffset);
  }

  // Function to make the docked btn sticky
  checkOffset = () => {
    const dckdBtnCnt = document.querySelector('#dckd-btn');
    const footer = document.querySelector('#footer');

    function getRectTop(el){
      var rect = el.getBoundingClientRect();
      return rect.top;
    }
    
    if((getRectTop(dckdBtnCnt) + document.body.scrollTop) + dckdBtnCnt.offsetHeight >= (getRectTop(footer) + document.body.scrollTop) - 10)
      dckdBtnCnt.style.position = 'relative';
    if(document.body.scrollTop + window.innerHeight < (getRectTop(footer) + document.body.scrollTop))
      dckdBtnCnt.style.position = 'fixed'; // restore when you scroll up
    }
  
  componentWillUnmount() {
    window.removeEventListener("scroll", this.checkOffset);
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

  handleSaveButtonClicked = () => {
    const {
      projectRegistrationData: registrationData,
      userLocalPublicAddress: localAddress,
      saveProjectStates: saveProjectStates
    } = this.props || {};
    saveProjectStates(registrationData, localAddress);
  }

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const {
      adminName,
      adminEmail,
      projectName,
      projectDescription,
      erc20TokenTag,
      maxEtherContribution,
      tapIncrementFactor,
      voteSaturationLimit,
      initialFundRelease,
      initialTapValue,
      daicoStartDate,
      daicoEndDate,
      projectNames,
      tokenTags,
      errors,
      project_id,
      totalSaleTokens
    } = this.props || {};
    const { modalOpen, modalMessage, calculateTokensModal } = this.state;

    {
      project_id != "" ? this.props.history.push({
        pathname: `/issuergovernance/details`,
        search: `?projectid=${project_id}`
      }) : null
    }
    return (
      <div>
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
                  !validateDate(daicoStartDate) ||
                  !validateDate(daicoEndDate) ||
                  validateUniqueName(projectNames, projectName) ||
                  validateUniqueName(tokenTags, erc20TokenTag) ||
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
          <AlertModal open={modalOpen} handleClose={this.handleClose}>
            <div className="text--center text--danger">
              <Warning style={{ width: "2em", height: "2em" }} />
            </div>
            <div className="text--center push--top">{modalMessage}</div>
          </AlertModal>
        </Grid>
        <div id="dckd-btn" className="soft dckd-btn-cnt">
          <Grid>
            <div className="float--right">
              <ButtonComponent 
                label="Save"
              />
              <span className="push--left">
                <ButtonComponent 
                  label="Publish Daico"
                />
              </span>
            </div>
          </Grid>
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
  const { projectRegistrationData } = state || {};
  const { userLocalPublicAddress, signinStatusFlag } = state.signinManagerData || {};
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
    r1Bonus,
    r2Bonus,
    totalSaleTokens,
    errors,
    projectNames,
    tokenTags,
    project_id
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
    r1Bonus,
    r2Bonus,
    projectNames,
    tokenTags,
    project_id,
    signinStatusFlag
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      newProjectRegistration,
      saveProjectStates,
      getProjectNames,
      getTokenTags,
      fetchProjectStates,
      fetchProjectDeploymentIndicator
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
