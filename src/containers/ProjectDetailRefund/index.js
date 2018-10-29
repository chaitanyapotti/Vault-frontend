import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ProjectRefundName } from "../../components/Common/ProjectDetails";
import { onRefundClick } from "../../actions/projectRefundActions/index";
import { getTokenBalance } from "../../actions/projectCrowdSaleActions/index";

class ProjectDetailRefund extends Component {
  componentDidMount() {
    const { version, daicoTokenAddress } = this.props || {};
    this.props.getTokenBalance(version, daicoTokenAddress);
  }

  getRoundText = () =>
    // Always Constant for all daicos
    "DAICO in Refund Mode";

  onRefundClick = () => {
    const { version, pollFactoryAddress, currentRoundNumber } = this.props || {};
    this.props.onRefundClick(version, currentRoundNumber, pollFactoryAddress);
  };

  render() {
    const { projectName, tokenTag, description, urls, whitepaper, tokenBalance } = this.props || {};
    return (
      <div>
        <ProjectRefundName
          projectName={projectName}
          tokenTag={tokenTag}
          price="0"
          roundText={this.getRoundText()}
          description={description}
          urls={urls}
          whitepaper={whitepaper}
          buttonText="Get Refund"
          buttonVisibility={tokenBalance > 0}
          onClick={this.onRefundClick}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onRefundClick,
      getTokenBalance
    },
    dispatch
  );

const mapStateToProps = state => {
  const { projectRefundReducer } = state || {};
  const { tokenBalance } = projectRefundReducer || {};
  return {
    tokenBalance
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailRefund);
