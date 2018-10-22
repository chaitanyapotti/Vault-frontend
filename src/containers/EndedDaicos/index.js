import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Table, Loader } from "semantic-ui-react";
import { getEndedDaicos, showEndedDaicosLoaderAction } from "../../actions/endedDaicosActions";

const calculateEndDuration = r1EndTime =>
  // console.log(moment.duration( moment(moment(r1EndTime).format('YYYY-MM-DD hh:mm:ss')), moment(moment().format('YYYY-MM-DD hh:mm:ss'))))
  r1EndTime;

// const calculateRoundGoal = (round) => {
//     return (parseFloat(round.tokenCount) / (parseFloat(round.tokenRate) * Math.pow(10, 18)))
// }

class EndedDaicosTableBody extends Component {
  handleTableRowClicked = projectid => {
    this.props.history.push({
      pathname: `/governance/details`,
      search: `?projectid=${projectid}`,
    });
  };

  addTableRowsDynamically = () => {
    const table = this.props.endedDaicosTable;
    if (table && table.length > 0) {
      return table.map((project, index) => (
        <Table.Row key={index} onClick={this.handleTableRowClicked.bind(this, project._id)}>
          <Table.Cell>{project.projectName}</Table.Cell>
          <Table.Cell>{100}</Table.Cell>
          <Table.Cell>{1}</Table.Cell>
          <Table.Cell>90%</Table.Cell>
          <Table.Cell>{new Date(project.startDateTime).toISOString()}</Table.Cell>
          <Table.Cell>{calculateEndDuration(project.r1EndTime)}</Table.Cell>
        </Table.Row>
      ));
    }
    return <Table.Row>Activities could not be retrieved, please try reloading the page.</Table.Row>;
  };

  render() {
    return <Table.Body>{this.addTableRowsDynamically()}</Table.Body>;
  }
}

const EndedDaicosTableHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Raised*</Table.HeaderCell>
      <Table.HeaderCell>Price*</Table.HeaderCell>
      <Table.HeaderCell>Kill Consensus</Table.HeaderCell>
      <Table.HeaderCell>Started at</Table.HeaderCell>
      <Table.HeaderCell>Ended at</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

class EndedDaicos extends Component {
  componentDidMount() {
    this.props.getEndedDaicos();
    this.props.showEndedDaicosLoaderAction();
  }

  render() {
    return (
      <div>
        {this.props.showEndedDaicosLoader ? (
          <Loader active={this.props.showEndedDaicosLoader} />
        ) : this.props.endedDaicosRetrievedSuccessFully ? (
          <Table>
            <EndedDaicosTableHeader />
            <EndedDaicosTableBody endedDaicosTable={this.props.endedDaicosTable} history={this.props.history} />
          </Table>
        ) : (
          <h3>{this.props.endedDaicosRetrieveFailureMessage}</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { endedDaicosTable, showEndedDaicosLoader, endedDaicosRetrieveFailureMessage, endedDaicosRetrievedSuccessFully } =
    state.endedDaicosData || {};
  return {
    endedDaicosTable,
    showEndedDaicosLoader,
    endedDaicosRetrieveFailureMessage,
    endedDaicosRetrievedSuccessFully,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getEndedDaicos,
      showEndedDaicosLoaderAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EndedDaicos);
