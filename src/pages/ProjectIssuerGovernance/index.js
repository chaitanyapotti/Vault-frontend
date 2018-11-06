import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { currentRound } from "../../actions/projectGovernanceActions/index";
import IssuerDetailPreGovernance from "../../containers/IssuerDetailPreGovernance";
import IssuerDetailGovernance from "../../containers/IssuerDetailGovernance";

class ProjectIssuerGovernance extends Component {
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
      ownerAddress,
      tapAcceptancePercent,
      _id
    } = projectDetails || {};
    // currentRoundNumber = "2";
    // Redirect to form if cdi !== 12
    if (currentDeploymentIndicator !== 12)
      return (
        <div>
          <p>The project has not been deployed yet</p>
        </div>
      );
    if (treasuryStateNumber === "2" || treasuryStateNumber === "4") {
      return <div>The project has ended</div>;
    }
    if (treasuryStateNumber === "3" && currentRoundNumber !== "0") {
      return (
        <IssuerDetailGovernance
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
          ownerAddress={ownerAddress}
          tapAcceptancePercent={tapAcceptancePercent}
          projectid={_id}
          history={history}
        />
      );
    }

    if (treasuryStateNumber === "1") {
      return (
        <IssuerDetailPreGovernance
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
          r1EndTime={r1EndTime}
          totalMintableSupply={totalMintableSupply}
          foundationDetails={foundationDetails}
          initialFundRelease={initialFundRelease}
          currentRoundNumber={currentRoundNumber}
          treasuryStateNumber={treasuryStateNumber}
          projectid={_id}
          ownerAddress={ownerAddress}
          history={history}
        />
      );
    }
    return null;
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
)(ProjectIssuerGovernance);

export default withRouter(connector);
