import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProjectDetails, deployContractAction } from "../../actions/deployerActions/index";
import DeployMembership from "./DeployMembership";
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
    this.props.deployDaicoTokenAction();
  };

  render() {
    if (this.props.projectDetails != null)
      switch (this.props.projectDetails.currentDeploymentIndicator) {
        case 0:
          return <DeployMembership onClick={this.deployMembership} />;
        // case 1:
        //   return <DeployDaicoToken onClick={this.deployDaicoToken} />;
        //   case 2:
        //     return <DeployLockedTokens />;
        //   case 3:
        //     return <DeployPollFactory />;
        //   case 4:
        //     return <DeployCrowdSale />;
        //   case 5:
        //     return <SetTreasuryInDaicoToken />;
        //   case 6:
        //     return <SetCrowdsaleInDaicoToken />;
        //   case 7:
        //     return <SetCrowdsaleInLockedTokens />;
        //   case 8:
        //     return <SetCrowdSaleInPollFactory />;
        //   case 9:
        //     return <CreateKillPolls />;
        //   case 10:
        //     return <CreateKillPolls2 />;
        //   case 11:
        //     return <MintFoundationTokens />;
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
      deployContractAction: deployContractAction
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deployer);
