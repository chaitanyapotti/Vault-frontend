import React from 'react';
import {CUICard, CUIFormInput, CUIButton} from '../../../helpers/material-ui';
import {CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS} from '../../../static/js/variables';
import {Row, Col} from '../../../helpers/react-flexbox-grid';
import SocialLinks from '../../Common/SocialLinks';

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
                <CUICard style={{padding: '40px 67px'}}>
                    <Row>
                        <Col xs={12} lg={9}>
                            <div className="hl">
                                <span className="prjct-logo hli"></span>
                                <div className="hli">
                                    <div className="txt-xxxl">Omisego (OMG)</div>
                                    <div>0.009861 ETH <span className="txt-inc"> (+31.23 %)</span></div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div>Level 2 Price</div>
                            <div>0.017522 ETH</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <div>Sold Out (3rd Round Ended)</div>
                        </Col>
                        <Col lg={6}>
                            <div><SocialLinks/></div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy 
                            nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi 
                            enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis 
                            nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in 
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <div>Read our whitepaper</div>
                            <div>Learn more on our website</div>
                        </Col>
                        <Col lg={6}>
                            <CUIButton
                                type={CUIButtonType.RAISED}
                                buttonColor={CUIInputColor.PRIMARY}
                                id="Publish DAICO"
                                label={'Publish DAICO'}
                                // disabled={!this.state.validPassword}
                                onClick={() => {
                                    // this.uploadDaico();
                                }}
                            />
                        </Col>
                    </Row>
                </CUICard>
        )
    }
}

export default ProjectName;