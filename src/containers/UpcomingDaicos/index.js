import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';


class UpcomingDaicosTableHeader extends Component {
    render() {
        return (
            <div>
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
            </div>
        )
    }
}

class UpcomingDaicos extends Component {
    render() {
        return (
            <div>
                <Table>
                    <UpcomingDaicosTableHeader />
                    <Table.Body>

                    </Table.Body>
                </Table>
            </div>
        )
    }
}


export default UpcomingDaicos;