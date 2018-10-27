import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Table, Loader } from "semantic-ui-react";
import { showUserTokensLoaderAction } from "../../actions/userTokensActions";
import {Grid, Row, Col} from "../../helpers/react-flexbox-grid";
class UserTokensTableBody extends Component {
  handleTableRowClicked = projectid => {
    this.props.history.push({
      pathname: `/governance/details`,
      search: `?projectid=${projectid}`,
    });
  };

  addTableRowsDynamically = () => {
    const table = this.props.userTokensTable;
    if (table && table.length > 0) {
      return table.map((project, index) => (
        <Table.Row key={index} onClick={this.handleTableRowClicked.bind(this, project.name)}>
          <Table.Cell>{project.name}</Table.Cell>
          <Table.Cell>{project.price}</Table.Cell>
          <Table.Cell>{project.tokens}</Table.Cell>
          <Table.Cell>{project.health}</Table.Cell>
          <Table.Cell>{project.tapIncrement}</Table.Cell>
          <Table.Cell>{project.killConsensus}</Table.Cell>
          <Table.Cell>{project.nextKillPollRemainingTime}</Table.Cell>
          <Table.Cell>{project.XFRs}</Table.Cell>
        </Table.Row>
      ));
    }
    return <Table.Row>Activities could not be retrieved, please try reloading the page.</Table.Row>;
  };

  render() {
    return <Table.Body>{this.addTableRowsDynamically()}</Table.Body>;
  }
}

const UserTokensTableHeader = () => (
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

class UserTokens extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col lg={6}>My Tokens</Col>
          <Col lg={6} className="text--right">*Prices based on current ETH/USD ratio</Col>
        </Row>
        {this.props.showUserTokensLoader ? (
          <Loader active={this.props.showUserTokensLoader} />
        ) : this.props.userTokensRetrievedSuccessFully ? (
          <Table>
            <UserTokensTableHeader />
            <UserTokensTableBody userTokensTable={this.props.userTokensTable} history={this.props.history} />
          </Table>
        ) : (
          <h3>{this.props.userTokensRetrieveFailureMessage}</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userTokensTable, showUserTokensLoader, userTokensRetrieveFailureMessage, userTokensRetrievedSuccessFully } = state.userTokensData || {};
  return {
    userTokensTable,
    showUserTokensLoader,
    userTokensRetrieveFailureMessage,
    userTokensRetrievedSuccessFully
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showUserTokensLoaderAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTokens);
