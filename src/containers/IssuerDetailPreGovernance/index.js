import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IPreGovernanceDetails, IssuerPreGovernanceName, TokenChart, TimeLine } from "../../components/Common/ProjectDetails";
import { getEtherCollected, getRoundTokensSold, finalizeR1 } from "../../actions/projectCrowdSaleActions/index";
import { startR1 } from "../../actions/issuerDetailGovernanceActions/index";
import {
  formatFromWei,
  getR1Price,
  getHardCap,
  getSoftCap,
  formatDate,
  r1Finish,
  getR1Goal
} from "../../helpers/common/projectDetailhelperFunctions";
import { Grid } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";
import MasonryLayout from "../../components/Common/MasonaryLayout";

class IssuerDetailPreGovernance extends Component {
  componentDidMount() {
    const {
      version,
      pollFactoryAddress,
      crowdSaleAddress,
      network,
      getEtherCollected: fetchEtherCollected,
      getRoundTokensSold: fetchRoundTokensSold
    } = this.props || {};
    fetchEtherCollected(version, pollFactoryAddress, network);
    fetchRoundTokensSold(version, crowdSaleAddress, 0, network);
  }

  onR1FinalizeClick = () => {
    const { version, crowdSaleAddress, finalizeR1: r1Finalize, userLocalPublicAddress, projectid } = this.props || {};
    r1Finalize(version, crowdSaleAddress, userLocalPublicAddress, projectid);
  };

  onStartR1Click = () => {
    const { version, crowdSaleAddress, startR1: r1Start, userLocalPublicAddress, projectid, currentRoundNumber, network } = this.props || {};
    const roundNumber = currentRoundNumber === "4" ? 2 : currentRoundNumber === "0" ? 0 : parseInt(currentRoundNumber, 10);
    r1Start(version, crowdSaleAddress, userLocalPublicAddress, projectid, roundNumber, network);
  };

  isPermissioned = () => {
    const { signinStatusFlag, ownerAddress, userLocalPublicAddress } = this.props || {};
    return signinStatusFlag === 5 && ownerAddress === userLocalPublicAddress;
  };

  onEditClick = () => {
    const { history } = this.props || {};
    history.push("/registration");
  };

  render() {
    const {
      projectName,
      tokenTag,
      description,
      urls,
      whitepaper,
      maximumEtherContribution,
      capPercent,
      initialTapAmount,
      initialFundRelease,
      tapIncrementFactor,
      rounds,
      foundationDetails,
      startDateTime,
      r1EndTime,
      signinStatusFlag,
      startR1ButtonSpinning,
      r1FinalizeButtonSpinning,
      currentRoundNumber,
      startR1ButtonTransactionHash,
      r1FinalizeButtonTransactionHash,
      thumbnailUrl,
      prices,
      roundInfo,
      totalMintableSupply,
      etherCollected,
      daicoTokenAddress,
      ownerAddress,
      userLocalPublicAddress,
      pollFactoryAddress,
      network
    } = this.props || {};
    return (
      <Grid>
        {currentRoundNumber === "1" ? (
          <div style={{ marginBottom: "20px" }}>
            <TimeLine
              fundsCollected={formatFromWei(etherCollected, 3) || 0}
              roundGoal={getR1Goal(rounds)}
              startDate={new Date(startDateTime)}
              endDate={new Date(r1EndTime)}
            />
          </div>
        ) : null}
        <MasonryLayout>
          <IssuerPreGovernanceName
            projectName={projectName}
            tokenTag={tokenTag}
            price={getR1Price(rounds)}
            roundText="3 Round DAICO"
            description={description}
            urls={urls}
            whitepaper={whitepaper}
            StartRound1Visibility={currentRoundNumber === "0" && new Date() > new Date(startDateTime) && new Date() < new Date(r1EndTime)}
            startR1ButtonSpinning={startR1ButtonSpinning}
            signinStatusFlag={signinStatusFlag}
            r1Finish={r1Finish(r1EndTime, roundInfo)}
            onR1FinalizeClick={this.onR1FinalizeClick}
            r1FinalizeButtonSpinning={r1FinalizeButtonSpinning}
            onStartR1Click={this.onStartR1Click}
            isPermissioned={this.isPermissioned()}
            onEditClick={this.onEditClick}
            startR1ButtonTransactionHash={startR1ButtonTransactionHash}
            r1FinalizeButtonTransactionHash={r1FinalizeButtonTransactionHash}
            thumbnailUrl={thumbnailUrl}
            daicoTokenAddress={daicoTokenAddress}
            ownerAddress={ownerAddress}
            userLocalPublicAddress={userLocalPublicAddress}
            network={network}
          />
          <IPreGovernanceDetails
            startDateTime={formatDate(startDateTime)}
            individualCap={formatFromWei(maximumEtherContribution, 3)}
            voteSaturationLimit={capPercent / 100}
            killFrequency="Quarterly"
            initialTapAmount={formatFromWei(initialTapAmount * 86400 * 30, 3)}
            initialFundRelease={formatFromWei(initialFundRelease, 3)}
            tapIncrementUnit={tapIncrementFactor / 100}
            hardCapCapitalisation={getSoftCap(rounds, prices)}
            dilutedCapitalisation={getHardCap(totalMintableSupply, prices, rounds)}
            pollFactoryAddress={pollFactoryAddress}
            network={network}
          />
          <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
            <TokenChart
              rounds={rounds}
              foundationDetails={foundationDetails}
              prices={prices}
              currentRoundNumber={currentRoundNumber}
              roundInfo={roundInfo}
            />
          </CUICard>
        </MasonryLayout>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEtherCollected,
      getRoundTokensSold,
      finalizeR1,
      startR1
    },
    dispatch
  );

const mapStateToProps = state => {
  const { projectCrowdSaleReducer, issuerDetailGovernanceReducer, deployerReducer, signinManagerData, fetchPriceReducer, projectGovernanceReducer } =
    state || {};
  const { projectDetails, ts } = deployerReducer || {};
  const { _id: projectid } = projectDetails;
  const { startR1ButtonTransactionHash } = issuerDetailGovernanceReducer;
  const { etherCollected, roundInfo, r1FinalizeButtonSpinning, startR1ButtonSpinning, r1FinalizeButtonTransactionHash } =
    projectCrowdSaleReducer || {};
  const { isVaultMember, userLocalPublicAddress, signinStatusFlag, isVaultMembershipChecked } = signinManagerData || {};
  const { currentRoundNumber, treasuryStateNumber } = projectGovernanceReducer || {};
  const { prices } = fetchPriceReducer || {};
  return {
    ...projectDetails,
    projectid,
    currentRoundNumber,
    treasuryStateNumber,
    ts,
    prices,
    isVaultMember,
    userLocalPublicAddress,
    signinStatusFlag,
    isVaultMembershipChecked,
    etherCollected,
    roundInfo,
    r1FinalizeButtonSpinning,
    startR1ButtonSpinning,
    startR1ButtonTransactionHash,
    r1FinalizeButtonTransactionHash
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuerDetailPreGovernance);
