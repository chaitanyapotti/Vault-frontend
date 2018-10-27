import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Loader } from "semantic-ui-react";
import FeaturedProject from "../../components/FeaturedProject";
import { getFeaturedProjects, featuredProjectsLoaderAction } from "../../actions/featuredProjectsActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";

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
          <Loader active={showFeaturedProjectsLoader} />
        ) : featuredProjectsRetrievedSuccessfully ? (
          <div className="push-top--35">
            <Grid>
              <Row>
                {featuredProjects.map((item, index) => {
                  const { projectName, description, urls } = item || {};
                  console.log(urls);
                  const { website } = urls || {};
                  return (
                    <Col xs={12} lg={4}>
                      <FeaturedProject key={Math.random()} projectName={projectName} description={description} website={website} />
                    </Col>
                  );
                })}
              </Row>
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
