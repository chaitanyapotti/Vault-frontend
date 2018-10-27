import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Loader } from "semantic-ui-react";
import FeaturedProject from "../../components/FeaturedProject";
import { getFeaturedProjects, featuredProjectsLoaderAction } from "../../actions/featuredProjectsActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import AdornedButton from "../../components/Common/LoadingButton";
class FeaturedProjects extends Component {
  componentDidMount() {
    this.props.getFeaturedProjects();
    this.props.featuredProjectsLoaderAction();
  }

  render() {
    const { featuredProjects } = this.props;
    return (
      <div>
        <div className="text--center sbhdr-txt txt-xl txt-bold">FEATURED PROJECTS</div>
        {this.props.showFeaturedProjectsLoader ? (
          <Loader active={this.props.showFeaturedProjectsLoader} />
        ) : this.props.featuredProjectsRetrievedSuccessfully ? (
          <div className="push-top--35">
            <Grid>
              <Row>
                {featuredProjects.map((item, index) => {
                  const { projectName, description, _id } = item;
                  return (
                    <Col xs={12} lg={4}>
                      <FeaturedProject key={index} projectName={projectName} description={description} projectId={_id} history={this.props.history}/>
                    </Col>
                  )
                })}
              </Row>
            </Grid>
          </div>
        ) : (
          <h1>{this.props.featuredProjectsRetrieveFailureMessage}</h1>
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
    featuredProjectsRetrievedSuccessfully,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getFeaturedProjects,
      featuredProjectsLoaderAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeaturedProjects);
