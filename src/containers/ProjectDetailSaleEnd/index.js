import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ProjectName,
  PDetailGovernance,
  TapCard
} from "../../components/Common/ProjectDetails";
import { FundReq } from "../../components/Common/ProjectDetails/FundReq";

class ProjectDetailSaleEnd extends Component {
  render() {
    const {
      projectName,
      tokenTag,
      description,
      urls,
      whitepaper,
      capPercent,
      isCurrentMember
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
          buttonText="Trade"
          buttonVisibility={!isCurrentMember}
          onClick={this.onWhiteListClick}
        />
        <PDetailGovernance
          voteSaturationLimit={capPercent / 100}
          killFrequency="Quarterly"
          yourTokens
          yourVoteShare
          killAttemptsLeft
          nextKillAttempt
          yourTokenValue
          yourRefundValue
          totalRefundableBalance
          killConsensus
          onKillClick
        />
        <TapCard currentTapAmount tapIncrementUnit incrementApproval />
        <FundReq reqTypes />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailSaleEnd);
