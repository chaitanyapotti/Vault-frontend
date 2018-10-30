import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../SocialLinks";
import LoadingButton from "../LoadingButton";

const ProjectGovernanceName = props => {
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
    onClick,
    buttonVisibility,
    priceIncrementFlag,
    buttonSpinning,
    buyButtonVisibility,
    onBuyClick,
    buyButtonText,
    signinStatusFlag,
    tradeButtonVisibility,
    tradeUrl
  } = props || {};
  const { website } = urls;
  return (
    <CUICard style={{ padding: "40px 40px" }}>
      <Row>
        <Col xs={12} lg={8}>
          <div className="hl">
            <span className="prjct-logo hli" />
            <div className="hli push--left text--primary push-half--top">
              <div className="txt-xxxl">
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
            <a href={whitepaper} target="_blank" rel="noopener noreferrer">
              Read our whitepaper
            </a>
          </div>
          <div>
            <a href={website} target="_blank" rel="noopener noreferrer">
              Learn more on our website
            </a>
          </div>
        </Col>
        <Col lg={6} className="text-right hl">
          {signinStatusFlag <= 2 ? (
            <div className="hli">
              <Tooltip title="This feature is only for Vault Members" id="btn-disabled">
                  <LoadingButton tooltip="This feature is only for Vault Members" disabled>
                    {buttonText}
                  </LoadingButton>
              </Tooltip>
            </div>
          ) : buttonVisibility ? (
            <span className="hli">
              <LoadingButton onClick={onClick} loading={buttonSpinning}>
                {buttonText}
              </LoadingButton>
            </span>
          ) : buyButtonVisibility ? (
            <span className="hli">
              <LoadingButton onClick={onBuyClick}>{buyButtonText}</LoadingButton>
            </span>
          ) : null}
          {tradeButtonVisibility ? (
            <a className="hli push-left--13" href={tradeUrl} target="_blank" rel="noopener noreferrer">
              <LoadingButton onClick={null}>Trade</LoadingButton>
            </a>
          ) : null}
        </Col>
      </Row>
    </CUICard>
  );
};

export default ProjectGovernanceName;
