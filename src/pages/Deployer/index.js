import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProjectDetails, deployContractAction, performContractAction } from "../../actions/deployerActions/index";
import DeployMembership from "./DeployMembership";
import DeployDaicoToken from "./DeployDaicoToken";
import DeployLockedTokens from "./DeployLockedTokens";
import DeployPollFactory from "./DeployPollFactory";
import DeployCrowdSale from "./DeployCrowdSale";
import SetTreasuryInDaicoToken from "./SetTreasuryInDaicoToken";
import SetCrowdsaleInDaicoToken from "./SetCrowdsaleInDaicoToken";
import CreateKillPolls from "./CreateKillPolls";
import CreateKillPolls2 from "./CreateKillPolls2";
import MintFoundationTokens from "./MintFoundationTokens";
import SetCrowdsaleInLockedTokens from "./SetCrowdsaleInLockedTokens";
import SetCrowdSaleInPollFactory from "./SetCrowdSaleInPollFactory";
import RouteToMain from "./RouteToMain";

import web3 from "../../helpers/web3";

class Deployer extends Component {
  componentDidMount() {
    //TODO: Replace projectid from parent container
    this.props.fetchProjectDetails("5bafaed1eb00b152a418f7df");
  }

  deployMembership = () => {
    const { version, _id, currentDeploymentIndicator, projectName, tokenTag } = this.props.projectDetails || {};
    const args = [web3.utils.fromAscii(projectName), web3.utils.fromAscii(tokenTag)];
    this.props.deployContractAction(version, _id, currentDeploymentIndicator, args, "Protocol");
  };

  deployDaicoToken = () => {
    const { version, _id, currentDeploymentIndicator, projectName, tokenTag, membershipAddress, totalMintableSupply } =
      this.props.projectDetails || {};
    const args = [projectName, tokenTag, membershipAddress, totalMintableSupply];
    this.props.deployContractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken");
  };

  deployLockedTokens = () => {
    const { version, _id, currentDeploymentIndicator, daicoTokenAddress } = this.props.projectDetails || {};
    const args = [daicoTokenAddress];
    this.props.deployContractAction(version, _id, currentDeploymentIndicator, args, "LockedTokens");
  };

  deployPollFactory = () => {
    const {
      version,
      _id,
      currentDeploymentIndicator,
      daicoTokenAddress,
      teamAddress,
      initialFundRelease,
      initialTapAmount,
      killPollStartDate,
      vaultAddress,
      capPercent,
      killAcceptancePercent,
      xfrRejectionPercent,
      tapAcceptancePercent,
      lockedTokensAddress,
      tapIncrementFactor
    } = this.props.projectDetails || {};
    const args = [
      daicoTokenAddress,
      teamAddress,
      initialFundRelease,
      initialTapAmount,
      new Date(killPollStartDate).getTime() / 1000, //In Unix Time
      vaultAddress,
      capPercent,
      killAcceptancePercent,
      xfrRejectionPercent,
      tapAcceptancePercent,
      lockedTokensAddress,
      tapIncrementFactor
    ];
    this.props.deployContractAction(version, _id, currentDeploymentIndicator, args, "PollFactory");
  };

  deployCrowdSale = () => {
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
      vaultAddress,
      foundationDetails
    } = this.props.projectDetails || {};
    const args = [
      minimumEtherContribution,
      maximumEtherContribution,
      new Date(r1EndTime).getTime() / 1000,
      rounds.map(a => a.tokenCount),
      rounds.map(a => a.tokenRate),
      lockedTokensAddress,
      pollFactoryAddress,
      membershipAddress,
      daicoTokenAddress,
      vaultAddress,
      foundationDetails.map(a => a.address),
      foundationDetails.map(a => a.amount)
    ];
    this.props.deployContractAction(version, _id, currentDeploymentIndicator, args, "CrowdSale");
  };

  setTreasuryInDaicoToken = () => {
    const { version, _id, currentDeploymentIndicator, pollFactoryAddress, daicoTokenAddress } = this.props.projectDetails || {};
    const args = pollFactoryAddress;
    this.props.performContractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", daicoTokenAddress);
  };

  setCrowdsaleInDaicoToken = () => {
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, daicoTokenAddress } = this.props.projectDetails || {};
    const args = crowdSaleAddress;
    this.props.performContractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", daicoTokenAddress);
  };

  setCrowdsaleInLockedTokens = () => {
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, lockedTokensAddress } = this.props.projectDetails || {};
    const args = crowdSaleAddress;
    this.props.performContractAction(version, _id, currentDeploymentIndicator, args, "LockedTokens", lockedTokensAddress);
  };

  setCrowdSaleInPollFactory = () => {
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, pollFactoryAddress } = this.props.projectDetails || {};
    const args = crowdSaleAddress;
    this.props.performContractAction(version, _id, currentDeploymentIndicator, args, "PollFactory", pollFactoryAddress);
  };

  createKillPolls = () => {
    const { version, _id, currentDeploymentIndicator, pollFactoryAddress } = this.props.projectDetails || {};
    this.props.performContractAction(version, _id, currentDeploymentIndicator, null, "PollFactory", pollFactoryAddress);
  };

  mintFoundationTokens = () => {
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress } = this.props.projectDetails || {};
    this.props.performContractAction(version, _id, currentDeploymentIndicator, null, "CrowdSale", crowdSaleAddress);
  };

  redirectHome = () => {
    this.props.history.push("/");
  };

  render() {
    if (this.props.projectDetails != null)
      switch (this.props.projectDetails.currentDeploymentIndicator) {
        case 0:
          return <DeployMembership onClick={this.deployMembership} />;
        case 1:
          return <DeployDaicoToken onClick={this.deployDaicoToken} />;
        case 2:
          return <DeployLockedTokens onClick={this.deployLockedTokens} />;
        case 3:
          return <DeployPollFactory onClick={this.deployPollFactory} />;
        case 4:
          return <DeployCrowdSale onClick={this.deployCrowdSale} />;
        case 5:
          return <SetTreasuryInDaicoToken onClick={this.setTreasuryInDaicoToken} />;
        case 6:
          return <SetCrowdsaleInDaicoToken onClick={this.setCrowdsaleInDaicoToken} />;
        case 7:
          return <SetCrowdsaleInLockedTokens onClick={this.setCrowdsaleInLockedTokens} />;
        case 8:
          return <SetCrowdSaleInPollFactory onClick={this.setCrowdSaleInPollFactory} />;
        case 9:
          return <CreateKillPolls onClick={this.createKillPolls} />;
        case 10:
          return <CreateKillPolls2 onClick={this.createKillPolls} />;
        case 11:
          return <MintFoundationTokens onClick={this.mintFoundationTokens} />;
        default:
          return <RouteToMain onClick={this.redirectHome} />;
      }
    return null;
  }
}

const mapStateToProps = state => {
  const { projectDetails, ts } = state.deployerReducer || {};
  return {
    projectDetails: projectDetails,
    ts: ts
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchProjectDetails: fetchProjectDetails,
      deployContractAction: deployContractAction,
      performContractAction: performContractAction
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deployer);
