import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProjectDetails, deployContractAction, performContractAction } from "../../actions/deployerActions/index";
import {Grid} from "../../helpers/react-flexbox-grid";
import web3 from "../../helpers/web3";
import CustomizedStepper from "../../components/Common/CustomizedStepper";
import DeployerCard from "../../components/DeployerCard";
class Deployer extends Component {
  componentDidMount() {
    // TODO: Replace projectid from parent container
    this.props.fetchProjectDetails("5bd31829fff9a5eca2cace3e");
  }

  deployMembership = () => {
    const { userLocalPublicAddress } = this.props || {};
    console.log(userLocalPublicAddress);
    const { version, _id, currentDeploymentIndicator, projectName, tokenTag } = this.props.projectDetails || {};
    const args = [web3.utils.fromAscii(projectName), web3.utils.fromAscii(tokenTag)];
    this.props.deployContractAction(version, _id, currentDeploymentIndicator, args, "Protocol", userLocalPublicAddress);
  };

  deployDaicoToken = () => {
    const { userLocalPublicAddress } = this.props || {};
    const { version, _id, currentDeploymentIndicator, projectName, tokenTag, membershipAddress, totalMintableSupply } =
      this.props.projectDetails || {};
    const args = [projectName, tokenTag, membershipAddress, totalMintableSupply];
    this.props.deployContractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", userLocalPublicAddress);
  };

  deployLockedTokens = () => {
    const { userLocalPublicAddress } = this.props || {};
    const { version, _id, currentDeploymentIndicator, daicoTokenAddress } = this.props.projectDetails || {};
    const args = [daicoTokenAddress];
    this.props.deployContractAction(version, _id, currentDeploymentIndicator, args, "LockedTokens", userLocalPublicAddress);
  };

  deployPollFactory = () => {
    const { userLocalPublicAddress } = this.props || {};
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
      new Date(killPollStartDate).getTime() / 1000, // In Unix Time
      vaultAddress,
      capPercent,
      killAcceptancePercent,
      xfrRejectionPercent,
      tapAcceptancePercent,
      lockedTokensAddress,
      tapIncrementFactor
    ];
    this.props.deployContractAction(version, _id, currentDeploymentIndicator, args, "PollFactory", userLocalPublicAddress);
  };

  deployCrowdSale = () => {
    const { userLocalPublicAddress } = this.props || {};
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
    this.props.deployContractAction(version, _id, currentDeploymentIndicator, args, "CrowdSale", userLocalPublicAddress);
  };

  setTreasuryInDaicoToken = () => {
    const { userLocalPublicAddress } = this.props || {};
    const { version, _id, currentDeploymentIndicator, pollFactoryAddress, daicoTokenAddress } = this.props.projectDetails || {};
    const args = pollFactoryAddress;
    this.props.performContractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", daicoTokenAddress, userLocalPublicAddress);
  };

  setCrowdsaleInDaicoToken = () => {
    const { userLocalPublicAddress } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, daicoTokenAddress } = this.props.projectDetails || {};
    const args = crowdSaleAddress;
    this.props.performContractAction(version, _id, currentDeploymentIndicator, args, "DaicoToken", daicoTokenAddress, userLocalPublicAddress);
  };

  setCrowdsaleInLockedTokens = () => {
    const { userLocalPublicAddress } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, lockedTokensAddress } = this.props.projectDetails || {};
    const args = crowdSaleAddress;
    this.props.performContractAction(version, _id, currentDeploymentIndicator, args, "LockedTokens", lockedTokensAddress, userLocalPublicAddress);
  };

  setCrowdSaleInPollFactory = () => {
    const { userLocalPublicAddress } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress, pollFactoryAddress } = this.props.projectDetails || {};
    const args = crowdSaleAddress;
    this.props.performContractAction(version, _id, currentDeploymentIndicator, args, "PollFactory", pollFactoryAddress, userLocalPublicAddress);
  };

  createKillPolls = () => {
    const { userLocalPublicAddress } = this.props || {};
    const { version, _id, currentDeploymentIndicator, pollFactoryAddress } = this.props.projectDetails || {};
    this.props.performContractAction(version, _id, currentDeploymentIndicator, null, "PollFactory", pollFactoryAddress, userLocalPublicAddress);
  };

  mintFoundationTokens = () => {
    const { userLocalPublicAddress } = this.props || {};
    const { version, _id, currentDeploymentIndicator, crowdSaleAddress } = this.props.projectDetails || {};
    this.props.performContractAction(version, _id, currentDeploymentIndicator, null, "CrowdSale", crowdSaleAddress, userLocalPublicAddress);
  };

  redirectHome = () => {
    this.props.history.push("/");
  };

  getStepContent = () => {
    const {projectDetails} = this.props || {};
    const {currentDeploymentIndicator} = projectDetails || {};
    switch (currentDeploymentIndicator) {
      case 0:
          return <DeployerCard
                  label="Let's start deployment and deploy Membership Contract"
                  btnLabel="Deploy Membership Contract" 
                  onClick={this.deployMembership} />;
        case 1:
          return <DeployerCard
                  label="Let's deploy Daico Token Contract"
                  btnLabel="Deploy Daico Token" 
                  onClick={this.deployDaicoToken} />;
        case 2:
          return <DeployerCard
                  label="Let's deploy Locked Tokens Contract"
                  btnLabel="Deploy Locked Tokens" 
                  onClick={this.deployLockedTokens} />;
        case 3:
          return <DeployerCard
                  label="Let's deploy Poll Factory Contract"
                  btnLabel="Deploy Poll Factory" 
                  onClick={this.deployPollFactory} />;
        case 4:
          return <DeployerCard
                  label="Let's deploy Crowd Sale Contract"
                  btnLabel="Deploy Crowd Sale" 
                  onClick={this.deployCrowdSale} />;
        case 5:
          return <DeployerCard
                  label="Let's set treasury address in Daico Token Contract"
                  btnLabel="Set Treasury Address" 
                  onClick={this.setTreasuryInDaicoToken} />;
        case 6:
          return <DeployerCard
                  label="Let's set crowdsale address in Daico Token Contract"
                  btnLabel="Set crowdsale address" 
                  onClick={this.setCrowdsaleInDaicoToken} />;
        case 7:
          return <DeployerCard
                  label="Let's set crowdsale address in Locked Tokens Contract"
                  btnLabel="Set crowdsale Address" 
                  onClick={this.setCrowdsaleInLockedTokens} />;
        case 8:
          return <DeployerCard
                  label="Let's set crowdsale address in Poll factory Contract" 
                  btnLabel="Set crowdsale Address" 
                  onClick={this.setCrowdSaleInPollFactory} />;
        case 9:
          return <DeployerCard
                  label="Let's Create Kill Polls"
                  btnLabel="Create Kill Polls"
                  onClick={this.createKillPolls} />;
        case 10:
          return <DeployerCard
                  label="Let's Create Kill Polls part 2"
                  btnLabel="Create Kill Polls part 2" 
                  onClick={this.createKillPolls} />;
        case 11:
          return <DeployerCard
                  label="Let's Mint foundation tokens"
                  btnLabel="Mint foundation tokens" 
                  onClick={this.mintFoundationTokens} />;
        default:
          return <DeployerCard
                  label="Deployment is done. Click here to be redirected to home page"
                  btnLabel="Redirect Home" 
                  onClick={this.redirectHome} />;
    }
  }

  getSteps = () => {
    return ['Deploy Membership', 'Deploy Daico Token', 'Deploy Locked Tokens', 'Deploy Poll Factory', 'Deploy Crowd Sale', 'Set Treasury in Daico, Token',
            'Set Crowdsale in Daico Token', 'Set Crowdsale in Locked Tokens', 'Set Crowdsale in Poll Factory', 'Create Kill Polls', 'Create Kill Polls 2',
            'Mint Foundation Tokens', 'Route to Main Net'];
  }
  

  render() {
    const {projectDetails} = this.props || {};
    const {currentDeploymentIndicator} = projectDetails || {};
    return(
      <Grid>
        <CustomizedStepper
          getStepContent={this.getStepContent}
          getSteps = {this.getSteps} 
          activeStep = {currentDeploymentIndicator}
        />
      </Grid>
    )
  }
}

const mapStateToProps = state => {
  const { userLocalPublicAddress } = state.signinManagerData || {};
  const { projectDetails } = state.deployerReducer || {};
  return {
    projectDetails,
    userLocalPublicAddress
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
