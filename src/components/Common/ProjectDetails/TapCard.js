import React from 'react';
import {CUICard, CUIFormInput, CUIButton} from '../../../helpers/material-ui';
import {CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS} from '../../../static/js/variables';
import {Row, Col} from '../../../helpers/react-flexbox-grid';
import SocialLinks from '../../Common/SocialLinks';

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
        const {
            currentTapAmount,
            tapIncrementUnit,
            incrementApproval
        }
        return(
                <CUICard style={{padding: '40px 50px'}}>
                    <div>Tap Increment</div>
                    <Row>
                        <Col lg={6}>Current Tap Amount: <span className="text--secondary">{this.props.currentTapAmount} ETH</span> </Col>
                        <Col lg={6}>Tap increment Unit: <span className="text--secondary">{this.props.tapIncrementUnit} ETH</span> </Col>
                    </Row>

                    <Row>
                        <Col lg={12}>Increment Approval: <span className="text--secondary">{this.props.incrementApproval}%</span> </Col>
                    </Row>
                    <div>
                        <CUIButton
                            type={CUIButtonType.RAISED}
                            buttonColor={CUIInputColor.PRIMARY}
                            id="Approve"
                            label={'Approve'}
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

export default TapCard;