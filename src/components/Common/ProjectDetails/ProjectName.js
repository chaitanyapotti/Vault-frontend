<<<<<<< HEAD
import React from 'react';
import {CUICard, CUIFormInput, CUIButton} from '../../../helpers/material-ui';
import {CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS} from '../../../static/js/variables';
import {Row, Col} from '../../../helpers/react-flexbox-grid';
import SocialLinks from '../../Common/SocialLinks';
import {ButtonComponent} from '../FormComponents';
import DualComponent from '../FormComponents/DualButton';
=======
import React from "react";
import { CUICard, CUIButton } from "../../../helpers/material-ui";
import { CUIButtonType, CUIInputColor, CS_COLORS } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../../Common/SocialLinks";
>>>>>>> project detail governance container added

class ProjectName extends React.Component{
    render(){
      const {
        urls,
        projectName,
        tokenTag,
        price,
        roundText,
        description,
        priceIncrement,
        whitepaper,
        lastRoundInfo,
        buttonText,
        secondaryButtonText,
        onClick,
        onSecondaryClick,
        buttonVisibility
      } = this.props || {};
      const { website } = urls;
        return(
                <CUICard style={{padding: '40px 52px'}}>
                    <Row>
                        <Col xs={12} lg={9}>
                            <div className="hl">
                                <span className="prjct-logo hli"></span>
                                <div className="hli push--left text--primary">
                                    <div className="txt-xxxl"> {projectName} ({tokenTag})</div>
                                    <div className="txt">{price} ETH<span className="txt-inc">{priceIncrement}</span></div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={3} className="txt-g-secondary txt">
                            {/* <div>Level 2 Price</div>
                            <div>0.017522 ETH</div> */}
                            <span>{lastRoundInfo}</span>
                        </Col>
                    </Row>
                    <Row className="push--top">
                        <Col lg={6} className="txt txt-g-secondary">
                            <div>{roundText}</div>
                        </Col>
                        <Col lg={6}>
                            <div><SocialLinks urls={urls} /></div>
                        </Col>
                    </Row>
                    <Row className="push-half--top txt">
                        <Col>
                          {description}
                        </Col>
                    </Row>
                    <Row className="push--top">
                        <Col lg={6} className="text--secondary txt">
                            <a href={whitepaper}>Read our whitepaper</a>
                            <a href={website}>Learn more on our website</a>
                        </Col>
                        <Col lg={6}>
                        {buttonVisibility ? (
                            <CUIButton type={CUIButtonType.RAISED} buttonColor={CUIInputColor.PRIMARY} label={buttonText} onClick={onClick} />
                          ) : null}
                          {onSecondaryClick ? (
                            <CUIButton type={CUIButtonType.RAISED} buttonColor={CUIInputColor.PRIMARY} label={secondaryButtonText} onClick={onSecondaryClick} />
                          ) : null}
                        {/* { this.props.type === 'dual' ? 
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
                        } */}
                            
                        </Col>
                    </Row>
                </CUICard>
        )
    }
}

export default ProjectName;
