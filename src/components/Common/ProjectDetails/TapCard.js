import React from 'react';
import {CUICard, CUIFormInput, CUIButton} from '../../../helpers/material-ui';
import {CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS} from '../../../static/js/variables';
import {Row, Col} from '../../../helpers/react-flexbox-grid';
import SocialLinks from '../../Common/SocialLinks';
import ButtonComponent from '../FormComponents/ButtonComponent';

class TapCard extends React.Component{
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
                    <div className="txt-xxxl text--primary">Tap Increment</div>
                    <Row className="push-top--35">
                        <Col lg={6} className="txt">Current Tap Amount: <span className="text--secondary">550 ETH</span> </Col>
                        <Col lg={6} className="txt">Tap increment Unit: <span className="text--secondary">50 ETH</span> </Col>
                    </Row>

                    <Row>
                        <Col lg={12} className="txt">Increment Approval: <span className="text--secondary">9.23%</span> </Col>
                    </Row>
                    <div className="text-right">
                        <ButtonComponent
                            type='danger'
                            onClick={()=> this.uploadDaico()}
                            label="Approve"
                        />
                    </div>
                </CUICard>
        )
    }
}

export default TapCard;