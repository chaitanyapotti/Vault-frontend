import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Warning from "@material-ui/icons/Warning";
import { PDetailCrowdSale, ProjectCrowdSaleName, TokenChart, TimeLine } from "../../components/Common/ProjectDetails";
import { getEtherCollected, getRoundTokensSold, buyTokens } from "../../actions/projectCrowdSaleActions/index";
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
    buyModalOpen: false,
    buyAmount: ""
  };

  handleBuyClose = () => this.setState({ buyModalOpen: false });

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
      checkWhiteList: checkWhiteListStatus
    } = this.props || {};
    etherPriceFetch("ETH");
    fetchEtherCollected(version, pollFactoryAddress);
    fetchRoundTokensSold(version, crowdSaleAddress, 0);
    if (signinStatusFlag > 2) {
      checkWhiteListStatus(version, membershipAddress, userLocalPublicAddress);
    }
  }

  componentDidUpdate(prevProps) {
    const { userLocalPublicAddress: prevAddress } = prevProps || "";
    const { userLocalPublicAddress: localAddress, checkWhiteList: checkWhiteListStatus, version, membershipAddress, signinStatusFlag } =
      this.props || {};
    if (prevAddress !== localAddress && signinStatusFlag > 2) {
      checkWhiteListStatus(version, membershipAddress, localAddress);
    }
  }

  getRoundText = () => {
    const { rounds, roundInfo } = this.props || {};
    const [round1, ...rest] = rounds || {};
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
    const { version, crowdSaleAddress, buyTokens: buyToken, userLocalPublicAddress } = this.props || {};
    const { buyAmount } = this.state || {};
    // // TODO: need to add how many tokens to buy
    buyToken(version, crowdSaleAddress, userLocalPublicAddress, buyAmount, 0);
  };

  buyTokens = () => {
    this.setState({ buyModalOpen: true });
  };

  onBuyAmountChange = e => {
    this.setState({ buyAmount: e.target.value });
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
      buyButtonSpinning
    } = this.props || {};
    const { modalOpen, buyModalOpen, buyAmount } = this.state;
    return (
      <Grid>
        <CUICard style={{ padding: "40px 50px" }}>
          <TimeLine
            fundsCollected={etherCollected}
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
              buyButtonVisibility={isCurrentMember}
              onBuyClick={this.buyTokens}
              buyButtonText="Buy"
            />
          </Col>
          <Col xs={12} lg={6}>
            <PDetailCrowdSale
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
        <AlertModal open={modalOpen} handleClose={this.handleClose} link="/register">
          <div className="text--center text--danger">
            <Warning style={{ width: "2em", height: "2em" }} />
          </div>
          <div className="text--center push--top">You are not registered with us. Please Login to use our App.</div>
        </AlertModal>
        <BuyModal
          open={buyModalOpen}
          onClose={this.handleBuyClose}
          price={getR1Price(this.props)}
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEtherCollected,
      getRoundTokensSold,
      buyTokens,
      onWhiteListClick,
      fetchPrice,
      checkWhiteList
    },
    dispatch
  );

const mapStateToProps = state => {
  const { projectCrowdSaleReducer, signinManagerData, fetchPriceReducer, projectPreStartReducer } = state || {};
  const { etherCollected, roundInfo, buyButtonSpinning } = projectCrowdSaleReducer || {};
  const { prices } = fetchPriceReducer || {};
  const { isVaultMember, userLocalPublicAddress, signinStatusFlag } = signinManagerData || {};
  const { isCurrentMember, buttonSpinning } = projectPreStartReducer || {};
  return {
    isCurrentMember,
    buttonSpinning,
    etherCollected,
    roundInfo,
    isVaultMember,
    userLocalPublicAddress,
    signinStatusFlag,
    prices,
    buyButtonSpinning
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailCrowdSale);
