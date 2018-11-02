import React, { Component } from "react";
import ActiveDaicos from "../../containers/ActiveDaicos";
import UpcomingDaicos from "../../containers/UpcomingDaicos";
import EndedDaicos from "../../containers/EndedDaicos";
import {Grid} from "../../helpers/react-flexbox-grid";
import { CUITabs } from "../../helpers/material-ui";
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ paddingTop: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
class AllProjects extends Component {
  state={
    value: 'active'
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const list = [
      {
        label: 'Active DAICOs',
        value: 'active',
        key: 'active'
      },
      {
        label: 'Upcoming DAICOs',
        value: 'upcoming',
        key: 'upcoming'
      },
      {
        label: 'Ended DAICOs',
        value: 'ended',
        key: 'ended'
      }
    ]
    return (
      <Grid >
        <CUITabs style={{color: 'black !important'}} onChange={this.handleChange} value={this.state.value} indicatorColor="black" iconList={list}/>
        {value === 'active' && <TabContainer><ActiveDaicos history={this.props.history} /></TabContainer>}
        {value === 'upcoming' && <TabContainer><UpcomingDaicos history={this.props.history} /></TabContainer>}
        {value === 'ended' && <TabContainer><EndedDaicos history={this.props.history} /></TabContainer>}
      </Grid>
    );
  }
}

export default AllProjects;
