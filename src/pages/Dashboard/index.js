/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from 'react';
import { Grid } from '../../helpers/react-flexbox-grid';
import GridData from '../../components/GridData';

class Dashboard extends Component {
  render() {
    return (
      <Grid>
        Dashboard
        <GridData />
      </Grid>
    );
  }
}

export default Dashboard;
