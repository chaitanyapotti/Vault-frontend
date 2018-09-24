/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, {Component} from 'react';
import {Grid} from '../../helpers/react-flexbox-grid';
import {DaicoDetails, ProfileDetails, TokenDistribution} from '../../components/Registration';

class Registration extends Component {
  render() {
    return (
      <Grid>
        <ProfileDetails/>
        <DaicoDetails/>
        <TokenDistribution/>
      </Grid>
    );
  }
}

export default Registration;
