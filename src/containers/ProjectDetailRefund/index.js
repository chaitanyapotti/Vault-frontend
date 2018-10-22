import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  ProjectName
} from "../../components/Common/ProjectDetails";

class ProjectDetailRefund extends Component {
  render() {
    const {
      projectName,
      tokenTag,
      description,
      urls,
      whitepaper,
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetailRefund);
