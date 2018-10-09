import React from 'react';
import {CUICard, CUIFormInput, CUIButton} from '../../../../helpers/material-ui';
import {CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS} from '../../../../static/js/variables';
import {Row, Col} from '../../../../helpers/react-flexbox-grid';
import SocialLinks from '../../../Common/SocialLinks';
import ReqType from './ReqType';

class FundReq extends React.Component{
    state={
        inifundValue: '',
    }

    onChangeIniFundVal = (e) =>{
        this.setState({
            inifundValue: e.target.value
        })
    }

    uploadDaico = () => {
        console.log('upload DAICO button action');
    }

    render(){
        return(
                <CUICard style={{padding: '40px 50px'}}>
                    <ReqType/>
                    <ReqType/>
                </CUICard>
        )
    }
}

export default FundReq;