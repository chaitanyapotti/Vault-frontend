import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Table, Loader } from 'semantic-ui-react';
import { getUpcomingDaicos, showUpcomingDaicosLoaderAction } from '../../actions/upcomingDaicosActions';
import moment from 'moment';

function calculateEndDuration(r1EndTime) {
    // console.log(moment.duration( moment(moment(r1EndTime).format('YYYY-MM-DD hh:mm:ss')), moment(moment().format('YYYY-MM-DD hh:mm:ss'))))
    return r1EndTime
}

function calculateRoundGoal(round) {
    return (parseFloat(round.tokenCount) / (parseFloat(round.tokenRate) * Math.pow(10, 18)))
}

function calculateFinalGoal(roundArray) {
    let finalGoal = 0
    for (let i = 0; i < roundArray.length; i++) {
        finalGoal += calculateRoundGoal(roundArray[i])
    }
    return finalGoal
}

class UpcomingDaicosTableBody extends Component {
    addTableRowsDynamically() {
        if (this.props.upcomingDaicosTable.length > 0) {
            return this.props.upcomingDaicosTable.map((project, index) => {
                return (
                    <Table.Row key={index}>
                        <Table.Cell>{project.projectName}</Table.Cell>
                        <Table.Cell>{100}</Table.Cell>
                        <Table.Cell>{1}</Table.Cell>
                        <Table.Cell>90%</Table.Cell>
                        <Table.Cell>{new Date(project.startDateTime).toISOString()}</Table.Cell>
                        <Table.Cell>{calculateEndDuration(project.r1EndTime)}</Table.Cell>
                    </Table.Row>
                );
            });
        } else {
            return <Table.Row key={145}>Activities could not be retrieved, please try reloading the page.</Table.Row>;
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

class UpcomingDaicosTableHeader extends Component {
    render() {
        return (
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
            </Table.Header>
        )
    }
}

class UpcomingDaicos extends Component {
    componentDidMount() {
        this.props.getUpcomingDaicos()
        this.props.showUpcomingDaicosLoaderAction()
    }

    render() {
        return (
            <div>
                {
                    this.props.showUpcomingDaicosLoader ?
                        <Loader active={this.props.showUpcomingDaicosLoader} /> :
                        (this.props.upcomingDaicosRetrievedSuccessFully ?
                            <Table>
                                <UpcomingDaicosTableHeader />
                                <UpcomingDaicosTableBody upcomingDaicosTable={this.props.upcomingDaicosTable} />
                            </Table>
                            :
                            <h3>{this.props.upcomingDaicosRetrieveFailureMessage}</h3>
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        upcomingDaicosTable: state.upcomingDaicosData.upcomingDaicosTable,
        showUpcomingDaicosLoader: state.upcomingDaicosData.showUpcomingDaicosLoader,
        upcomingDaicosRetrieveFailureMessage: state.upcomingDaicosData.upcomingDaicosRetrieveFailureMessage,
        upcomingDaicosRetrievedSuccessFully: state.upcomingDaicosData.upcomingDaicosRetrievedSuccessFully
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getUpcomingDaicos: getUpcomingDaicos,
        showUpcomingDaicosLoaderAction: showUpcomingDaicosLoaderAction
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpcomingDaicos);




