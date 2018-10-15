import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ProjectName, PDetailGovernance, TapCard } from "../../components/Common/ProjectDetails";
import { FundReq } from "../../components/Common/ProjectDetails";
import { getRoundTokensSold, buyTokens } from "../../actions/projectCrowdSaleActions/index";
import {Grid, Row, Col} from '../../helpers/react-flexbox-grid';
import {
  getTokenBalance,
  getTokensUnderGovernance,
  getCurrentKillPollIndex,
  getRemainingEtherBalance,
  getTotalSupply,
  getKillConsensus,
  getTapPollConsensus,
  getCurrentTap,
  getXfrData,
  voteInKillPoll
} from "../../actions/projectDetailGovernanceActions/index";

class ProjectDetailGovernance extends Component {
  componentDidMount() {
    const { version, crowdSaleAddress, currentRoundNumber, pollFactoryAddress, daicoTokenAddress } = this.props || {};
    this.props.getRoundTokensSold(version, crowdSaleAddress, currentRoundNumber);
    this.props.getTokenBalance(version, daicoTokenAddress);
    this.props.getTokensUnderGovernance(version, daicoTokenAddress);
    this.props.getCurrentKillPollIndex(version, pollFactoryAddress);
    this.props.getRemainingEtherBalance(version, pollFactoryAddress);
    this.props.getTotalSupply(version, daicoTokenAddress);
    this.props.getKillConsensus(version, pollFactoryAddress);
    this.props.getTapPollConsensus(version, pollFactoryAddress);
    this.props.getCurrentTap(version, pollFactoryAddress);
    this.props.getXfrData(version, pollFactoryAddress);
  }
  getPriceIncrement = () => {
    //to use external api
    return "(+31.23%)";
  };
  lastRoundInfo = () => {
    //get current round and price
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
  buyTokens = () => {
    const { crowdSaleAddress } = this.props || {};
    //TODO need to add how many tokens to buy
    this.props.buyTokens(crowdSaleAddress);
  };
  getPrice = () => {
    //to use external API
    return "0.009861";
  };
  onTradeClick = () => {};
  getRoundText = () => {
    const { currentRoundNumber } = this.props || {};
    const { roundInfo } = this.props || {};
    const { tokenCount, totalTokensSold } = roundInfo || {}; //tokens/wei
    //based on tokens sold
    return `${Math.round(parseFloat(totalTokensSold) * Math.pow(10, -18))} Tokens Sold of ${Math.round(
      parseFloat(tokenCount) * Math.pow(10, -18)
    )} (Round ${currentRoundNumber} of 3)`;
  };
  getVoteShare = () => {
    const { totalMintableSupply, tokenBalance, capPercent } = this.props || {};
    const userShare = (parseFloat(tokenBalance) / parseFloat(totalMintableSupply)) * Math.pow(10, 18);
    return userShare > capPercent / 10000 ? capPercent / 10000 : userShare;
  };
  getNextKillPollStartDate = () => {
    const { killPollIndex, r1EndTime } = this.props || {};
    let endDate = new Date(r1EndTime);
    endDate.setDate(endDate.getDate() + killPollIndex * 90);
    return endDate.toDateString();
  };
  getMyTokenValue = () => {
    const etherPrice = 200;
    const tokenPrice = this.getPrice() * etherPrice;
    const { tokenBalance } = this.props || {};
    return tokenPrice * parseFloat(tokenBalance);
  };

  getMyRefundValue = () => {
    const etherPrice = 200;
    const { remainingEtherBalance, tokenBalance, totalSupply, foundationDetails } = this.props || {};
    let softCap = 0;
    for (let index = 0; index < foundationDetails.length; index++) {
      const { amount } = foundationDetails[index];
      softCap += parseFloat(amount);
    }
    const denom = parseFloat(totalSupply) - softCap;
    return Math.round((parseFloat(tokenBalance) / denom) * parseFloat(remainingEtherBalance) * Math.pow(10, -18) * etherPrice);
  };

  getKillConsensus = () => {
    const { killConsensus, tokensUnderGovernance } = this.props || {};
    return parseFloat(killConsensus) / parseFloat(tokensUnderGovernance);
  };
  onKillClick = () => {
    const { version, pollFactoryAddress } = this.props || {};
    this.props.voteInKillPoll(version, pollFactoryAddress);
    //or revokeVoteInKillPoll();
  };
  getTapPollConsensus = () => {
    const { tapPollConsensus, tokensUnderGovernance } = this.props || {};
    return parseFloat(tapPollConsensus) / parseFloat(tokensUnderGovernance);
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
      xfrData
    } = this.props || {};
    return (
      <Grid>
        <Row>
          <Col xs={12} lg={6}>
            <ProjectName
              projectName={projectName}
              tokenTag={tokenTag}
              price={this.getPrice()}
              roundText={this.getRoundText()}
              priceIncrement={this.getPriceIncrement()}
              description={description}
              urls={urls}
              whitepaper={whitepaper}
              buttonText="Buy"
              secondaryButtonText="Trade"
              buttonVisibility={!isCurrentMember}
              onClick={this.buyTokens}
              onSecondaryClick={this.onTradeClick}
              lastRoundInfo={this.lastRoundInfo()}
            />
          </Col>
          <Col xs={12} lg={6}>
            <PDetailGovernance
              voteSaturationLimit={capPercent / 100}
              killFrequency="Quarterly"
              yourTokens={tokenBalance}
              yourVoteShare={this.getVoteShare()}
              killAttemptsLeft={7 - killPollIndex}
              nextKillAttempt={this.getNextKillPollStartDate()}
              yourTokenValue={this.getMyTokenValue()}
              yourRefundValue={this.getMyRefundValue()}
              totalRefundableBalance={remainingEtherBalance * Math.pow(10, -18)}
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
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { etherCollected, roundInfo } = state.projectCrowdSaleReducer || {};
  const {
    tokenBalance,
    tokensUnderGovernance,
    killPollIndex,
    remainingEtherBalance,
    killConsensus,
    totalSupply,
    tapPollConsensus,
    currentTap,
    xfrData
  } = state.projectDetailGovernanceReducer || {};
  return {
    etherCollected: etherCollected,
    roundInfo: roundInfo,
    tokenBalance: tokenBalance,
    tokensUnderGovernance: tokensUnderGovernance,
    killPollIndex: killPollIndex,
    remainingEtherBalance: remainingEtherBalance,
    totalSupply: totalSupply,
    killConsensus: killConsensus,
    tapPollConsensus: tapPollConsensus,
    currentTap: currentTap,
    xfrData: xfrData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      buyTokens: buyTokens,
      getRoundTokensSold: getRoundTokensSold,
      getTokensUnderGovernance: getTokensUnderGovernance,
      getTokenBalance: getTokenBalance,
      getCurrentKillPollIndex: getCurrentKillPollIndex,
      getRemainingEtherBalance: getRemainingEtherBalance,
      getTotalSupply: getTotalSupply,
      getKillConsensus: getKillConsensus,
      getTapPollConsensus: getTapPollConsensus,
      getCurrentTap: getCurrentTap,
      getXfrData: getXfrData,
      voteInKillPoll: voteInKillPoll
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailGovernance);
