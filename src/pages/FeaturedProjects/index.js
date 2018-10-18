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
            {featuredProjects.map((item, index) => {
              const { projectName, description } = item;
              return <FeaturedProject key={index} projectName={projectName} description={description} />;
            })}
          </div>
        ) : (
          <h1>{this.props.featuredProjectsRetrieveFailureMessage}</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    featuredProjects,
    showFeaturedProjectsLoader,
    featuredProjectsRetrieveFailureMessage,
    featuredProjectsRetrievedSuccessfully
    state.featuredProjectsReducer || {};
  return {
    featuredProjects,
    showFeaturedProjectsLoader,
    featuredProjectsRetrieveFailureMessage,
    featuredProjectsRetrievedSuccessfully
  };
};

const mapDispatchToProps = dispatch => bindActionCreators(
    {
      getFeaturedProjects: getFeaturedProjects,
      featuredProjectsLoaderAction: featuredProjectsLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeaturedProjects);
