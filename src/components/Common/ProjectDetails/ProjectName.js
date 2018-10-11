import React from "react";
import { CUICard, CUIFormInput, CUIButton } from "../../../helpers/material-ui";
import { CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../../Common/SocialLinks";

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
      buttonVisibility
    } = this.props || {};
    const { website } = urls;
    return (
      <CUICard style={{ padding: "40px 52px" }}>
        <Row>
          <Col xs={12} lg={9}>
            <div className="hl">
              <span className="prjct-logo hli" />
              <div className="hli push--left text--primary">
                <div className="txt-xxxl">
                  {projectName} ({tokenTag})
                </div>
                <div className="txt">
                  <span>{price} ETH</span> <span className="txt-inc"> {priceIncrement}</span>
                </div>
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
          <Col lg={6}>
            {buttonVisibility ? (
              <CUIButton type={CUIButtonType.RAISED} buttonColor={CUIInputColor.PRIMARY} label={buttonText} onClick={onClick} />
            ) : (
              <span>You are whitelisted</span>
            )}
            {onSecondaryClick ? (
              <CUIButton type={CUIButtonType.RAISED} buttonColor={CUIInputColor.PRIMARY} label={secondaryButtonText} onClick={onSecondaryClick} />
            ) : null}
          </Col>
        </Row>
      </CUICard>
    );
  }
}

export default ProjectName;
