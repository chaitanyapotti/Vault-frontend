import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PDetailCrowdSale, ProjectCrowdSaleName, TokenChart, TimeLine } from "../../components/Common/ProjectDetails";
import {
  getEtherCollected,
  getRoundTokensSold,
  buyTokens,
  getTokenBalance,
  finalizeR1,
  buyAmountChangedAction,
  getUserTokens
} from "../../actions/projectCrowdSaleActions/index";
import { onWhiteListClick, checkWhiteList } from "../../actions/projectPreStartActions/index";
import {
  formatFromWei,
  getR1Price,
  getR1Goal,
  getHardCap,
  getSoftCap,
  formatCurrencyNumber,
  getR1Rate,
  roundTokensSold,
  r1TokenCount,
  getRoundText,
  r1Finish,
  getButtonVisibility,
  getIndividualCap
} from "../../helpers/common/projectDetailhelperFunctions";
import { Grid } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";
import BuyModal from "../../components/Common/BuyModal";
import web3 from "../../helpers/web3";
import MasonryLayout from "../../components/Common/MasonaryLayout";

class ProjectDetailCrowdSale extends Component {
  state = {
    buyModalOpen: false
  };

  handleBuyClose = () => {
    const { buyAmountChangedAction: buyAmountChanged, buyAmount } = this.props || {};
    if (buyAmount !== "") buyAmountChanged("");
    this.setState({ buyModalOpen: false });
  };

  componentDidMount() {
    const {
      version,
      pollFactoryAddress,
      network,
      crowdSaleAddress,
      getEtherCollected: fetchEtherCollected,
      getRoundTokensSold: fetchRoundTokensSold,
      signinStatusFlag,
      membershipAddress,
      userLocalPublicAddress,
      checkWhiteList: checkWhiteListStatus,
      getTokenBalance: tokenBalance,
      daicoTokenAddress,
      getUserTokens: fetchUserTokens
    } = this.props || {};
    fetchEtherCollected(version, pollFactoryAddress, network);
    fetchRoundTokensSold(version, crowdSaleAddress, 0, network);
    if (signinStatusFlag > 2) {
      fetchUserTokens(crowdSaleAddress, version, 0, userLocalPublicAddress, network);
      checkWhiteListStatus(version, membershipAddress, userLocalPublicAddress, network);
      tokenBalance(version, daicoTokenAddress, userLocalPublicAddress, network);
    }
  }

  componentDidUpdate(prevProps) {
    const { userLocalPublicAddress: prevAddress, signinStatusFlag: prevFlag } = prevProps || "";
    const {
      userLocalPublicAddress: localAddress,
      getTokenBalance: tokenBalance,
      checkWhiteList: checkWhiteListStatus,
      version,
      network,
      membershipAddress,
      signinStatusFlag,
      daicoTokenAddress,
      crowdSaleAddress,
      getUserTokens: fetchUserTokens
    } = this.props || {};
    if (prevAddress !== localAddress || (prevFlag !== signinStatusFlag && signinStatusFlag > 2)) {
      tokenBalance(version, daicoTokenAddress, localAddress, network);
      checkWhiteListStatus(version, membershipAddress, localAddress, network);
      fetchUserTokens(crowdSaleAddress, version, 0, localAddress, network);
    }
  }

  onWhiteListClickInternal = () => {
    const { version, membershipAddress, onWhiteListClick: whiteListClick, userLocalPublicAddress, isVaultMember, network } = this.props || {};
    if (isVaultMember) {
      whiteListClick(version, "Protocol", membershipAddress, userLocalPublicAddress, network);
    }
  };

  buyTokensOnClick = () => {
    const { version, crowdSaleAddress, buyTokens: buyToken, userLocalPublicAddress, daicoTokenAddress, pollFactoryAddress, buyAmount, network } =
      this.props || {};
    // // TODO: need to add how many tokens to buy
    buyToken(version, crowdSaleAddress, userLocalPublicAddress, buyAmount, 0, daicoTokenAddress, pollFactoryAddress, network);
  };

  buyTokens = () => {
    this.setState({ buyModalOpen: true });
  };

  onBuyAmountChange = e => {
    const { buyAmountChangedAction: buyAmountChanged, buyAmount } = this.props || {};
    if (buyAmount !== e.target.value) buyAmountChanged(e.target.value);
  };

  canBuy = () => {
    const { r1EndTime, roundInfo } = this.props || {};
    const { tokenCount, totalTokensSold } = roundInfo || "";
    return !(
      new Date(r1EndTime) < new Date() ||
      (totalTokensSold && tokenCount && web3.utils.toBN(totalTokensSold).gte(web3.utils.toBN(tokenCount)))
    );
  };

  onR1FinalizeClick = () => {
    const { version, crowdSaleAddress, finalizeR1: r1Finalize, userLocalPublicAddress, projectid, network } = this.props || {};
    r1Finalize(version, crowdSaleAddress, userLocalPublicAddress, projectid, network);
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
      isCurrentMember,
      rounds,
      foundationDetails,
      startDateTime,
      r1EndTime,
      etherCollected,
      buttonSpinning,
      signinStatusFlag,
      buyButtonSpinning,
      tokenBalance,
      r1FinalizeButtonSpinning,
      roundInfo,
      whitelistButtonTransactionHash,
      buyButtonTransactionHash,
      r1FinalizeButtonTransactionHash,
      buyAmount,
      thumbnailUrl,
      userContribution,
      prices,
      currentRoundNumber,
      totalMintableSupply,
      daicoTokenAddress,
      pollFactoryAddress,
      minimumEtherContribution,
      network,
      isMembershipRequestPending
    } = this.props || {};
    const { buyModalOpen } = this.state;
    const r1Rate = getR1Rate(rounds);
    const formattedUserContribution = formatFromWei(userContribution, 18);
    const formattedMaxEtherContribution = formatFromWei(maximumEtherContribution, 3);
    const remainingAllocation = r1Rate * (formattedMaxEtherContribution - formattedUserContribution);
    return (
      <Grid>
        <div style={{ marginBottom: "20px" }}>
          <TimeLine
            fundsCollected={formatFromWei(etherCollected, 3) || 0}
            roundGoal={getR1Goal(rounds)}
            startDate={new Date(startDateTime)}
            endDate={new Date(r1EndTime)}
          />
        </div>
        <MasonryLayout>
          <ProjectCrowdSaleName
            projectName={projectName}
            tokenTag={tokenTag}
            price={getR1Price(rounds)}
            roundText={getRoundText(roundInfo, currentRoundNumber)}
            description={description}
            urls={urls}
            whitepaper={whitepaper}
            buttonText="Get Whitelisted"
            buttonVisibility={getButtonVisibility(isCurrentMember, isMembershipRequestPending, signinStatusFlag)}
            buttonSpinning={buttonSpinning}
            onClick={this.onWhiteListClickInternal}
            signinStatusFlag={signinStatusFlag}
            isCurrentMember={isCurrentMember}
            buyButtonDisabled={this.canBuy()}
            onBuyClick={this.buyTokens}
            buyButtonText="Buy"
            r1Finish={r1Finish(r1EndTime, roundInfo)}
            onR1FinalizeClick={this.onR1FinalizeClick}
            r1FinalizeButtonSpinning={r1FinalizeButtonSpinning}
            whitelistButtonTransactionHash={whitelistButtonTransactionHash}
            r1FinalizeButtonTransactionHash={r1FinalizeButtonTransactionHash}
            thumbnailUrl={thumbnailUrl}
            remainingAllocation={remainingAllocation}
            daicoTokenAddress={daicoTokenAddress}
            network={network}
            isMembershipRequestPending={isMembershipRequestPending}
          />
          <PDetailCrowdSale
            individualCap={getIndividualCap(maximumEtherContribution, rounds)}
            voteSaturationLimit={capPercent / 100}
            killFrequency="Quarterly"
            initialTapAmount={formatFromWei(initialTapAmount * 86400 * 30, 3)}
            initialFundRelease={formatFromWei(initialFundRelease, 3)}
            tapIncrementUnit={tapIncrementFactor / 100}
            hardCapCapitalisation={getSoftCap(rounds, prices)}
            dilutedCapitalisation={getHardCap(totalMintableSupply, prices, rounds)}
            tokenDataVisibitlity={isCurrentMember}
            tokenBalance={formatCurrencyNumber(formatFromWei(tokenBalance), 0)}
            remainingAllocation={remainingAllocation}
            buyableTokens={formatCurrencyNumber(r1Rate * formattedMaxEtherContribution, 0)}
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
        <BuyModal
          open={buyModalOpen}
          onClose={this.handleBuyClose}
          roundInfo={roundInfo}
          tokenTag={tokenTag}
          buyButtonSpinning={buyButtonSpinning}
          buyTokensOnClick={this.buyTokensOnClick}
          inputText={buyAmount}
          onChange={this.onBuyAmountChange}
          buyButtonTransactionHash={buyButtonTransactionHash}
          remainingAllocation={remainingAllocation}
          tokensSold={roundTokensSold(roundInfo)}
          r1TokenGoal={r1TokenCount(rounds)}
          r1Rate={r1Rate}
          minimumEtherContribution={minimumEtherContribution}
          network={network}
        />
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEtherCollected,
      getRoundTokensSold,
      buyTokens,
      getTokenBalance,
      onWhiteListClick,
      checkWhiteList,
      finalizeR1,
      buyAmountChangedAction,
      getUserTokens
    },
    dispatch
  );

const mapStateToProps = state => {
  const { projectCrowdSaleReducer, projectPreStartReducer, deployerReducer, signinManagerData, fetchPriceReducer, projectGovernanceReducer } =
    state || {};
  const { projectDetails, ts } = deployerReducer || {};
  const { _id: projectid } = projectDetails;
  const {
    etherCollected,
    roundInfo,
    buyButtonSpinning,
    tokenBalance,
    r1FinalizeButtonSpinning,
    buyButtonTransactionHash,
    r1FinalizeButtonTransactionHash,
    buyAmount,
    userContribution
  } = projectCrowdSaleReducer || {};
  const { isCurrentMember, buttonSpinning, whitelistButtonTransactionHash, isMembershipRequestPending } = projectPreStartReducer || {};
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
    isCurrentMember,
    buttonSpinning,
    etherCollected,
    roundInfo,
    buyButtonSpinning,
    tokenBalance,
    r1FinalizeButtonSpinning,
    whitelistButtonTransactionHash,
    buyButtonTransactionHash,
    r1FinalizeButtonTransactionHash,
    buyAmount,
    userContribution,
    isMembershipRequestPending
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailCrowdSale);
