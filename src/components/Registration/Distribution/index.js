import React from 'react';
import {CUICard, CUIFormInput, CUIButton} from '../../../helpers/material-ui';
import {CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS} from '../../../static/js/variables';
import {Row, Col} from '../../../helpers/react-flexbox-grid';
import TokenSale from './TokenSale';
import NonSale from './NonSale';
import TokenChart from './TokenChart';


class Distribution extends React.Component{
    render(){
        return(
            <div>
                <CUICard style={{padding: '40px 67px'}}>
                    <TokenSale/>
                    <NonSale/>
                    <TokenChart/>
                </CUICard>
            </div>
        )
    }
}

export default Distribution;