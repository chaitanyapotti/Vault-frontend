import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Table, Loader } from 'semantic-ui-react';
import { getUpcomingDaicos, showUpcomingDaicosLoaderAction } from '../../actions/upcomingDaicosActions';

const calculateEndDuration = r1EndTime =>
  // console.log(moment.duration( moment(moment(r1EndTime).format('YYYY-MM-DD hh:mm:ss')), moment(moment().format('YYYY-MM-DD hh:mm:ss'))))
  r1EndTime;

// const calculateRoundGoal = (round) => {
//     return (parseFloat(round.tokenCount) / (parseFloat(round.tokenRate) * Math.pow(10, 18)))
// }

class UpcomingDaicosTableBody extends Component {
  addTableRowsDynamically = () => {
    const table = this.props.upcomingDaicosTable;
    if (table && table.length > 0) {
      return table.map((project, index) =>
        <Table.Row key={index}>
          <Table.Cell>
            {project.projectName}
          </Table.Cell>
          <Table.Cell>
            {100}
          </Table.Cell>
          <Table.Cell>
            {1}
          </Table.Cell>
          <Table.Cell>90%</Table.Cell>
          <Table.Cell>
            {new Date(project.startDateTime).toISOString()}
          </Table.Cell>
          <Table.Cell>
            {calculateEndDuration(project.r1EndTime)}
          </Table.Cell>
        </Table.Row>,
      );
    }
    return <Table.Row>Activities could not be retrieved, please try reloading the page.</Table.Row>;
  };

  render() {
    return (
      <Table.Body>
        {this.addTableRowsDynamically()}
      </Table.Body>
    );
  }
}

const UpcomingDaicosTableHeader = () =>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Rounds</Table.HeaderCell>
      <Table.HeaderCell>R1 Goal</Table.HeaderCell>
      <Table.HeaderCell>Final Goal</Table.HeaderCell>
      <Table.HeaderCell>Price*</Table.HeaderCell>
      <Table.HeaderCell>Starts at</Table.HeaderCell>
      <Table.HeaderCell>R1 Ends on</Table.HeaderCell>
    </Table.Row>
  </Table.Header>;

class UpcomingDaicos extends Component {
  componentDidMount() {
    this.props.getUpcomingDaicos();
    this.props.showUpcomingDaicosLoaderAction();
  }

  render() {
    return (
      <div>
        {this.props.showUpcomingDaicosLoader
          ? <Loader active={this.props.showUpcomingDaicosLoader} />
          : this.props.upcomingDaicosRetrievedSuccessFully
            ? <Table>
                <UpcomingDaicosTableHeader />
                <UpcomingDaicosTableBody upcomingDaicosTable={this.props.upcomingDaicosTable} />
              </Table>
            : <h3>
                {this.props.upcomingDaicosRetrieveFailureMessage}
              </h3>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { upcomingDaicosTable, showUpcomingDaicosLoader, upcomingDaicosRetrieveFailureMessage, upcomingDaicosRetrievedSuccessFully } =
    state.upcomingDaicosData || {};
  return {
    upcomingDaicosTable,
    showUpcomingDaicosLoader,
    upcomingDaicosRetrieveFailureMessage,
    upcomingDaicosRetrievedSuccessFully,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getUpcomingDaicos,
      showUpcomingDaicosLoaderAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingDaicos);
