import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { refundByKill, refundBySoftCapFail } from "../../actions/projectRefundActions/index";
import { getTokenBalance } from "../../actions/projectCrowdSaleActions/index";
import { formatFromWei, formatCurrencyNumber } from "../../helpers/common/projectDetailhelperFunctions";
import DeployerCard from "../../components/DeployerCard";
import { getRemainingEtherBalance, getTotalSupply } from "../../actions/projectDetailGovernanceActions/index";

class ProjectDetailRefund extends Component {
  componentDidMount() {
    const {
      version,
      daicoTokenAddress,
      signinStatusFlag,
      userLocalPublicAddress,
      pollFactoryAddress,
      getTokenBalance: fetchTokenBalance,
      getRemainingEtherBalance: fetchRemainingEtherBalance,
      getTotalSupply: fetchTotalSupply
    } = this.props || {};
    fetchRemainingEtherBalance(version, pollFactoryAddress);
    fetchTotalSupply(version, daicoTokenAddress);
    if (signinStatusFlag > 2) {
      fetchTokenBalance(version, daicoTokenAddress, userLocalPublicAddress);
    }
  }

  componentDidUpdate(prevProps) {
    const { userLocalPublicAddress: prevAddress, signinStatusFlag: prevFlag } = prevProps || "";
    const { userLocalPublicAddress: localAddress, getTokenBalance: tokenBalance, version, signinStatusFlag, daicoTokenAddress } = this.props || {};
    if (prevAddress !== localAddress || (prevFlag !== signinStatusFlag && signinStatusFlag > 2)) {
      tokenBalance(version, daicoTokenAddress, localAddress);
    }
  }

  onRefundClick = () => {
    const {
      version,
      pollFactoryAddress,
      treasuryStateNumber,
      userLocalPublicAddress,
      daicoTokenAddress,
      refundByKill: killRefund,
      refundBySoftCapFail: softCapRefund
    } = this.props || {};
    if (treasuryStateNumber === "2") softCapRefund(version, pollFactoryAddress, userLocalPublicAddress, daicoTokenAddress);
    if (treasuryStateNumber === "4") killRefund(version, pollFactoryAddress, userLocalPublicAddress, daicoTokenAddress);
  };

  getMyRefundValue = () => {
    const { remainingEtherBalance, tokenBalance, totalSupply } = this.props || {};
    const denom = parseFloat(totalSupply);
    return formatFromWei((parseFloat(tokenBalance) / denom) * parseFloat(remainingEtherBalance) || 0, 3);
  };

  render() {
    const { tokenTag, tokenBalance, treasuryStateNumber, refundByKillButtonSpinning, refundBySoftCapFailSpinning, signinStatusFlag } =
      this.props || {};
    return (
      <div>
        <DeployerCard
          refundByKillButtonSpinning={refundByKillButtonSpinning}
          refundBySoftCapFailSpinning={refundBySoftCapFailSpinning}
          onRefundClick={this.onRefundClick}
          signinStatusFlag={signinStatusFlag}
          treasuryStateNumber={treasuryStateNumber}
          tokenBalance={tokenBalance}
          btnLabel="Refund"
          label={`You are eligible for a refund of ${this.getMyRefundValue()} ETH against your balance of ${formatCurrencyNumber(
            formatFromWei(tokenBalance, 0),
            0
          )} ${tokenTag} . Click ‘Refund’ to proceed.
          `}
        />
      </div>
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
  const { projectCrowdSaleReducer, signinManagerData, projectDetailGovernanceReducer, projectRefundReducer } = state || {};
  const { tokenBalance } = projectCrowdSaleReducer || {};
  const { userLocalPublicAddress, signinStatusFlag } = signinManagerData || {};
  const { remainingEtherBalance, totalSupply } = projectDetailGovernanceReducer || {};
  const { refundByKillButtonSpinning, refundBySoftCapFailSpinning } = projectRefundReducer || {};
  return {
    tokenBalance,
    userLocalPublicAddress,
    signinStatusFlag,
    remainingEtherBalance,
    totalSupply,
    refundByKillButtonSpinning,
    refundBySoftCapFailSpinning
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailRefund);
