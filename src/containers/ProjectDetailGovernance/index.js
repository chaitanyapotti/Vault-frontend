import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ProjectName, PDetailGovernance, TapCard } from "../../components/Common/ProjectDetails";
import { FundReq } from "../../components/Common/ProjectDetails";
import { getRoundTokensSold, buyTokens } from "../../actions/projectCrowdSaleActions/index";

class ProjectDetailGovernance extends Component {
  componentDidMount() {
    const { version, crowdSaleAddress, currentRoundNumber } = this.props || {};
    this.props.getRoundTokensSold(version, crowdSaleAddress, currentRoundNumber);
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
  render() {
    const { projectName, tokenTag, description, urls, whitepaper, capPercent, isCurrentMember } = this.props || {};
    return (
      <div>
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
        <PDetailGovernance
          voteSaturationLimit={capPercent / 100}
          killFrequency="Quarterly"
          yourTokens
          yourVoteShare
          killAttemptsLeft
          nextKillAttempt
          yourTokenValue
          yourRefundValue
          totalRefundableBalance
          killConsensus
          onKillClick
        />
        <TapCard currentTapAmount tapIncrementUnit incrementApproval />
        {/* <FundReq reqTypes /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { etherCollected, roundInfo } = state.projectCrowdSaleReducer || {};
  return {
    etherCollected: etherCollected,
    roundInfo: roundInfo
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      buyTokens: buyTokens,
      getRoundTokensSold: getRoundTokensSold
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailGovernance);
