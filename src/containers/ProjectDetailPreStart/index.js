import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ProjectName, PDetailPreStart, TokenChart } from "../../components/Common/ProjectDetails";
import { onWhiteListClick } from "../../actions/projectPreStartActions/index";
import {Grid, Row, Col} from '../../helpers/react-flexbox-grid';
import { CUICard } from "../../helpers/material-ui";

class ProjectDetailPreStart extends Component {
  getPrice = () => {
    const { rounds } = this.props || {};
    const [round1, ...rest] = rounds || {};
    const { tokenRate } = round1 || {}; //tokens/wei
    return 1 / parseInt(tokenRate, 10);
  };

  getRoundText = () => {
    //Always Constant for all daicos
    return "3 Round DAICO";
  };

  getR3Price = () => {
    const { rounds } = this.props || {};
    const round3 = [...rounds].pop() || {};
    const { tokenRate } = round3 || {}; //tokens/wei
    return 1 / parseInt(tokenRate, 10);
  };

  getSoftCap = () => {
    //For now using ether.. when ether price is brought, it is implemented, convert to $
    const etherPrice = "200"; //dollars
    const { rounds } = this.props || {};
    let softCap = 0;
    for (let index = 0; index < rounds.length; index++) {
      const { tokenCount } = rounds[index];
      softCap += parseFloat(tokenCount);
    }
    return Math.round(softCap * this.getR3Price() * Math.pow(10, -18) * parseFloat(etherPrice)).toString();
  };

  getHardCap = () => {
    const etherPrice = "200"; //dollars
    const { totalMintableSupply } = this.props || {};
    const hardCap = parseFloat(totalMintableSupply) * this.getR3Price() * etherPrice * Math.pow(10, -18);
    return Math.round(hardCap).toString();
  };

  onWhiteListClick = () => {
    const { version, membershipAddress } = this.props || {};
    //this.props.checkWhiteList(version, "Protocol", membershipAddress);
    this.props.onWhiteListClick(version, "Protocol", membershipAddress);
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
        <Row className="push--top">
          <Col xs={12} lg={6}>
            <ProjectName
              projectName={projectName}
              tokenTag={tokenTag}
              price={this.getPrice()}
              roundText={this.getRoundText()}
              description={description}
              urls={urls}
              whitepaper={whitepaper}
              buttonText="Get Whitelisted"
              buttonVisibility={!isCurrentMember}
              onClick={this.onWhiteListClick}
            />
          </Col>
          <Col xs={12} lg={6}>
            <PDetailPreStart
              icoStartDate={new Date(startDateTime).toDateString()}
              individualCap={parseFloat(maximumEtherContribution) / Math.pow(10, 18)}
              voteSaturationLimit={capPercent / 100}
              killFrequency="Quarterly"
              initialTapAmount={(parseInt(initialTapAmount, 10) * 86400 * 30) / Math.pow(10, 18)}
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onWhiteListClick: onWhiteListClick
    },
    dispatch
  );
};

const mapStateToProps = state => {
  const { isCurrentMember } = state.projectPreStartReducer || {};
  return {
    isCurrentMember: isCurrentMember
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailPreStart);
