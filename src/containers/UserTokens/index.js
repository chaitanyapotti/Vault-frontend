import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Table, Loader, Grid } from 'semantic-ui-react';
import { showUserTokensLoaderAction } from '../../actions/userTokensActions';


class UserTokensTableBody extends Component {
    addTableRowsDynamically = () => {
        const table = this.props.userTokensTable;
        if (table && table.length > 0) {
            return table.map((project, index) => {
                return (
                    <Table.Row key={index}>
                        <Table.Cell>{project.name}</Table.Cell>
                        <Table.Cell>{project.price}</Table.Cell>
                        <Table.Cell>{project.tokens}</Table.Cell>
                        <Table.Cell>{project.health}</Table.Cell>
                        <Table.Cell>{project.tapIncrement}</Table.Cell>
                        <Table.Cell>{project.killConsensus}</Table.Cell>
                        <Table.Cell>{project.nextKillPollRemainingTime}</Table.Cell>
                        <Table.Cell>{project.XFRs}</Table.Cell>
                    </Table.Row>
                );
            });
        } else {
            return <Table.Row>Activities could not be retrieved, please try reloading the page.</Table.Row>;
        }
    }

    render() {
        return (
            <Table.Body>
                {this.addTableRowsDynamically()}
            </Table.Body>
        )
    }
}

const UserTokensTableHeader = () => {
    return (
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
    )
}

class UserTokens extends Component {
    render() {
        return (
            <div>
                <Grid columns={5}>
                    <Grid.Row>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        </Grid.Column>
                        <Grid.Column>
                            My Tokens
                        </Grid.Column>
                        <Grid.Column>

                        </Grid.Column>
                        <Grid.Column>
                            *Prices based on current ETH/USD ratio
                        </Grid.Column>
                        <Grid.Column>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {
                    this.props.showUserTokensLoader ?
                        <Loader active={this.props.showUserTokensLoader} /> :
                        (this.props.userTokensRetrievedSuccessFully ?
                            <Table>
                                <UserTokensTableHeader />
                                <UserTokensTableBody userTokensTable={this.props.userTokensTable} />
                            </Table>
                            :
                            <h3>{this.props.userTokensRetrieveFailureMessage}</h3>
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { userTokensTable, showUserTokensLoader, userTokensRetrieveFailureMessage, userTokensRetrievedSuccessFully } = state.userTokensData || {}
    return {
        userTokensTable: userTokensTable,
        showUserTokensLoader: showUserTokensLoader,
        userTokensRetrieveFailureMessage: userTokensRetrieveFailureMessage,
        userTokensRetrievedSuccessFully: userTokensRetrievedSuccessFully
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        showUserTokensLoaderAction: showUserTokensLoaderAction
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserTokens);