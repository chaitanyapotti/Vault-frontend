import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IssuerGovernanceName, IssuerPDetailGovernance, IssuerTapCard, IssuerFundReq } from "../../components/Common/ProjectDetails";
import { getRoundTokensSold, buyTokens, getTokenBalance } from "../../actions/projectCrowdSaleActions/index";
import {
  startNewRound,
  deployTapPoll,
  incrementTap,
  deployXfrPoll,
  withdrawXfrAmount,
  withdrawAmount,
  getCurrentWithdrawableAmount,
  xfrAmountChanged,
  xfrTitleChanged,
  xfrDescriptionChanged,
  withdrawAmountChanged
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
import XfrForm from "../../components/Common/ProjectDetails/XfrForm";
import IssuerWithdrawCard from "../../components/Common/ProjectDetails/IssuerWithdrawCard";

class IssuerDetailGovernance extends Component {
  componentDidMount() {
    const {
      version,
      crowdSaleAddress,
      currentRoundNumber,
      pollFactoryAddress,
      daicoTokenAddress,
      tokenTag,
      getRoundTokensSold: fetchRoundTokensSold,
      fetchPrice: priceFetch,
      getTokensUnderGovernance: fetchTokensUnderGovernance,
      getCurrentKillPollIndex: fetchCurrentKillPollIndex,
      getRemainingEtherBalance: fetchRemainingEtherBalance,
      getTotalSupply: fetchTotalSupply,
      getKillConsensus: fetchKillConsensus,
      getTapPollConsensus: fetchTapPollConsensus,
      getCurrentTap: fetchCurrentTap,
      getXfrData: fetchXfrData,
      getCurrentWithdrawableAmount: fetchCurrentWithdrawableAmount
    } = this.props || {};
    priceFetch("ETH");
    priceFetch(tokenTag);
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
    fetchCurrentWithdrawableAmount(version, pollFactoryAddress);
  }

  getPriceIncrement = () => {
    const { tokenTag, prices } = this.props || {};
    const { [tokenTag]: tokenPrice } = prices || {};
    const { change } = tokenPrice || {};
    return change;
  };

  getLastRoundInfo = () => {
    // TODO: get current round and price
    const { roundInfo } = this.props || {};
    const { tokenRate } = roundInfo;
    const { currentRoundNumber } = this.props || {};
    const roundNumber = currentRoundNumber === "4" ? "3" : currentRoundNumber;
    return (
      <div>
        <div>Round {roundNumber} price</div>
        <div>{1 / tokenRate} ETH</div>
      </div>
    );
  };

  getPrice = () => {
    const { tokenTag, prices } = this.props || {};
    const { [tokenTag]: tokenPrice } = prices || {};
    const { price } = tokenPrice || {};
    if (!price) {
      const { roundInfo } = this.props || {};
      const { tokenRate } = roundInfo || {};
      return 1 / tokenRate;
    }
    return price;
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

  getstartNewRoundText = () => {
    const { currentRoundNumber } = this.props || {};
    return `Start Round ${parseInt(currentRoundNumber, 10) + 1}`;
  };

  canStartNewRound = () => {
    const { roundInfo, currentRoundNumber } = this.props || {};
    const { tokenCount, totalTokensSold } = roundInfo || {}; // tokens/wei
    return totalTokensSold === tokenCount && currentRoundNumber <= "3";
  };

  onStartNewRoundClick = () => {
    const { startNewRound: startRound, version, crowdSaleAddress, userLocalPublicAddress, projectid, currentRoundNumber } = this.props || {};
    const roundNumber = currentRoundNumber === "4" ? 2 : currentRoundNumber === "0" ? 0 : parseInt(currentRoundNumber, 10) - 1;
    startRound(version, crowdSaleAddress, userLocalPublicAddress, projectid, roundNumber);
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

  onEditClick = () => {
    const { history } = this.props || {};
    history.push("/registration");
  };

  isPermissioned = () => {
    const { signinStatusFlag, ownerAddress, userLocalPublicAddress } = this.props || {};
    return signinStatusFlag === 5 && ownerAddress === userLocalPublicAddress;
  };

  // onWithdrawAmountChange = e => {
  //   this.setState({ withdrawableAmount: e.target.value });
  // };

  // onTitleTextChange = e => {
  //   this.setState({ titleText: e.target.value });
  // };

  // onAmountTextChange = e => {
  //   this.setState({ amountText: e.target.value });
  // };

  // onDescriptionTextChange = e => {
  //   this.setState({ descriptionText: e.target.value });
  // };

  onWithdrawAmountClick = () => {
    const { version, withdrawAmount: withdrawAmountClick, userLocalPublicAddress, pollFactoryAddress, withdrawableAmount } = this.props || {};
    withdrawAmountClick(version, pollFactoryAddress, userLocalPublicAddress, withdrawableAmount);
  };

  onChangeXfrTitle = e => {
    const { xfrTitleChanged: titleChange } = this.props || {};
    titleChange(e.target.value);
  };

  onChangeXfrAmount = e => {
    const { xfrAmountChanged: amountChange } = this.props || {};
    amountChange(e.target.value);
  };

  onChangeXfrDescription = e => {
    const { xfrDescriptionChanged: descriptionChange } = this.props || {};
    descriptionChange(e.target.value);
  };

  onChangeWithdrawAmount = e => {
    console.log("yes");
    const { withdrawAmountChanged: withdrawChange } = this.props || {};
    withdrawChange(e.target.value);
  };

  canDeployXfrPoll = () => {
    const { xfrData, xfrTitleText, xfrAmountText, xfrDescriptionText } = this.props || {};
    const { poll1, poll2 } = xfrData || {};
    const { address: poll1Address } = poll1 || {};
    const { address: poll2Address } = poll2 || {};
    return (
      (poll1Address === "0x0000000000000000000000000000000000000000" || poll2Address === "0x0000000000000000000000000000000000000000") &&
      xfrTitleText !== "" &&
      xfrAmountText !== "" &&
      xfrDescriptionText !== ""
    );
  };

  canShowXfrPoll = () => {
    const { xfrData } = this.props || {};
    const { poll1, poll2 } = xfrData || {};
    const { address: poll1Address } = poll1 || {};
    const { address: poll2Address } = poll2 || {};
    return poll1Address === "0x0000000000000000000000000000000000000000" || poll2Address === "0x0000000000000000000000000000000000000000";
  };

  canWithdrawXfrAmount = () => {
    const { xfrData, xfrRejectionPercent, tokensUnderGovernance } = this.props || {};
    const { poll1, poll2 } = xfrData || {};
    const { consensus: poll1Consensus, endTime: poll1EndTime } = poll1 || {};
    const { consensus: poll2Consensus, endTime: poll2EndTime } = poll2 || {};
    return (
      (parseFloat(xfrRejectionPercent) > parseFloat(poll1Consensus) / parseFloat(tokensUnderGovernance) &&
        new Date() > new Date(poll1EndTime * 1000)) ||
      (parseFloat(xfrRejectionPercent) > parseFloat(poll2Consensus) / parseFloat(tokensUnderGovernance) && new Date() > new Date(poll2EndTime * 1000))
    );
  };

  getWithdrawableXfrAmount = () => {
    const { xfrData, xfrRejectionPercent, tokensUnderGovernance } = this.props || {};
    const { poll1, poll2 } = xfrData || {};
    const { consensus: poll1Consensus, endTime: poll1EndTime, amount: poll1RequestedAmount } = poll1 || {};
    const { consensus: poll2Consensus, endTime: poll2EndTime, amount: poll2RequestedAmount } = poll2 || {};
    let totalAmount = 0;
    if (
      parseFloat(xfrRejectionPercent) > parseFloat(poll1Consensus) / parseFloat(tokensUnderGovernance) &&
      new Date() > new Date(poll1EndTime * 1000)
    ) {
      totalAmount += formatFromWei(poll1RequestedAmount, 3);
    }
    if (
      parseFloat(xfrRejectionPercent) > parseFloat(poll2Consensus) / parseFloat(tokensUnderGovernance) &&
      new Date() > new Date(poll2EndTime * 1000)
    ) {
      totalAmount += formatFromWei(poll2RequestedAmount, 3);
    }
    return totalAmount;
  };

  onDeployXfrClick = () => {
    const {
      version,
      deployXfrPoll: deployXfrPollClick,
      userLocalPublicAddress,
      pollFactoryAddress,
      projectid,
      xfrTitleText,
      xfrAmountText,
      xfrDescriptionText
    } = this.props || {};
    deployXfrPollClick(version, pollFactoryAddress, userLocalPublicAddress, xfrAmountText, xfrTitleText, xfrDescriptionText, projectid);
  };

  onWithdrawXfrAmountClick = () => {
    const { version, withdrawXfrAmount: withdrawXfrAmountClick, userLocalPublicAddress, pollFactoryAddress } = this.props || {};
    withdrawXfrAmountClick(version, pollFactoryAddress, userLocalPublicAddress);
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
      xfrDetails,
      tokensUnderGovernance,
      startNewRoundButtonSpinning,
      deployTapPollButtonSpinning,
      incrementTapButtonSpinning,
      withdrawButtonSpinning,
      currentWithdrawableAmount,
      deployXfrButtonSpinning,
      withdrawXfrButtonSpinning,
      xfrTitleText,
      xfrDescriptionText,
      xfrAmountText,
      withdrawableAmount
    } = this.props || {};
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
          <Col xs={12} lg={6}>
            <IssuerWithdrawCard
              currentWithdrawableAmount={formatFromWei(currentWithdrawableAmount, 3)}
              isPermissioned={this.isPermissioned()}
              withdrawButtonSpinning={withdrawButtonSpinning}
              onWithdrawAmountClick={this.onWithdrawAmountClick}
              inputText={withdrawableAmount}
              onChange={this.onChangeWithdrawAmount}
            />
          </Col>
        </Row>
        {this.canShowXfrPoll() ? (
          <Row className="push--top">
            <Col xs={12} lg={6}>
              <XfrForm
                titleText={xfrTitleText}
                onTitleTextChange={this.onChangeXfrTitle}
                amountText={xfrAmountText}
                onAmountTextChange={this.onChangeXfrAmount}
                descriptionText={xfrDescriptionText}
                onDescriptionTextChange={this.onChangeXfrDescription}
                isPermissioned={this.isPermissioned()}
                canDeployXfrPoll={this.canDeployXfrPoll()}
                deployXfrButtonSpinning={deployXfrButtonSpinning}
                onDeployXfrClick={this.onDeployXfrClick}
                canWithdrawXfrAmount={this.canWithdrawXfrAmount()}
                withdrawXfrButtonSpinning={withdrawXfrButtonSpinning}
                onWithdrawXfrAmountClick={this.onWithdrawXfrAmountClick}
                getWithdrawableXfrAmount={this.getWithdrawableXfrAmount()}
              />
            </Col>
          </Row>
        ) : null}
        <Row className="push--top">
          <Col xs={12} lg={6}>
            <IssuerFundReq data={xfrData} details={xfrDetails} tokensUnderGovernance={tokensUnderGovernance} />
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
  const {
    startNewRoundButtonSpinning,
    incrementTapButtonSpinning,
    deployTapPollButtonSpinning,
    currentWithdrawableAmount,
    withdrawButtonSpinning,
    withdrawXfrButtonSpinning,
    deployXfrButtonSpinning,
    xfrTitleText,
    xfrDescriptionText,
    xfrAmountText,
    withdrawableAmount
  } = issuerDetailGovernanceReducer || {};
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
    deployTapPollButtonSpinning,
    currentWithdrawableAmount,
    withdrawButtonSpinning,
    withdrawXfrButtonSpinning,
    deployXfrButtonSpinning,
    xfrTitleText,
    xfrDescriptionText,
    xfrAmountText,
    withdrawableAmount
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
      withdrawAmount,
      getCurrentWithdrawableAmount,
      xfrAmountChanged,
      xfrDescriptionChanged,
      xfrTitleChanged,
      withdrawAmountChanged
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuerDetailGovernance);
