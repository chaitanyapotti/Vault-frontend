import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
    var currentUrl = new URL(window.location.href)
    var params = qs.parse( currentUrl.search, { ignoreQueryPrefix: true }); 
    console.log("parsed params: ", params)
    // this.props.currentRound()
    if ("projectid" in params){
      this.props.currentRound(params["projectid"]);
    }else{
      this.props.history.push({
        pathname: `/`
      });
    }
    
    // const { version, crowdSaleAddress } = this.props.projectDetails || {};
    // console.log(version, crowdSaleAddress);
    // this.props.currentRound(version, crowdSaleAddress);
  }

  render() {
    let { currentRoundNumber, projectDetails, treasuryStateNumber } = this.props || {};
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
    } =
      projectDetails || {};
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

const connector = connect(mapStateToProps, mapDispatchToProps)(ProjectGovernance);

export default withRouter(connector);

// TODO: Do the Proptypes validation to all childrens
