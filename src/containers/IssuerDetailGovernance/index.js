import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUICard } from "../../helpers/material-ui";
import { IssuerGovernanceName, IssuerPDetailGovernance, IssuerTapCard, IssuerFundReq, TokenChart } from "../../components/Common/ProjectDetails";
import { getRoundTokensSold, buyTokens, getTokenBalance, getEtherCollected } from "../../actions/projectCrowdSaleActions/index";
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
  finalizeKill,
  getKillVoterCount,
  getKillPollsHistory,
  getTapPollsHistory,
  getXfrPollsHistory
} from "../../actions/projectDetailGovernanceActions/index";
import {
  formatFromWei,
  formatCurrencyNumber,
  formatDate,
  significantDigits,
  formatRateToPrice,
  secondsToDhms,
  getNextKillPollStartDate,
  getRoundText,
  getPriceIncrement,
  getPrice,
  getLastRoundInfo,
  pollState,
  daysTookForTapPoll,
  xfrResult,
  xfrWithdrawStatus,
  getKillPollStartDate,
  getXfrEndDate
} from "../../helpers/common/projectDetailhelperFunctions";
import GridData from "../../components/GridData";
import { fetchPrice } from "../../actions/priceFetchActions/index";
import XfrForm from "../../components/Common/ProjectDetails/XfrForm";
import IssuerWithdrawCard from "../../components/Common/ProjectDetails/IssuerWithdrawCard";
import MasonryLayout from "../../components/Common/MasonaryLayout";
import web3 from "../../helpers/web3";
import AlertModal from "../../components/Common/AlertModal";

class IssuerDetailGovernance extends Component {
  componentDidMount() {
    const {
      version,
      crowdSaleAddress,
      currentRoundNumber,
      pollFactoryAddress,
      daicoTokenAddress,
      tokenTag,
      network,
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
      getCurrentWithdrawableAmount: fetchCurrentWithdrawableAmount,
      getKillVoterCount: fetchKillVoterCount,
      getKillPollsHistory: fetchKillPollsHistory,
      getTapPollsHistory: fetchTapPollsHistory,
      getXfrPollsHistory: fetchXfrPollsHistory,
      getEtherCollected: fetchEtherCollected
    } = this.props || {};
    priceFetch(tokenTag);
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
    fetchCurrentWithdrawableAmount(version, pollFactoryAddress, network);
    fetchKillVoterCount(version, pollFactoryAddress, network);
    fetchKillPollsHistory(pollFactoryAddress, network);
    fetchTapPollsHistory(pollFactoryAddress, network);
    fetchXfrPollsHistory(pollFactoryAddress, network);
    fetchEtherCollected(version, pollFactoryAddress, network);
  }

  state = {
    killPollsHistoryModalOpen: false,
    tapPollsHistoryModalOpen: false,
    xfrPollsHistoryModalOpen: false
  };

  handleKillPollsHistoryOpen = () => this.setState({ killPollsHistoryModalOpen: true });

  handleKillPollsHistoryClose = () => this.setState({ killPollsHistoryModalOpen: false });

  handleTapPollsHistoryOpen = () => this.setState({ tapPollsHistoryModalOpen: true });

  handleTapPollsHistoryClose = () => this.setState({ tapPollsHistoryModalOpen: false });

  handleXfrPollsHistoryOpen = () => this.setState({ xfrPollsHistoryModalOpen: true });

  handleXfrPollsHistoryClose = () => this.setState({ xfrPollsHistoryModalOpen: false });

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
    return totalTokensSold && tokenCount && web3.utils.toBN(totalTokensSold).eq(web3.utils.toBN(tokenCount)) && currentRoundNumber <= "3";
  };

  onStartNewRoundClick = () => {
    const { startNewRound: startRound, version, crowdSaleAddress, userLocalPublicAddress, projectid, currentRoundNumber, network } = this.props || {};
    const roundNumber = currentRoundNumber === "4" ? 2 : currentRoundNumber === "0" ? 0 : parseInt(currentRoundNumber, 10);
    startRound(version, crowdSaleAddress, userLocalPublicAddress, projectid, roundNumber, network);
  };

  canKill = () => {
    const { killAcceptancePercent, killVoterCount, etherCollected } = this.props || {};
    return parseFloat(this.getKillConsensus()) > parseFloat(killAcceptancePercent) && killVoterCount > (5 * formatFromWei(etherCollected, 6)) / 100;
  };

  canIncreaseTap = () => {
    const { tapAcceptancePercent, tapPollConsensus, tokensUnderGovernance } = this.props || {};
    const consensus = parseFloat(tapPollConsensus) / parseFloat(tokensUnderGovernance);
    return consensus > parseFloat(tapAcceptancePercent) && !this.canKill();
  };

  canDeployTapPoll = () => {
    const { tapPollConsensus } = this.props || {};
    return tapPollConsensus === "No Poll";
  };

  onDeployTapPollClick = () => {
    const { version, deployTapPoll: deployTap, userLocalPublicAddress, pollFactoryAddress, network } = this.props || {};
    deployTap(version, pollFactoryAddress, userLocalPublicAddress, network);
  };

  onIncrementTapClick = () => {
    const { version, incrementTap: incrementTapAmount, userLocalPublicAddress, pollFactoryAddress, network } = this.props || {};
    incrementTapAmount(version, pollFactoryAddress, userLocalPublicAddress, network);
  };

  onEditClick = () => {
    const { history } = this.props || {};
    history.push("/registration");
  };

  isPermissioned = () => {
    const { signinStatusFlag, ownerAddress, userLocalPublicAddress } = this.props || {};
    return signinStatusFlag === 5 && ownerAddress === userLocalPublicAddress;
  };

  onWithdrawAmountClick = () => {
    const { version, withdrawAmount: withdrawAmountClick, userLocalPublicAddress, pollFactoryAddress, withdrawableAmount, network } =
      this.props || {};
    withdrawAmountClick(version, pollFactoryAddress, userLocalPublicAddress, withdrawableAmount, network);
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
    const { xfrTitleText, xfrAmountText, xfrDescriptionText } = this.props || {};
    return this.canShowXfrPoll() && xfrTitleText !== "" && xfrAmountText !== "" && xfrDescriptionText !== "";
  };

  canShowXfrPoll = () => {
    const { xfrData } = this.props || {};
    const { poll1, poll2 } = xfrData || {};
    const { address: poll1Address, endTime: poll1EndTime } = poll1 || {};
    const { address: poll2Address, endTime: poll2EndTime } = poll2 || {};
    const newDate1 = new Date(poll1EndTime * 1000);
    newDate1.setDate(newDate1.getDate() + 3);
    const newDate2 = new Date(poll2EndTime * 1000);
    newDate2.setDate(newDate2.getDate() + 3);
    return (
      poll1Address === "0x0000000000000000000000000000000000000000" ||
      poll2Address === "0x0000000000000000000000000000000000000000" ||
      new Date() > newDate1 ||
      new Date() > newDate2
    );
  };

  canWithdrawXfrAmount = () => {
    const { xfrData, xfrRejectionPercent, tokensUnderGovernance } = this.props || {};
    const { poll1, poll2 } = xfrData || {};
    const { consensus: poll1Consensus, endTime: poll1EndTime } = poll1 || {};
    const { consensus: poll2Consensus, endTime: poll2EndTime } = poll2 || {};
    const newDate1 = new Date(poll1EndTime * 1000);
    newDate1.setDate(newDate1.getDate() + 3);
    const newDate2 = new Date(poll2EndTime * 1000);
    newDate2.setDate(newDate2.getDate() + 3);
    return (
      ((parseFloat(xfrRejectionPercent) > parseFloat(poll1Consensus) / parseFloat(tokensUnderGovernance) &&
        new Date() > new Date(poll1EndTime * 1000) &&
        new Date() < newDate1) ||
        (parseFloat(xfrRejectionPercent) > parseFloat(poll2Consensus) / parseFloat(tokensUnderGovernance) &&
          new Date() > new Date(poll2EndTime * 1000) &&
          new Date() < newDate2)) &&
      !this.canKill()
    );
  };

  getWithdrawableXfrAmount = () => {
    const { xfrData, xfrRejectionPercent, tokensUnderGovernance } = this.props || {};
    const { poll1, poll2 } = xfrData || {};
    const { consensus: poll1Consensus, endTime: poll1EndTime, amount: poll1RequestedAmount } = poll1 || {};
    const { consensus: poll2Consensus, endTime: poll2EndTime, amount: poll2RequestedAmount } = poll2 || {};
    const newDate1 = new Date(poll1EndTime * 1000);
    newDate1.setDate(newDate1.getDate() + 3);
    const newDate2 = new Date(poll2EndTime * 1000);
    newDate2.setDate(newDate2.getDate() + 3);
    let totalAmount = 0;
    let amount1 = 0;
    let amount2 = 0;
    let xfrCount = 0;
    if (
      parseFloat(xfrRejectionPercent) > parseFloat(poll1Consensus) / parseFloat(tokensUnderGovernance) &&
      new Date() > new Date(poll1EndTime * 1000) &&
      new Date() < newDate1
    ) {
      amount1 += formatFromWei(poll1RequestedAmount, 3);
      xfrCount += 1;
    }
    if (
      parseFloat(xfrRejectionPercent) > parseFloat(poll2Consensus) / parseFloat(tokensUnderGovernance) &&
      new Date() > new Date(poll2EndTime * 1000) &&
      new Date() < newDate1
    ) {
      amount2 += formatFromWei(poll2RequestedAmount, 3);
      xfrCount += 1;
    }
    totalAmount = amount1 + amount2;
    const partItem = new Date() <= newDate2 ? `and ${secondsToDhms(new Date() - newDate2)} respectively` : "";
    const text = `You are currently entitled to withdraw ${totalAmount} ETH from 
    ${xfrCount} XFRs. Your entitlement will expire in ${secondsToDhms(new Date() - newDate1)} ${partItem}`;
    return { totalAmount, amount1, amount2, text };
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
      xfrDescriptionText,
      network
    } = this.props || {};
    deployXfrPollClick(version, pollFactoryAddress, userLocalPublicAddress, xfrAmountText, xfrTitleText, xfrDescriptionText, projectid, network);
  };

  onWithdrawXfrAmountClick = () => {
    const { version, withdrawXfrAmount: withdrawXfrAmountClick, userLocalPublicAddress, pollFactoryAddress, network } = this.props || {};
    withdrawXfrAmountClick(version, pollFactoryAddress, userLocalPublicAddress, network);
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
      xfr2Description,
      thumbnailUrl,
      rounds,
      foundationDetails,
      currentRoundNumber,
      prices,
      roundInfo,
      killAcceptancePercent,
      killVoterCount,
      etherCollected,
      killPollsHistoryData,
      tapPollsHistoryData,
      xfrPollsHistoryData,
      xfrRejectionPercent,
      history,
      r1EndTime,
      signinStatusFlag,
      ownerAddress,
      userLocalPublicAddress,
      tapPollConsensus,
      daicoTokenAddress,
      pollFactoryAddress,
      network
    } = this.props || {};
    const { killPollsHistoryModalOpen, tapPollsHistoryModalOpen, xfrPollsHistoryModalOpen } = this.state;
    const price = getPrice(tokenTag, prices, roundInfo) || 0;
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
    return (
      <Grid>
        {this.canKill() ? (
          <CUICard className="card-brdr" style={{ padding: "40px 50px", "margin-bottom": "20px" }}>
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
                  withdrawals and tap increment on this DAICO are temporarily frozen until until consensus drops below threshold. If the consensus
                  stays above this value on <span className="text--secondary">{formatDate(getNextKillPollStartDate(killPollIndex, r1EndTime))}</span>,
                  this DAICO will get killed.
                </div>
              </Col>
            </Row>
          </CUICard>
        ) : null}
        <MasonryLayout columns={2}>
          <IssuerGovernanceName
            projectName={projectName}
            tokenTag={tokenTag}
            price={price}
            roundText={getRoundText(roundInfo, currentRoundNumber)}
            priceIncrement={getPriceIncrement(tokenTag, prices)}
            description={description}
            urls={urls}
            whitepaper={whitepaper}
            lastRoundInfo={getLastRoundInfo(roundInfo, currentRoundNumber)}
            buttonText={this.getstartNewRoundText()}
            startNewRoundButtonSpinning={startNewRoundButtonSpinning}
            canStartNewRound={this.canStartNewRound()}
            onClick={this.onStartNewRoundClick}
            isPermissioned={this.isPermissioned()}
            onEditClick={this.onEditClick}
            startNewRoundButtonTransactionHash={startNewRoundButtonTransactionHash}
            thumbnailUrl={thumbnailUrl}
            signinStatusFlag={signinStatusFlag}
            ownerAddress={ownerAddress}
            userLocalPublicAddress={userLocalPublicAddress}
            daicoTokenAddress={daicoTokenAddress}
            network={network}
          />
          <IssuerPDetailGovernance
            voteSaturationLimit={capPercent / 100}
            killFrequency="Quarterly"
            killAttemptsLeft={8 - killPollIndex}
            nextKillAttempt={formatDate(getNextKillPollStartDate(killPollIndex, r1EndTime))}
            totalRefundableBalance={formatFromWei(remainingEtherBalance, 2)}
            killConsensus={this.getKillConsensus()}
            pollFactoryAddress={pollFactoryAddress}
            onKillPollsHistoryClick={this.handleKillPollsHistoryOpen}
            network={network}
          />
          <IssuerTapCard
            currentTapAmount={formatCurrencyNumber(formatFromWei(parseFloat(currentTap) * 86400 * 30, 10))}
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
            signinStatusFlag={signinStatusFlag}
            ownerAddress={ownerAddress}
            userLocalPublicAddress={userLocalPublicAddress}
            tapPollConsensus={tapPollConsensus}
            onTapPollsHistoryClick={this.handleTapPollsHistoryOpen}
            network={network}
          />
          <IssuerWithdrawCard
            currentWithdrawableAmount={formatFromWei(currentWithdrawableAmount, 3)}
            isPermissioned={this.isPermissioned()}
            withdrawButtonSpinning={withdrawButtonSpinning}
            onWithdrawAmountClick={this.onWithdrawAmountClick}
            inputText={withdrawableAmount}
            onChange={this.onChangeWithdrawAmount}
            withdrawButtonTransactionHash={withdrawButtonTransactionHash}
            signinStatusFlag={signinStatusFlag}
            ownerAddress={ownerAddress}
            userLocalPublicAddress={userLocalPublicAddress}
            tapPollConsensus={tapPollConsensus}
            network={network}
          />
          {this.canShowXfrPoll() ? (
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
              deployXfrPollTransactionHash={deployXfrPollTransactionHash}
              signinStatusFlag={signinStatusFlag}
              ownerAddress={ownerAddress}
              userLocalPublicAddress={userLocalPublicAddress}
              network={network}
            />
          ) : (
            <div />
          )}
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
            canWithdrawXfrAmount={this.canWithdrawXfrAmount()}
            withdrawXfrButtonSpinning={withdrawXfrButtonSpinning}
            onWithdrawXfrAmountClick={this.onWithdrawXfrAmountClick}
            getWithdrawableXfrAmount={this.getWithdrawableXfrAmount()}
            withdrawXfrButtonTransactionHash={withdrawXfrButtonTransactionHash}
            signinStatusFlag={signinStatusFlag}
            ownerAddress={ownerAddress}
            userLocalPublicAddress={userLocalPublicAddress}
            tapPollConsensus={tapPollConsensus}
            onXfrPollHistoryClick={this.handleXfrPollsHistoryOpen}
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
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const {
    projectCrowdSaleReducer,
    projectDetailGovernanceReducer,
    projectPreStartReducer,
    issuerDetailGovernanceReducer,
    fetchPriceReducer,
    deployerReducer,
    signinManagerData,
    projectGovernanceReducer
  } = state || {};
  const { projectDetails, ts } = deployerReducer || {};
  const { _id: projectid } = projectDetails;
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
    killFinalizeButtonSpinning,
    killVoterCount,
    killPollsHistoryData,
    tapPollsHistoryData,
    xfrPollsHistoryData
  } = projectDetailGovernanceReducer || {};
  const { isCurrentMember, buttonSpinning, isMembershipRequestPending } = projectPreStartReducer || {};
  const { prices } = fetchPriceReducer || {};
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
    xfr2Description,
    killVoterCount,
    killPollsHistoryData,
    tapPollsHistoryData,
    xfrPollsHistoryData,
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
      editXfr1Description,
      getKillVoterCount,
      getKillPollsHistory,
      getTapPollsHistory,
      getXfrPollsHistory,
      getEtherCollected
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuerDetailGovernance);
