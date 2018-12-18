import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { currentRound, clearGovernanceStates } from "../../actions/projectGovernanceActions/index";
import ProjectDetailPreStart from "../../containers/ProjectDetailPreStart";
import ProjectDetailCrowdSale from "../../containers/ProjectDetailCrowdSale";
import ProjectDetailGovernance from "../../containers/ProjectDetailGovernance";
import ProjectDetailRefund from "../../containers/ProjectDetailRefund";
import { Grid } from "../../helpers/react-flexbox-grid";
import { fetchPrice } from "../../actions/priceFetchActions/index";
import GvrncCardLoader from "../../components/Loaders/gvrncCardLoader";

class ProjectGovernance extends Component {
  componentWillUnmount() {
    const { clearGovernanceStates: clearingStates } = this.props || {};
    clearingStates();
  }

  componentDidMount() {
    // Do Routing here - use query string
    const currentUrl = new URL(window.location.href);
    const params = qs.parse(currentUrl.search, { ignoreQueryPrefix: true });
    if ("projectid" in params) {
      const { currentRound: currentRoundDetailsFetch, fetchPrice: etherPriceFetch, history } = this.props || {};
      currentRoundDetailsFetch(params.projectid, history);
      etherPriceFetch("ETH");
    } else {
      const { history } = this.props || {};
      history.push({
        pathname: `/`
      });
    }
  }

  render() {
    const { currentRoundNumber, projectDetails, treasuryStateNumber, history, isVaultMembershipChecked } = this.props || {};
    const { currentDeploymentIndicator } = projectDetails || {};
    // currentRoundNumber = "2";

    if (treasuryStateNumber === "" || currentRoundNumber === "" || !isVaultMembershipChecked) {
      return (
        <Grid>
          <GvrncCardLoader />
        </Grid>
      );
    }

    if (currentDeploymentIndicator !== 12)
      return (
        <Grid style={{ marginBottom: "50px" }}>
          <div className="text-center txt">The project has not been deployed yet</div>
        </Grid>
      );
    if (treasuryStateNumber === "2" || treasuryStateNumber === "4") {
      return (
        <div style={{ marginBottom: "50px" }}>
          <ProjectDetailRefund history={history} />
        </div>
      );
    }
    if (treasuryStateNumber === "1" && currentRoundNumber === "0") {
      return (
        <div style={{ marginBottom: "50px" }}>
          <ProjectDetailPreStart history={history} />
        </div>
      );
    }

    if (treasuryStateNumber === "1" && currentRoundNumber === "1") {
      return (
        <div style={{ marginBottom: "50px" }}>
          <ProjectDetailCrowdSale history={history} />
        </div>
      );
    }

    if (treasuryStateNumber === "3" && (currentRoundNumber === "2" || currentRoundNumber === "3" || currentRoundNumber === "4")) {
      return (
        <div style={{ marginBottom: "50px" }}>
          <ProjectDetailGovernance history={history} />
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = state => {
  const { deployerReducer, projectGovernanceReducer, fetchPriceReducer, signinManagerData } = state || {};
  const { prices } = fetchPriceReducer || {};
  const { projectDetails, ts } = deployerReducer || {};
  const { currentRoundNumber, treasuryStateNumber } = projectGovernanceReducer || {};
  const { isVaultMember, userLocalPublicAddress, signinStatusFlag, isVaultMembershipChecked } = signinManagerData || {};
  return {
    projectDetails,
    currentRoundNumber,
    treasuryStateNumber,
    ts,
    prices,
    isVaultMember,
    userLocalPublicAddress,
    signinStatusFlag,
    isVaultMembershipChecked
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      currentRound,
      clearGovernanceStates,
      fetchPrice
    },
    dispatch
  );

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectGovernance);

export default withRouter(connector);
