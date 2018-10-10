import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Table, Loader } from 'semantic-ui-react';
import { getEndedDaicos, showEndedDaicosLoaderAction } from '../../actions/endedDaicosActions';
import moment from 'moment';

const calculateEndDuration = (r1EndTime) => {
    // console.log(moment.duration( moment(moment(r1EndTime).format('YYYY-MM-DD hh:mm:ss')), moment(moment().format('YYYY-MM-DD hh:mm:ss'))))
    return r1EndTime
}

const calculateRoundGoal = (round) => {
    return (parseFloat(round.tokenCount) / (parseFloat(round.tokenRate) * Math.pow(10, 18)))
}

class EndedDaicosTableBody extends Component {
    addTableRowsDynamically = () => {
        const table = this.props.endedDaicosTable;
        if (table && table.length > 0) {
            return table.map((project, index) => {
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

const EndedDaicosTableHeader = () => {
    return (
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
    )
}

class EndedDaicos extends Component {
    componentDidMount() {
        this.props.getEndedDaicos()
        this.props.showEndedDaicosLoaderAction()
    }

    render() {
        return (
            <div>
                {
                    this.props.showEndedDaicosLoader ?
                        <Loader active={this.props.showEndedDaicosLoader} /> :
                        (this.props.endedDaicosRetrievedSuccessFully ?
                            <Table>
                                <EndedDaicosTableHeader />
                                <EndedDaicosTableBody endedDaicosTable={this.props.endedDaicosTable} />
                            </Table>
                            :
                            <h3>{this.props.endedDaicosRetrieveFailureMessage}</h3>
                        )

                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { endedDaicosTable, showEndedDaicosLoader, endedDaicosRetrieveFailureMessage, endedDaicosRetrievedSuccessFully } = state.endedDaicosData || {}
    return {
        endedDaicosTable: endedDaicosTable,
        showEndedDaicosLoader: showEndedDaicosLoader,
        endedDaicosRetrieveFailureMessage: endedDaicosRetrieveFailureMessage,
        endedDaicosRetrievedSuccessFully: endedDaicosRetrievedSuccessFully
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getEndedDaicos: getEndedDaicos,
        showEndedDaicosLoaderAction: showEndedDaicosLoaderAction
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EndedDaicos);

