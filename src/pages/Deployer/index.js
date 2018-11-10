import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from "qs";
import { fetchProjectDetails, deployContractAction, performContractAction } from "../../actions/deployerActions/index";
import { Grid } from "../../helpers/react-flexbox-grid";
import web3 from "../../helpers/web3";
import CustomizedStepper from "../../components/Common/CustomizedStepper";
import DeployerCard from "../../components/DeployerCard";
import config from "../../config";

class Deployer extends Component {
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
    const { projectDetails, userLocalPublicAddress: currentLocalAddress, history } = this.props || {};
    const { ownerAddress } = projectDetails || {};
    const { userLocalPublicAddress: prevLocalAddress } = prevProps || {};
    if (prevLocalAddress !== currentLocalAddress) {
      if (ownerAddress !== currentLocalAddress) {
        history.push("/");
      }
    }
  }

  deployMembership = () => {
    const { userLocalPublicAddress, projectDetails, deployContractAction: deployAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, projectName, tokenTag } = projectDetails || {};
    const args = [web3.utils.fromAscii(projectName), web3.utils.fromAscii(tokenTag), config.vault_contract_address];
    deployAction(version, _id, currentDeploymentIndicator, args, "Protocol", userLocalPublicAddress);
  };

  deployDaicoToken = () => {
    const { userLocalPublicAddress, deployContractAction: deployAction, projectDetails } = this.props || {};
    const { version, _id, currentDeploymentIndicator, projectName, tokenTag, membershipAddress, totalMintableSupply } = projectDetails || {};
    const args = [projectName, tokenTag, membershipAddress, totalMintableSupply];
    deployAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", userLocalPublicAddress);
  };

  deployLockedTokens = () => {
    const { userLocalPublicAddress, deployContractAction: deployAction, projectDetails } = this.props || {};
    const { version, _id, currentDeploymentIndicator, daicoTokenAddress } = projectDetails || {};
    const args = [daicoTokenAddress];
    deployAction(version, _id, currentDeploymentIndicator, args, "LockedTokens", userLocalPublicAddress);
  };

  deployPollFactory = () => {
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
      initialFundRelease.toString(),
      initialTapAmount,
      new Date(killPollStartDate).getTime() / 1000, // In Unix Time
      config.vault_contract_address,
      capPercent,
      killAcceptancePercent,
      xfrRejectionPercent,
      tapAcceptancePercent,
      lockedTokensAddress,
      tapIncrementFactor
    ];
    deployAction(version, _id, currentDeploymentIndicator, args, "PollFactory", userLocalPublicAddress);
  };

  deployCrowdSale = () => {
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
    deployAction(version, _id, currentDeploymentIndicator, args, "CrowdSale", userLocalPublicAddress);
  };

  setTreasuryInDaicoToken = () => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, pollFactoryAddress, daicoTokenAddress } = projectDetails || {};
    const args = pollFactoryAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", daicoTokenAddress, userLocalPublicAddress);
  };

  setCrowdsaleInDaicoToken = () => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, daicoTokenAddress } = projectDetails || {};
    const args = crowdSaleAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", daicoTokenAddress, userLocalPublicAddress);
  };

  setCrowdsaleInLockedTokens = () => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, lockedTokensAddress } = projectDetails || {};
    const args = crowdSaleAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "LockedTokens", lockedTokensAddress, userLocalPublicAddress);
  };

  setCrowdSaleInPollFactory = () => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, pollFactoryAddress } = projectDetails || {};
    const args = crowdSaleAddress;
    contractAction(version, _id, currentDeploymentIndicator, args, "PollFactory", pollFactoryAddress, userLocalPublicAddress);
  };

  createKillPolls = () => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, pollFactoryAddress } = projectDetails || {};
    contractAction(version, _id, currentDeploymentIndicator, null, "PollFactory", pollFactoryAddress, userLocalPublicAddress);
  };

  mintFoundationTokens = () => {
    const { userLocalPublicAddress, projectDetails, performContractAction: contractAction } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress } = projectDetails || {};
    contractAction(version, _id, currentDeploymentIndicator, null, "CrowdSale", crowdSaleAddress, userLocalPublicAddress);
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

  getStepContent = () => {
    const { projectDetails, deployContractButtonSpinning, deployContractStartButtonSpinning } = this.props || {};
    const { currentDeploymentIndicator, latestTxHash } = projectDetails || {};
    switch (currentDeploymentIndicator) {
      case 0:
        return (
          <DeployerCard
            label="Let's start deployment and deploy Membership Contract"
            btnLabel="Deploy Membership Contract"
            onClick={this.deployMembership}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
          />
        );
      case 1:
        return (
          <DeployerCard
            label="Let's deploy Daico Token Contract"
            btnLabel="Deploy Daico Token"
            onClick={this.deployDaicoToken}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
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
            onClick={this.deployLockedTokens}
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
            onClick={this.deployPollFactory}
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
            onClick={this.deployCrowdSale}
          />
        );
      case 5:
        return (
          <DeployerCard
            label="Let's set treasury address in Daico Token Contract"
            btnLabel="Set Treasury Address"
            onClick={this.setTreasuryInDaicoToken}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
          />
        );
      case 6:
        return (
          <DeployerCard
            label="Let's set crowdsale address in Daico Token Contract"
            btnLabel="Set crowdsale address"
            onClick={this.setCrowdsaleInDaicoToken}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
          />
        );
      case 7:
        return (
          <DeployerCard
            label="Let's set crowdsale address in Locked Tokens Contract"
            btnLabel="Set crowdsale Address"
            onClick={this.setCrowdsaleInLockedTokens}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
          />
        );
      case 8:
        return (
          <DeployerCard
            label="Let's set crowdsale address in Poll factory Contract"
            btnLabel="Set crowdsale Address"
            onClick={this.setCrowdSaleInPollFactory}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
          />
        );
      case 9:
        return (
          <DeployerCard
            label="Let's Create Kill Polls"
            btnLabel="Create Kill Polls"
            onClick={this.createKillPolls}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
          />
        );
      case 10:
        return (
          <DeployerCard
            label="Let's Create Kill Polls part 2"
            btnLabel="Create Kill Polls part 2"
            onClick={this.createKillPolls}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
          />
        );
      case 11:
        return (
          <DeployerCard
            label="Let's Mint foundation tokens"
            btnLabel="Mint foundation tokens"
            onClick={this.mintFoundationTokens}
            deployContractButtonSpinning={deployContractButtonSpinning}
            deployContractStartButtonSpinning={deployContractStartButtonSpinning}
            latestTxHash={latestTxHash}
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
    const { projectDetails } = this.props || {};
    const { currentDeploymentIndicator, _id } = projectDetails || {};
    return (
      <Grid>
        <CustomizedStepper
          history={this.props.history}
          getStepContent={this.getStepContent}
          getSteps={this.getSteps}
          activeStep={currentDeploymentIndicator}
          projectid={_id}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { userLocalPublicAddress } = state.signinManagerData || {};
  const { projectDetails, deployContractButtonSpinning, deployContractStartButtonSpinning } = state.deployerReducer || {};
  return {
    projectDetails,
    userLocalPublicAddress,
    deployContractButtonSpinning,
    deployContractStartButtonSpinning
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProjectDetails,
      deployContractAction,
      performContractAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deployer);
