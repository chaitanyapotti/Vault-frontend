import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../SocialLinks";
import LoadingButton from "../LoadingButton";

const ProjectCrowdSaleName = props => {
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
    r1Finish,
    onR1FinalizeClick,
    r1FinalizeButtonSpinning,
    whitelistButtonTransactionHash,
    r1FinalizeButtonTransactionHash,
    buyButtonDisabled
  } = props || {};
  const { website } = urls;
  const link = `https://rinkeby.etherscan.io/tx/${whitelistButtonTransactionHash}`;
  const r1FinalizeLink = `https://rinkeby.etherscan.io/tx/${r1FinalizeButtonTransactionHash}`;
  return (
    <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
      <Row>
        <Col xs={12} lg={8}>
          <div className="hl">
            <span className="prjct-logo hli" />
            <div className="hli push--left text--primary push-half--top">
              <div className="txt-xl">
                {projectName} ({tokenTag})
              </div>
              <div className="txt opacity-75">
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
        <Col lg={12} className="fnt-ps">
          {description}
        </Col>
      </Row>
      <Row className="push--top">
        <Col lg={6} className="text--secondary txt">
          <div>
            <a className="text--secondary" href={whitepaper} target="_blank" rel="noopener noreferrer">
              Read our whitepaper
            </a>
          </div>
          <div>
            <a className="text--secondary" href={website} target="_blank" rel="noopener noreferrer">
              Learn more on our website
            </a>
          </div>
        </Col>
        <Col lg={6} className="text-right hl  ">
          {signinStatusFlag <= 2 ? (
            <div className="hli">
              <Tooltip title="This feature is only for Vault Members" id="btn-disabled">
                <div>
                  <LoadingButton style={{ padding: "0 40px" }} tooltip="This feature is only for Vault Members" disabled>
                    {buttonText}
                  </LoadingButton>
                </div>
              </Tooltip>
            </div>
          ) : whitelistButtonTransactionHash !== "" ? (
            <a href={link} target="_blank" rel="noreferrer noopener">
              <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                Status
              </LoadingButton>
            </a>
          ) : buttonVisibility ? (
            <span className="hli">
              <LoadingButton style={{ padding: "0 40px" }} onClick={onClick} loading={buttonSpinning}>
                {buttonText}
              </LoadingButton>
            </span>
          ) : buyButtonVisibility ? (
            <span className="hli push-left--13">
              <LoadingButton style={{ padding: "0 40px" }} onClick={onBuyClick} disabled={!buyButtonDisabled}>
                {buyButtonText}
              </LoadingButton>
            </span>
          ) : r1FinalizeButtonTransactionHash !== "" ? (
            <a href={r1FinalizeLink} target="_blank" rel="noreferrer noopener">
              <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                Status
              </LoadingButton>
            </a>
          ) : r1Finish ? (
            <span className="hli">
              <LoadingButton style={{ padding: "0 40px" }} onClick={onR1FinalizeClick} loading={r1FinalizeButtonSpinning}>
                Initialise Refund
              </LoadingButton>
            </span>
          ) : null}
        </Col>
      </Row>
    </CUICard>
  );
};

export default ProjectCrowdSaleName;
