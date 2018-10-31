import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Warning from "@material-ui/icons/Warning";
import { ProjectGovernanceName, PDetailGovernance, TapCard, FundReq } from "../../components/Common/ProjectDetails";
import { getRoundTokensSold, buyTokens, getTokenBalance } from "../../actions/projectCrowdSaleActions/index";
import { onWhiteListClick, checkWhiteList } from "../../actions/projectPreStartActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import {
  getTokensUnderGovernance,
  getCurrentKillPollIndex,
  getRemainingEtherBalance,
  getTotalSupply,
  getKillConsensus,
  getTapPollConsensus,
  getCurrentTap,
  getXfrData,
  getKillPollVote,
  voteInKillPoll,
  revokeVoteInKillPoll,
  getTapPollVote,
  voteInTapPoll,
  revokeVoteInTapPoll,
  getXfrPollVote,
  voteInXfr1Poll,
  voteInXfr2Poll,
  revokeVoteInXfr1Poll,
  revokeVoteInXfr2Poll,
  finalizeKill
} from "../../actions/projectDetailGovernanceActions/index";
import {
  formatFromWei,
  getRoundPrice,
  formatCurrencyNumber,
  formatMoney,
  formatDate,
  significantDigits
} from "../../helpers/common/projectDetailhelperFunctions";
import { fetchPrice } from "../../actions/priceFetchActions/index";
import AlertModal from "../../components/Common/AlertModal";
import BuyModal from "../../components/Common/BuyModal";

class ProjectDetailGovernance extends Component {
  state = {
    modalOpen: false,
    buyModalOpen: false,
    buyAmount: ""
  };

  handleBuyClose = () => this.setState({ buyModalOpen: false });

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  componentDidMount() {
    const {
      version,
      crowdSaleAddress,
      currentRoundNumber,
      pollFactoryAddress,
      daicoTokenAddress,
      getRoundTokensSold: fetchRoundTokensSold,
      signinStatusFlag,
      membershipAddress,
      userLocalPublicAddress,
      fetchPrice: etherPriceFetch,
      checkWhiteList: checkWhiteListStatus,
      getTokenBalance: fetchTokenBalance,
      getTokensUnderGovernance: fetchTokensUnderGovernance,
      getCurrentKillPollIndex: fetchCurrentKillPollIndex,
      getRemainingEtherBalance: fetchRemainingEtherBalance,
      getTotalSupply: fetchTotalSupply,
      getKillConsensus: fetchKillConsensus,
      getTapPollConsensus: fetchTapPollConsensus,
      getCurrentTap: fetchCurrentTap,
      getXfrData: fetchXfrData,
      getKillPollVote: fetchKillPollVote,
      getTapPollVote: fetchTapPollVote,
      getXfrPollVote: fetchXfrPollVote
    } = this.props || {};
    etherPriceFetch("ETH");
    const roundNumber = currentRoundNumber === "4" ? 2 : parseInt(currentRoundNumber, 10) - 1;
    fetchRoundTokensSold(version, crowdSaleAddress, roundNumber);
    fetchTokensUnderGovernance(version, daicoTokenAddress);
    fetchCurrentKillPollIndex(version, pollFactoryAddress);
    fetchRemainingEtherBalance(version, pollFactoryAddress);
    fetchTotalSupply(version, daicoTokenAddress);
    fetchKillConsensus(version, pollFactoryAddress);
    fetchTapPollConsensus(version, pollFactoryAddress);
    fetchCurrentTap(version, pollFactoryAddress);
    fetchXfrData(version, pollFactoryAddress);
    if (signinStatusFlag > 2) {
      checkWhiteListStatus(version, membershipAddress, userLocalPublicAddress);
      fetchTokenBalance(version, daicoTokenAddress, userLocalPublicAddress);
      fetchKillPollVote(version, pollFactoryAddress, userLocalPublicAddress);
      fetchTapPollVote(version, pollFactoryAddress, userLocalPublicAddress);
      fetchXfrPollVote(version, pollFactoryAddress, userLocalPublicAddress);
    }
  }

  componentDidUpdate(prevProps) {
    const { userLocalPublicAddress: prevAddress, signinStatusFlag: prevFlag } = prevProps || "";
    const {
      userLocalPublicAddress: localAddress,
      checkWhiteList: checkWhiteListStatus,
      version,
      membershipAddress,
      signinStatusFlag,
      daicoTokenAddress,
      pollFactoryAddress,
      getTokenBalance: fetchTokenBalance,
      getKillPollVote: fetchKillPollVote,
      getTapPollVote: fetchTapPollVote,
      getXfrPollVote: fetchXfrPollVote
    } = this.props || {};
    if (prevAddress !== localAddress || (prevFlag !== signinStatusFlag && signinStatusFlag > 2)) {
      checkWhiteListStatus(version, membershipAddress, localAddress);
      fetchTokenBalance(version, daicoTokenAddress, localAddress);
      fetchKillPollVote(version, pollFactoryAddress, localAddress);
      fetchTapPollVote(version, pollFactoryAddress, localAddress);
      fetchXfrPollVote(version, pollFactoryAddress, localAddress);
    }
  }

  getPriceIncrement = () =>
    // TODO: to use external api
    "(+31.23%)";

  getLastRoundInfo = () => {
    // TODO: get current round and price
    const { roundInfo } = this.props || {};
    const { tokenRate } = roundInfo;
    const { currentRoundNumber } = this.props || {};
    const roundNumber = currentRoundNumber === "4" ? "3" : currentRoundNumber;
    return (
      <div>
        <div>Level {roundNumber} price</div>
        <div>{1 / tokenRate} ETH</div>
      </div>
    );
  };

  getPrice = () => {
    // TODO: to use external API
    const { roundInfo } = this.props || {};
    const { tokenRate } = roundInfo;
    return 1 / tokenRate;
    // return 0.009861;
  };

  getRoundText = () => {
    const { currentRoundNumber } = this.props || {};
    const { roundInfo } = this.props || {};
    const { tokenCount, totalTokensSold } = roundInfo || {}; // tokens/wei
    if (currentRoundNumber === "4") return "Sold Out (3rd Round Ended)";

    return `${formatCurrencyNumber(formatFromWei(totalTokensSold), 0)} Tokens Sold of ${formatCurrencyNumber(
      formatFromWei(tokenCount),
      0
    )} (Round ${currentRoundNumber} of 3)`;
  };

  getVoteShare = () => {
    const { totalMintableSupply, tokenBalance, capPercent } = this.props || {};
    const userShare = (parseFloat(tokenBalance) / parseFloat(totalMintableSupply)) * Math.pow(10, 18) || 0;
    return userShare > capPercent / 100 ? capPercent / 100 : userShare;
  };

  getNextKillPollStartDate = () => {
    const { killPollIndex, r1EndTime } = this.props || {};
    const endDate = new Date(r1EndTime);
    endDate.setDate(endDate.getDate() + (killPollIndex + 1) * 90);
    return endDate.toDateString();
  };

  getMyTokenValue = () => {
    const { prices, tokenBalance } = this.props || {};
    const { ETH: etherPrice } = prices || {};
    const tokenPrice = this.getPrice() * parseFloat(etherPrice);
    return formatMoney(tokenPrice * parseFloat(formatFromWei(tokenBalance)) || 0);
  };

  getMyRefundValue = () => {
    const { prices, remainingEtherBalance, tokenBalance, totalSupply, foundationDetails } = this.props || {};
    const { ETH: etherPrice } = prices || {};
    let softCap = 0;
    for (let index = 0; index < foundationDetails.length; index += 1) {
      const { amount } = foundationDetails[index];
      softCap += parseFloat(amount);
    }
    const denom = parseFloat(totalSupply) - softCap;
    return formatMoney(formatFromWei((parseFloat(tokenBalance) / denom) * parseFloat(remainingEtherBalance) * etherPrice || 0));
  };

  getKillConsensus = () => {
    const { killConsensus, tokensUnderGovernance } = this.props || {};
    return significantDigits(parseFloat(killConsensus) / parseFloat(tokensUnderGovernance) || 0);
  };

  getTapPollConsensus = () => {
    const { tapPollConsensus, tokensUnderGovernance } = this.props || {};
    return significantDigits(parseFloat(tapPollConsensus) / parseFloat(tokensUnderGovernance) || 0);
  };

  getTradeUrl = () => {
    const { daicoTokenAddress } = this.props || {};
    return `https://etherdelta.com/#${daicoTokenAddress}-ETH`;
  };

  onWhiteListClickInternal = () => {
    const { version, membershipAddress, onWhiteListClick: whiteListClick, userLocalPublicAddress, isVaultMember } = this.props || {};
    if (isVaultMember) {
      whiteListClick(version, "Protocol", membershipAddress, userLocalPublicAddress);
    } else {
      this.setState({
        modalOpen: true
      });
    }
  };

  buyTokensOnClick = () => {
    const { version, crowdSaleAddress, buyTokens: buyToken, userLocalPublicAddress, currentRoundNumber } = this.props || {};
    const { buyAmount } = this.state || {};
    // // TODO: need to add how many tokens to buy
    buyToken(version, crowdSaleAddress, userLocalPublicAddress, buyAmount, parseInt(currentRoundNumber, 10) - 1);
  };

  buyTokens = () => {
    this.setState({ buyModalOpen: true });
  };

  onBuyAmountChange = e => {
    this.setState({ buyAmount: e.target.value });
  };

  onKillClick = () => {
    const { version, voteInKillPoll: killVote, userLocalPublicAddress, killVoteData, pollFactoryAddress } = this.props || {};
    const { killPollAddress } = killVoteData || {};
    killVote(version, killPollAddress, userLocalPublicAddress, pollFactoryAddress);
    // or revokeVoteInKillPoll();
  };

  onRevokeKillClick = () => {
    const { version, revokeVoteInKillPoll: killUnVote, userLocalPublicAddress, killVoteData, pollFactoryAddress } = this.props || {};
    const { killPollAddress } = killVoteData || {};
    killUnVote(version, killPollAddress, userLocalPublicAddress, pollFactoryAddress);
  };

  onTapClick = () => {
    const { version, voteInTapPoll: tapVote, userLocalPublicAddress, tapVoteData, pollFactoryAddress } = this.props || {};
    const { tapPollAddress } = tapVoteData || {};
    tapVote(version, tapPollAddress, userLocalPublicAddress, pollFactoryAddress);
    // or revokeVoteInKillPoll();
  };

  onRevokeTapClick = () => {
    const { version, revokeVoteInTapPoll: tapUnVote, userLocalPublicAddress, tapVoteData, pollFactoryAddress } = this.props || {};
    const { tapPollAddress } = tapVoteData || {};
    tapUnVote(version, tapPollAddress, userLocalPublicAddress, pollFactoryAddress);
  };

  onXfr1Click = () => {
    const { version, voteInXfr1Poll: xfr1Vote, userLocalPublicAddress, xfrData, pollFactoryAddress } = this.props || {};
    const { poll1 } = xfrData || {};
    const { address } = poll1 || {};
    xfr1Vote(version, address, userLocalPublicAddress, pollFactoryAddress);
  };

  onXfr2Click = () => {
    const { version, voteInXfr2Poll: xfr2Vote, userLocalPublicAddress, xfrData, pollFactoryAddress } = this.props || {};
    const { poll2 } = xfrData || {};
    const { address } = poll2 || {};
    xfr2Vote(version, address, userLocalPublicAddress, pollFactoryAddress);
  };

  onRevokeXfr1Click = () => {
    const { version, revokeVoteInXfr1Poll: xfr1RevokeVote, userLocalPublicAddress, xfrData, pollFactoryAddress } = this.props || {};
    const { poll1 } = xfrData || {};
    const { address } = poll1 || {};
    xfr1RevokeVote(version, address, userLocalPublicAddress, pollFactoryAddress);
  };

  onRevokeXfr2Click = () => {
    const { version, revokeVoteInXfr2Poll: xfr2RevokeVote, userLocalPublicAddress, xfrData, pollFactoryAddress } = this.props || {};
    const { poll2 } = xfrData || {};
    const { address } = poll2 || {};
    xfr2RevokeVote(version, address, userLocalPublicAddress, pollFactoryAddress);
  };

  getKillVoteStatus = () => {
    const { killVoteData } = this.props || {};
    const { voted } = killVoteData || {};
    return voted;
  };

  getTapVoteStatus = () => {
    const { tapVoteData } = this.props || {};
    const { voted } = tapVoteData || {};
    return voted;
  };

  killFinish = () => {
    const { killPollIndex, r1EndTime } = this.props || {};
    const endDate = new Date(r1EndTime);
    endDate.setDate(endDate.getDate() + (killPollIndex + 1) * 89);
    return endDate < new Date();
  };

  onKillFinalizeClick = () => {
    const { version, pollFactoryAddress, finalizeKill: killFinalize, userLocalPublicAddress } = this.props || {};
    killFinalize(version, pollFactoryAddress, userLocalPublicAddress);
  };

  render() {
    const {
      projectName,
      tokenTag,
      description,
      urls,
      whitepaper,
      capPercent,
      isCurrentMember,
      tokenBalance,
      killPollIndex,
      remainingEtherBalance,
      tapIncrementFactor,
      currentTap,
      xfrData,
      buttonSpinning,
      signinStatusFlag,
      buyButtonSpinning,
      killButtonSpinning,
      tapButtonSpinning,
      xfr1ButtonSpinning,
      xfr2ButtonSpinning,
      xfrDetails,
      xfrVoteData,
      tokensUnderGovernance,
      currentRoundNumber,
      killFinalizeButtonSpinning,
      roundInfo
    } = this.props || {};
    const { modalOpen, buyModalOpen, buyAmount } = this.state;
    return (
      <Grid>
        <Row>
          <Col xs={12} lg={6}>
            <ProjectGovernanceName
              projectName={projectName}
              tokenTag={tokenTag}
              price={this.getPrice()}
              roundText={this.getRoundText()}
              priceIncrement={this.getPriceIncrement()}
              description={description}
              urls={urls}
              whitepaper={whitepaper}
              lastRoundInfo={this.getLastRoundInfo()}
              buttonText="Get Whitelisted"
              buttonVisibility={!isCurrentMember && currentRoundNumber !== "4"}
              buttonSpinning={buttonSpinning}
              onClick={this.onWhiteListClickInternal}
              signinStatusFlag={signinStatusFlag}
              buyButtonVisibility={isCurrentMember && currentRoundNumber !== "4"}
              onBuyClick={this.buyTokens}
              buyButtonText="Buy"
              tradeButtonVisibility
              tradeUrl={this.getTradeUrl()}
            />
          </Col>
          <Col xs={12} lg={6}>
            <PDetailGovernance
              voteSaturationLimit={capPercent / 100}
              killFrequency="Quarterly"
              yourTokens={formatCurrencyNumber(formatFromWei(tokenBalance), 0)}
              yourVoteShare={this.getVoteShare()}
              killAttemptsLeft={7 - killPollIndex}
              nextKillAttempt={formatDate(this.getNextKillPollStartDate())}
              yourTokenValue={this.getMyTokenValue()}
              yourRefundValue={this.getMyRefundValue()}
              totalRefundableBalance={formatFromWei(remainingEtherBalance, 2)}
              killConsensus={this.getKillConsensus()}
              killVoteStatus={this.getKillVoteStatus()}
              onKillClick={this.onKillClick}
              onRevokeKillClick={this.onRevokeKillClick}
              killButtonSpinning={killButtonSpinning}
              signinStatusFlag={signinStatusFlag}
              onKillFinalizeClick={this.onKillFinalizeClick}
              killFinalizeButtonSpinning={killFinalizeButtonSpinning}
              killFinish={this.killFinish()}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col xs={12} lg={6}>
            <TapCard
              currentTapAmount={formatCurrencyNumber(formatFromWei(parseFloat(currentTap) * 86400 * 30))}
              tapIncrementUnit={tapIncrementFactor / 100}
              incrementApproval={this.getTapPollConsensus()}
              tapVoteStatus={this.getTapVoteStatus()}
              onTapClick={this.onTapClick}
              onRevokeTapClick={this.onRevokeTapClick}
              tapButtonSpinning={tapButtonSpinning}
              signinStatusFlag={signinStatusFlag}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col xs={12} lg={6}>
            <FundReq
              data={xfrData}
              details={xfrDetails}
              xfrVoteData={xfrVoteData}
              signinStatusFlag={signinStatusFlag}
              onRevokeXfr1Click={this.onRevokeXfr1Click}
              onXfr1Click={this.onXfr1Click}
              xfr1ButtonSpinning={xfr1ButtonSpinning}
              onRevokeXfr2Click={this.onRevokeXfr2Click}
              onXfr2Click={this.onXfr2Click}
              xfr2ButtonSpinning={xfr2ButtonSpinning}
              tokensUnderGovernance={tokensUnderGovernance}
            />
          </Col>
        </Row>
        <AlertModal open={modalOpen} handleClose={this.handleClose} link="/register">
          <div className="text--center text--danger">
            <Warning style={{ width: "2em", height: "2em" }} />
          </div>
          <div className="text--center push--top">You are not registered with us. Please Login to use our App.</div>
        </AlertModal>
        <BuyModal
          open={buyModalOpen}
          onClose={this.handleBuyClose}
          roundInfo={roundInfo}
          tokenTag={tokenTag}
          buyButtonSpinning={buyButtonSpinning}
          buyTokensOnClick={this.buyTokensOnClick}
          inputText={buyAmount}
          onChange={this.onBuyAmountChange}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { projectCrowdSaleReducer, projectDetailGovernanceReducer, projectPreStartReducer, signinManagerData, fetchPriceReducer } = state || {};
  const { etherCollected, roundInfo, tokenBalance, buyButtonSpinning } = projectCrowdSaleReducer || {};
  const {
    tokensUnderGovernance,
    killPollIndex,
    remainingEtherBalance,
    killConsensus,
    totalSupply,
    tapPollConsensus,
    currentTap,
    xfrData,
    killVoteData,
    tapVoteData,
    killButtonSpinning,
    tapButtonSpinning,
    xfr1ButtonSpinning,
    xfr2ButtonSpinning,
    xfrVoteData,
    killFinalizeButtonSpinning
  } = projectDetailGovernanceReducer || {};
  const { isCurrentMember, buttonSpinning } = projectPreStartReducer || {};
  const { isVaultMember, userLocalPublicAddress, signinStatusFlag } = signinManagerData || {};
  const { prices } = fetchPriceReducer || {};

  return {
    etherCollected,
    roundInfo,
    tokenBalance,
    tokensUnderGovernance,
    killPollIndex,
    remainingEtherBalance,
    totalSupply,
    killConsensus,
    tapPollConsensus,
    currentTap,
    xfrData,
    isCurrentMember,
    buttonSpinning,
    isVaultMember,
    userLocalPublicAddress,
    signinStatusFlag,
    buyButtonSpinning,
    prices,
    killVoteData,
    tapVoteData,
    killButtonSpinning,
    tapButtonSpinning,
    xfrVoteData,
    xfr1ButtonSpinning,
    xfr2ButtonSpinning,
    killFinalizeButtonSpinning
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      buyTokens,
      getRoundTokensSold,
      getTokensUnderGovernance,
      getTokenBalance,
      getCurrentKillPollIndex,
      getRemainingEtherBalance,
      getTotalSupply,
      getKillConsensus,
      getTapPollConsensus,
      getCurrentTap,
      getXfrData,
      onWhiteListClick,
      fetchPrice,
      checkWhiteList,
      getKillPollVote,
      getTapPollVote,
      voteInTapPoll,
      voteInKillPoll,
      revokeVoteInKillPoll,
      revokeVoteInTapPoll,
      getXfrPollVote,
      voteInXfr1Poll,
      voteInXfr2Poll,
      revokeVoteInXfr1Poll,
      revokeVoteInXfr2Poll,
      finalizeKill
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailGovernance);
