import React, { Component } from "react";
import ActiveDaicos from "../../containers/ActiveDaicos";
import UpcomingDaicos from "../../containers/UpcomingDaicos";
import EndedDaicos from "../../containers/EndedDaicos";
import { Grid } from "../../helpers/react-flexbox-grid";
import { CUITabs } from "../../helpers/material-ui";

function TabContainer(props) {
  return <div style={{ paddingTop: 8 * 3 }}>{props.children}</div>;
}
class AllProjects extends Component {
  state = {
    value: "active"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const list = [
      {
        label: "Active DAICOs",
        value: "active",
        key: "active"
      },
      {
        label: "Upcoming DAICOs",
        value: "upcoming",
        key: "upcoming"
      },
      {
        label: "Ended DAICOs",
        value: "ended",
        key: "ended"
      }
    ];
    return (
      <Grid style={{ marginBottom: "50px" }}>
        <CUITabs style={{ color: "black !important" }} onChange={this.handleChange} value={this.state.value} iconList={list} />
        {value === "active" && (
          <TabContainer>
            <ActiveDaicos history={this.props.history} />
          </TabContainer>
        )}
        {value === "upcoming" && (
          <TabContainer>
            <UpcomingDaicos history={this.props.history} />
          </TabContainer>
        )}
        {value === "ended" && (
          <TabContainer>
            <EndedDaicos history={this.props.history} />
          </TabContainer>
        )}
      </Grid>
    );
  }
}

export default AllProjects;
