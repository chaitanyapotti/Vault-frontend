import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {PDetailCrowdSale, ProjectName, TokenChart} from "../../components/Common/ProjectDetails"
import { onWhiteListClick, checkWhiteList } from "../../actions/projectPreStartActions/index";


class ProjectDetailsCrowdSale extends Component {
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
    render(){
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
            foundationDetails
          } = this.props || {};
          return (
            <div>
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
              <PDetailCrowdSale
                individualCap={parseFloat(maximumEtherContribution) / Math.pow(10, 18)}
                voteSaturationLimit={capPercent / 100}
                killFrequency="Quarterly"
                initialTapAmount={(parseInt(initialTapAmount, 10) * 86400 * 30) / Math.pow(10, 18)}
                initialFundRelease = {initialFundRelease}
                tapIncrementUnit={tapIncrementFactor}
                hardCapCapitalisation={this.getSoftCap()}
                dilutedCapitalisation={this.getHardCap()}
              />
              <TokenChart rounds={rounds} foundationDetails={foundationDetails} />
            </div>
          );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        onWhiteListClick: onWhiteListClick,
        checkWhiteList: checkWhiteList
      },
      dispatch
    );
  };
  
  const mapStateToProps = state => {
    const { isCurrentMember, membershipAssigned } = state.projectPreStartReducer || {};
    return {
      isCurrentMember: isCurrentMember,
      membershipAssigned: membershipAssigned
    };
  };


export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailsCrowdSale);
