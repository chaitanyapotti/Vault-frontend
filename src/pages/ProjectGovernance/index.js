import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { currentRound, clearGovernanceStates } from "../../actions/projectGovernanceActions/index";
import ProjectDetailPreStart from "../../containers/ProjectDetailPreStart";
import ProjectDetailCrowdSale from "../../containers/ProjectDetailCrowdSale";
import ProjectDetailGovernance from "../../containers/ProjectDetailGovernance";
import ProjectDetailRefund from "../../containers/ProjectDetailRefund";
import { Grid } from "../../helpers/react-flexbox-grid";
import Loader from "../../components/Loaders/loader";
import GvrncCardLoader from "../../components/Loaders/gvrncCardLoader";
class ProjectGovernance extends Component {
  componentWillUnmount() {
    this.props.clearGovernanceStates();
  }

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
      projectHealth,
      killAcceptancePercent,
      thumbnailUrl
    } = projectDetails || {};
    // currentRoundNumber = "2";

    if (treasuryStateNumber === "0") {
      return (
        <Grid>
          <GvrncCardLoader />
        </Grid>
      );
    }

    if (currentDeploymentIndicator !== 12)
      return (
        <Grid style={{ marginBottom: "50px" }}>
          <div className="text-center txt">The project has not been deployed yet</div>
        </Grid>
      );
    if (treasuryStateNumber === "2" || treasuryStateNumber === "4") {
      return (
        <div style={{ marginBottom: "50px" }}>
          <ProjectDetailRefund
            version={version}
            tokenTag={tokenTag}
            pollFactoryAddress={pollFactoryAddress}
            daicoTokenAddress={daicoTokenAddress}
            treasuryStateNumber={treasuryStateNumber}
          />
        </div>
      );
    }
    if (treasuryStateNumber === "1" && currentRoundNumber === "0") {
      return (
        <div style={{ marginBottom: "50px" }}>
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
            thumbnailUrl={thumbnailUrl}
            currentRoundNumber={currentRoundNumber}
          />
        </div>
      );
    }

    if (treasuryStateNumber === "1" && currentRoundNumber === "1") {
      return (
        <div style={{ marginBottom: "50px" }}>
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
            projectid={_id}
            currentRoundNumber={currentRoundNumber}
            thumbnailUrl={thumbnailUrl}
          />
        </div>
      );
    }

    if (treasuryStateNumber === "3" && (currentRoundNumber === "2" || currentRoundNumber === "3" || currentRoundNumber === "4")) {
      return (
        <div style={{ marginBottom: "50px" }}>
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
            killAcceptancePercent={killAcceptancePercent}
            thumbnailUrl={thumbnailUrl}
          />
        </div>
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
      currentRound,
      clearGovernanceStates
    },
    dispatch
  );

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectGovernance);

export default withRouter(connector);
