import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../SocialLinks";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";

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
    buttonSpinning,
    buyButtonVisibility,
    onBuyClick,
    buyButtonText,
    signinStatusFlag,
    tradeButtonVisibility,
    tradeUrl,
    whitelistButtonTransactionHash,
    buyButtonDisabled,
    thumbnailUrl
  } = props || {};
  const { website } = urls;
  const link = `https://rinkeby.etherscan.io/tx/${whitelistButtonTransactionHash}`;
  return (
    <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
      <Row>
        <Col xs={12} lg={9}>
          <div className="hl">
            <span className="prjct-logo hli">
              <img alt="logo" className="prjct-logo hli" src={thumbnailUrl} />
            </span>
            <div className="hli push--left text--primary push-half--top">
              <div className="txt-xl">
                {projectName} ({tokenTag})
              </div>
              <div className="txt opacity-75">
                {price} ETH
                {<span className="txt-inc">{` ${priceIncrement}%`}</span>}
              </div>
            </div>
          </div>
        </Col>
        <Col lg={3} className="txt-g-secondary txt txt-no-wrp">
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
        <Col lg={12} xs={12} className="fnt-ps">
          {description}
        </Col>
      </Row>
      <Row className="push--top">
        <Col lg={5} className="text--secondary txt">
          <div>
            <a className="text--secondary" href={whitepaper} target="_blank" rel="noopener noreferrer">
              Read our whitepaper
            </a>
          </div>
          <div>
            <a className="text--secondary txt-no-wrp" href={website} target="_blank" rel="noopener noreferrer">
              Learn more on our website
            </a>
          </div>
        </Col>
        <Col lg={7} className="text-right hl">
          {signinStatusFlag <= 2 ? (
            <div className="hli">
              <Tooltip title="This feature is only for Vault Members" id="btn-disabled">
                <div>
                  <LoadingButton tooltip="This feature is only for Vault Members" disabled>
                    {buttonText}
                  </LoadingButton>
                </div>
              </Tooltip>
            </div>
          ) : whitelistButtonTransactionHash !== "" ? (
            <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
              <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                Status
              </LoadingButton>
            </a>
          ) : buttonVisibility ? (
            <span className="hli">
              <LoadingButton onClick={onClick} loading={buttonSpinning}>
                {buttonText}
              </LoadingButton>
            </span>
          ) : buyButtonVisibility ? (
            <span className="hli">
              <LoadingButton onClick={onBuyClick} disabled={!buyButtonDisabled}>
                {buyButtonText}
              </LoadingButton>
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
