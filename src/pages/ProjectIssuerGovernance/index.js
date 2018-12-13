import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { currentRound, clearGovernanceStates } from "../../actions/projectGovernanceActions/index";
import IssuerDetailPreGovernance from "../../containers/IssuerDetailPreGovernance";
import IssuerDetailGovernance from "../../containers/IssuerDetailGovernance";
import GvrncCardLoader from "../../components/Loaders/gvrncCardLoader";
import { Grid } from "../../helpers/react-flexbox-grid";
import { fetchPrice } from "../../actions/priceFetchActions/index";

class ProjectIssuerGovernance extends Component {
  componentWillUnmount() {
    const { clearGovernanceStates: clearingStates } = this.props || {};
    clearingStates();
  }

  componentDidMount() {
    // Do Routing here - use query string
    const currentUrl = new URL(window.location.href);
    const params = qs.parse(currentUrl.search, { ignoreQueryPrefix: true });
    if ("projectid" in params) {
      const { currentRound: currentRoundDetailsFetch, fetchPrice: etherPriceFetch } = this.props || {};
      currentRoundDetailsFetch(params.projectid);
      etherPriceFetch("ETH");
    } else {
      const { history } = this.props || {};
      history.push({
        pathname: `/`
      });
    }
  }

  render() {
    const {
      currentRoundNumber,
      projectDetails,
      treasuryStateNumber,
      history,
      prices,
      isVaultMember,
      userLocalPublicAddress,
      signinStatusFlag,
      isVaultMembershipChecked
    } = this.props || {};
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
      xfrRejectionPercent,
      _id,
      thumbnailUrl,
      killAcceptancePercent,
      network
    } = projectDetails || {};

    if (treasuryStateNumber === "" || currentRoundNumber === "" || !isVaultMembershipChecked) {
      return (
        <Grid style={{ marginBottom: "50px" }}>
          <GvrncCardLoader />
        </Grid>
      );
    }

    if (currentDeploymentIndicator !== 12)
      return (
        <Grid style={{ marginBottom: "50px" }}>
          <div className="text-center">The project has not been deployed yet</div>
        </Grid>
      );
    if (treasuryStateNumber === "2" || treasuryStateNumber === "4") {
      return (
        <Grid style={{ marginBottom: "50px" }}>
          <div className="text-center">The project has ended</div>
        </Grid>
      );
    }
    if (
      treasuryStateNumber === "3" &&
      (currentRoundNumber !== "1" || currentRoundNumber !== "2" || currentRoundNumber !== "3" || currentRoundNumber !== "4")
    ) {
      return (
        <div style={{ marginBottom: "50px" }}>
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
            xfrRejectionPercent={xfrRejectionPercent}
            projectid={_id}
            history={history}
            thumbnailUrl={thumbnailUrl}
            killAcceptancePercent={killAcceptancePercent}
            prices={prices}
            isVaultMember={isVaultMember}
            userLocalPublicAddress={userLocalPublicAddress}
            signinStatusFlag={signinStatusFlag}
            isVaultMembershipChecked={isVaultMembershipChecked}
            network={network}
          />
        </div>
      );
    }

    if (treasuryStateNumber === "1") {
      return (
        <div style={{ marginBottom: "50px" }}>
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
            crowdSaleAddress={crowdSaleAddress}
            pollFactoryAddress={pollFactoryAddress}
            thumbnailUrl={thumbnailUrl}
            prices={prices}
            isVaultMember={isVaultMember}
            userLocalPublicAddress={userLocalPublicAddress}
            signinStatusFlag={signinStatusFlag}
            isVaultMembershipChecked={isVaultMembershipChecked}
            daicoTokenAddress={daicoTokenAddress}
            network={network}
          />
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  const { deployerReducer, projectGovernanceReducer, fetchPriceReducer, signinManagerData } = state || {};
  const { prices } = fetchPriceReducer || {};
  const { projectDetails, ts } = deployerReducer || {};
  const { currentRoundNumber, treasuryStateNumber } = projectGovernanceReducer || {};
  const { isVaultMember, userLocalPublicAddress, signinStatusFlag, isVaultMembershipChecked } = signinManagerData || {};
  return {
    projectDetails,
    currentRoundNumber,
    treasuryStateNumber,
    ts,
    prices,
    isVaultMember,
    userLocalPublicAddress,
    signinStatusFlag,
    isVaultMembershipChecked
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      currentRound,
      clearGovernanceStates,
      fetchPrice
    },
    dispatch
  );

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectIssuerGovernance);

export default withRouter(connector);
