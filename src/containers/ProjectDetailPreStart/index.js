import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ProjectName, PDetailPreStart, TokenChart } from "../../components/Common/ProjectDetails";
import { onWhiteListClick } from "../../actions/projectPreStartActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";
import { formatDate } from "../../helpers/common/projectDetailhelperFunctions";
import { fetchPrice } from "../../actions/priceFetchActions/index";

class ProjectDetailPreStart extends Component {
  componentDidMount() {
    const { fetchPrice: etherPriceFetch } = this.props || {};
    etherPriceFetch("ETH");
  }

  getPrice = () => {
    const { rounds } = this.props || {};
    const [round1, ...rest] = rounds || {};
    const { tokenRate } = round1 || {}; // tokens/wei
    return 1 / parseFloat(tokenRate, 10);
  };

  getRoundText = () =>
    // Always Constant for all daicos
    "3 Round DAICO";

  getR3Price = () => {
    const { rounds } = this.props || {};
    const round3 = [...rounds].pop() || {};
    const { tokenRate } = round3 || {}; // tokens/wei
    return 1 / parseFloat(tokenRate, 10);
  };

  getSoftCap = () => {
    // TODO: For now using ether.. when ether price is brought, it is implemented, convert to $
    const { rounds, prices, ts } = this.props || {};
    console.log(prices);
    const { ETH: etherPrice } = prices || {};
    let softCap = 0;
    for (let index = 0; index < rounds.length; index += 1) {
      const { tokenCount } = rounds[index];
      softCap += parseFloat(tokenCount);
    }
    return Math.round(softCap * this.getR3Price() * Math.pow(10, -18) * parseFloat(etherPrice)).toString();
  };

  getHardCap = () => {
    const { totalMintableSupply, prices, ts } = this.props || {};
    const { ETH: etherPrice } = prices || {};
    const hardCap = parseFloat(totalMintableSupply) * this.getR3Price() * etherPrice * Math.pow(10, -18);
    return Math.round(hardCap).toString();
  };

  onWhiteListClickInternal = () => {
    const { version, membershipAddress } = this.props || {};
    // this.props.checkWhiteList(version, "Protocol", membershipAddress);
    onWhiteListClick(version, "Protocol", membershipAddress);
  };

  getStartDate = () => {
    const { startDateTime } = this.props || new Date();
    return formatDate(startDateTime);
  };

  render() {
    const {
      projectName,
      tokenTag,
      description,
      urls,
      whitepaper,
      startDateTime,
      maximumEtherContribution,
      capPercent,
      initialTapAmount,
      tapIncrementFactor,
      isCurrentMember,
      rounds,
      foundationDetails
    } = this.props || {};
    return (
      <Grid>
        <Row>
          <Col xs={12} lg={6}>
            <ProjectName
              projectName={projectName}
              priceIncrementFlag={false}
              tokenTag={tokenTag}
              price={this.getPrice()}
              roundText={this.getRoundText()}
              description={description}
              urls={urls}
              whitepaper={whitepaper}
              buttonText="Get Whitelisted"
              buttonVisibility={!isCurrentMember}
              onClick={this.onWhiteListClickInternal}
            />
          </Col>
          <Col xs={12} lg={6}>
            <PDetailPreStart
              icoStartDate={formatDate(startDateTime)}
              individualCap={parseFloat(maximumEtherContribution) / Math.pow(10, 18)}
              voteSaturationLimit={capPercent / 100}
              killFrequency="Quarterly"
              initialTapAmount={(parseFloat(initialTapAmount) * 86400 * 30) / Math.pow(10, 18)}
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
      onWhiteListClick,
      fetchPrice
    },
    dispatch
  );

const mapStateToProps = state => {
  const { projectPreStartReducer, fetchPriceReducer } = state || {};
  const { prices } = fetchPriceReducer || {};
  const { isCurrentMember } = projectPreStartReducer || {};

  return {
    isCurrentMember,
    prices
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailPreStart);
