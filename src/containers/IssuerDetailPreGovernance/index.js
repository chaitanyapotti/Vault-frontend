import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IPreGovernanceDetails, IssuerPreGovernanceName, TokenChart, TimeLine } from "../../components/Common/ProjectDetails";
import { getEtherCollected, getRoundTokensSold, finalizeR1 } from "../../actions/projectCrowdSaleActions/index";
import { startR1 } from "../../actions/issuerDetailGovernanceActions/index";
import { formatFromWei, getR1Price, getR1Goal, getHardCap, getSoftCap, formatDate } from "../../helpers/common/projectDetailhelperFunctions";
import { fetchPrice } from "../../actions/priceFetchActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";

class IssuerDetailPreGovernance extends Component {
  componentDidMount() {
    const {
      version,
      pollFactoryAddress,
      crowdSaleAddress,
      getEtherCollected: fetchEtherCollected,
      getRoundTokensSold: fetchRoundTokensSold,
      fetchPrice: etherPriceFetch
    } = this.props || {};
    etherPriceFetch("ETH");
    fetchEtherCollected(version, pollFactoryAddress);
    fetchRoundTokensSold(version, crowdSaleAddress, 0);
  }

  componentDidUpdate(prevProps) {}

  r1Finish = () => {
    const { r1EndTime, rounds, roundInfo } = this.props || {};
    const [round1, ...rest] = rounds || {};
    const { tokenCount } = round1 || {}; // tokens/wei
    const { totalTokensSold } = roundInfo || "";
    if (new Date(r1EndTime) < new Date() && totalTokensSold < tokenCount) return true;

    return false;
  };

  onR1FinalizeClick = () => {
    const { version, crowdSaleAddress, finalizeR1: r1Finalize, userLocalPublicAddress } = this.props || {};
    r1Finalize(version, crowdSaleAddress, userLocalPublicAddress);
  };

  onStartR1Click = () => {
    const { version, crowdSaleAddress, startR1: r1Start, userLocalPublicAddress } = this.props || {};
    r1Start(version, crowdSaleAddress, userLocalPublicAddress);
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
      rounds,
      foundationDetails,
      startDateTime,
      r1EndTime,
      etherCollected,
      signinStatusFlag,
      startR1ButtonSpinning,
      r1FinalizeButtonSpinning,
      currentRoundNumber
    } = this.props || {};
    return (
      <Grid>
        {currentRoundNumber === "1" ? (
          <CUICard style={{ padding: "40px 50px" }}>
            <TimeLine
              fundsCollected={formatFromWei(etherCollected, 3)}
              roundGoal={getR1Goal(this.props)}
              startDate={new Date(startDateTime)}
              endDate={new Date(r1EndTime)}
            />
          </CUICard>
        ) : null}
        <Row className="push--top">
          <Col xs={12} lg={6}>
            <IssuerPreGovernanceName
              projectName={projectName}
              tokenTag={tokenTag}
              price={getR1Price(this.props)}
              roundText="3 Round DAICO"
              description={description}
              urls={urls}
              whitepaper={whitepaper}
              StartRound1Enabled={currentRoundNumber === "0" && new Date() > new Date(startDateTime) && new Date() < new Date(r1EndTime)}
              StartRound1Visibility={
                (currentRoundNumber === "0" && new Date() < new Date(startDateTime)) ||
                (currentRoundNumber === "0" && new Date() > new Date(startDateTime) && new Date() < new Date(r1EndTime))
              }
              startR1ButtonSpinning={startR1ButtonSpinning}
              signinStatusFlag={signinStatusFlag}
              r1Finish={this.r1Finish()}
              onR1FinalizeClick={this.onR1FinalizeClick}
              r1FinalizeButtonSpinning={r1FinalizeButtonSpinning}
              onStartR1Click={this.onStartR1Click}
            />
          </Col>
          <Col xs={12} lg={6}>
            <IPreGovernanceDetails
              startDateTime={formatDate(startDateTime)}
              individualCap={formatFromWei(maximumEtherContribution)}
              voteSaturationLimit={capPercent / 100}
              killFrequency="Quarterly"
              initialTapAmount={formatFromWei(initialTapAmount * 86400 * 30)}
              initialFundRelease={formatFromWei(initialFundRelease)}
              tapIncrementUnit={tapIncrementFactor / 100}
              hardCapCapitalisation={getSoftCap(this.props)}
              dilutedCapitalisation={getHardCap(this.props)}
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
      fetchPrice,
      finalizeR1,
      startR1
    },
    dispatch
  );

const mapStateToProps = state => {
  const { projectCrowdSaleReducer, signinManagerData, fetchPriceReducer } = state || {};
  const { etherCollected, roundInfo, r1FinalizeButtonSpinning, startR1ButtonSpinning } = projectCrowdSaleReducer || {};
  const { prices } = fetchPriceReducer || {};
  const { userLocalPublicAddress, signinStatusFlag } = signinManagerData || {};
  return {
    etherCollected,
    roundInfo,
    userLocalPublicAddress,
    signinStatusFlag,
    prices,
    r1FinalizeButtonSpinning,
    startR1ButtonSpinning
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssuerDetailPreGovernance);
