import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../SocialLinks";
import { ButtonComponent } from "../FormComponents";

class ProjectName extends React.Component {
  render() {
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
      buttonVisibility,
      priceIncrementFlag
    } = this.props || {};
    const { website } = urls;
    return (
      <CUICard style={{ padding: "40px 40px" }}>
        <Row>
          <Col xs={12} lg={8}>
            <div className="hl">
              <span className="prjct-logo hli" />
              <div className="hli push--left text--primary push-half--top">
                <div className="txt-xxxl">
                  {" "}
                  {projectName} ({tokenTag})
                </div>
                <div className="txt">
                  {price} ETH
                  {priceIncrementFlag ? <span className="txt-inc">{` ${priceIncrement}`}</span> : <div />}
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4} className="txt-g-secondary txt">
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
            <div>
              <SocialLinks urls={urls} />
            </div>
          </Col>
        </Row>
        <Row className="push-half--top txt">
          <Col>{description}</Col>
        </Row>
        <Row className="push--top">
          <Col lg={6} className="text--secondary txt">
            <div>
              <a href={whitepaper}>Read our whitepaper</a>
            </div>
            <div>
              <a href={website}>Learn more on our website</a>
            </div>
          </Col>
          <Col lg={6} className="text-right   ">
            {buttonVisibility ? <ButtonComponent onClick={onClick} label={buttonText} /> : <span>You are whitelisted</span>}
            {onSecondaryClick ? (
              <span className="push-left--13">
                <ButtonComponent onClick={onSecondaryClick} label={secondaryButtonText} />
              </span>
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
    );
  }
}

export default ProjectName;
