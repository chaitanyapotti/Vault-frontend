import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeaturedProject from "../../components/FeaturedProject";
import { getFeaturedProjects, featuredProjectsLoaderAction } from "../../actions/featuredProjectsActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import MasonaryLayout from "../../components/Common/MasonaryLayout";
import {CUICircularProgress} from "../../helpers/material-ui";
class FeaturedProjects extends Component {
  componentDidMount() {
    const { getFeaturedProjects: fetchFeaturedProjects, featuredProjectsLoaderAction: loader } = this.props || {};
    fetchFeaturedProjects();
    loader();
  }

  render() {
    const { featuredProjects, showFeaturedProjectsLoader, featuredProjectsRetrievedSuccessfully, featuredProjectsRetrieveFailureMessage } =
      this.props || {};
    return (
      <div>
        <div className="text--center sbhdr-txt txt-xl txt-bold">FEATURED PROJECTS</div>
        {showFeaturedProjectsLoader ? (
          <CUICircularProgress color="secondary" />
        ) : featuredProjectsRetrievedSuccessfully ? (
          <div className="push-top--35">
            <Grid>
              <MasonaryLayout columns={3}>
                {featuredProjects.map((item, index) => {
                  const { projectName, description, _id } = item;
                  return (
                      <FeaturedProject key={index} projectName={projectName} description={description} projectId={_id} history={this.props.history}/>
                  )
                })}
              </MasonaryLayout>
            </Grid>
          </div>
        ) : (
          <h1>{featuredProjectsRetrieveFailureMessage}</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { featuredProjects, showFeaturedProjectsLoader, featuredProjectsRetrieveFailureMessage, featuredProjectsRetrievedSuccessfully } =
    state.featuredProjectsReducer || {};
  return {
    featuredProjects,
    showFeaturedProjectsLoader,
    featuredProjectsRetrieveFailureMessage,
    featuredProjectsRetrievedSuccessfully
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFeaturedProjects,
      featuredProjectsLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturedProjects);
