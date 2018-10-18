import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import ActiveDaicos from '../../containers/ActiveDaicos';
import UpcomingDaicos from '../../containers/UpcomingDaicos';
import EndedDaicos from '../../containers/EndedDaicos';

const panes = [
  {
    menuItem: 'Active DAICOs',
    render: () =>
      <Tab.Pane attached={false}>
        {' '}<ActiveDaicos />
      </Tab.Pane>,
  },
  {
    menuItem: 'Upcoming DAICOs',
    render: () =>
      <Tab.Pane attached={false}>
        <UpcomingDaicos />
      </Tab.Pane>,
  },
  {
    menuItem: 'Ended DAICOs',
    render: () =>
      <Tab.Pane attached={false}>
        <EndedDaicos />
      </Tab.Pane>,
  },
];

class AllDaicos extends Component {
  render() {
    return (
      <div>
        <Tab menu={{ secondary: true, pointing: false }} panes={panes} />
      </div>
    );
  }
}

export default AllDaicos;
