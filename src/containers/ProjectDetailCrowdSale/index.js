import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Warning from "@material-ui/icons/Warning";
import { PDetailCrowdSale, ProjectCrowdSaleName, TokenChart, TimeLine } from "../../components/Common/ProjectDetails";
import {
  getEtherCollected,
  getRoundTokensSold,
  buyTokens,
  getTokenBalance,
  finalizeR1,
  buyAmountChangedAction
} from "../../actions/projectCrowdSaleActions/index";
import { onWhiteListClick, checkWhiteList } from "../../actions/projectPreStartActions/index";
import {
  formatFromWei,
  getR1Price,
  getR1Goal,
  getHardCap,
  getSoftCap,
  formatCurrencyNumber
} from "../../helpers/common/projectDetailhelperFunctions";
import { fetchPrice } from "../../actions/priceFetchActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";
import AlertModal from "../../components/Common/AlertModal";
import BuyModal from "../../components/Common/BuyModal";

class ProjectDetailCrowdSale extends Component {
  state = {
    modalOpen: false,
    buyModalOpen: false
  };

  handleBuyClose = () => {
    const { buyAmountChangedAction: buyAmountChanged } = this.props || {};
    buyAmountChanged("");
    this.setState({ buyModalOpen: false });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  componentDidMount() {
    const {
      version,
      pollFactoryAddress,
      crowdSaleAddress,
      getEtherCollected: fetchEtherCollected,
      getRoundTokensSold: fetchRoundTokensSold,
      signinStatusFlag,
      membershipAddress,
      userLocalPublicAddress,
      fetchPrice: etherPriceFetch,
      checkWhiteList: checkWhiteListStatus,
      getTokenBalance: tokenBalance,
      daicoTokenAddress
    } = this.props || {};
    etherPriceFetch("ETH");
    fetchEtherCollected(version, pollFactoryAddress);
    fetchRoundTokensSold(version, crowdSaleAddress, 0);
    if (signinStatusFlag > 2) {
      checkWhiteListStatus(version, membershipAddress, userLocalPublicAddress);
      tokenBalance(version, daicoTokenAddress, userLocalPublicAddress);
    }
  }

  componentDidUpdate(prevProps) {
    const { userLocalPublicAddress: prevAddress, signinStatusFlag: prevFlag } = prevProps || "";
    const {
      userLocalPublicAddress: localAddress,
      getTokenBalance: tokenBalance,
      checkWhiteList: checkWhiteListStatus,
      version,
      membershipAddress,
      signinStatusFlag,
      daicoTokenAddress
    } = this.props || {};
    if (prevAddress !== localAddress || (prevFlag !== signinStatusFlag && signinStatusFlag > 2)) {
      tokenBalance(version, daicoTokenAddress, localAddress);
      checkWhiteListStatus(version, membershipAddress, localAddress);
    }
  }

  getRoundText = () => {
    const { rounds, roundInfo } = this.props || {};
    const [round1] = rounds || {};
    const { tokenCount } = round1 || {}; // tokens/wei
    const { totalTokensSold } = roundInfo || "";
    // based on tokens sold
    return `${formatCurrencyNumber(formatFromWei(totalTokensSold), 0)} Tokens Sold of ${formatCurrencyNumber(
      formatFromWei(tokenCount),
      0
    )} (Round 1 of 3)`;
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
    const { version, crowdSaleAddress, buyTokens: buyToken, userLocalPublicAddress, daicoTokenAddress, pollFactoryAddress, buyAmount } =
      this.props || {};
    // // TODO: need to add how many tokens to buy
    buyToken(version, crowdSaleAddress, userLocalPublicAddress, buyAmount, 0, daicoTokenAddress, pollFactoryAddress);
  };

  buyTokens = () => {
    this.setState({ buyModalOpen: true });
  };

  onBuyAmountChange = e => {
    const { buyAmountChangedAction: buyAmountChanged } = this.props || {};
    buyAmountChanged(e.target.value);
  };

  r1Finish = () => {
    const { r1EndTime, rounds, roundInfo } = this.props || {};
    const [round1] = rounds || {};
    const { tokenCount } = round1 || {}; // tokens/wei
    const { totalTokensSold } = roundInfo || "";
    if (new Date(r1EndTime) < new Date() && parseFloat(totalTokensSold) < parseFloat(tokenCount)) return true;

    return false;
  };

  canBuy = () => {
    const { r1EndTime, rounds, roundInfo } = this.props || {};
    const [round1] = rounds || {};
    const { tokenCount } = round1 || {}; // tokens/wei
    const { totalTokensSold } = roundInfo || "";
    if (new Date(r1EndTime) < new Date() || parseFloat(totalTokensSold) >= parseFloat(tokenCount)) return false;

    return true;
  };

  onR1FinalizeClick = () => {
    const { version, crowdSaleAddress, finalizeR1: r1Finalize, userLocalPublicAddress, projectid } = this.props || {};
    r1Finalize(version, crowdSaleAddress, userLocalPublicAddress, projectid);
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
      etherCollected,
      buttonSpinning,
      signinStatusFlag,
      buyButtonSpinning,
      tokenBalance,
      r1FinalizeButtonSpinning,
      roundInfo,
      whitelistButtonTransactionHash,
      buyButtonTransactionHash,
      r1FinalizeButtonTransactionHash,
      buyAmount
    } = this.props || {};
    console.log(tokenBalance);
    const { modalOpen, buyModalOpen } = this.state;
    return (
      <Grid>
        <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
          <TimeLine
            fundsCollected={formatFromWei(etherCollected, 3)}
            roundGoal={getR1Goal(this.props)}
            startDate={new Date(startDateTime)}
            endDate={new Date(r1EndTime)}
          />
        </CUICard>
        <Row className="push--top">
          <Col xs={12} lg={6}>
            <ProjectCrowdSaleName
              projectName={projectName}
              tokenTag={tokenTag}
              price={getR1Price(this.props)}
              roundText={this.getRoundText()}
              description={description}
              urls={urls}
              whitepaper={whitepaper}
              buttonText="Get Whitelisted"
              buttonVisibility={!isCurrentMember}
              buttonSpinning={buttonSpinning}
              onClick={this.onWhiteListClickInternal}
              signinStatusFlag={signinStatusFlag}
              buyButtonVisibility={isCurrentMember && this.canBuy()}
              onBuyClick={this.buyTokens}
              buyButtonText="Buy"
              r1Finish={this.r1Finish()}
              onR1FinalizeClick={this.onR1FinalizeClick}
              r1FinalizeButtonSpinning={r1FinalizeButtonSpinning}
              whitelistButtonTransactionHash={whitelistButtonTransactionHash}
              r1FinalizeButtonTransactionHash={r1FinalizeButtonTransactionHash}
            />
          </Col>
          <Col xs={12} lg={6}>
            <PDetailCrowdSale
              individualCap={formatFromWei(maximumEtherContribution, 3)}
              voteSaturationLimit={capPercent / 100}
              killFrequency="Quarterly"
              initialTapAmount={formatFromWei(initialTapAmount * 86400 * 30, 3)}
              initialFundRelease={formatFromWei(initialFundRelease, 3)}
              tapIncrementUnit={tapIncrementFactor / 100}
              hardCapCapitalisation={getSoftCap(this.props)}
              dilutedCapitalisation={getHardCap(this.props)}
              tokenDataVisibitlity={isCurrentMember}
              tokenBalance={formatCurrencyNumber(formatFromWei(tokenBalance), 0)}
              buyableTokens={formatCurrencyNumber(getR1Price(this.props) * parseFloat(maximumEtherContribution), 0)}
            />
          </Col>
        </Row>

        <Row className="push--top">
          <Col xs={12} lg={6}>
            <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
              <TokenChart rounds={rounds} foundationDetails={foundationDetails} />
            </CUICard>
          </Col>
        </Row>
        <AlertModal open={modalOpen} handleClose={this.handleClose} link="/register">
          <div className="text--center text--danger">
            <Warning style={{ width: "2em", height: "2em" }} />
          </div>
          <div className="text--center push--top">You are not registered with us. Please Login to use our App.</div>
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
        />
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEtherCollected,
      getRoundTokensSold,
      buyTokens,
      getTokenBalance,
      onWhiteListClick,
      fetchPrice,
      checkWhiteList,
      finalizeR1,
      buyAmountChangedAction
    },
    dispatch
  );

const mapStateToProps = state => {
  const { projectCrowdSaleReducer, signinManagerData, fetchPriceReducer, projectPreStartReducer } = state || {};
  const {
    etherCollected,
    roundInfo,
    buyButtonSpinning,
    tokenBalance,
    r1FinalizeButtonSpinning,
    buyButtonTransactionHash,
    r1FinalizeButtonTransactionHash,
    buyAmount
  } = projectCrowdSaleReducer || {};
  const { prices } = fetchPriceReducer || {};
  const { isVaultMember, userLocalPublicAddress, signinStatusFlag } = signinManagerData || {};
  const { isCurrentMember, buttonSpinning, whitelistButtonTransactionHash } = projectPreStartReducer || {};
  return {
    isCurrentMember,
    buttonSpinning,
    etherCollected,
    roundInfo,
    isVaultMember,
    userLocalPublicAddress,
    signinStatusFlag,
    prices,
    buyButtonSpinning,
    tokenBalance,
    r1FinalizeButtonSpinning,
    whitelistButtonTransactionHash,
    buyButtonTransactionHash,
    r1FinalizeButtonTransactionHash,
    buyAmount
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailCrowdSale);
