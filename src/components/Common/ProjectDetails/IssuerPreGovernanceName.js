import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../SocialLinks";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";

const IssuerPreGovernanceName = props => {
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
    StartRound1Visibility,
    StartRound1Enabled,
    priceIncrementFlag,
    r1Finish,
    onR1FinalizeClick,
    startR1ButtonSpinning,
    r1FinalizeButtonSpinning,
    onStartR1Click,
    isPermissioned,
    onEditClick,
    startR1ButtonTransactionHash,
    r1FinalizeButtonTransactionHash,
    thumbnailUrl
  } = props || {};
  const link = `https://rinkeby.etherscan.io/tx/${startR1ButtonTransactionHash}`;
  const refundLink = `https://rinkeby.etherscan.io/tx/${r1FinalizeButtonTransactionHash}`;
  const { website } = urls;
  return (
    <CUICard style={{ padding: "40px 40px" }}>
      <Row>
        <Col xs={12} lg={8}>
          <div className="hl">
            <span className="prjct-logo hli">
              <img alt="logo" src={thumbnailUrl} />
            </span>
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
            <a href={ensureHttpUrl(whitepaper)} target="_blank" rel="noopener noreferrer">
              Read our whitepaper
            </a>
          </div>
          <div>
            <a href={ensureHttpUrl(website)} target="_blank" rel="noopener noreferrer">
              Learn more on our website
            </a>
          </div>
        </Col>
        <Col lg={6} className="text-right hl  ">
          {isPermissioned ? (
            startR1ButtonTransactionHash !== "" ? (
              <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            ) : r1FinalizeButtonTransactionHash !== "" ? (
              <a href={ensureHttpUrl(refundLink)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            ) : StartRound1Visibility ? (
              <div className="hli">
                <LoadingButton onClick={onStartR1Click} disabled={!StartRound1Enabled} loading={startR1ButtonSpinning}>
                  Start Round 1
                </LoadingButton>
              </div>
            ) : isPermissioned && r1Finish ? (
              <div className="hli">
                <LoadingButton onClick={onR1FinalizeClick} loading={r1FinalizeButtonSpinning}>
                  Initialise Refund
                </LoadingButton>
              </div>
            ) : null
          ) : null}
          {
            <span className="hli">
              <LoadingButton onClick={onEditClick} disabled={!isPermissioned}>
                Edit
              </LoadingButton>
            </span>
          }
        </Col>
      </Row>
    </CUICard>
  );
};

export default IssuerPreGovernanceName;
