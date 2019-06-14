import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ProjectGovernanceName,
  PDetailGovernance,
  TapCard,
  FundReq,
  SpendCurve,
  VoteHistogram,
  TokenChart
} from "../../components/Common/ProjectDetails";
import {
  getRoundTokensSold,
  buyTokens,
  getTokenBalance,
  buyAmountChangedAction,
  getEtherCollected
} from "../../actions/projectCrowdSaleActions/index";
import { onWhiteListClick, checkWhiteList } from "../../actions/projectPreStartActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";
import { ensureHttpUrl } from "../../helpers/common/urlFixerInHref";
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
  getVoteHistogramData,
  getUnlockTokensData,
  unlockTokens,
  getKillVoterCount
} from "../../actions/projectDetailGovernanceActions/index";
import {
  formatFromWei,
  formatCurrencyNumber,
  formatMoney,
  formatDate,
  significantDigits,
  pollState,
  daysTookForTapPoll,
  xfrResult,
  xfrWithdrawStatus,
  getNextKillPollStartDate,
  getRoundText,
  getPriceIncrement,
  getPrice,
  getLastRoundInfo,
  getKillPollStartDate,
  getXfrEndDate,
  getEtherScanHashLink,
  getButtonVisibility
} from "../../helpers/common/projectDetailhelperFunctions";
import { fetchPrice } from "../../actions/priceFetchActions/index";
import AlertModal from "../../components/Common/AlertModal";
import BuyModal from "../../components/Common/BuyModal";
import LoadingButton from "../../components/Common/LoadingButton";
import GridData from "../../components/GridData";
import MasonaryLayout from "../../components/Common/MasonaryLayout";
import web3 from "../../helpers/web3";

class ProjectDetailGovernance extends Component {
  state = {
    buyModalOpen: false,
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

  handleBuyClose = () => {
    const { buyAmountChangedAction: buyAmountChanged } = this.props || {};
    buyAmountChanged("");
    this.setState({ buyModalOpen: false });
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
      network,
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
      getVoteHistogramData: fetchVoteHistogramData,
      getUnlockTokensData: fetchUnlockTokensData,
      getEtherCollected: fetchEtherCollected,
      getKillVoterCount: fetchKillVoterCount
    } = this.props || {};
    priceFetch(tokenTag);
    fetchSpendCurveData(version, pollFactoryAddress, crowdSaleAddress, network);
    fetchVoteHistogramData(projectid, network);
    fetchKillPollsHistory(pollFactoryAddress, network);
    fetchTapPollsHistory(pollFactoryAddress, network);
    fetchXfrPollsHistory(pollFactoryAddress, network);
    const roundNumber = currentRoundNumber === "4" ? 2 : currentRoundNumber === "0" ? 0 : parseInt(currentRoundNumber, 10) - 1;
    fetchRoundTokensSold(version, crowdSaleAddress, roundNumber, network);
    fetchTokensUnderGovernance(version, daicoTokenAddress, network);
    fetchCurrentKillPollIndex(version, pollFactoryAddress, network);
    fetchRemainingEtherBalance(version, pollFactoryAddress, network);
    fetchTotalSupply(version, daicoTokenAddress, network);
    fetchKillConsensus(version, pollFactoryAddress, network);
    fetchTapPollConsensus(version, pollFactoryAddress, network);
    fetchCurrentTap(version, pollFactoryAddress, network);
    fetchXfrData(version, pollFactoryAddress, network);
    fetchEtherCollected(version, pollFactoryAddress, network);
    fetchKillVoterCount(version, pollFactoryAddress, network);
    if (signinStatusFlag > 2) {
      checkWhiteListStatus(version, membershipAddress, userLocalPublicAddress, network);
      fetchTokenBalance(version, daicoTokenAddress, userLocalPublicAddress, network);
      fetchKillPollVote(version, pollFactoryAddress, userLocalPublicAddress, network);
      fetchTapPollVote(version, pollFactoryAddress, userLocalPublicAddress, network);
      fetchXfrPollVote(version, pollFactoryAddress, userLocalPublicAddress, network);
      fetchUnlockTokensData(pollFactoryAddress, userLocalPublicAddress, network);
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
      network,
      getTokenBalance: fetchTokenBalance,
      getKillPollVote: fetchKillPollVote,
      getTapPollVote: fetchTapPollVote,
      getXfrPollVote: fetchXfrPollVote,
      getUnlockTokensData: fetchUnlockTokensData
    } = this.props || {};
    if (prevAddress !== localAddress || (prevFlag !== signinStatusFlag && signinStatusFlag > 2)) {
      checkWhiteListStatus(version, membershipAddress, localAddress, network);
      fetchTokenBalance(version, daicoTokenAddress, localAddress, network);
      fetchKillPollVote(version, pollFactoryAddress, localAddress, network);
      fetchTapPollVote(version, pollFactoryAddress, localAddress, network);
      fetchXfrPollVote(version, pollFactoryAddress, localAddress, network);
      fetchUnlockTokensData(pollFactoryAddress, localAddress, network);
    }
  }

  getVoteWeight = () => {
    const { totalMintableSupply, tokenBalance, capPercent } = this.props || {};
    const userShare = significantDigits((parseFloat(tokenBalance) / parseFloat(totalMintableSupply)) * 100, false, 3) || 0;
    return userShare > capPercent / 100 ? capPercent / 100 : userShare;
  };

  getVoteShare = () => {
    const voteWeight = this.getVoteWeight();
    const { collectiveVoteWeight } = this.props || {};
    return significantDigits((parseFloat(voteWeight) * 100) / parseFloat(collectiveVoteWeight)) || 0;
  };

  getMyTokenValue = () => {
    const { prices, tokenBalance, tokenTag, roundInfo } = this.props || {};
    const { ETH } = prices || {};
    const { price: etherPrice } = ETH || {};
    const tokenPrice = getPrice(tokenTag, prices, roundInfo) * parseFloat(etherPrice);
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
    const { version, membershipAddress, onWhiteListClick: whiteListClick, userLocalPublicAddress, isVaultMember, network } = this.props || {};
    if (isVaultMember) {
      whiteListClick(version, "Protocol", membershipAddress, userLocalPublicAddress, network);
    }
  };

  buyTokensOnClick = () => {
    const {
      version,
      crowdSaleAddress,
      buyTokens: buyToken,
      userLocalPublicAddress,
      currentRoundNumber,
      daicoTokenAddress,
      pollFactoryAddress,
      buyAmount,
      network
    } = this.props || {};
    // // TODO: need to add how many tokens to buy
    const roundNumber = currentRoundNumber === "4" ? 2 : parseInt(currentRoundNumber, 10) - 1;
    buyToken(version, crowdSaleAddress, userLocalPublicAddress, buyAmount, roundNumber, daicoTokenAddress, pollFactoryAddress, network);
  };

  buyTokens = () => {
    this.setState({ buyModalOpen: true });
  };

  onBuyAmountChange = e => {
    const { buyAmountChangedAction: buyAmountChanged } = this.props || {};
    buyAmountChanged(e.target.value);
  };

  onKillClick = () => {
    const { version, voteInKillPoll: killVote, userLocalPublicAddress, killVoteData, pollFactoryAddress, network } = this.props || {};
    const { killPollAddress } = killVoteData || {};
    killVote(version, killPollAddress, userLocalPublicAddress, pollFactoryAddress, network);
    // or revokeVoteInKillPoll();
  };

  onRevokeKillClick = () => {
    const { version, revokeVoteInKillPoll: killUnVote, userLocalPublicAddress, killVoteData, pollFactoryAddress, network } = this.props || {};
    const { killPollAddress } = killVoteData || {};
    killUnVote(version, killPollAddress, userLocalPublicAddress, pollFactoryAddress, network);
  };

  onTapClick = () => {
    const { version, voteInTapPoll: tapVote, userLocalPublicAddress, tapVoteData, pollFactoryAddress, network } = this.props || {};
    const { tapPollAddress } = tapVoteData || {};
    tapVote(version, tapPollAddress, userLocalPublicAddress, pollFactoryAddress, network);
    // or revokeVoteInKillPoll();
  };

  onRevokeTapClick = () => {
    const { version, revokeVoteInTapPoll: tapUnVote, userLocalPublicAddress, tapVoteData, pollFactoryAddress, network } = this.props || {};
    const { tapPollAddress } = tapVoteData || {};
    tapUnVote(version, tapPollAddress, userLocalPublicAddress, pollFactoryAddress, network);
  };

  onXfr1Click = () => {
    const { version, voteInXfr1Poll: xfr1Vote, userLocalPublicAddress, xfrData, pollFactoryAddress, network } = this.props || {};
    const { poll1 } = xfrData || {};
    const { address } = poll1 || {};
    xfr1Vote(version, address, userLocalPublicAddress, pollFactoryAddress, network);
  };

  onXfr2Click = () => {
    const { version, voteInXfr2Poll: xfr2Vote, userLocalPublicAddress, xfrData, pollFactoryAddress, network } = this.props || {};
    const { poll2 } = xfrData || {};
    const { address } = poll2 || {};
    xfr2Vote(version, address, userLocalPublicAddress, pollFactoryAddress, network);
  };

  onRevokeXfr1Click = () => {
    const { version, revokeVoteInXfr1Poll: xfr1RevokeVote, userLocalPublicAddress, xfrData, pollFactoryAddress, network } = this.props || {};
    const { poll1 } = xfrData || {};
    const { address } = poll1 || {};
    xfr1RevokeVote(version, address, userLocalPublicAddress, pollFactoryAddress, network);
  };

  onRevokeXfr2Click = () => {
    const { version, revokeVoteInXfr2Poll: xfr2RevokeVote, userLocalPublicAddress, xfrData, pollFactoryAddress, network } = this.props || {};
    const { poll2 } = xfrData || {};
    const { address } = poll2 || {};
    xfr2RevokeVote(version, address, userLocalPublicAddress, pollFactoryAddress, network);
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
    const endDate = new Date(r1EndTime * 1000);
    endDate.setDate(endDate.getDate() + (killPollIndex + 1) * 89);
    return endDate < new Date();
  };

  canKill = () => {
    const { killAcceptancePercent, killVoterCount, etherCollected } = this.props || {};
    return parseFloat(this.getKillConsensus()) > parseFloat(killAcceptancePercent) && killVoterCount > (5 * formatFromWei(etherCollected, 6)) / 100;
  };

  canBuy = () => {
    const { roundInfo } = this.props || {};
    const { tokenCount, totalTokensSold } = roundInfo || "";
    if (totalTokensSold && tokenCount && web3.utils.toBN(totalTokensSold).eq(web3.utils.toBN(tokenCount))) return false;
    return true;
  };

  onKillFinalizeClick = () => {
    const { version, pollFactoryAddress, finalizeKill: killFinalize, userLocalPublicAddress, network } = this.props || {};
    killFinalize(version, pollFactoryAddress, userLocalPublicAddress, network);
  };

  canTapClick = () => {
    const { tapPollConsensus, tokenBalance } = this.props || {};
    return tapPollConsensus !== "No Poll" && parseFloat(tokenBalance) > 0;
  };

  canXfrClick = () => {
    const { tokenBalance } = this.props || {};
    return parseFloat(tokenBalance) > 0;
  };

  unlockTokensClick = () => {
    const { unlockTokensData, unlockTokens: unlockTokensAction, version, userLocalPublicAddress, pollFactoryAddress, network } = this.props || {};
    unlockTokensAction(unlockTokensData, version, userLocalPublicAddress, pollFactoryAddress, network);
    this.handleUnlockTokensClose();
  };

  unlockPollsCount = () => {
    const { unlockTokensData } = this.props || {};
    return unlockTokensData ? unlockTokensData.length : 0;
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
      initialFundRelease,
      startDateTime,
      spendableArrays,
      spentArray,
      xfrDots,
      tapDots,
      spendableDots,
      spentDots,
      dateArray,
      history,
      killAcceptancePercent,
      tapPollConsensus,
      buyButtonTransactionHash,
      whitelistButtonTransactionHash,
      xfr1ButtonTransactionHash,
      xfr2ButtonTransactionHash,
      killButtonTransactionHash,
      tapButtonTransactionHash,
      r1EndTime,
      killFinalizeTransactionHash,
      buyAmount,
      thumbnailUrl,
      daicoTokenAddress,
      pollFactoryAddress,
      rounds,
      foundationDetails,
      prices,
      contributionArray,
      contriArrayReceived,
      unlockTokensLoading,
      killVoterCount,
      etherCollected,
      minimumEtherContribution,
      unlockTokensData,
      network,
      isMembershipRequestPending
    } = this.props || {};
    // const r1Rate = getR1Rate(rounds);
    const price = getPrice(tokenTag, prices, roundInfo) || 0;
    const { buyModalOpen, unlockTokensModalOpen, killPollsHistoryModalOpen, tapPollsHistoryModalOpen, xfrPollsHistoryModalOpen } = this.state;
    const killHistoryData = killPollsHistoryData.map(item => {
      const { address, endTime, consensus } = item || {};
      const dataArray = [
        address,
        pollState(getKillPollStartDate(endTime * 1000), new Date(endTime * 1000)),
        formatDate(new Date(endTime * 1000)),
        significantDigits(consensus)
      ];
      return dataArray;
    });
    const tapHistoryData = tapPollsHistoryData.map(item => {
      const { address, startTime, endTime, consensus } = item || {};
      const dataArray = [address, formatDate(new Date(startTime * 1000)), daysTookForTapPoll(startTime, endTime), significantDigits(consensus)];
      return dataArray;
    });
    const xfrHistoryData = xfrPollsHistoryData.map(item => {
      const { address, startTime, consensus, amount, endTime } = item || {};
      const xfrStartTime = new Date(startTime * 1000);
      const dataArray = [
        address,
        formatDate(xfrStartTime),
        xfrResult(xfrStartTime, getXfrEndDate(startTime), consensus, xfrRejectionPercent),
        100 - significantDigits(consensus),
        xfrWithdrawStatus(amount, startTime, endTime)
      ];
      return dataArray;
    });
    const killOnsensus = parseFloat(this.getKillConsensus()) > parseFloat(killAcceptancePercent);
    const link = getEtherScanHashLink(killFinalizeTransactionHash);
    return (
      <Grid>
        {this.canKill() ? (
          <CUICard className="fnt-ps card-brdr" style={{ padding: "40px 50px", marginBottom: "20px", width: "101.5%" }}>
            <Row>
              <Col lg={6}>
                <div className="txt-xxxl text--primary">Notice</div>
              </Col>
            </Row>
            <Row className="push-half--top">
              <Col lg={12}>
                <div>
                  Current Kill Consensus{" "}
                  <span className="text--secondary">
                    ({this.getKillConsensus()}
                    %)
                  </span>{" "}
                  is greater than kill threshold{" "}
                  <span className="text--secondary">
                    ({killAcceptancePercent}
                    %)
                  </span>{" "}
                  and the number of voters voting for kill <span className="text--secondary">({killVoterCount})</span> is greater than the minimum
                  required voters <span className="text--secondary">({Math.ceil((5 * formatFromWei(etherCollected, 6)) / 100)})</span>. Hence
                  withdrawals and tap increment on this DAICO are temporarily frozen until consensus drops below threshold. If the consensus stays
                  above this value on <span className="text--secondary">{formatDate(getNextKillPollStartDate(killPollIndex, r1EndTime))}</span>, this
                  DAICO will get killed.
                </div>
              </Col>
            </Row>
          </CUICard>
        ) : null}
        {this.killFinish() ? (
          <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
            <Grid>
              <Row>
                <Col lg={12}>
                  <div>
                    {killOnsensus ? (
                      <span>Kill Consensus has exceeded 85%</span>
                    ) : (
                      <span>Current Kill Poll has Failed. Click here to start a new one</span>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div> Click on the button to initiate “KILL” execution</div>
                </Col>
                <Col lg={6}>
                  {killFinalizeTransactionHash !== "" ? (
                    <div className="hli">
                      <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                        <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                          Status
                        </LoadingButton>
                      </a>
                    </div>
                  ) : (
                    <LoadingButton onClick={this.onKillFinalizeClick} loading={killFinalizeButtonSpinning} disabled={!this.killFinish()}>
                      Kill Execute
                    </LoadingButton>
                  )}
                </Col>
              </Row>
            </Grid>
          </CUICard>
        ) : null}
        <MasonaryLayout columns={2}>
          <ProjectGovernanceName
            projectName={projectName}
            tokenTag={tokenTag}
            price={price}
            roundText={getRoundText(roundInfo, currentRoundNumber)}
            daicoTokenAddress={daicoTokenAddress}
            priceIncrement={getPriceIncrement(tokenTag, prices)}
            description={description}
            urls={urls}
            whitepaper={whitepaper}
            lastRoundInfo={getLastRoundInfo(roundInfo, currentRoundNumber)}
            buttonText="Get Whitelisted"
            buttonVisibility={getButtonVisibility(isCurrentMember, isMembershipRequestPending, signinStatusFlag) && currentRoundNumber !== "4"}
            buttonSpinning={buttonSpinning}
            onClick={this.onWhiteListClickInternal}
            signinStatusFlag={signinStatusFlag}
            buyButtonVisibility={isCurrentMember && currentRoundNumber !== "4"}
            onBuyClick={this.buyTokens}
            buyButtonText="Buy"
            buyButtonDisabled={this.canBuy()}
            whitelistButtonTransactionHash={whitelistButtonTransactionHash}
            tradeUrl={this.getTradeUrl()}
            thumbnailUrl={thumbnailUrl}
            currentRoundNumber={currentRoundNumber}
            isCurrentMember={isCurrentMember}
            network={network}
            isMembershipRequestPending={isMembershipRequestPending}
          />
          <PDetailGovernance
            voteSaturationLimit={capPercent / 100}
            yourTokens={formatCurrencyNumber(formatFromWei(tokenBalance), 0)}
            yourVoteWeight={this.getVoteWeight()}
            yourVoteShare={this.getVoteShare()}
            killAttemptsLeft={8 - killPollIndex}
            nextKillAttempt={formatDate(getNextKillPollStartDate(killPollIndex, r1EndTime))}
            yourTokenValue={this.getMyTokenValue()}
            yourRefundValue={this.getMyRefundValue()}
            totalRefundableBalance={formatFromWei(remainingEtherBalance, 2)}
            killConsensus={this.getKillConsensus()}
            unlockTokensData={unlockTokensData}
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
            killButtonTransactionHash={killButtonTransactionHash}
            r1EndTime={r1EndTime}
            pollFactoryAddress={pollFactoryAddress}
            unlockTokensLoading={unlockTokensLoading}
            network={network}
          />
          <TapCard
            currentTapAmount={formatCurrencyNumber(formatFromWei(parseFloat(currentTap) * 86400 * 30, 10))}
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
            tapPollConsensus={tapPollConsensus}
            tapButtonTransactionHash={tapButtonTransactionHash}
            network={network}
          />
          <SpendCurve
            spendableArrays={spendableArrays}
            spentArray={spentArray}
            xfrDots={xfrDots}
            tapDots={tapDots}
            spendableDots={spendableDots}
            spentDots={spentDots}
            dateArray={dateArray}
            initialFundRelease={initialFundRelease}
            startDateTime={startDateTime}
            contributionArray={contributionArray}
            contriArrayReceived={contriArrayReceived}
          />
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
            canXfrClick={this.canXfrClick()}
            xfr1ButtonTransactionHash={xfr1ButtonTransactionHash}
            xfr2ButtonTransactionHash={xfr2ButtonTransactionHash}
            network={network}
          />
          <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
            <VoteHistogram
              voteHistogramData={voteHistogramData}
              totalVotes={totalVotes}
              collectiveVoteWeight={collectiveVoteWeight}
              projectHealth={projectHealth}
            />
          </CUICard>
          <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
            <TokenChart
              rounds={rounds}
              foundationDetails={foundationDetails}
              prices={prices}
              currentRoundNumber={currentRoundNumber}
              roundInfo={roundInfo}
            />
          </CUICard>
        </MasonaryLayout>
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
              columns={["Poll Address", "Deployed On", "Took Time To Complete", "Consensus"]}
            />
          </div>
        </AlertModal>
        <AlertModal open={xfrPollsHistoryModalOpen} handleClose={this.handleXfrPollsHistoryClose}>
          <div>
            <GridData
              rowClickPollHistory
              tableData={xfrHistoryData}
              filter={false}
              columns={["Poll Address", "Deployed On", "Result", "Consensus", "Withdraw Status"]}
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
          buyButtonTransactionHash={buyButtonTransactionHash}
          minimumEtherContribution={minimumEtherContribution}
          network={network}
        />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const {
    projectDetailGovernanceReducer,
    projectPreStartReducer,
    fetchPriceReducer,
    projectCrowdSaleReducer,
    deployerReducer,
    signinManagerData,
    projectGovernanceReducer
  } = state || {};
  const { projectDetails, ts } = deployerReducer || {};
  const { _id: projectid } = projectDetails;
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
    collectiveVoteWeight,
    xfr1ButtonTransactionHash,
    xfr2ButtonTransactionHash,
    killButtonTransactionHash,
    tapButtonTransactionHash,
    killFinalizeTransactionHash,
    unlockTokensData,
    unlockTokensLoading,
    killVoterCount
  } = projectDetailGovernanceReducer || {};
  const { isCurrentMember, buttonSpinning, whitelistButtonTransactionHash, isMembershipRequestPending } = projectPreStartReducer || {};
  const { prices } = fetchPriceReducer || {};
  const { spendableArrays, spentArray, xfrDots, tapDots, spendableDots, spentDots, dateArray, contributionArray, contriArrayReceived } =
    state.deployerReducer || {};
  const { buyButtonTransactionHash, buyAmount } = projectCrowdSaleReducer;
  const { isVaultMember, userLocalPublicAddress, signinStatusFlag, isVaultMembershipChecked } = signinManagerData || {};
  const { currentRoundNumber, treasuryStateNumber } = projectGovernanceReducer || {};
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
    buyButtonSpinning,
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
    collectiveVoteWeight,
    spendableArrays,
    spentArray,
    xfrDots,
    tapDots,
    spendableDots,
    spentDots,
    dateArray,
    buyButtonTransactionHash,
    whitelistButtonTransactionHash,
    xfr1ButtonTransactionHash,
    xfr2ButtonTransactionHash,
    killButtonTransactionHash,
    tapButtonTransactionHash,
    killFinalizeTransactionHash,
    buyAmount,
    contributionArray,
    contriArrayReceived,
    unlockTokensData,
    unlockTokensLoading,
    killVoterCount,
    isMembershipRequestPending
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
      getVoteHistogramData,
      buyAmountChangedAction,
      getUnlockTokensData,
      unlockTokens,
      getEtherCollected,
      getKillVoterCount
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailGovernance);
