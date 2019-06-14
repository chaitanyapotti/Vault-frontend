import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from "qs";
import ContentLoader from "react-content-loader";
import SearchCard from "../../components/Common/SearchCard";
import { getSearchResults } from "../../actions/searchActions/index";
import { Grid } from "../../helpers/react-flexbox-grid";
import MasonaryLayout from "../../components/Common/MasonaryLayout";

class Search extends Component {
  componentDidMount() {
    const currentUrl = new URL(window.location.href);
    const params = qs.parse(currentUrl.search, { ignoreQueryPrefix: true });
    if ("q" in params) {
      const { getSearchResults: getSearchResultsInfo } = this.props || {};
      getSearchResultsInfo(params.q);
    } else {
      const { history } = this.props || {};
      history.push({
        pathname: `/`
      });
    }
  }

  render() {
    const { searchResult } = this.props || {};
    return (
      <div style={{ marginBottom: "50px" }}>
        {this.props.showSearchResultLoader ? (
          <ContentLoader />
        ) : searchResult.length > 0 ? (
          <div>
            <div className="text--center sbhdr-txt txt-xl txt-bold">SEARCH RESULTS</div>
            <div className="push-top--35">
              <Grid>
                <MasonaryLayout columns={3}>
                  {searchResult.map((item, index) => {
                    const { projectName, description, _id, tokenTag, urls } = item || {};
                    const { history } = this.props || {};
                    const { website } = urls || {};
                    const onClick = () => {
                      history.push({
                        pathname: `/governance/details`,
                        search: `?projectid=${_id}`
                      });
                    };
                    return (
                      <SearchCard
                        key={Math.random()}
                        projectName={projectName}
                        tokenTag={tokenTag}
                        description={description}
                        _id={_id}
                        onClick={onClick}
                        website={website}
                      />
                    );
                  })}
                </MasonaryLayout>
              </Grid>
            </div>
          </div>
        ) : (
          <Grid style={{ marginBottom: "50px" }}>
            <div className="text-center">No projects found</div>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { searchResult, showSearchResultLoader } = state.searchReducer || {};
  return {
    searchResult,
    showSearchResultLoader
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSearchResults
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
