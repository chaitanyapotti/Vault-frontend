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

import web3 from "../../helpers/web3";

class Deployer extends Component {
  componentDidMount() {
    this.props.fetchProjectDetails("5bafaed1eb00b152a418f7df");
  }

  deployMembership = () => {
    const args = [web3.utils.fromAscii(this.props.projectDetails.projectName), web3.utils.fromAscii(this.props.projectDetails.tokenTag)];
    this.props.deployContractAction(
      this.props.projectDetails.version,
      this.props.projectDetails._id,
      this.props.projectDetails.currentDeploymentIndicator,
      args,
      "Protocol"
    );
  };

  deployDaicoToken = () => {
    const args = [
      this.props.projectDetails.projectName,
      this.props.projectDetails.tokenTag,
      this.props.projectDetails.membershipAddress,
      this.props.projectDetails.totalMintableSupply
    ];

    this.props.deployContractAction(
      this.props.projectDetails.version,
      this.props.projectDetails._id,
      this.props.projectDetails.currentDeploymentIndicator,
      args,
      "DaicoToken"
    );
  };

  deployLockedTokens = () => {
    const args = [this.props.projectDetails.daicoTokenAddress];
    this.props.deployContractAction(
      this.props.projectDetails.version,
      this.props.projectDetails._id,
      this.props.projectDetails.currentDeploymentIndicator,
      args,
      "LockedTokens"
    );
  };

  deployPollFactory = () => {
    const args = [
      this.props.projectDetails.daicoTokenAddress,
      this.props.projectDetails.teamAddress,
      this.props.projectDetails.initialFundRelease,
      this.props.projectDetails.initialTapAmount,
      new Date(this.props.projectDetails.killPollStartDate).getTime() / 1000, //In Unix Time
      this.props.projectDetails.vaultAddress,
      this.props.projectDetails.capPercent,
      this.props.projectDetails.killAcceptancePercent,
      this.props.projectDetails.xfrRejectionPercent,
      this.props.projectDetails.tapAcceptancePercent,
      this.props.projectDetails.lockedTokensAddress,
      this.props.projectDetails.tapIncrementFactor
    ];
    this.props.deployContractAction(
      this.props.projectDetails.version,
      this.props.projectDetails._id,
      this.props.projectDetails.currentDeploymentIndicator,
      args,
      "PollFactory"
    );
  };

  deployCrowdSale = () => {
    const args = [
      this.props.projectDetails.minimumEtherContribution,
      this.props.projectDetails.maximumEtherContribution,
      new Date(this.props.projectDetails.r1EndTime).getTime() / 1000,
      this.props.projectDetails.rounds.map(a => a.tokenCount),
      this.props.projectDetails.rounds.map(a => a.tokenRate),
      this.props.projectDetails.lockedTokensAddress,
      this.props.projectDetails.pollFactoryAddress,
      this.props.projectDetails.membershipAddress,
      this.props.projectDetails.daicoTokenAddress,
      this.props.projectDetails.vaultAddress,
      this.props.projectDetails.foundationDetails.map(a => a.address),
      this.props.projectDetails.foundationDetails.map(a => a.amount)
    ];
    this.props.deployContractAction(
      this.props.projectDetails.version,
      this.props.projectDetails._id,
      this.props.projectDetails.currentDeploymentIndicator,
      args,
      "CrowdSale"
    );
  };

  setTreasuryInDaicoToken = () => {
    const args = this.props.projectDetails.pollFactoryAddress;
    this.props.performContractAction(
      this.props.projectDetails.version,
      this.props.projectDetails._id,
      this.props.projectDetails.currentDeploymentIndicator,
      args,
      "DaicoToken",
      this.props.projectDetails.daicoTokenAddress
    );
  };

  setCrowdsaleInDaicoToken = () => {
    const args = this.props.projectDetails.crowdSaleAddress;
    this.props.performContractAction(
      this.props.projectDetails.version,
      this.props.projectDetails._id,
      this.props.projectDetails.currentDeploymentIndicator,
      args,
      "DaicoToken",
      this.props.projectDetails.daicoTokenAddress
    );
  };

  setCrowdsaleInLockedTokens = () => {
    const args = this.props.projectDetails.crowdSaleAddress;
    this.props.performContractAction(
      this.props.projectDetails.version,
      this.props.projectDetails._id,
      this.props.projectDetails.currentDeploymentIndicator,
      args,
      "LockedTokens",
      this.props.projectDetails.lockedTokensAddress
    );
  };

  setCrowdSaleInPollFactory = () => {
    const args = this.props.projectDetails.crowdSaleAddress;
    this.props.performContractAction(
      this.props.projectDetails.version,
      this.props.projectDetails._id,
      this.props.projectDetails.currentDeploymentIndicator,
      args,
      "PollFactory",
      this.props.projectDetails.pollFactoryAddress
    );
  };

  createKillPolls = () => {
    this.props.performContractAction(
      this.props.projectDetails.version,
      this.props.projectDetails._id,
      this.props.projectDetails.currentDeploymentIndicator,
      null,
      "PollFactory",
      this.props.projectDetails.pollFactoryAddress
    );
  };

  mintFoundationTokens = () => {
    this.props.performContractAction(
      this.props.projectDetails.version,
      this.props.projectDetails._id,
      this.props.projectDetails.currentDeploymentIndicator,
      null,
      "CrowdSale",
      this.props.projectDetails.crowdSaleAddress
    );
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
          return null;
      }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    projectDetails: state.deployerReducer.projectDetails,
    ts: state.deployerReducer.ts
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
