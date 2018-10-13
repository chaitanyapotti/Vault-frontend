import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { currentRound } from "../../actions/projectGovernanceActions/index";
import ProjectDetailPreStart from "../../containers/ProjectDetailPreStart";
import ProjectDetailCrowdSale from "../../containers/ProjectDetailCrowdSale";
import ProjectDetailGovernance from "../../containers/ProjectDetailGovernance";

class ProjectGovernance extends Component {
  componentDidMount() {
    //Do Routing here - use query string
    this.props.currentRound("5bafaed1eb00b152a418f7df");
    // const { version, crowdSaleAddress } = this.props.projectDetails || {};
    // console.log(version, crowdSaleAddress);
    // this.props.currentRound(version, crowdSaleAddress);
  }

  render() {
    const { currentRoundNumber, projectDetails } = this.props || {};
    const {
      currentDeploymentIndicator,
      projectName,
      tokenTag,
      description,
      urls,
      whitepaper,
      startDateTime,
      maximumEtherContribution,
      capPercent,
      initialTapAmount,
      tapIncrementFactor,
      isCurrentMember,
      version,
      membershipAddress,
      rounds,
      totalMintableSupply,
      foundationDetails,
      r1EndTime,
      pollFactoryAddress,
      initialFundRelease,
      crowdSaleAddress,
      daicoTokenAddress
    } = projectDetails || {};
    if (currentDeploymentIndicator !== 12)
      return (
        <div>
          <p>The project hasn't been deployed yet</p>
        </div>
      );
    // console.log(currentRoundNumber);
    // if (currentRoundNumber === "0")
    //   return (
    //     <ProjectDetailPreStart
    //       version={version}
    //       membershipAddress={membershipAddress}
    //       projectName={projectName}
    //       tokenTag={tokenTag}
    //       description={description}
    //       urls={urls}
    //       whitepaper={whitepaper}
    //       startDateTime={startDateTime}
    //       maximumEtherContribution={maximumEtherContribution}
    //       capPercent={capPercent}
    //       initialTapAmount={initialTapAmount}
    //       tapIncrementFactor={tapIncrementFactor}
    //       isCurrentMember={isCurrentMember}
    //       rounds={rounds}
    //       totalMintableSupply={totalMintableSupply}
    //       foundationDetails={foundationDetails}
    //     />
    //   );
    // if (currentRoundNumber === "1") {
    //   return (
    //     <ProjectDetailCrowdSale
    //       version={version}
    //       membershipAddress={membershipAddress}
    //       projectName={projectName}
    //       tokenTag={tokenTag}
    //       description={description}
    //       urls={urls}
    //       whitepaper={whitepaper}
    //       startDateTime={startDateTime}
    //       maximumEtherContribution={maximumEtherContribution}
    //       capPercent={capPercent}
    //       initialTapAmount={initialTapAmount}
    //       tapIncrementFactor={tapIncrementFactor}
    //       isCurrentMember={isCurrentMember}
    //       rounds={rounds}
    //       totalMintableSupply={totalMintableSupply}
    //       foundationDetails={foundationDetails}
    //       r1EndTime={r1EndTime}
    //       pollFactoryAddress={pollFactoryAddress}
    //       initialFundRelease={initialFundRelease}
    //       crowdSaleAddress={crowdSaleAddress}
    //     />
    //   );
    if (currentRoundNumber === "0") {
      return (
        <ProjectDetailGovernance
          version={version}
          membershipAddress={membershipAddress}
          projectName={projectName}
          tokenTag={tokenTag}
          description={description}
          urls={urls}
          whitepaper={whitepaper}
          startDateTime={startDateTime}
          maximumEtherContribution={maximumEtherContribution}
          capPercent={capPercent}
          initialTapAmount={initialTapAmount}
          tapIncrementFactor={tapIncrementFactor}
          isCurrentMember={isCurrentMember}
          rounds={rounds}
          totalMintableSupply={totalMintableSupply}
          foundationDetails={foundationDetails}
          r1EndTime={r1EndTime}
          pollFactoryAddress={pollFactoryAddress}
          initialFundRelease={initialFundRelease}
          crowdSaleAddress={crowdSaleAddress}
          currentRoundNumber={currentRoundNumber}
          daicoTokenAddress={daicoTokenAddress}
        />
      );
    } else return null;
  }
}

const mapStateToProps = state => {
  const { projectDetails, ts } = state.deployerReducer || {};
  const { currentRoundNumber } = state.projectGovernanceReducer || {};
  return {
    projectDetails: projectDetails,
    currentRoundNumber: currentRoundNumber,
    ts: ts
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      currentRound: currentRound
    },
    dispatch
  );
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectGovernance);

export default withRouter(connector);
