import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PDetailCrowdSale, ProjectCrowdSaleName, TokenChart, TimeLine } from "../../components/Common/ProjectDetails";
import { getEtherCollected, getRoundTokensSold, buyTokens } from "../../actions/projectCrowdSaleActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";

class ProjectDetailCrowdSale extends Component {
  componentDidMount() {
    const { version, pollFactoryAddress, crowdSaleAddress } = this.props || {};
    this.props.getEtherCollected(version, pollFactoryAddress);
    this.props.getRoundTokensSold(version, crowdSaleAddress);
  }

  // TODO: need to refactor and remove these methods later
  getPrice = () => {
    const { rounds } = this.props || {};
    const [round1, ...rest] = rounds || {};
    const { tokenRate } = round1 || {}; // tokens/wei
    return 1 / parseInt(tokenRate, 10);
  };

  getR1Goal = () => {
    const { rounds } = this.props || {};
    const [round1, ...rest] = rounds || {};
    const { tokenRate, tokenCount } = round1 || {}; // tokens/wei
    return Math.round(parseInt(tokenCount, 10) / parseInt(tokenRate, 10) / Math.pow(10, 18));
  };

  getRoundText = () => {
    const { rounds, roundInfo } = this.props || {};
    const [round1, ...rest] = rounds || {};
    const { tokenCount } = round1 || {}; // tokens/wei
    const { totalTokensSold } = roundInfo || "";
    // based on tokens sold
    return `${Math.round(parseFloat(totalTokensSold) * Math.pow(10, -18))} Tokens Sold of ${Math.round(
      parseFloat(tokenCount) * Math.pow(10, -18)
    )} (Round 1 of 3)`;
  };

  getR3Price = () => {
    const { rounds } = this.props || {};
    const round3 = [...rounds].pop() || {};
    const { tokenRate } = round3 || {}; // tokens/wei
    return 1 / parseInt(tokenRate, 10);
  };

  getSoftCap = () => {
    // TODO: For now using ether.. when ether price is brought, it is implemented, convert to $
    const etherPrice = "200"; // dollars
    const { rounds } = this.props || {};
    let softCap = 0;
    for (let index = 0; index < rounds.length; index++) {
      const { tokenCount } = rounds[index];
      softCap += parseFloat(tokenCount);
    }
    return Math.round(softCap * this.getR3Price() * Math.pow(10, -18) * parseFloat(etherPrice)).toString();
  };

  getHardCap = () => {
    const etherPrice = "200"; // dollars
    const { totalMintableSupply } = this.props || {};
    const hardCap = parseFloat(totalMintableSupply) * this.getR3Price() * etherPrice * Math.pow(10, -18);
    return Math.round(hardCap).toString();
  };

  buyTokens = () => {
    const { crowdSaleAddress } = this.props || {};
    // TODO: need to add how many tokens to buy
    this.props.buyTokens(crowdSaleAddress);
  };

  render() {
    const {
      projectName,
      tokenTag,
      description,
      urls,
      whitepaper,
      maximumEtherContribution,
      capPercent,
      initialTapAmount,
      initialFundRelease,
      tapIncrementFactor,
      isCurrentMember,
      rounds,
      foundationDetails,
      startDateTime,
      r1EndTime,
      etherCollected
    } = this.props || {};
    return (
      <Grid>
        <CUICard style={{ padding: "40px 50px" }}>
          <TimeLine fundsCollected={etherCollected} roundGoal={this.getR1Goal()} startDate={new Date(startDateTime)} endDate={new Date(r1EndTime)} />
        </CUICard>
        <Row className="push--top">
          <Col xs={12} lg={6}>
            <ProjectCrowdSaleName
              projectName={projectName}
              tokenTag={tokenTag}
              price={this.getPrice()}
              roundText={this.getRoundText()}
              description={description}
              urls={urls}
              whitepaper={whitepaper}
              buttonText="Buy"
              buttonVisibility={!isCurrentMember}
              onClick={this.buyTokens}
            />
          </Col>
          <Col xs={12} lg={6}>
            <PDetailCrowdSale
              individualCap={parseFloat(maximumEtherContribution) / Math.pow(10, 18)}
              voteSaturationLimit={capPercent / 100}
              killFrequency="Quarterly"
              initialTapAmount={(parseInt(initialTapAmount, 10) * 86400 * 30) / Math.pow(10, 18)}
              initialFundRelease={parseInt(initialFundRelease, 10) / Math.pow(10, 18)}
              tapIncrementUnit={tapIncrementFactor}
              hardCapCapitalisation={this.getSoftCap()}
              dilutedCapitalisation={this.getHardCap()}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col xs={12} lg={6}>
            <CUICard style={{ padding: "40px 50px" }}>
              <TokenChart rounds={rounds} foundationDetails={foundationDetails} />
            </CUICard>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEtherCollected,
      getRoundTokensSold,
      buyTokens
    },
    dispatch
  );

const mapStateToProps = state => {
  const { projectCrowdSaleReducer } = state || {};
  const { etherCollected, roundInfo } = projectCrowdSaleReducer || {};
  return {
    etherCollected,
    roundInfo
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailCrowdSale);
