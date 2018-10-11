import React from 'react';
import {CUICard, CUIFormInput, CUIButton} from '../../../helpers/material-ui';
import {CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS} from '../../../static/js/variables';
import {Row, Col} from '../../../helpers/react-flexbox-grid';
import SocialLinks from '../../Common/SocialLinks';
import {ButtonComponent} from '../FormComponents';

class PDetails extends React.Component{
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
                    <div className="txt-xxxl text--primary">Project Details</div>
                    <Row className="push-top--35">
                        <Col lg={6} className="txt">Individual Cap: <span className="text--secondary">3ETH/person</span> </Col>
                        <Col lg={6} className="txt">Kill Frequency: <span className="text--secondary">Quarterly</span> </Col>
                    </Row>

                    <Row className="push-half--top">
                        <Col lg={6} className="txt">Vote Saturation Limit: <span className="text--secondary">0.05%</span> </Col>
                        <Col lg={6} className="txt">Kill Attempts Left:<span className="text--secondary">5</span> </Col>
                    </Row>

                    <Row className="push-half--top">
                        <Col lg={6} className="txt">Kill Frequency:<span className="text--secondary">Quarterly</span> </Col>
                        <Col lg={6} className="txt">Next Kill Attempt:<span className="text--secondary">15th Oct 2018</span> </Col>
                    </Row>

                    <Row className="push-half--top">
                        <Col lg={6} className="txt">Individual Cap: <span className="text--secondary">3ETH/person</span> </Col>
                        <Col lg={6} className="txt">Kill Frequency: <span className="text--secondary">Quarterly</span> </Col>
                    </Row>

                    <div className="push-top--35 txt">Total Refundable Balance: <span className="text--secondary">19,076.98125 ETH</span></div>
                    <div className="txt">Kill Consensus: <span className="text--secondary">9.23%</span></div>
                    <div className="text-right">
                        <ButtonComponent
                            onClick={()=> this.uploadDaico()}
                            label="Kill Project"
                        />
                    </div>

                </CUICard>
        )
    }
}

export default PDetails;