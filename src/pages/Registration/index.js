import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Warning from "@material-ui/icons/Warning";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { IdentityDetails, DaicoDetails, Distribution } from "../../components/Registration";
import { validateLength, validateDate, validateTotalSaleTokens, validateZero } from "../../helpers/common/validationHelperFunctions";
import {
  newProjectRegistration,
  saveProjectStates,
  fetchProjectStates,
  fetchProjectDeploymentIndicator,
  clearProjectDetails,
  projectMetadata,
  calculateTokens
} from "../../actions/projectRegistrationActions";
import { getProjectNames } from "../../actions/projectNamesActions";
import { fetchPrice } from "../../actions/priceFetchActions";
import { getTokenTags } from "../../actions/tokenTagsActions";
import { ButtonComponent } from "../../components/Common/FormComponents";
import AlertModal from "../../components/Common/AlertModal";
import actionTypes from "../../action_types";
import GvrncCardLoader from "../../components/Loaders/gvrncCardLoader";
import MasonaryLayout from "../../components/Common/MasonaryLayout";
import NonSale from "../../components/Registration/Distribution/NonSale";

class Registration extends Component {
  state = {
    modalOpen: false,
    modalMessage: "",
    deployModal: false
  };

  handleDeployModalClose = () => this.setState({ deployModal: false });

  componentDidMount() {
    this.props.clearProjectDetails();
    const { getProjectNames: fetchProjectNames, getTokenTags: fetchTokenTags, userLocalPublicAddress, signinStatusFlag, fetchPrice: getPrice } =
      this.props || {};
    getPrice("ETH");
    let interval;
    if (!signinStatusFlag) {
      interval = setInterval(() => {
        if (this.props.signinStatusFlag) {
          this.props.fetchProjectStates(this.props.userLocalPublicAddress);
          this.props.fetchProjectDeploymentIndicator(this.props.userLocalPublicAddress);
          if (this.props.signinStatusFlag !== 5) {
            this.props.history.push({
              pathname: `/`
            });
          }
          clearInterval(interval);
        }
      }, 1000);
    } else {
      this.props.fetchProjectStates(this.props.userLocalPublicAddress);
      this.props.fetchProjectDeploymentIndicator(this.props.userLocalPublicAddress);
      if (this.props.signinStatusFlag !== 5) {
        this.props.history.push({
          pathname: `/`
        });
      }
      clearInterval(interval);
    }
    fetchProjectNames();
    fetchTokenTags();
    window.addEventListener("scroll", this.checkOffset);
  }

  // Function to make the docked btn sticky
  checkOffset = () => {
    const dckdBtnCnt = document.querySelector("#dckd-btn");
    const footer = document.querySelector("#footer");

    function getRectTop(el) {
      const rect = el && el.getBoundingClientRect();
      return rect && rect.top;
    }

    if (dckdBtnCnt && getRectTop(dckdBtnCnt) + document.body.scrollTop + dckdBtnCnt.offsetHeight >= getRectTop(footer) + document.body.scrollTop - 10)
      dckdBtnCnt.style.position = "relative";
    if (document.body.scrollTop + window.innerHeight < getRectTop(footer) + document.body.scrollTop && dckdBtnCnt)
      dckdBtnCnt.style.position = "fixed"; // restore when you scroll up
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.checkOffset);
  }

  componentDidUpdate() {
    setTimeout(() => {
      const { project_id } = this.props || {};
      if (project_id !== "") {
        this.props.history.push({
          pathname: `/deploy`,
          search: `?projectid=${project_id}`
        });
      }
    }, 2000);
  }

  handleSubmitDaicoMetadata = e => {
    this.props.projectMetadata(this.props.projectRegistrationData, this.props.userLocalPublicAddress);
  };

  handlePublishDaico = e => {
    const {
      newProjectRegistration: projectRegistration,
      projectRegistrationData: registrationData,
      userLocalPublicAddress: localAddress,
      saveProjectStates: saveStates
    } = this.props || {};
    projectRegistration(registrationData, localAddress);
    saveStates(registrationData, localAddress);
  };

  handleDeployModalopen = () => {
    const { initialFundRelease, round1TargetEth, initialTapValue, calculateTokens: calTokens, r1Bonus, r2Bonus } = this.props || {};
    if (parseFloat(initialFundRelease) > 0.1 * parseFloat(round1TargetEth)) {
      this.setState({ modalOpen: true, modalMessage: "Initial  Fund Release Should be less than 10 percent of Round1 Target(ETH)" });
    } else if (parseFloat(initialTapValue) > 0.1 * parseFloat(round1TargetEth)) {
      this.setState({ modalOpen: true, modalMessage: "Initial Tap Value Should be less than 10 percent of Round1 Target(ETH)" });
    } else if (parseFloat(r1Bonus) < parseFloat(r2Bonus)) {
      this.setState({ modalOpen: true, modalMessage: `Round 1 bonus should be atleast as much as the round 2 bonus: ${r2Bonus}%` });
    } else if (parseFloat(r1Bonus) > 100 + 2 * parseFloat(r2Bonus)) {
      this.setState({
        modalOpen: true,
        modalMessage: `Round 1 bonus should be less than ${100 + 2 * r2Bonus}% to prevent a price jump of more than doubling between Round 1 & 2.`
      });
    } else {
      calTokens();
      this.setState({ deployModal: true });
    }
  };

  handleSaveButtonClicked = () => {
    const { projectRegistrationData: registrationData, userLocalPublicAddress: localAddress, saveProjectStates } = this.props || {};
    saveProjectStates(registrationData, localAddress);
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      adminName,
      adminEmail,
      projectName,
      projectDescription,
      erc20TokenTag,
      websiteLink,
      teamAddress,
      maxEtherContribution,
      tapIncrementFactor,
      voteSaturationLimit,
      initialFundRelease,
      initialTapValue,
      daicoStartDate,
      daicoEndDate,
      errors,
      totalSaleTokens,
      isIssuerChecked,
      isMetamaskNetworkChecked,
      isMetamaskInstallationChecked,
      isUserDefaultAccountChecked,
      isVaultMembershipChecked,
      signinStatusFlag,
      round1TargetUSD,
      round2TargetUSD,
      round3TargetUSD,
      round1TargetEth,
      round2TargetEth,
      round3TargetEth,
      r1Bonus,
      r2Bonus
    } = this.props || {};
    const { modalOpen, modalMessage, deployModal } = this.state || {};
    return (
      <div>
        {isIssuerChecked && isMetamaskNetworkChecked && isMetamaskInstallationChecked && isUserDefaultAccountChecked && isVaultMembershipChecked ? (
          <div>
            {signinStatusFlag === 5 ? (
              <div>
                <Grid>
                  <MasonaryLayout>
                    <IdentityDetails />
                    <Distribution />
                    <DaicoDetails />
                    <NonSale />
                  </MasonaryLayout>
                </Grid>
                <AlertModal open={deployModal} handleClose={this.handleDeployModalClose} onProceedClick={this.handlePublishDaico} metamask>
                  <div className="text--center text--danger">
                    <Warning style={{ width: "2em", height: "2em" }} /> WARNING
                  </div>
                  <div className="text--center push--top">
                    Once this DAICO is published, you will not be able to edit the on-chain details of the project. However the off-chain details will
                    remain editable.
                  </div>
                </AlertModal>

                <AlertModal open={modalOpen} handleClose={this.handleClose}>
                  <div className="text--center text--danger">
                    <Warning style={{ width: "2em", height: "2em" }} />
                  </div>
                  <div className="text--center push--top">{modalMessage}</div>
                </AlertModal>
                <div id="dckd-btn" className="soft dckd-btn-cnt" style={{ boxShadow: "0px -5px 25px 0px rgba(76, 169, 252, 0.25)" }}>
                  <Grid>
                    <div className="float--right">
                      <ButtonComponent onClick={this.handleSaveButtonClicked} label="Save" />
                      <span className="push--left">
                        {this.props.manageDaico ? (
                          <ButtonComponent
                            label="Submit"
                            onClick={this.handleSubmitDaicoMetadata}
                            disabled={
                              !validateLength(projectDescription) ||
                              errors[actionTypes.REDDIT_LINK_CHANGED] !== "" ||
                              errors[actionTypes.MEDIUM_LINK_CHANGED] !== "" ||
                              errors[actionTypes.GITHUB_LINK_CHANGED] !== "" ||
                              errors[actionTypes.TWITTER_LINK_CHANGED] !== "" ||
                              errors[actionTypes.WEBSITE_LINK_CHANGED] !== "" ||
                              errors[actionTypes.TELEGRAM_LINK_CHANGED] !== ""
                            }
                          />
                        ) : (
                          <ButtonComponent
                            label="Deploy"
                            onClick={this.handleDeployModalopen}
                            disabled={
                              errors[actionTypes.ADMIN_NAME_CHANGED] !== "" ||
                              errors[actionTypes.ADMIN_EMAIL_CHANGED] !== "" ||
                              errors[actionTypes.PROJECT_NAME_CHANGED] !== "" ||
                              errors[actionTypes.ERC20_TAG_CHANGED] !== "" ||
                              errors[actionTypes.PROJECT_DESCRIPTION_CHANGED] !== "" ||
                              errors[actionTypes.WEBSITE_LINK_CHANGED] !== "" ||
                              errors[actionTypes.TEAM_ADDRESS_CHANGED] !== "" ||
                              errors[actionTypes.VOTE_SATURATION_LIMIT_CHANGED] !== "" ||
                              errors[actionTypes.TAP_INCREMENT_FACTOR_CHANGED] !== "" ||
                              errors[actionTypes.INITIAL_FUND_RELEASE_CHANGED] !== "" ||
                              errors[actionTypes.MAX_ETHER_CONTRIBUTION_CHANGED] !== "" ||
                              !validateLength(erc20TokenTag) ||
                              !validateLength(adminName) ||
                              !validateLength(adminEmail) ||
                              !validateLength(projectDescription) ||
                              !validateLength(projectName) ||
                              !validateLength(websiteLink) ||
                              !validateLength(teamAddress) ||
                              !validateLength(maxEtherContribution) ||
                              !validateLength(voteSaturationLimit) ||
                              !validateLength(tapIncrementFactor) ||
                              !validateLength(initialTapValue) ||
                              !validateLength(initialFundRelease) ||
                              !validateLength(round1TargetUSD) ||
                              !validateLength(round1TargetEth) ||
                              !validateLength(round2TargetEth) ||
                              !validateLength(round2TargetUSD) ||
                              !validateLength(round3TargetUSD) ||
                              !validateLength(round3TargetEth) ||
                              !validateLength(r1Bonus) ||
                              !validateLength(r2Bonus) ||
                              !validateDate(daicoStartDate) ||
                              !validateDate(daicoEndDate) ||
                              validateTotalSaleTokens(totalSaleTokens) ||
                              !validateZero(round1TargetUSD) ||
                              !validateZero(round2TargetUSD) ||
                              !validateZero(round3TargetUSD) ||
                              !validateZero(round1TargetEth) ||
                              !validateZero(round2TargetEth) ||
                              !validateZero(round3TargetEth)
                            }
                          />
                        )}
                      </span>
                    </div>
                  </Grid>
                </div>
              </div>
            ) : (
              <Grid>
                <GvrncCardLoader />
              </Grid>
            )}
          </div>
        ) : (
          <Grid>
            <GvrncCardLoader />
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { projectRegistrationData } = state || {};
  const {
    userLocalPublicAddress,
    signinStatusFlag,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked
  } = state.signinManagerData || {};
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
    redditLink,
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
    project_id,
    manageDaico
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
    redditLink,
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
    signinStatusFlag,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked,
    manageDaico
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
      fetchProjectDeploymentIndicator,
      clearProjectDetails,
      projectMetadata,
      fetchPrice,
      calculateTokens
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Registration)
);
