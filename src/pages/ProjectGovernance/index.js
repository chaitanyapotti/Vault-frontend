import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes, { object } from "prop-types";
import qs from "qs";
// import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { currentRound } from "../../actions/projectGovernanceActions/index";
import ProjectDetailPreStart from "../../containers/ProjectDetailPreStart";
import ProjectDetailCrowdSale from "../../containers/ProjectDetailCrowdSale";
import ProjectDetailGovernance from "../../containers/ProjectDetailGovernance";
import ProjectDetailSaleEnd from "../../containers/ProjectDetailSaleEnd";
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
      this.props.history.push({
        pathname: `/`
      });
    }
  }

  render() {
    const { currentRoundNumber, projectDetails, treasuryStateNumber } = this.props || {};
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
      etherPrice
    } = projectDetails || {};
    // currentRoundNumber = "2";

    if (currentDeploymentIndicator !== 12)
      return (
        <div>
          <p>The project hasn't been deployed yet</p>
        </div>
      );

    if (treasuryStateNumber === "3") {
      return (
        <ProjectDetailRefund
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
          etherPrice={etherPrice}
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
            etherPrice={etherPrice}
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
            etherPrice={etherPrice}
          />
        );
      case "2":
      case "3":
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
            etherPrice={etherPrice}
          />
        );
      case "4":
        return (
          <ProjectDetailSaleEnd
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
            etherPrice={etherPrice}
          />
        );
      case "5":
        return (
          <ProjectDetailRefund
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
            etherPrice={etherPrice}
          />
        );
      default:
        return null;
    }
  }
}

const mapStateToProps = state => {
  const { deployerReducer, projectGovernanceReducer, fetchPriceReducer } = state || {};
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
