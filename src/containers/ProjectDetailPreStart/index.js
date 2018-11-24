import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ProjectPreStartName, PDetailPreStart, TokenChart } from "../../components/Common/ProjectDetails";
import { onWhiteListClick, checkWhiteList } from "../../actions/projectPreStartActions/index";
import { Grid } from "../../helpers/react-flexbox-grid";
import { CUICard } from "../../helpers/material-ui";
import { formatDate, formatFromWei, getR1Price, getSoftCap, getHardCap } from "../../helpers/common/projectDetailhelperFunctions";
import { fetchPrice } from "../../actions/priceFetchActions/index";
import MasonaryLayout from "../../components/Common/MasonaryLayout";

class ProjectDetailPreStart extends Component {
  componentDidMount() {
    const {
      fetchPrice: etherPriceFetch,
      checkWhiteList: checkWhiteListStatus,
      version,
      membershipAddress,
      signinStatusFlag,
      userLocalPublicAddress
    } = this.props || {};
    etherPriceFetch("ETH");
    if (signinStatusFlag > 2) {
      checkWhiteListStatus(version, membershipAddress, userLocalPublicAddress);
    }
  }

  componentDidUpdate(prevProps) {
    const { userLocalPublicAddress: prevAddress, signinStatusFlag: prevFlag } = prevProps || "";
    const { userLocalPublicAddress: localAddress, checkWhiteList: checkWhiteListStatus, version, membershipAddress, signinStatusFlag } =
      this.props || {};
    if (prevAddress !== localAddress || (prevFlag !== signinStatusFlag && signinStatusFlag > 2)) {
      checkWhiteListStatus(version, membershipAddress, localAddress);
    }
  }

  getRoundText = () =>
    // Always Constant for all daicos
    "3 Round DAICO";

  onWhiteListClickInternal = () => {
    const { version, membershipAddress, onWhiteListClick: whiteListClick, userLocalPublicAddress, isVaultMember } = this.props || {};
    if (isVaultMember) {
      whiteListClick(version, "Protocol", membershipAddress, userLocalPublicAddress);
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
      initialFundRelease,
      isCurrentMember,
      rounds,
      foundationDetails,
      buttonSpinning,
      signinStatusFlag,
      whitelistButtonTransactionHash,
      thumbnailUrl,
      prices,
      currentRoundNumber,
      isVaultMembershipChecked
    } = this.props || {};
    return (
      <Grid>
        <MasonaryLayout>
          <ProjectPreStartName
            projectName={projectName}
            priceIncrementFlag={false}
            tokenTag={tokenTag}
            price={getR1Price(this.props)}
            roundText={this.getRoundText()}
            description={description}
            urls={urls}
            whitepaper={whitepaper}
            buttonText="Get Whitelisted"
            buttonVisibility={typeof isCurrentMember != "undefined" && isVaultMembershipChecked && !isCurrentMember}
            buttonSpinning={buttonSpinning}
            onClick={this.onWhiteListClickInternal}
            signinStatusFlag={signinStatusFlag}
            whitelistButtonTransactionHash={whitelistButtonTransactionHash}
            thumbnailUrl={thumbnailUrl}
            isCurrentMember={isCurrentMember}
            isVaultMembershipChecked={isVaultMembershipChecked}
          />
          <PDetailPreStart
            icoStartDate={formatDate(startDateTime)}
            individualCap={formatFromWei(maximumEtherContribution, 3)}
            voteSaturationLimit={capPercent / 100}
            killFrequency="Quarterly"
            initialTapAmount={formatFromWei(initialTapAmount * 86400 * 30, 3)}
            tapIncrementUnit={parseFloat(tapIncrementFactor) / 100}
            hardCapCapitalisation={getSoftCap(this.props)}
            dilutedCapitalisation={getHardCap(this.props)}
            initialFundRelease={formatFromWei(initialFundRelease)}
          />
          <CUICard className="fnt-ps card-brdr" style={{ padding: "40px 50px" }}>
            <TokenChart rounds={rounds} foundationDetails={foundationDetails} prices={prices} currentRoundNumber={currentRoundNumber} />
          </CUICard>
        </MasonaryLayout>
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
  const { isCurrentMember, buttonSpinning, whitelistButtonTransactionHash } = projectPreStartReducer || {};
  const { isVaultMember, userLocalPublicAddress, signinStatusFlag, isVaultMembershipChecked } = signinManagerData || {};

  return {
    isCurrentMember,
    buttonSpinning,
    prices,
    isVaultMember,
    userLocalPublicAddress,
    signinStatusFlag,
    whitelistButtonTransactionHash,
    isVaultMembershipChecked
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailPreStart);
