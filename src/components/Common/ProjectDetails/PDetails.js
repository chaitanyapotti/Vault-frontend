import React from 'react';
import {CUICard, CUIFormInput, CUIButton} from '../../../helpers/material-ui';
import {CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS} from '../../../static/js/variables';
import {Row, Col} from '../../../helpers/react-flexbox-grid';
import SocialLinks from '../../Common/SocialLinks';

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
                    <div>Project Details</div>
                    <Row>
                        <Col lg={6}>Individual Cap: <span className="text--secondary">3ETH/person</span> </Col>
                        <Col lg={6}>Kill Frequency: <span className="text--secondary">Quarterly</span> </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>Vote Saturation Limit: <span className="text--secondary">0.05%</span> </Col>
                        <Col lg={6}>Kill Attempts Left:<span className="text--secondary">5</span> </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>Kill Frequency:<span className="text--secondary">Quarterly</span> </Col>
                        <Col lg={6}>Next Kill Attempt:<span className="text--secondary">15th Oct 2018</span> </Col>
                    </Row>

                    <Row>
                        <Col lg={6}>Individual Cap: <span className="text--secondary">3ETH/person</span> </Col>
                        <Col lg={6}>Kill Frequency: <span className="text--secondary">Quarterly</span> </Col>
                    </Row>

                    <div>Total Refundable Balance: <span className="text--secondary">19,076.98125 ETH</span></div>
                    <div>Kill Consensus: <span className="text--secondary">9.23%</span></div>
                    <div>
                        <CUIButton
                            type={CUIButtonType.RAISED}
                            buttonColor={CUIInputColor.PRIMARY}
                            id="Kill Project"
                            label={'Kill Project'}
                            // disabled={!this.state.validPassword}
                            onClick={() => {
                                this.uploadDaico();
                            }}
                        />
                    </div>

                </CUICard>
        )
    }
}

export default PDetails;