import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Warning from "@material-ui/icons/Warning";
import { ProjectGovernanceName, PDetailGovernance, TapCard, FundReq, SpendCurve, VoteHistogram } from "../../components/Common/ProjectDetails";
import { getRoundTokensSold, buyTokens, getTokenBalance } from "../../actions/projectCrowdSaleActions/index";
import { onWhiteListClick, checkWhiteList } from "../../actions/projectPreStartActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";
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
  finalizeKill,
  getKillPollsHistory,
  getTapPollsHistory,
  getXfrPollsHistory,
  getSpendCurveData,
  getVoteHistogramData
} from "../../actions/projectDetailGovernanceActions/index";
import {
  formatFromWei,
  formatCurrencyNumber,
  formatMoney,
  formatDate,
  significantDigits,
  pollState,
  daysTookForTapPoll,
  xfrResult
} from "../../helpers/common/projectDetailhelperFunctions";
import { fetchPrice } from "../../actions/priceFetchActions/index";
import AlertModal from "../../components/Common/AlertModal";
import BuyModal from "../../components/Common/BuyModal";
import LoadingButton from "../../components/Common/LoadingButton";
import GridData from "../../components/GridData";

class ProjectDetailGovernance extends Component {
  state = {
    modalOpen: false,
    buyModalOpen: false,
    buyAmount: "",
    unlockTokensModalOpen: false,
    killPollsHistoryModalOpen: false,
    tapPollsHistoryModalOpen: false,
    xfrPollsHistoryModalOpen: false
  };

  handleUnlockTokensOpen = () => this.setState({ unlockTokensModalOpen: true });

  handleUnlockTokensClose = () => this.setState({ unlockTokensModalOpen: false });

  handleKillPollsHistoryOpen = () => this.setState({ killPollsHistoryModalOpen: true });

  handleKillPollsHistoryClose = () => this.setState({ killPollsHistoryModalOpen: false });

  handleTapPollsHistoryOpen = () => this.setState({ tapPollsHistoryModalOpen: true });

  handleTapPollsHistoryClose = () => this.setState({ tapPollsHistoryModalOpen: false });

  handleXfrPollsHistoryOpen = () => this.setState({ xfrPollsHistoryModalOpen: true });

  handleXfrPollsHistoryClose = () => this.setState({ xfrPollsHistoryModalOpen: false });

  handleBuyClose = () => this.setState({ buyModalOpen: false });

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  componentDidMount() {
    const {
      projectid,
      version,
      crowdSaleAddress,
      currentRoundNumber,
      pollFactoryAddress,
      daicoTokenAddress,
      getRoundTokensSold: fetchRoundTokensSold,
      signinStatusFlag,
      membershipAddress,
      userLocalPublicAddress,
      tokenTag,
      fetchPrice: priceFetch,
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
      getXfrPollVote: fetchXfrPollVote,
      getKillPollsHistory: fetchKillPollsHistory,
      getTapPollsHistory: fetchTapPollsHistory,
      getXfrPollsHistory: fetchXfrPollsHistory,
      getSpendCurveData: fetchSpendCurveData,
      getVoteHistogramData: fetchVoteHistogramData
    } = this.props || {};
    priceFetch("ETH");
    priceFetch(tokenTag);
    // fetchSpendCurveData(version, pollFactoryAddress)
    fetchSpendCurveData(version, pollFactoryAddress);
    fetchVoteHistogramData(projectid);
    fetchKillPollsHistory(projectid);
    fetchTapPollsHistory(projectid);
    fetchXfrPollsHistory(projectid);
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
    // TODO: to use external API
    const { tokenTag, prices } = this.props || {};
    const { [tokenTag]: tokenPrice } = prices || {};
    const { price } = tokenPrice || {};
    if (!price) {
      const { roundInfo } = this.props || {};
      const { tokenRate } = roundInfo || {};
      return 1 / tokenRate;
    }
    return price;
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
    const userShare = (parseFloat(tokenBalance) / parseFloat(totalMintableSupply)) * 100 || 0;
    return userShare > capPercent / 100 ? capPercent / 100 : userShare;
  };

  getNextKillPollStartDate = () => {
    const { killPollIndex, r1EndTime } = this.props || {};
    const endDate = new Date(r1EndTime);
    endDate.setDate(endDate.getDate() + (killPollIndex + 1) * 90);
    return endDate.toDateString();
  };

  getKillPollStartDate = killPollEndDate => {
    const endDate = new Date(killPollEndDate * 1000);
    const startDate = endDate.setDate(endDate.getDate() - 89);
    return new Date(startDate);
  };

  getXfrEndDate = xfrStartDate => {
    const startDate = new Date(xfrStartDate * 1000);
    const endDate = startDate.setDate(startDate.getDate() + 29);
    return new Date(endDate);
  };

  getMyTokenValue = () => {
    const { prices, tokenBalance } = this.props || {};
    const { ETH } = prices || {};
    const { price: etherPrice } = ETH || {};
    const tokenPrice = this.getPrice() * parseFloat(etherPrice);
    return formatMoney(tokenPrice * parseFloat(formatFromWei(tokenBalance)) || 0);
  };

  getMyRefundValue = () => {
    const { prices, remainingEtherBalance, tokenBalance, totalSupply, foundationDetails } = this.props || {};
    const { ETH } = prices || {};
    const { price: etherPrice } = ETH || {};
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
    if (tapPollConsensus === "No Poll") return 0;
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
    const { version, crowdSaleAddress, buyTokens: buyToken, userLocalPublicAddress, currentRoundNumber, daicoTokenAddress } = this.props || {};
    const { buyAmount } = this.state || {};
    // // TODO: need to add how many tokens to buy
    const roundNumber = currentRoundNumber === "4" ? 2 : parseInt(currentRoundNumber, 10) - 1;
    buyToken(version, crowdSaleAddress, userLocalPublicAddress, buyAmount, roundNumber, daicoTokenAddress);
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

  canTapClick = () => {
    const { tapPollConsensus, tokenBalance } = this.props || {};
    console.log(tapPollConsensus);
    return tapPollConsensus !== "No Poll" && parseFloat(tokenBalance) > 0;
  };

  canUnlockTokens = () => {
    const { xfrVoteData, tapVoteData, killVoteData } = this.props || {};
    const { voted: killVoted } = killVoteData || {};
    const { voted: tapVoted } = tapVoteData || {};
    const { voted: xfr1Voted } = xfrVoteData[0] || {};
    const { voted: xfr2Voted } = xfrVoteData[1] || {};
    console.log(killVoted || tapVoted || xfr1Voted || xfr2Voted);
    return killVoted || tapVoted || xfr1Voted || xfr2Voted;
  };

  unlockTokensClick = () => {
    const { xfrVoteData, tapVoteData, killVoteData } = this.props || {};
    const { voted: killVoted } = killVoteData || {};
    const { voted: tapVoted } = tapVoteData || {};
    const { voted: xfr1Voted } = xfrVoteData[0] || {};
    const { voted: xfr2Voted } = xfrVoteData[1] || {};
    if (killVoted) {
      this.onRevokeKillClick();
    }
    if (tapVoted) {
      this.onRevokeTapClick();
    }
    if (xfr1Voted) {
      this.onRevokeXfr1Click();
    }
    if (xfr2Voted) {
      this.onRevokeXfr2Click();
    }
  };

  unlockPollsCount = () => {
    const { xfrVoteData, tapVoteData, killVoteData } = this.props || {};
    let pollCount = 0;
    const { voted: killVoted } = killVoteData || {};
    const { voted: tapVoted } = tapVoteData || {};
    const { voted: xfr1Voted } = xfrVoteData[0] || {};
    const { voted: xfr2Voted } = xfrVoteData[1] || {};
    if (killVoted) {
      pollCount += 1;
    }
    if (tapVoted) {
      pollCount += 1;
    }
    if (xfr1Voted) {
      pollCount += 1;
    }
    if (xfr2Voted) {
      pollCount += 1;
    }
    return pollCount;
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
      roundInfo,
      killPollsHistoryData,
      tapPollsHistoryData,
      xfrPollsHistoryData,
      xfrRejectionPercent,
      voteHistogramData,
      totalVotes,
      collectiveVoteWeight,
      projectHealth,
      spendCurveData,
      initialFundRelease,
      startDateTime,
      history
    } = this.props || {};
    const {
      modalOpen,
      buyModalOpen,
      buyAmount,
      unlockTokensModalOpen,
      killPollsHistoryModalOpen,
      tapPollsHistoryModalOpen,
      xfrPollsHistoryModalOpen
    } = this.state;

    const killHistoryData = killPollsHistoryData.map(item => {
      const { address, endTime, consensus } = item || {};
      const dataArray = [
        address,
        pollState(this.getKillPollStartDate(endTime), new Date(endTime * 1000)),
        formatDate(new Date(endTime * 1000)),
        significantDigits(parseFloat(consensus) / formatFromWei(parseFloat(tokensUnderGovernance), 0))
      ];
      return dataArray;
    });
    const tapHistoryData = tapPollsHistoryData.map(item => {
      const { address, startTime, endTime } = item || {};
      const dataArray = [address, formatDate(new Date(startTime * 1000)), daysTookForTapPoll(startTime, endTime)];
      return dataArray;
    });
    const xfrHistoryData = xfrPollsHistoryData.map(item => {
      const { address, startTime, consensus } = item || {};
      const xfrStartTime = new Date(startTime * 1000);
      const xfrConsensus = significantDigits(parseFloat(consensus) / formatFromWei(parseFloat(tokensUnderGovernance), 0));
      const dataArray = [
        address,
        formatDate(xfrStartTime),
        xfrResult(xfrStartTime, this.getXfrEndDate(startTime), xfrConsensus, xfrRejectionPercent),
        xfrConsensus
      ];
      return dataArray;
    });
    return (
      <Grid>
        {this.killFinish() ? (
          <CUICard style={{ padding: "40px 50px" }}>
            <Grid>
              <Row>
                <Col lg={12}>
                  <div>Kill Consensus has exceeded 80%</div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div> Click on the button to initiate “ KILL ” execution</div>
                </Col>
                <Col lg={6}>
                  <LoadingButton onClick={this.onKillFinalizeClick} loading={killFinalizeButtonSpinning} disabled={!this.killFinish()}>
                    Kill Project
                  </LoadingButton>
                </Col>
              </Row>
            </Grid>
          </CUICard>
        ) : null}
        <Row className="push--top">
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
              canUnlockTokens={this.canUnlockTokens()}
              killVoteStatus={this.getKillVoteStatus()}
              onKillClick={this.onKillClick}
              onRevokeKillClick={this.onRevokeKillClick}
              killButtonSpinning={killButtonSpinning}
              signinStatusFlag={signinStatusFlag}
              onKillFinalizeClick={this.onKillFinalizeClick}
              killFinalizeButtonSpinning={killFinalizeButtonSpinning}
              killFinish={this.killFinish()}
              onUnlockTokensClick={this.handleUnlockTokensOpen}
              onKillPollsHistoryClick={this.handleKillPollsHistoryOpen}
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
              canTapClick={this.canTapClick()}
              onUnlockTokensClick={this.handleUnlockTokensOpen}
              onTapPollsHistoryClick={this.handleTapPollsHistoryOpen}
            />
          </Col>
          <Col xs={12} lg={6}>
            <SpendCurve spendCurveData={spendCurveData} initialFundRelease={initialFundRelease} startDateTime={startDateTime} />
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
              onXfrPollHistoryClick={this.handleXfrPollsHistoryOpen}
            />
          </Col>
          <Col xs={12} lg={6}>
            <VoteHistogram
              voteHistogramData={voteHistogramData}
              totalVotes={totalVotes}
              collectiveVoteWeight={collectiveVoteWeight}
              projectHealth={projectHealth}
            />
          </Col>
        </Row>
        <AlertModal open={modalOpen} handleClose={this.handleClose} link="/register">
          <div className="text--center text--danger">
            <Warning style={{ width: "2em", height: "2em" }} />
          </div>
          <div className="text--center push--top">You are not registered with us. Please Login to use our App.</div>
        </AlertModal>
        <AlertModal
          killButtonSpinning={killButtonSpinning}
          tapButtonSpinning={tapButtonSpinning}
          xfr1ButtonSpinning={xfr1ButtonSpinning}
          xfr2ButtonSpinning={xfr2ButtonSpinning}
          open={unlockTokensModalOpen}
          handleClose={this.handleUnlockTokensClose}
          metamask="metamask"
          onProceedClick={this.unlockTokensClick}
        >
          <div className="text--center push--top">
            You have voted in {this.unlockPollsCount()} polls. You would have to sign {this.unlockPollsCount()} transactions to unlock your tokens.
          </div>
        </AlertModal>
        <AlertModal open={killPollsHistoryModalOpen} handleClose={this.handleKillPollsHistoryClose}>
          <div>
            <GridData
              history={history}
              rowClickPollHistory
              tableData={killHistoryData}
              filter={false}
              columns={["Address", "State", "End Date", "Consensus", { name: "Id", options: { display: false } }]}
            />
          </div>
        </AlertModal>
        <AlertModal open={tapPollsHistoryModalOpen} handleClose={this.handleTapPollsHistoryClose}>
          <div>
            <GridData
              rowClickPollHistory
              tableData={tapHistoryData}
              filter={false}
              columns={["Poll Address", "Deployed On", "Took Time To Complete"]}
            />
          </div>
        </AlertModal>
        <AlertModal open={xfrPollsHistoryModalOpen} handleClose={this.handleXfrPollsHistoryClose}>
          <div>
            <GridData
              rowClickPollHistory
              tableData={xfrHistoryData}
              filter={false}
              columns={["Poll Address", "Deployed On", "Result", "Consensus"]}
            />
          </div>
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
    killFinalizeButtonSpinning,
    killPollsHistoryData,
    tapPollsHistoryData,
    xfrPollsHistoryData,
    voteHistogramData,
    totalVotes,
    collectiveVoteWeight
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
    killPollsHistoryData,
    tapPollsHistoryData,
    xfrPollsHistoryData,
    voteHistogramData,
    totalVotes,
    collectiveVoteWeight
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
      finalizeKill,
      getKillPollsHistory,
      getTapPollsHistory,
      getXfrPollsHistory,
      getSpendCurveData,
      getVoteHistogramData
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailGovernance);
