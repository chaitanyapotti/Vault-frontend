import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Warning from "@material-ui/icons/Warning";
import { IssuerGovernanceName, IssuerPDetailGovernance, FundReq, IssuerTapCard } from "../../components/Common/ProjectDetails";
import { getRoundTokensSold, buyTokens, getTokenBalance } from "../../actions/projectCrowdSaleActions/index";
import {
  startNewRound,
  deployTapPoll,
  incrementTap,
  deployXfrPoll,
  withdrawXfrAmount,
  withdrawAmount
} from "../../actions/issuerDetailGovernanceActions/index";
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
  finalizeKill
} from "../../actions/projectDetailGovernanceActions/index";
import { formatFromWei, formatCurrencyNumber, formatDate, significantDigits } from "../../helpers/common/projectDetailhelperFunctions";
import { fetchPrice } from "../../actions/priceFetchActions/index";
import AlertModal from "../../components/Common/AlertModal";
import XfrForm from "../../components/Common/ProjectDetails/XfrForm";

class IssuerDetailGovernance extends Component {
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
      fetchPrice: etherPriceFetch,
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
    const roundNumber = currentRoundNumber === "4" ? 2 : currentRoundNumber === "0" ? 0 : parseInt(currentRoundNumber, 10) - 1;
    fetchRoundTokensSold(version, crowdSaleAddress, roundNumber);
    fetchTokensUnderGovernance(version, daicoTokenAddress);
    fetchCurrentKillPollIndex(version, pollFactoryAddress);
    fetchRemainingEtherBalance(version, pollFactoryAddress);
    fetchTotalSupply(version, daicoTokenAddress);
    fetchKillConsensus(version, pollFactoryAddress);
    fetchTapPollConsensus(version, pollFactoryAddress);
    fetchCurrentTap(version, pollFactoryAddress);
    fetchXfrData(version, pollFactoryAddress);
  }

  componentDidUpdate(prevProps) {
    const { userLocalPublicAddress: prevAddress, signinStatusFlag: prevFlag } = prevProps || "";
    const { userLocalPublicAddress: localAddress, signinStatusFlag } = this.props || {};
    if (prevAddress !== localAddress || (prevFlag !== signinStatusFlag && signinStatusFlag > 2)) {
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
    if (totalTokensSold === tokenCount) return `Round ${currentRoundNumber} Completed`;

    return `${formatCurrencyNumber(formatFromWei(totalTokensSold), 0)} Tokens Sold of ${formatCurrencyNumber(
      formatFromWei(tokenCount),
      0
    )} (Round ${currentRoundNumber} of 3)`;
  };

  getNextKillPollStartDate = () => {
    const { killPollIndex, r1EndTime } = this.props || {};
    const endDate = new Date(r1EndTime);
    endDate.setDate(endDate.getDate() + (killPollIndex + 1) * 90);
    return endDate.toDateString();
  };

  getKillConsensus = () => {
    const { killConsensus, tokensUnderGovernance } = this.props || {};
    return significantDigits(parseFloat(killConsensus) / parseFloat(tokensUnderGovernance) || 0);
  };

  getTapPollConsensus = () => {
    const { tapPollConsensus, tokensUnderGovernance } = this.props || {};
    if (tapPollConsensus === "No Poll") return 0;
    return significantDigits(parseFloat(tapPollConsensus) / parseFloat(tokensUnderGovernance) || 0);
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

  getstartNewRoundText = () => {
    const { currentRoundNumber } = this.props || {};
    return `Start Round ${parseInt(currentRoundNumber, 10) + 1}`;
  };

  canStartNewRound = () => {
    const { roundInfo } = this.props || {};
    const { tokenCount, totalTokensSold } = roundInfo || {}; // tokens/wei
    return totalTokensSold === tokenCount;
  };

  onStartNewRoundClick = () => {
    const { startNewRound: startRound, version, crowdSaleAddress, userLocalPublicAddress } = this.props || {};
    startRound(version, crowdSaleAddress, userLocalPublicAddress);
  };

  canIncreaseTap = () => {
    const { tapAcceptancePercent, tapPollConsensus, tokensUnderGovernance } = this.props || {};
    const consensus = parseFloat(tapPollConsensus) / parseFloat(tokensUnderGovernance);
    return consensus > parseFloat(tapAcceptancePercent);
  };

  canDeployTapPoll = () => {
    const { tapPollConsensus } = this.props || {};
    return tapPollConsensus === "No Poll";
  };

  onDeployTapPollClick = () => {
    const { version, deployTapPoll: deployTap, userLocalPublicAddress, pollFactoryAddress } = this.props || {};
    deployTap(version, pollFactoryAddress, userLocalPublicAddress);
  };

  onIncrementTapClick = () => {
    const { version, incrementTap: incrementTapAmount, userLocalPublicAddress, pollFactoryAddress } = this.props || {};
    incrementTapAmount(version, pollFactoryAddress, userLocalPublicAddress);
  };

  onEditClick = () => {};

  isPermissioned = () => {
    const { signinStatusFlag, ownerAddress, userLocalPublicAddress } = this.props || {};
    return signinStatusFlag === 5 && ownerAddress === userLocalPublicAddress;
  };

  render() {
    const {
      projectName,
      tokenTag,
      description,
      urls,
      whitepaper,
      capPercent,
      killPollIndex,
      remainingEtherBalance,
      tapIncrementFactor,
      currentTap,
      xfrData,
      signinStatusFlag,
      xfr1ButtonSpinning,
      xfr2ButtonSpinning,
      xfrDetails,
      xfrVoteData,
      tokensUnderGovernance,
      startNewRoundButtonSpinning,
      deployTapPollButtonSpinning,
      incrementTapButtonSpinning
    } = this.props || {};
    const { modalOpen, buyModalOpen, buyAmount } = this.state;
    return (
      <Grid>
        <Row>
          <Col xs={12} lg={6}>
            <IssuerGovernanceName
              projectName={projectName}
              tokenTag={tokenTag}
              price={this.getPrice()}
              roundText={this.getRoundText()}
              priceIncrement={this.getPriceIncrement()}
              description={description}
              urls={urls}
              whitepaper={whitepaper}
              lastRoundInfo={this.getLastRoundInfo()}
              buttonText={this.getstartNewRoundText()}
              startNewRoundButtonSpinning={startNewRoundButtonSpinning}
              canStartNewRound={this.canStartNewRound()}
              onClick={this.onStartNewRoundClick}
              isPermissioned={this.isPermissioned()}
              onEditClick={this.onEditClick}
            />
          </Col>
          <Col xs={12} lg={6}>
            <IssuerPDetailGovernance
              voteSaturationLimit={capPercent / 100}
              killFrequency="Quarterly"
              killAttemptsLeft={7 - killPollIndex}
              nextKillAttempt={formatDate(this.getNextKillPollStartDate())}
              totalRefundableBalance={formatFromWei(remainingEtherBalance, 2)}
              killConsensus={this.getKillConsensus()}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col xs={12} lg={6}>
            <IssuerTapCard
              currentTapAmount={formatCurrencyNumber(formatFromWei(parseFloat(currentTap) * 86400 * 30))}
              tapIncrementUnit={tapIncrementFactor / 100}
              incrementApproval={this.getTapPollConsensus()}
              isPermissioned={this.isPermissioned()}
              canIncreaseTap={this.canIncreaseTap()}
              incrementTapButtonSpinning={incrementTapButtonSpinning}
              deployTapPollButtonSpinning={deployTapPollButtonSpinning}
              canDeployTapPoll={this.canDeployTapPoll()}
              onIncrementTapClick={this.onIncrementTapClick}
              onDeployTapPollClick={this.onDeployTapPollClick}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col xs={12} lg={6}>
            <XfrForm />
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
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const {
    projectCrowdSaleReducer,
    projectDetailGovernanceReducer,
    projectPreStartReducer,
    signinManagerData,
    fetchPriceReducer,
    issuerDetailGovernanceReducer
  } = state || {};
  const { etherCollected, roundInfo, tokenBalance, buyButtonSpinning } = projectCrowdSaleReducer || {};
  const { startNewRoundButtonSpinning, incrementTapButtonSpinning, deployTapPollButtonSpinning } = issuerDetailGovernanceReducer || {};
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
    killFinalizeButtonSpinning,
    startNewRoundButtonSpinning,
    incrementTapButtonSpinning,
    deployTapPollButtonSpinning
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
      finalizeKill,
      startNewRound,
      deployTapPoll,
      incrementTap,
      deployXfrPoll,
      withdrawXfrAmount,
      withdrawAmount
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuerDetailGovernance);
