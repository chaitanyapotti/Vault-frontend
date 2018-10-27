import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import qs from "qs";
import SearchCard from "../../components/Common/SearchCard";
import { getSearchResults } from "../../actions/searchActions/index";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";

class Search extends Component {
  componentDidMount() {
    const currentUrl = new URL(window.location.href);
    const params = qs.parse(currentUrl.search, { ignoreQueryPrefix: true });
    if ("q" in params) {
      console.log(params.q);
      const { getSearchResults: getSearchResultsInfo } = this.props || {};
      getSearchResultsInfo(params.q);
    } else {
      const { history } = this.props || {};
      history.push({
        pathname: `/`
      });
    }
    // const { getSearchResults: getSearchResultsInfo, searchtext } = this.props || {};
    // getSearchResultsInfo(searchtext);
  }

  render() {
    const { searchResult } = this.props || {};
    console.log(searchResult);
    return searchResult.length > 0 ? (
      <div>
        <div className="text--center sbhdr-txt txt-xl txt-bold">SEARCH RESULTS</div>
        <div className="push-top--35">
          <Grid>
            <Row>
              {searchResult.map((item, index) => {
                const { projectName, description, _id, tokenTag } = item || {};
                const { history } = this.props || {};
                const onClick = () => {
                  history.push({ pathname: `/governance/details?projectid=${_id}` });
                };
                return (
                  <Col xs={12} lg={4}>
                    <SearchCard
                      key={Math.random()}
                      projectName={projectName}
                      tokenTag={tokenTag}
                      description={description}
                      _id={_id}
                      onClick={onClick}
                    />
                  </Col>
                );
              })}
            </Row>
          </Grid>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  const { searchResult } = state.searchReducer || {};
  return {
    searchResult
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
