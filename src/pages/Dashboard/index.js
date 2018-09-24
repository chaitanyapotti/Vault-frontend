/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, {Component} from 'react';
import {Grid} from '../../helpers/react-flexbox-grid';
import {Card, CardColumns} from 'reactstrap';
import LSCard from '../../components/Card/LSCard';
import SFCard from '../../components/Card/SFCard';

class Dashboard extends Component {
  render() {
    const cardStyle = {backgroundColor: '#fff', borderColor: '#fff', color: '#2d2d2d'};
    return (
      <Grid>
        <div>My Investments</div>
        <CardColumns>
          <Card body inverse style={cardStyle}>
            <SFCard/>
          </Card>
          <Card body inverse style={cardStyle}>
            <LSCard/>
          </Card>
          <Card body inverse style={cardStyle}>
            <SFCard/>
          </Card>
          <Card body inverse style={cardStyle}>
            <LSCard/>
          </Card>
          <Card body inverse style={cardStyle}>
            <SFCard/>
          </Card>
          <Card body inverse style={cardStyle}>
            <LSCard/>
          </Card>
          <Card body inverse style={cardStyle}>
            <SFCard/>
          </Card>
          <Card body inverse style={cardStyle}>
            <LSCard/>
          </Card>
          <Card body inverse style={cardStyle}>
            <SFCard/>
          </Card>
        </CardColumns>
      </Grid>
    );
  }
}

export default Dashboard;
