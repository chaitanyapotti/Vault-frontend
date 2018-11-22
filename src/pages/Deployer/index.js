import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import qs from "qs";
import Warning from "@material-ui/icons/Warning";
import { fetchProjectDetails, deployContractAction, performContractAction, resetDeployment } from "../../actions/deployerActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUIModal, CUIModalActions, CUIModalContent } from "../../helpers/material-ui";
import web3 from "../../helpers/web3";
import CustomizedStepper from "../../components/Common/CustomizedStepper";
import DeployerCard from "../../components/DeployerCard";
import config from "../../config";
import TableLoader from "../../components/Loaders/TableLoader";
import LoadingButton from "../../components/Common/LoadingButton";

class Deployer extends Component {
  state = {
    modalOpen: false
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  componentDidMount() {
    const { fetchProjectDetails: getProjectDetails, history } = this.props || {};
    const currentUrl = new URL(window.location.href);
    const params = qs.parse(currentUrl.search, { ignoreQueryPrefix: true });
    if ("projectid" in params) {
      getProjectDetails(params.projectid);
    } else {
      history.push({
        pathname: `/`
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { pageReloading } = this.props || {};
    const { pageReloading: oldReload } = prevProps || {};
    if (oldReload !== pageReloading) {
      console.log("reloading in props");
      if (pageReloading) {
        window.location.reload();
      }
    }
  }

  deployMembership = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, deployContractAction: deployAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, projectName, tokenTag } = projectDetails || {};
    const args = [web3.utils.fromAscii(projectName), web3.utils.fromAscii(tokenTag), config.vault_contract_address];
    deployAction(version, _id, currentDeploymentIndicator, args, "Protocol", userLocalPublicAddress, nonce);
  };

  deployDaicoToken = (nonce = "") => {
    const { userLocalPublicAddress, deployContractAction: deployAction, projectDetails } = this.props || {};
    const { version, _id, currentDeploymentIndicator, projectName, tokenTag, membershipAddress, totalMintableSupply, capPercent } =
      projectDetails || {};
    const args = [projectName, tokenTag, membershipAddress, totalMintableSupply, capPercent];
    deployAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", userLocalPublicAddress, nonce);
  };

  deployLockedTokens = (nonce = "") => {
    const { userLocalPublicAddress, deployContractAction: deployAction, projectDetails } = this.props || {};
    const { version, _id, currentDeploymentIndicator, daicoTokenAddress } = projectDetails || {};
    const args = [daicoTokenAddress];
    deployAction(version, _id, currentDeploymentIndicator, args, "LockedTokens", userLocalPublicAddress, nonce);
  };

  deployPollFactory = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, deployContractAction: deployAction } = this.props || {};
    const {
      version,
      _id,
      currentDeploymentIndicator,
      daicoTokenAddress,
      teamAddress,
      initialFundRelease,
      initialTapAmount,
      killPollStartDate,
      capPercent,
      killAcceptancePercent,
      xfrRejectionPercent,
      tapAcceptancePercent,
      lockedTokensAddress,
      tapIncrementFactor
    } = projectDetails || {};
    const args = [
      daicoTokenAddress,
      teamAddress,
      initialFundRelease,
      initialTapAmount,
      (new Date(killPollStartDate).getTime() / 1000).toString(), // In Unix Time
      config.vault_contract_address,
      capPercent,
      killAcceptancePercent,
      xfrRejectionPercent,
      tapAcceptancePercent,
      lockedTokensAddress,
      tapIncrementFactor
    ];
    deployAction(version, _id, currentDeploymentIndicator, args, "PollFactory", userLocalPublicAddress, nonce);
  };

  deployCrowdSale = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, deployContractAction: deployAction } = this.props || {};
    const {
      version,
      _id,
      currentDeploymentIndicator,
      minimumEtherContribution,
      maximumEtherContribution,
      r1EndTime,
      rounds,
      lockedTokensAddress,
      pollFactoryAddress,
      membershipAddress,
      daicoTokenAddress,
      foundationDetails,
      startDateTime
    } = projectDetails || {};
    const args = [
      minimumEtherContribution.toString(),
      maximumEtherContribution.toString(),
      Math.round(new Date(r1EndTime).getTime() / 1000),
      Math.round(new Date(startDateTime).getTime() / 1000),
      rounds.map(a => a.tokenCount.toString()),
      rounds.map(a => a.tokenRate.toString()),
      lockedTokensAddress,
      pollFactoryAddress,
      membershipAddress,
      daicoTokenAddress,
      config.vault_contract_address,
      foundationDetails.map(a => a.address),
      foundationDetails.map(a => a.amount.toString())
    ];
    deployAction(version, _id, currentDeploymentIndicator, args, "CrowdSale", userLocalPublicAddress, nonce);
  };

  setTreasuryInDaicoToken = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, pollFactoryAddress, daicoTokenAddress } = projectDetails || {};
    const args = pollFactoryAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", daicoTokenAddress, userLocalPublicAddress, nonce);
  };

  setCrowdsaleInDaicoToken = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, daicoTokenAddress } = projectDetails || {};
    const args = crowdSaleAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", daicoTokenAddress, userLocalPublicAddress, nonce);
  };

  setCrowdsaleInLockedTokens = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, lockedTokensAddress } = projectDetails || {};
    const args = crowdSaleAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "LockedTokens", lockedTokensAddress, userLocalPublicAddress, nonce);
  };

  setCrowdSaleInPollFactory = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, pollFactoryAddress } = projectDetails || {};
    const args = crowdSaleAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "PollFactory", pollFactoryAddress, userLocalPublicAddress, nonce);
  };

  createKillPolls = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, pollFactoryAddress } = projectDetails || {};
    contractAction(version, _id, currentDeploymentIndicator, "", "PollFactory", pollFactoryAddress, userLocalPublicAddress, nonce);
  };

  mintFoundationTokens = (nonce = "") => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress } = projectDetails || {};
    contractAction(version, _id, currentDeploymentIndicator, "", "CrowdSale", crowdSaleAddress, userLocalPublicAddress, nonce);
  };

  redirectHome = () => {
    // this.props.history.push("/issuergovernance/details");
    const { history, projectDetails } = this.props || {};
    const { _id } = projectDetails || {};
    history.push({
      pathname: `/issuergovernance/details`,
      search: `?projectid=${_id}`
    });
  };

  onResetClick = () => {
    const { resetDeployment: onResetDeployment, userLocalPublicAddress } = this.props || {};
    onResetDeployment(userLocalPublicAddress);
    this.setState({
      modalOpen: false
    });
  };

  onSpeedUpClick = () => {
    const { projectDetails } = this.props || {};
    const { nonce, currentDeploymentIndicator } = projectDetails || {};
    switch (currentDeploymentIndicator) {
      case 0:
        this.deployMembership(nonce);
        break;
      case 1:
        this.deployDaicoToken(nonce);
        break;
      case 2:
        this.deployLockedTokens(nonce);
        break;
      case 3:
        this.deployPollFactory(nonce);
        break;
      case 4:
        this.deployCrowdSale(nonce);
        break;
      case 5:
        this.setTreasuryInDaicoToken(nonce);
        break;
      case 6:
        this.setCrowdsaleInDaicoToken(nonce);
        break;
      case 7:
        this.setCrowdsaleInLockedTokens(nonce);
        break;
      case 8:
        this.setCrowdSaleInPollFactory(nonce);
        break;
      case 9:
        this.createKillPolls(nonce);
        break;
      case 10:
        this.createKillPolls(nonce);
        break;
      case 11:
        this.mintFoundationTokens(nonce);
        break;
      default:
        break;
    }
  };

  onResetModalOpenClick = () => {
    this.setState({
      modalOpen: true
    });
  };

  getStepContent = () => {
    const { projectDetails, deployContractButtonSpinning, deployContractStartButtonSpinning } = this.props || {};
    const { currentDeploymentIndicator, latestTxHash } = projectDetails || {};
    switch (currentDeploymentIndicator) {
      case 0:
        return (
          <DeployerCard
            label="Let's start deployment and deploy Membership Contract"
            btnLabel="Deploy Membership Contract"
            onClick={() => this.deployMembership("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
          />
        );
      case 1:
        return (
          <DeployerCard
            label="Let's deploy Daico Token Contract"
            btnLabel="Deploy Daico Token"
            onClick={() => this.deployDaicoToken("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
          />
        );
      case 2:
        return (
          <DeployerCard
            label="Let's deploy Locked Tokens Contract"
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            btnLabel="Deploy Locked Tokens"
            onClick={() => this.deployLockedTokens("")}
            speedup={this.onSpeedUpClick}
          />
        );
      case 3:
        return (
          <DeployerCard
            label="Let's deploy Poll Factory Contract"
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            btnLabel="Deploy Poll Factory"
            onClick={() => this.deployPollFactory("")}
            speedup={this.onSpeedUpClick}
          />
        );
      case 4:
        return (
          <DeployerCard
            label="Let's deploy Crowd Sale Contract"
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            btnLabel="Deploy Crowd Sale"
            onClick={() => this.deployCrowdSale("")}
            speedup={this.onSpeedUpClick}
          />
        );
      case 5:
        return (
          <DeployerCard
            label="Let's set treasury address in Daico Token Contract"
            btnLabel="Set Treasury Address"
            onClick={() => this.setTreasuryInDaicoToken("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
          />
        );
      case 6:
        return (
          <DeployerCard
            label="Let's set crowdsale address in Daico Token Contract"
            btnLabel="Set crowdsale address"
            onClick={() => this.setCrowdsaleInDaicoToken("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
          />
        );
      case 7:
        return (
          <DeployerCard
            label="Let's set crowdsale address in Locked Tokens Contract"
            btnLabel="Set crowdsale Address"
            onClick={() => this.setCrowdsaleInLockedTokens("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
          />
        );
      case 8:
        return (
          <DeployerCard
            label="Let's set crowdsale address in Poll factory Contract"
            btnLabel="Set crowdsale Address"
            onClick={() => this.setCrowdSaleInPollFactory("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
          />
        );
      case 9:
        return (
          <DeployerCard
            label="Let's Create Kill Polls"
            btnLabel="Create Kill Polls"
            onClick={() => this.createKillPolls("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
          />
        );
      case 10:
        return (
          <DeployerCard
            label="Let's Create Kill Polls part 2"
            btnLabel="Create Kill Polls part 2"
            onClick={() => this.createKillPolls("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
          />
        );
      case 11:
        return (
          <DeployerCard
            label="Let's Mint foundation tokens"
            btnLabel="Mint foundation tokens"
            onClick={() => this.mintFoundationTokens("")}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
            speedup={this.onSpeedUpClick}
          />
        );
      default:
        return (
          <DeployerCard label="Deployment is done. Click here to be redirected to home page" btnLabel="Redirect Home" onClick={this.redirectHome} />
        );
    }
  };

  getSteps = () => [
    "Deploy Membership",
    "Deploy Daico Token",
    "Deploy Locked Tokens",
    "Deploy Poll Factory",
    "Deploy Crowd Sale",
    "Set Treasury in Daico, Token",
    "Set Crowdsale in Daico Token",
    "Set Crowdsale in Locked Tokens",
    "Set Crowdsale in Poll Factory",
    "Create Kill Polls",
    "Create Kill Polls 2",
    "Mint Foundation Tokens"
  ];

  render() {
    const {
      projectDetails,
      isIssuerChecked,
      isMetamaskNetworkChecked,
      isMetamaskInstallationChecked,
      isUserDefaultAccountChecked,
      isVaultMembershipChecked,
      signinStatusFlag
    } = this.props || {};
    const { modalOpen } = this.state;
    const { currentDeploymentIndicator, _id } = projectDetails || {};
    return (
      <div style={{ marginBottom: "50px" }}>
        {isIssuerChecked && isMetamaskNetworkChecked && isMetamaskInstallationChecked && isUserDefaultAccountChecked && isVaultMembershipChecked ? (
          <div>
            {signinStatusFlag === 5 ? (
              <Grid>
                <Row>
                  <Col lg={10} />
                </Row>
                <Row>
                  <Col>
                    <CustomizedStepper
                      history={this.props.history}
                      getStepContent={this.getStepContent}
                      getSteps={this.getSteps}
                      activeStep={currentDeploymentIndicator}
                      projectid={_id}
                      onClick={this.onResetModalOpenClick}
                    />
                  </Col>
                </Row>
              </Grid>
            ) : (
              this.props.history.push("/")
            )}
          </div>
        ) : (
          <Grid>
            <TableLoader />
          </Grid>
        )}
        {
          <CUIModal open={modalOpen}>
            <CUIModalContent>
              <div className="text--center text--danger">
                <Warning style={{ width: "2em", height: "2em" }} />
              </div>
              <div className="text--center push--top">
                Please do this, only if you have externally interrupted your deployment, and are not able to fix it. The gas spent on your current
                deployment will be lost and you will have to start from step 1. Before using this option, you may check the Electus subreddit for
                solutions or post on the subreddit asking for help.
              </div>
            </CUIModalContent>
            <CUIModalActions>
              <div className="hli">
                <LoadingButton style={{ padding: "0 40px" }} onClick={this.onResetClick} type="danger">
                  Proceed
                </LoadingButton>
              </div>
              <div className="hli">
                <LoadingButton style={{ padding: "0 40px" }} onClick={this.handleClose}>
                  Close
                </LoadingButton>
              </div>
            </CUIModalActions>
          </CUIModal>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    userLocalPublicAddress,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked,
    signinStatusFlag
  } = state.signinManagerData || {};
  const { projectDetails, deployContractButtonSpinning, deployContractStartButtonSpinning, pageReloading } = state.deployerReducer || {};
  return {
    projectDetails,
    userLocalPublicAddress,
    deployContractButtonSpinning,
    deployContractStartButtonSpinning,
    isIssuerChecked,
    isMetamaskNetworkChecked,
    isMetamaskInstallationChecked,
    isUserDefaultAccountChecked,
    isVaultMembershipChecked,
    signinStatusFlag,
    pageReloading
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProjectDetails,
      deployContractAction,
      performContractAction,
      resetDeployment
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Deployer)
);
