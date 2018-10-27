import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getActiveDaicos, showActiveDaicosLoaderAction } from "../../actions/activeDaicosActions";
import GridData from "../../components/GridData";

class ActiveDaicos extends Component {
  componentDidMount() {
    this.props.getActiveDaicos();
    this.props.showActiveDaicosLoaderAction();
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
  return {
    activeDaicosTable,
    showActiveDaicosLoader,
    activeDaicosRetrieveFailureMessage,
    activeDaicosRetrievedSuccessFully
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getActiveDaicos,
      showActiveDaicosLoaderAction
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
