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
  getXfrData
} from "../../actions/projectDetailGovernanceActions/index";
import {
  formatFromWei,
  getRoundPrice,
  getR1Goal,
  getHardCap,
  getSoftCap,
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
      getXfrData: fetchXfrData
    } = this.props || {};
    etherPriceFetch("ETH");
    fetchRoundTokensSold(version, crowdSaleAddress, parseInt(currentRoundNumber, 10) - 1);
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
      getTokenBalance: fetchTokenBalance
    } = this.props || {};
    if (prevAddress !== localAddress || (prevFlag !== signinStatusFlag && signinStatusFlag > 2)) {
      checkWhiteListStatus(version, membershipAddress, localAddress);
      fetchTokenBalance(version, daicoTokenAddress, localAddress);
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
    return (
      <div>
        <div>Level {currentRoundNumber} price</div>
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
    // based on tokens sold
    return `${formatCurrencyNumber(formatFromWei(totalTokensSold), 0)} Tokens Sold of ${formatCurrencyNumber(
      formatFromWei(tokenCount),
      0
    )} (Round ${currentRoundNumber} of 3)`;
  };

  getVoteShare = () => {
    const { totalMintableSupply, tokenBalance, capPercent } = this.props || {};
    const userShare = (parseFloat(tokenBalance) / parseFloat(totalMintableSupply)) * Math.pow(10, 18);
    return userShare > capPercent / 100 ? capPercent / 100 : userShare;
  };

  getNextKillPollStartDate = () => {
    const { killPollIndex, r1EndTime } = this.props || {};
    const endDate = new Date(r1EndTime);
    endDate.setDate(endDate.getDate() + (killPollIndex + 1) * 90);
    return endDate.toDateString();
  };

  getMyTokenValue = () => {
    const { prices } = this.props || {};
    const { ETH: etherPrice } = prices || {};
    const tokenPrice = this.getPrice() * parseFloat(etherPrice);
    const { tokenBalance } = this.props || {};
    return formatMoney(tokenPrice * parseFloat(formatFromWei(tokenBalance)));
  };

  getMyRefundValue = () => {
    const { prices } = this.props || {};
    const { ETH: etherPrice } = prices || {};
    const { remainingEtherBalance, tokenBalance, totalSupply, foundationDetails } = this.props || {};
    let softCap = 0;
    for (let index = 0; index < foundationDetails.length; index += 1) {
      const { amount } = foundationDetails[index];
      softCap += parseFloat(amount);
    }
    const denom = parseFloat(totalSupply) - softCap;
    return formatMoney(formatFromWei((parseFloat(tokenBalance) / denom) * parseFloat(remainingEtherBalance) * etherPrice));
  };

  getKillConsensus = () => {
    const { killConsensus, tokensUnderGovernance } = this.props || {};
    return (parseFloat(killConsensus) / parseFloat(tokensUnderGovernance)) * 100;
  };

  getTapPollConsensus = () => {
    const { tapPollConsensus, tokensUnderGovernance } = this.props || {};
    return parseFloat(tapPollConsensus) / parseFloat(tokensUnderGovernance);
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
    const { version, pollFactoryAddress, voteInKillPoll: killVote } = this.props || {};
    killVote(version, pollFactoryAddress);
    // or revokeVoteInKillPoll();
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
      buyButtonSpinning
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
              buttonVisibility={!isCurrentMember}
              buttonSpinning={buttonSpinning}
              onClick={this.onWhiteListClickInternal}
              signinStatusFlag={signinStatusFlag}
              buyButtonVisibility={isCurrentMember}
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
              onKillClick={this.onKillClick}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col xs={12} lg={6}>
            <TapCard
              currentTapAmount={(parseFloat(currentTap, 10) * 86400 * 30) / Math.pow(10, 18)}
              tapIncrementUnit={tapIncrementFactor}
              incrementApproval={this.getTapPollConsensus()}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col xs={12} lg={6}>
            <FundReq data={xfrData} />
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
          price={getRoundPrice(this.props)}
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
  const { tokensUnderGovernance, killPollIndex, remainingEtherBalance, killConsensus, totalSupply, tapPollConsensus, currentTap, xfrData } =
    projectDetailGovernanceReducer || {};
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
    prices
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
      checkWhiteList
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailGovernance);
