import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Table, Loader } from "semantic-ui-react";
import { getActiveDaicos, showActiveDaicosLoaderAction } from "../../actions/activeDaicosActions";

const calculateEndDuration = r1EndTime =>
  // console.log(moment.duration( moment(moment(r1EndTime).format('YYYY-MM-DD hh:mm:ss')), moment(moment().format('YYYY-MM-DD hh:mm:ss'))))
  r1EndTime;

const calculateRoundGoal = round => parseFloat(round.tokenCount) / (parseFloat(round.tokenRate) * Math.pow(10, 18));

const calculateFinalGoal = roundArray => {
  let finalGoal = 0;
  for (let i = 0; i < roundArray.length; i++) {
    finalGoal += calculateRoundGoal(roundArray[i]);
  }
  return finalGoal;
};

class ActiveDaicosTableBody extends Component {
  handleTableRowClicked = projectid => {
    this.props.history.push({
      pathname: `/governance/details`,
      search: `?projectid=${projectid}`,
    });
  };

  addTableRowsDynamically = () => {
    const table = this.props.activeDaicosTable;
    if (table && table.length > 0) {
      return table.map((project, index) => (
        <Table.Row key={index} onClick={this.handleTableRowClicked.bind(this, project._id)}>
          <Table.Cell>{project.projectName}</Table.Cell>
          <Table.Cell>{project.rounds.length}</Table.Cell>
          <Table.Cell>{calculateRoundGoal(project.rounds[0])}</Table.Cell>
          <Table.Cell>{calculateFinalGoal(project.rounds)}</Table.Cell>
          <Table.Cell>{100}</Table.Cell>
          <Table.Cell>{1}</Table.Cell>
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

const ActiveDaicosTableHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Rounds</Table.HeaderCell>
      <Table.HeaderCell>R1 Goal</Table.HeaderCell>
      <Table.HeaderCell>Final Goal</Table.HeaderCell>
      <Table.HeaderCell>Raised*</Table.HeaderCell>
      <Table.HeaderCell>Price*</Table.HeaderCell>
      <Table.HeaderCell>Started at</Table.HeaderCell>
      <Table.HeaderCell>R1 Ends in</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

class ActiveDaicos extends Component {
  componentDidMount() {
    this.props.getActiveDaicos();
    this.props.showActiveDaicosLoaderAction();
  }

  render() {
    return (
      <div>
        {this.props.showActiveDaicosLoader ? (
          <Loader active={this.props.showActiveDaicosLoader} />
        ) : this.props.activeDaicosRetrievedSuccessFully ? (
          <Table>
            <ActiveDaicosTableHeader />
            <ActiveDaicosTableBody activeDaicosTable={this.props.activeDaicosTable} history={this.props.history} />
          </Table>
        ) : (
          <h3>{this.props.activeDaicosRetrieveFailureMessage}</h3>
        )}
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
    activeDaicosRetrievedSuccessFully,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getActiveDaicos,
      showActiveDaicosLoaderAction,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ActiveDaicos);