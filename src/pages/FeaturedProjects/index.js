import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeaturedProject from "../../components/FeaturedProject";
import { getFeaturedProjects, featuredProjectsLoaderAction } from "../../actions/featuredProjectsActions/index";
import { Grid } from "../../helpers/react-flexbox-grid";
import MasonaryLayout from "../../components/Common/MasonaryLayout";
import FtrPrjctLoader from "../../components/Loaders/FtrPrjctLoader";

class FeaturedProjects extends Component {
  componentDidMount() {
    const { getFeaturedProjects: fetchFeaturedProjects, featuredProjectsLoaderAction: loader } = this.props || {};
    fetchFeaturedProjects();
    loader();
  }

  render() {
    const { featuredProjects, showFeaturedProjectsLoader, featuredProjectsRetrievedSuccessfully, featuredProjectsRetrieveFailureMessage, history } =
      this.props || {};
    return (
      <div>
        <div className="text--center sbhdr-txt txt-xl txt-bold">FEATURED PROJECTS</div>
        {showFeaturedProjectsLoader ? (
          <FtrPrjctLoader />
        ) : // <CUICircularProgress color="secondary" />
        featuredProjectsRetrievedSuccessfully ? (
          <div className="push-top--35">
            <Grid style={{ marginBottom: "50px" }}>
              <MasonaryLayout columns={3}>
                {featuredProjects.map((item, index) => {
                  const { projectName, description, _id, thumbnailUrl, urls, tokenTag } = item;
                  const { website } = urls || {};
                  return (
                    <FeaturedProject
                      key={index}
                      projectName={projectName}
                      description={description}
                      projectId={_id}
                      history={history}
                      thumbnailUrl={thumbnailUrl}
                      website={website}
                      tokenTag={tokenTag}
                    />
                  );
                })}
              </MasonaryLayout>
            </Grid>
          </div>
        ) : (
          <Grid style={{ marginBottom: "50px" }}>
            <h1 className="text--center push-top--50">{featuredProjectsRetrieveFailureMessage}</h1>
          </Grid>
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
