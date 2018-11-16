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
  withdrawAmountChanged,
  xfr1DescriptionChangedAction,
  xfr2DescriptionChangedAction,
  onEditXfr1DescriptionClick,
  onEditXfr2DescriptionClick,
  editXfr1Description,
  editXfr2Description
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
import {
  formatFromWei,
  formatCurrencyNumber,
  formatDate,
  significantDigits,
  formatRateToPrice
} from "../../helpers/common/projectDetailhelperFunctions";
import { fetchPrice } from "../../actions/priceFetchActions/index";
import XfrForm from "../../components/Common/ProjectDetails/XfrForm";
import IssuerWithdrawCard from "../../components/Common/ProjectDetails/IssuerWithdrawCard";
import MasonaryLayout from "../../components/Common/MasonaryLayout";

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
    return change || 0;
  };

  getLastRoundInfo = () => {
    // TODO: get current round and price
    const { roundInfo } = this.props || {};
    const { tokenRate } = roundInfo;
    const { currentRoundNumber } = this.props || {};
    const roundNumber = currentRoundNumber === "4" ? "3" : currentRoundNumber;
    return (
      <div style={{ marginTop: "24px" }}>
        <div className="text-right">Round {roundNumber} price</div>
        <div className="text-right opacity-75">{formatRateToPrice(tokenRate)} ETH</div>
      </div>
    );
  };

  getPrice = () => {
    // TODO: to use external API
    const { tokenTag, prices } = this.props || {};
    const { [tokenTag]: tokenPrice } = prices || {};
    const { price } = tokenPrice || {};
    if (!price) {
      const { roundInfo } = this.props || {};
      const { tokenRate } = roundInfo || {};
      return formatRateToPrice(tokenRate);
    }
    return price;
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
    const roundNumber = currentRoundNumber === "4" ? 2 : currentRoundNumber === "0" ? 0 : parseInt(currentRoundNumber, 10);
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
    const { withdrawAmountChanged: withdrawChange } = this.props || {};
    withdrawChange(e.target.value);
  };

  canDeployXfrPoll = () => {
    const { xfrData, xfrTitleText, xfrAmountText, xfrDescriptionText } = this.props || {};
    const { poll1, poll2 } = xfrData || {};
    const { address: poll1Address, endTime: poll1EndTime } = poll1 || {};
    const { address: poll2Address, endTime: poll2EndTime } = poll2 || {};
    const newDate1 = new Date();
    newDate1.setDate(new Date(poll1EndTime * 1000).getDate() + 3);
    const newDate2 = new Date();
    newDate2.setDate(new Date(poll2EndTime * 1000).getDate() + 3);
    return (
      (poll1Address === "0x0000000000000000000000000000000000000000" ||
        poll2Address === "0x0000000000000000000000000000000000000000" ||
        new Date() > newDate1 ||
        new Date() > newDate2) &&
      xfrTitleText !== "" &&
      xfrAmountText !== "" &&
      xfrDescriptionText !== ""
    );
  };

  canShowXfrPoll = () => {
    const { xfrData } = this.props || {};
    const { poll1, poll2 } = xfrData || {};
    const { address: poll1Address, endTime: poll1EndTime } = poll1 || {};
    const { address: poll2Address, endTime: poll2EndTime } = poll2 || {};
    const newDate1 = new Date();
    newDate1.setDate(new Date(poll1EndTime * 1000).getDate() + 3);
    const newDate2 = new Date();
    newDate2.setDate(new Date(poll2EndTime * 1000).getDate() + 3);
    return (
      poll1Address === "0x0000000000000000000000000000000000000000" ||
      poll2Address === "0x0000000000000000000000000000000000000000" ||
      this.canWithdrawXfrAmount() ||
      new Date() > newDate1 ||
      new Date() > newDate2
    );
  };

  canWithdrawXfrAmount = () => {
    const { xfrData, xfrRejectionPercent, tokensUnderGovernance } = this.props || {};
    const { poll1, poll2 } = xfrData || {};
    const { consensus: poll1Consensus, endTime: poll1EndTime } = poll1 || {};
    const { consensus: poll2Consensus, endTime: poll2EndTime } = poll2 || {};
    const newDate1 = new Date();
    newDate1.setDate(new Date(poll1EndTime * 1000).getDate() + 3);
    const newDate2 = new Date();
    newDate2.setDate(new Date(poll2EndTime * 1000).getDate() + 3);
    return (
      (parseFloat(xfrRejectionPercent) > parseFloat(poll1Consensus) / parseFloat(tokensUnderGovernance) &&
        new Date() > new Date(poll1EndTime * 1000) &&
        new Date() < newDate1) ||
      (parseFloat(xfrRejectionPercent) > parseFloat(poll2Consensus) / parseFloat(tokensUnderGovernance) &&
        new Date() > new Date(poll2EndTime * 1000) &&
        new Date() < newDate2)
    );
  };

  getWithdrawableXfrAmount = () => {
    const { xfrData, xfrRejectionPercent, tokensUnderGovernance } = this.props || {};
    const { poll1, poll2 } = xfrData || {};
    const { consensus: poll1Consensus, endTime: poll1EndTime, amount: poll1RequestedAmount } = poll1 || {};
    const { consensus: poll2Consensus, endTime: poll2EndTime, amount: poll2RequestedAmount } = poll2 || {};
    const newDate1 = new Date();
    newDate1.setDate(new Date(poll1EndTime * 1000).getDate() + 3);
    const newDate2 = new Date();
    newDate2.setDate(new Date(poll2EndTime * 1000).getDate() + 3);
    let totalAmount = 0;
    if (
      parseFloat(xfrRejectionPercent) > parseFloat(poll1Consensus) / parseFloat(tokensUnderGovernance) &&
      new Date() > new Date(poll1EndTime * 1000 && new Date() < newDate1)
    ) {
      totalAmount += formatFromWei(poll1RequestedAmount, 3);
    }
    if (
      parseFloat(xfrRejectionPercent) > parseFloat(poll2Consensus) / parseFloat(tokensUnderGovernance) &&
      new Date() > new Date(poll2EndTime * 1000 && new Date() < newDate1)
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

  onEditXfr1DescriptionClick = () => {
    const { onEditXfr1DescriptionClick: editXfr1DescriptionClick } = this.props || {};
    editXfr1DescriptionClick(true);
  };

  onEditXfr2DescriptionClick = () => {
    const { onEditXfr2DescriptionClick: editXfr2DescriptionClick } = this.props || {};
    editXfr2DescriptionClick(true);
  };

  onXfr1DescriptionChange = e => {
    const { xfr1DescriptionChangedAction: xfr1DescriptionChanged } = this.props || {};
    xfr1DescriptionChanged(e.target.value);
  };

  onXfr2DescriptionChange = e => {
    const { xfr2DescriptionChangedAction: xfr2DescriptionChanged } = this.props || {};
    xfr2DescriptionChanged(e.target.value);
  };

  onSaveXfr1DescriptionClick = xfrAddress => {
    const { editXfr1Description: editXfr1DescriptionClick, projectid, xfr1Description } = this.props || {};
    editXfr1DescriptionClick(projectid, xfrAddress, xfr1Description);
  };

  onSaveXfr2DescriptionClick = xfrAddress => {
    const { editXfr2Description: editXfr2DescriptionClick, projectid, xfr2Description } = this.props || {};
    editXfr2DescriptionClick(projectid, xfrAddress, xfr2Description);
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
      withdrawableAmount,
      startNewRoundButtonTransactionHash,
      deployTapPollButtonTransactionHash,
      incrementTapButtonTransactionHash,
      deployXfrPollTransactionHash,
      withdrawXfrButtonTransactionHash,
      withdrawButtonTransactionHash,
      isXfr1DescriptionEditable,
      isXfr2DescriptionEditable,
      xfr1Description,
      xfr2Description
    } = this.props || {};
    return (
      <Grid>
        <MasonaryLayout columns={2}>
          {/* <Row>
          <Col xs={12} lg={6}> */}
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
            startNewRoundButtonTransactionHash={startNewRoundButtonTransactionHash}
          />
          {/* </Col>
          <Col xs={12} lg={6}> */}
          <IssuerPDetailGovernance
            voteSaturationLimit={capPercent / 100}
            killFrequency="Quarterly"
            killAttemptsLeft={7 - killPollIndex}
            nextKillAttempt={formatDate(this.getNextKillPollStartDate())}
            totalRefundableBalance={formatFromWei(remainingEtherBalance, 2)}
            killConsensus={this.getKillConsensus()}
          />
          {/* </Col>
        </Row> */}

          {/* <Row className="push--top">
          <Col xs={12} lg={6}> */}
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
            deployTapPollButtonTransactionHash={deployTapPollButtonTransactionHash}
            incrementTapButtonTransactionHash={incrementTapButtonTransactionHash}
          />
          {/* </Col>
          <Col xs={12} lg={6}> */}
          <IssuerWithdrawCard
            currentWithdrawableAmount={formatFromWei(currentWithdrawableAmount, 3)}
            isPermissioned={this.isPermissioned()}
            withdrawButtonSpinning={withdrawButtonSpinning}
            onWithdrawAmountClick={this.onWithdrawAmountClick}
            inputText={withdrawableAmount}
            onChange={this.onChangeWithdrawAmount}
            withdrawButtonTransactionHash={withdrawButtonTransactionHash}
          />
          {/* </Col>
        </Row> */}
          {this.canShowXfrPoll() ? (
            // <Row className="push--top">
            //   <Col xs={12} lg={6}>
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
              deployXfrPollTransactionHash={deployXfrPollTransactionHash}
              withdrawXfrButtonTransactionHash={withdrawXfrButtonTransactionHash}
            />
          ) : //   </Col>
          // </Row>
          null}
          {/* <Row className="push--top">
          <Col xs={12} lg={6}> */}
          <IssuerFundReq
            data={xfrData}
            details={xfrDetails}
            tokensUnderGovernance={tokensUnderGovernance}
            onEditXfr1DescriptionClick={this.onEditXfr1DescriptionClick}
            onEditXfr2DescriptionClick={this.onEditXfr2DescriptionClick}
            isXfr1DescriptionEditable={isXfr1DescriptionEditable}
            isXfr2DescriptionEditable={isXfr2DescriptionEditable}
            onXfr1DescriptionChange={this.onXfr1DescriptionChange}
            onXfr2DescriptionChange={this.onXfr2DescriptionChange}
            xfr1Description={xfr1Description}
            xfr2Description={xfr2Description}
            isPermissioned={this.isPermissioned()}
            onSaveXfr1DescriptionClick={this.onSaveXfr1DescriptionClick}
            onSaveXfr2DescriptionClick={this.onSaveXfr2DescriptionClick}
          />
          {/* </Col>
        </Row> */}
        </MasonaryLayout>
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
    withdrawableAmount,
    startNewRoundButtonTransactionHash,
    deployTapPollButtonTransactionHash,
    incrementTapButtonTransactionHash,
    deployXfrPollTransactionHash,
    withdrawXfrButtonTransactionHash,
    withdrawButtonTransactionHash,
    isXfr1DescriptionEditable,
    isXfr2DescriptionEditable,
    xfr1Description,
    xfr2Description
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
    withdrawableAmount,
    startNewRoundButtonTransactionHash,
    deployTapPollButtonTransactionHash,
    incrementTapButtonTransactionHash,
    deployXfrPollTransactionHash,
    withdrawXfrButtonTransactionHash,
    withdrawButtonTransactionHash,
    isXfr1DescriptionEditable,
    isXfr2DescriptionEditable,
    xfr1Description,
    xfr2Description
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
      withdrawAmountChanged,
      xfr1DescriptionChangedAction,
      xfr2DescriptionChangedAction,
      onEditXfr2DescriptionClick,
      onEditXfr1DescriptionClick,
      editXfr2Description,
      editXfr1Description
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuerDetailGovernance);
