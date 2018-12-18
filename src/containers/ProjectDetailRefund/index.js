import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { refundByKill, refundBySoftCapFail } from "../../actions/projectRefundActions/index";
import { getTokenBalance } from "../../actions/projectCrowdSaleActions/index";
import { formatFromWei, formatCurrencyNumber } from "../../helpers/common/projectDetailhelperFunctions";
import RefundCard from "../../components/RefundCard";
import { getRemainingEtherBalance, getTotalSupply } from "../../actions/projectDetailGovernanceActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";

class ProjectDetailRefund extends Component {
  componentDidMount() {
    const {
      version,
      daicoTokenAddress,
      signinStatusFlag,
      userLocalPublicAddress,
      pollFactoryAddress,
      network,
      getTokenBalance: fetchTokenBalance,
      getRemainingEtherBalance: fetchRemainingEtherBalance,
      getTotalSupply: fetchTotalSupply
    } = this.props || {};
    fetchRemainingEtherBalance(version, pollFactoryAddress, network);
    fetchTotalSupply(version, daicoTokenAddress, network);
    if (signinStatusFlag > 2) {
      fetchTokenBalance(version, daicoTokenAddress, userLocalPublicAddress, network);
    }
  }

  componentDidUpdate(prevProps) {
    const { userLocalPublicAddress: prevAddress, signinStatusFlag: prevFlag } = prevProps || "";
    const { userLocalPublicAddress: localAddress, getTokenBalance: tokenBalance, version, signinStatusFlag, daicoTokenAddress, network } =
      this.props || {};
    if (prevAddress !== localAddress || (prevFlag !== signinStatusFlag && signinStatusFlag > 2)) {
      tokenBalance(version, daicoTokenAddress, localAddress, network);
    }
  }

  onRefundClick = () => {
    const {
      version,
      pollFactoryAddress,
      treasuryStateNumber,
      userLocalPublicAddress,
      daicoTokenAddress,
      network,
      refundByKill: killRefund,
      refundBySoftCapFail: softCapRefund
    } = this.props || {};
    if (treasuryStateNumber === "2") softCapRefund(version, pollFactoryAddress, userLocalPublicAddress, daicoTokenAddress, network);
    if (treasuryStateNumber === "4") killRefund(version, pollFactoryAddress, userLocalPublicAddress, daicoTokenAddress, network);
  };

  getMyRefundValue = () => {
    const { remainingEtherBalance, tokenBalance, totalSupply } = this.props || {};
    const denom = parseFloat(totalSupply);
    return formatFromWei((parseFloat(tokenBalance) / denom) * parseFloat(remainingEtherBalance) || 0, 3);
  };

  getLabel = () => {
    const { tokenTag, treasuryStateNumber, tokenBalance } = this.props || {};
    if (treasuryStateNumber === "2") {
      return (
        <div>
          <div>The DAICO that you are looking for could not successfully reach its Round 1 goal.</div>
          <div>
            You are eligible for a refund of <span className="text--secondary">{this.getMyRefundValue()} ETH</span> against your balance of{" "}
            <span className="text--secondary">
              {formatCurrencyNumber(formatFromWei(tokenBalance, 0), 0)} {tokenTag}
            </span>{" "}
            . Click the refund button and sign the transaction to start the refund process
          </div>
        </div>
      );
    }
    if (treasuryStateNumber === "4") {
      return (
        <div>
          <div>The DAICO that you are looking for has been killed by investor consensus.</div>
          <div>
            You are eligible for a refund of <span className="text--secondary">{this.getMyRefundValue()} ETH</span> against your balance of
            <span className="text--secondary">
              {formatCurrencyNumber(formatFromWei(tokenBalance, 0), 0)} {tokenTag}
            </span>{" "}
            . Click the refund button and sign the transaction to start the refund process
          </div>
        </div>
      );
    }
    return null;
  };

  render() {
    const {
      tokenBalance,
      refundByKillButtonTransactionHash,
      refundByKillButtonSpinning,
      refundBySoftCapFailSpinning,
      signinStatusFlag,
      refundBySoftcapfailButtonTransactionHash,
      network
    } = this.props || {};
    return (
      <Grid>
        <Row>
          <Col>
            <RefundCard
              refundByKillButtonSpinning={refundByKillButtonSpinning}
              refundBySoftCapFailSpinning={refundBySoftCapFailSpinning}
              onRefundClick={this.onRefundClick}
              signinStatusFlag={signinStatusFlag}
              tokenBalance={tokenBalance}
              btnLabel="Refund"
              label={this.getLabel()}
              refundByKillButtonTransactionHash={refundByKillButtonTransactionHash}
              refundBySoftcapfailButtonTransactionHash={refundBySoftcapfailButtonTransactionHash}
              network={network}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      refundByKill,
      refundBySoftCapFail,
      getTokenBalance,
      getRemainingEtherBalance,
      getTotalSupply
    },
    dispatch
  );

const mapStateToProps = state => {
  const {
    projectCrowdSaleReducer,
    projectDetailGovernanceReducer,
    projectRefundReducer,
    deployerReducer,
    signinManagerData,
    fetchPriceReducer,
    projectGovernanceReducer
  } = state || {};
  const { projectDetails, ts } = deployerReducer || {};
  const { tokenBalance } = projectCrowdSaleReducer || {};
  const { _id: projectid } = projectDetails;
  const { remainingEtherBalance, totalSupply } = projectDetailGovernanceReducer || {};
  const { refundByKillButtonSpinning, refundBySoftCapFailSpinning, refundByKillButtonTransactionHash, refundBySoftcapfailButtonTransactionHash } =
    projectRefundReducer || {};
  const { isVaultMember, userLocalPublicAddress, signinStatusFlag, isVaultMembershipChecked } = signinManagerData || {};
  const { currentRoundNumber, treasuryStateNumber } = projectGovernanceReducer || {};
  const { prices } = fetchPriceReducer || {};

  return {
    ...projectDetails,
    projectid,
    currentRoundNumber,
    treasuryStateNumber,
    ts,
    prices,
    isVaultMember,
    userLocalPublicAddress,
    signinStatusFlag,
    isVaultMembershipChecked,
    tokenBalance,
    remainingEtherBalance,
    totalSupply,
    refundByKillButtonSpinning,
    refundBySoftCapFailSpinning,
    refundByKillButtonTransactionHash,
    refundBySoftcapfailButtonTransactionHash
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailRefund);
