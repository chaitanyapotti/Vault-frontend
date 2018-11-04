import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { currentRound } from "../../actions/projectGovernanceActions/index";
import ProjectDetailPreStart from "../../containers/ProjectDetailPreStart";
import ProjectDetailCrowdSale from "../../containers/ProjectDetailCrowdSale";
import ProjectDetailGovernance from "../../containers/ProjectDetailGovernance";
import ProjectDetailRefund from "../../containers/ProjectDetailRefund";

class ProjectGovernance extends Component {
  componentDidMount() {
    // Do Routing here - use query string
    const currentUrl = new URL(window.location.href);
    const params = qs.parse(currentUrl.search, { ignoreQueryPrefix: true });
    if ("projectid" in params) {
      const { currentRound: currentRoundDetailsFetch } = this.props || {};
      currentRoundDetailsFetch(params.projectid);
    } else {
      const { history } = this.props || {};
      history.push({
        pathname: `/`
      });
    }
  }

  render() {
    const { currentRoundNumber, projectDetails, treasuryStateNumber, history } = this.props || {};
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
      daicoTokenAddress,
      xfrDetails,
      _id,
      xfrRejectionPercent,
      projectHealth
    } = projectDetails || {};
    // currentRoundNumber = "2";

    if (currentDeploymentIndicator !== 12)
      return (
        <div>
          <p>The project has not been deployed yet</p>
        </div>
      );
    if (treasuryStateNumber === "2" || treasuryStateNumber === "4") {
      return (
        <ProjectDetailRefund
          version={version}
          tokenTag={tokenTag}
          pollFactoryAddress={pollFactoryAddress}
          daicoTokenAddress={daicoTokenAddress}
          treasuryStateNumber={treasuryStateNumber}
        />
      );
    }

    switch (currentRoundNumber) {
      case "0":
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
            initialFundRelease={initialFundRelease}
          />
        );
      case "1":
        return (
          <ProjectDetailCrowdSale
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
            daicoTokenAddress={daicoTokenAddress}
          />
        );
      case "2":
      case "3":
      case "4":
        return (
          <ProjectDetailGovernance
          projectHealth={projectHealth}
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
            xfrDetails={xfrDetails}
            projectid={_id}
            xfrRejectionPercent={xfrRejectionPercent}
            history={history}
          />
        );
      default:
        return null;
    }
  }
}

const mapStateToProps = state => {
  const { deployerReducer, projectGovernanceReducer } = state || {};
  const { projectDetails, ts } = deployerReducer || {};
  const { currentRoundNumber, treasuryStateNumber } = projectGovernanceReducer || {};

  return {
    projectDetails,
    currentRoundNumber,
    treasuryStateNumber,
    ts
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      currentRound
    },
    dispatch
  );

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectGovernance);

export default withRouter(connector);
