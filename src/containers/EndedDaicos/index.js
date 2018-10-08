import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';


class EndedDaicosTableHeader extends Component {
    render() {
        return (
            <div>
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
            </div>
        )
    }
}

class EndedDaicos extends Component {
    render() {
        return (
            <div>
                <Table>
                    <EndedDaicosTableHeader />
                    <Table.Body>

                    </Table.Body>
                </Table>
            </div>
        )
    }
}


export default EndedDaicos;