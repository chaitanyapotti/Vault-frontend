import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Warning from "@material-ui/icons/Warning";
import { ProjectName, PDetailPreStart, TokenChart } from "../../components/Common/ProjectDetails";
import { onWhiteListClick, checkWhiteList } from "../../actions/projectPreStartActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";
import { formatDate, formatRateToPrice, formatFromWei } from "../../helpers/common/projectDetailhelperFunctions";
import { fetchPrice } from "../../actions/priceFetchActions/index";
import AlertModal from "../../components/Common/AlertModal";

class ProjectDetailPreStart extends Component {
  state = {
    modalOpen: false
  };

  handleClose = () => this.setState({ modalOpen: false });

  componentDidMount() {
    const { fetchPrice: etherPriceFetch, checkWhiteList: checkWhiteListStatus, version, membershipAddress, userLocalPublicAddress } =
      this.props || {};
    etherPriceFetch("ETH");
    checkWhiteListStatus(version, membershipAddress, userLocalPublicAddress);
  }

  componentDidUpdate(prevProps) {
    const { userLocalPublicAddress } = prevProps || "";
    const { userLocalPublicAddress: localAddress, checkWhiteList: checkWhiteListStatus, version, membershipAddress } = this.props || {};
    if (userLocalPublicAddress !== localAddress) {
      checkWhiteListStatus(version, membershipAddress, localAddress);
    }
  }

  getPrice = () => {
    const { rounds } = this.props || {};
    const [round1, ...rest] = rounds || {};
    const { tokenRate } = round1 || {}; // tokens/wei
    return formatRateToPrice(tokenRate);
  };

  getRoundText = () =>
    // Always Constant for all daicos
    "3 Round DAICO";

  getR3Price = () => {
    const { rounds } = this.props || {};
    const round3 = [...rounds].pop() || {};
    const { tokenRate } = round3 || {}; // tokens/wei
    return formatRateToPrice(tokenRate);
  };

  getSoftCap = () => {
    const { rounds, prices } = this.props || {};
    const { ETH: etherPrice } = prices || {};
    let softCap = 0;
    for (let index = 0; index < rounds.length; index += 1) {
      const { tokenCount } = rounds[index];
      softCap += parseFloat(tokenCount);
    }
    return formatFromWei(softCap * this.getR3Price() * parseFloat(etherPrice));
  };

  getHardCap = () => {
    const { totalMintableSupply, prices } = this.props || {};
    const { ETH: etherPrice } = prices || {};
    return formatFromWei(parseFloat(totalMintableSupply) * this.getR3Price() * etherPrice);
  };

  onWhiteListClickInternal = () => {
    const { version, membershipAddress, onWhiteListClick: whiteListClick, userLocalPublicAddress, isVaultMember } = this.props || {};
    if (isVaultMember) {
      whiteListClick(version, "Protocol", membershipAddress, userLocalPublicAddress);
    } else {
      this.setState({
        modalOpen: true
      });
      // show user that "you are not a vault member" and ask to be redirected to registration page
      // if yes, redirect to /registration else stay here
    }
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
      foundationDetails,
      buttonSpinning
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
              buttonSpinning={buttonSpinning}
              onClick={this.onWhiteListClickInternal}
            />
          </Col>
          <Col xs={12} lg={6}>
            <PDetailPreStart
              icoStartDate={formatDate(startDateTime)}
              individualCap={formatFromWei(maximumEtherContribution, 3)}
              voteSaturationLimit={capPercent / 100}
              killFrequency="Quarterly"
              initialTapAmount={formatFromWei(initialTapAmount * 86400 * 30, 3)}
              tapIncrementUnit={parseFloat(tapIncrementFactor) / 100}
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

        <AlertModal open={this.state.modalOpen} handleClose={this.handleClose} link="/registration">
          <div className="text--center text--danger">
            <Warning style={{ width: "2em", height: "2em" }} />
          </div>
          <div className="text--center push--top">You are not registered with us. Please Login to use our App.</div>
        </AlertModal>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onWhiteListClick,
      fetchPrice,
      checkWhiteList
    },
    dispatch
  );

const mapStateToProps = state => {
  const { projectPreStartReducer, fetchPriceReducer, signinManagerData } = state || {};
  const { prices } = fetchPriceReducer || {};
  const { isCurrentMember, buttonSpinning } = projectPreStartReducer || {};
  const { isVaultMember, userLocalPublicAddress } = signinManagerData || {};

  return {
    isCurrentMember,
    buttonSpinning,
    prices,
    isVaultMember,
    userLocalPublicAddress
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailPreStart);
