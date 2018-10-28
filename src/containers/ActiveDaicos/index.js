import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPrice } from "../../actions/priceFetchActions";
import { getActiveDaicos, showActiveDaicosLoaderAction } from "../../actions/activeDaicosActions";
import GridData from "../../components/GridData";

class ActiveDaicos extends Component {
  componentDidMount() {
    this.props.getActiveDaicos();
    this.props.showActiveDaicosLoaderAction();
    this.props.fetchPrice("ETH");
  }

  render() {
    const { activeDaicosTable } = this.props || {};
    const { tableData } = activeDaicosTable || {};
    return (
      <div>
        <GridData tableData={tableData} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { activeDaicosTable, showActiveDaicosLoader, activeDaicosRetrieveFailureMessage, activeDaicosRetrievedSuccessFully } =
    state.activeDaicosData || {};
  const { prices } = state.fetchPriceReducer || {};
  return {
    activeDaicosTable,
    showActiveDaicosLoader,
    activeDaicosRetrieveFailureMessage,
    activeDaicosRetrievedSuccessFully,
    prices
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getActiveDaicos,
      showActiveDaicosLoaderAction,
      fetchPrice
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveDaicos);

// class ActiveDaicosTableBody extends Component {
//   handleTableRowClicked = projectid => {
//     this.props.history.push({
//       pathname: `/governance/details`,
//       search: `?projectid=${projectid}`
//     });
//   };
