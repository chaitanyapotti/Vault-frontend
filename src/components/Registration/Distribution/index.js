import React from 'react';
import { CUICard } from '../../../helpers/material-ui';
import TokenSale from './TokenSale';
import NonSale from './NonSale';
import TokenChart from '../../Common/ProjectDetails/TokenChart';

class Distribution extends React.Component {
  render() {
    return (
      <div>
        <CUICard style={{ padding: '40px 67px' }}>
          <TokenSale />
          <NonSale />
          <TokenChart />
        </CUICard>
      </div>
    );
  }
}

export default Distribution;
