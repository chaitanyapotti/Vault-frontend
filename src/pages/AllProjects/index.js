import React, { Component } from "react";
import { Tab } from "semantic-ui-react";
import ActiveDaicos from "../../containers/ActiveDaicos";
import UpcomingDaicos from "../../containers/UpcomingDaicos";
import EndedDaicos from "../../containers/EndedDaicos";



class AllProjects extends Component {

  panes = [
    {
      menuItem: "Active DAICOs",
      render: () => (
        <Tab.Pane attached={false}>
          {" "}
          <ActiveDaicos history={this.props.history}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Upcoming DAICOs",
      render: () => (
        <Tab.Pane attached={false}>
          <UpcomingDaicos history={this.props.history}/>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Ended DAICOs",
      render: () => (
        <Tab.Pane attached={false}>
          <EndedDaicos history={this.props.history}/>
        </Tab.Pane>
      ),
    },
  ];

  render() {
    return (
      <div>
        <Tab menu={{ secondary: true, pointing: false }} panes={this.panes} history={this.props.history}/>
      </div>
    );
  }
}

export default AllProjects;
