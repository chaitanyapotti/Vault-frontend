import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { fetchProjectDetails } from "../../actions/deployerActions/index";
import { currentRound } from "../../actions/projectGovernanceActions/index";
import ProjectDetailPreStart from "../../containers/ProjectDetailPreStart";

class ProjectGovernance extends Component {
  componentDidMount() {
    //Do Routing here - use query string
    this.props.fetchProjectDetails("5bafaed1eb00b152a418f7df");
    // this.props.currentRound();
  }

  render() {
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
      foundationDetails
    } = this.props.projectDetails || {};
    if (currentDeploymentIndicator !== 12)
      return (
        <div>
          <p>The project hasn't been deployed yet</p>
        </div>
      );
    return (
      <ProjectDetailPreStart
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
      />
    );
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
