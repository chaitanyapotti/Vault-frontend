import React, { Component } from "react";
import { connect } from "react-redux";
import FeaturedProject from "../../components/FeaturedProject";
import {
  getFeaturedProjects,
  featuredProjectsLoaderAction
} from "../../actions/featuredProjectsActions/index";
import { bindActionCreators } from "redux";
import { Loader } from "semantic-ui-react";

class FeaturedProjects extends Component {
  componentDidMount() {
    console.log("hdhcvhevj");
    this.props.getFeaturedProjects();
    this.props.featuredProjectsLoaderAction();
  }
  render() {
    const { featuredProjects } = this.props;
    return (
      <div>
        <div>FEATURED PROJECTS</div>
        {this.props.showFeaturedProjectsLoader ? (
          <Loader active={this.props.showFeaturedProjectsLoader} />
        ) : this.props.featuredProjectsRetrievedSuccessfully ? (
          <div>
            {featuredProjects.map(item => {
              const { projectName, description } = item;
              return (
                <FeaturedProject
                  projectName={projectName}
                  description={description}
                />
              );
            })}
          </div>
        ) : (
          <h1>{this.props.featuredprojectsRetrieveFailureMessage}</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    featuredProjects,
    showFeaturedProjectsLoader,
    featuredprojectsRetrieveFailureMessage,
    featuredProjectsRetrievedSuccessfully
  } = state.featuredProjectsReducer || {};
  return {
    featuredProjects: featuredProjects,
    showFeaturedProjectsLoader: showFeaturedProjectsLoader,
    featuredprojectsRetrieveFailureMessage: featuredprojectsRetrieveFailureMessage,
    featuredProjectsRetrievedSuccessfully: featuredProjectsRetrievedSuccessfully
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getFeaturedProjects: getFeaturedProjects,
      featuredProjectsLoaderAction: featuredProjectsLoaderAction
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturedProjects);
