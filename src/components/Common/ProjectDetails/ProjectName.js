import React from 'react';
import {CUICard, CUIFormInput, CUIButton} from '../../../helpers/material-ui';
import {CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS} from '../../../static/js/variables';
import {Row, Col} from '../../../helpers/react-flexbox-grid';
import SocialLinks from '../../Common/SocialLinks';
import {ButtonComponent} from '../FormComponents';
import DualComponent from '../FormComponents/DualButton';

class ProjectName extends React.Component{
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
                <CUICard style={{padding: '40px 52px'}}>
                    <Row>
                        <Col xs={12} lg={9}>
                            <div className="hl">
                                <span className="prjct-logo hli"></span>
                                <div className="hli push--left text--primary">
                                    <div className="txt-xxxl">Omisego (OMG)</div>
                                    <div className="txt">0.009861 ETH <span className="txt-inc"> (+31.23 %)</span></div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} className="txt-g-secondary txt">
                            <div>Level 2 Price</div>
                            <div>0.017522 ETH</div>
                        </Col>
                    </Row>
                    <Row className="push--top">
                        <Col lg={6} className="txt txt-g-secondary">
                            <div>Sold Out (3rd Round Ended)</div>
                        </Col>
                        <Col lg={6}>
                            <div><SocialLinks/></div>
                        </Col>
                    </Row>
                    <Row className="push-half--top txt">
                        <Col>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy 
                            nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi 
                            enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis 
                            nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in 
                        </Col>
                    </Row>
                    <Row className="push--top">
                        <Col lg={6} className="text--secondary txt">
                            <div>Read our whitepaper</div>
                            <div>Learn more on our website</div>
                        </Col>
                        <Col lg={6}>
                        { this.props.type === 'dual' ? 
                            <DualComponent
                                label1="Buy"
                                label2="Trade"
                            />
                            :
                            <ButtonComponent
                                type='danger'
                                onClick={()=> this.uploadDaico()}
                                label="Deny"
                            />
                        }
                            
                        </Col>
                    </Row>
                </CUICard>
        )
    }
}

export default ProjectName;