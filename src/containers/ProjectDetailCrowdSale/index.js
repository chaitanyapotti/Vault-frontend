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
  r1TokenCount
} from "../../helpers/common/projectDetailhelperFunctions";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";
import BuyModal from "../../components/Common/BuyModal";
import web3 from "../../helpers/web3";
import MasonryLayout from "../../components/Common/MasonaryLayout";

class ProjectDetailCrowdSale extends Component {
  state = {
    buyModalOpen: false
  };

  handleBuyClose = () => {
    const { buyAmountChangedAction: buyAmountChanged } = this.props || {};
    buyAmountChanged("");
    this.setState({ buyModalOpen: false });
  };

  componentDidMount() {
    const {
      version,
      pollFactoryAddress,
      crowdSaleAddress,
      getEtherCollected: fetchEtherCollected,
      getRoundTokensSold: fetchRoundTokensSold,
      signinStatusFlag,
      membershipAddress,
      userLocalPublicAddress,
      checkWhiteList: checkWhiteListStatus,
      getTokenBalance: tokenBalance,
      daicoTokenAddress,
      getUserTokens: fetchUserTokens,
      currentRoundNumber
    } = this.props || {};
    fetchEtherCollected(version, pollFactoryAddress);
    fetchRoundTokensSold(version, crowdSaleAddress, 0);
    fetchUserTokens(crowdSaleAddress, version, currentRoundNumber, userLocalPublicAddress);
    if (signinStatusFlag > 2) {
      checkWhiteListStatus(version, membershipAddress, userLocalPublicAddress);
      tokenBalance(version, daicoTokenAddress, userLocalPublicAddress);
    }
  }

  componentDidUpdate(prevProps) {
    const { userLocalPublicAddress: prevAddress, signinStatusFlag: prevFlag } = prevProps || "";
    const {
      userLocalPublicAddress: localAddress,
      getTokenBalance: tokenBalance,
      checkWhiteList: checkWhiteListStatus,
      version,
      membershipAddress,
      signinStatusFlag,
      daicoTokenAddress
    } = this.props || {};
    if (prevAddress !== localAddress || (prevFlag !== signinStatusFlag && signinStatusFlag > 2)) {
      tokenBalance(version, daicoTokenAddress, localAddress);
      checkWhiteListStatus(version, membershipAddress, localAddress);
    }
  }

  getRoundText = () => {
    const { roundInfo, currentRoundNumber } = this.props || {};
    const { tokenCount, totalTokensSold } = roundInfo || "";
    if (totalTokensSold && tokenCount && web3.utils.toBN(totalTokensSold).eq(web3.utils.toBN(tokenCount))) return `Round ${currentRoundNumber} Ended`;
    // based on tokens sold
    return `${formatCurrencyNumber(formatFromWei(totalTokensSold), 0)} Tokens Sold of ${formatCurrencyNumber(
      formatFromWei(tokenCount),
      0
    )} (Round 1 of 3)`;
  };

  onWhiteListClickInternal = () => {
    const { version, membershipAddress, onWhiteListClick: whiteListClick, userLocalPublicAddress, isVaultMember } = this.props || {};
    if (isVaultMember) {
      whiteListClick(version, "Protocol", membershipAddress, userLocalPublicAddress);
    }
  };

  buyTokensOnClick = () => {
    const { version, crowdSaleAddress, buyTokens: buyToken, userLocalPublicAddress, daicoTokenAddress, pollFactoryAddress, buyAmount } =
      this.props || {};
    // // TODO: need to add how many tokens to buy
    buyToken(version, crowdSaleAddress, userLocalPublicAddress, buyAmount, 0, daicoTokenAddress, pollFactoryAddress);
  };

  buyTokens = () => {
    this.setState({ buyModalOpen: true });
  };

  onBuyAmountChange = e => {
    const { buyAmountChangedAction: buyAmountChanged } = this.props || {};
    buyAmountChanged(e.target.value);
  };

  r1Finish = () => {
    const { r1EndTime, roundInfo } = this.props || {};
    const { tokenCount, totalTokensSold } = roundInfo || "";
    return new Date(r1EndTime) < new Date() && totalTokensSold && tokenCount && web3.utils.toBN(totalTokensSold).lt(web3.utils.toBN(tokenCount));
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
    const { version, crowdSaleAddress, finalizeR1: r1Finalize, userLocalPublicAddress, projectid } = this.props || {};
    r1Finalize(version, crowdSaleAddress, userLocalPublicAddress, projectid);
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
      pollFactoryAddress
    } = this.props || {};
    const { buyModalOpen } = this.state;
    const r1Rate = getR1Rate(rounds);
    return (
      <Grid>
        <div style={{ "margin-bottom": "20px" }}>
          <TimeLine
            fundsCollected={formatFromWei(etherCollected, 3)}
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
            roundText={this.getRoundText()}
            description={description}
            urls={urls}
            whitepaper={whitepaper}
            buttonText="Get Whitelisted"
            buttonVisibility={!isCurrentMember}
            buttonSpinning={buttonSpinning}
            onClick={this.onWhiteListClickInternal}
            signinStatusFlag={signinStatusFlag}
            buyButtonVisibility={isCurrentMember}
            buyButtonDisabled={this.canBuy()}
            onBuyClick={this.buyTokens}
            buyButtonText="Buy"
            r1Finish={this.r1Finish()}
            onR1FinalizeClick={this.onR1FinalizeClick}
            r1FinalizeButtonSpinning={r1FinalizeButtonSpinning}
            whitelistButtonTransactionHash={whitelistButtonTransactionHash}
            r1FinalizeButtonTransactionHash={r1FinalizeButtonTransactionHash}
            thumbnailUrl={thumbnailUrl}
            remainingAllocation={r1Rate * (formatFromWei(maximumEtherContribution) - formatFromWei(userContribution, 18))}
            daicoTokenAddress={daicoTokenAddress}
          />
          <PDetailCrowdSale
            individualCap={formatFromWei(maximumEtherContribution, 3)}
            voteSaturationLimit={capPercent / 100}
            killFrequency="Quarterly"
            initialTapAmount={formatFromWei(initialTapAmount * 86400 * 30, 3)}
            initialFundRelease={formatFromWei(initialFundRelease, 3)}
            tapIncrementUnit={tapIncrementFactor / 100}
            hardCapCapitalisation={getSoftCap(rounds, prices)}
            dilutedCapitalisation={getHardCap(totalMintableSupply, prices, rounds)}
            tokenDataVisibitlity={isCurrentMember}
            tokenBalance={formatCurrencyNumber(formatFromWei(tokenBalance), 0)}
            remainingAllocation={r1Rate * (formatFromWei(maximumEtherContribution) - formatFromWei(userContribution, 18))}
            buyableTokens={formatCurrencyNumber(r1Rate * formatFromWei(maximumEtherContribution), 0)}
            pollFactoryAddress={pollFactoryAddress}
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
          remainingAllocation={r1Rate * (formatFromWei(maximumEtherContribution) - formatFromWei(userContribution, 18))}
          tokensSold={roundTokensSold(roundInfo)}
          r1TokenGoal={r1TokenCount(rounds)}
          r1Rate={r1Rate}
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
  const { projectCrowdSaleReducer, projectPreStartReducer } = state || {};
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
  const { isCurrentMember, buttonSpinning, whitelistButtonTransactionHash } = projectPreStartReducer || {};
  return {
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
    userContribution
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailCrowdSale);
