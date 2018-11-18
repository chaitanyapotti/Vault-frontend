import React from "react";
import { Tooltip } from "@material-ui/core";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../SocialLinks";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";

const IssuerGovernanceName = props => {
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
    startNewRoundButtonSpinning,
    isPermissioned,
    onEditClick,
    canStartNewRound,
    startNewRoundButtonTransactionHash
  } = props || {};
  const link = `https://rinkeby.etherscan.io/tx/${startNewRoundButtonTransactionHash}`;
  const { website } = urls;
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
                {<span className="txt-inc">{` ${priceIncrement}%`}</span>}
              </div>
            </div>
          </div>
        </Col>
        <Col lg={4} className="txt-g-secondary txt txt-no-wrp">
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
        <Col lg={6} className="text-right hl">
          {!canStartNewRound ? null : !isPermissioned ? (
            <div className="hli">
              <Tooltip title="This feature is only for Vault Issuer Members" id="btn-disabled">
                <div>
                  <LoadingButton style={{ padding: "0 40px" }} disabled>
                    {buttonText}
                  </LoadingButton>
                </div>
              </Tooltip>
            </div>
          ) : startNewRoundButtonTransactionHash !== "" ? (
            <div className="hli">
              <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            </div>
          ) : (
            <span className="hli">
              <LoadingButton style={{ padding: "0 40px" }} onClick={onClick} loading={startNewRoundButtonSpinning} disabled={!canStartNewRound}>
                {buttonText}
              </LoadingButton>
            </span>
          )}
          {!isPermissioned ? (
            <div className="hli">
              <Tooltip title="This feature is only for Vault Issuer Members" id="btn-disabled">
                <LoadingButton style={{ padding: "0 40px" }} disabled>
                  Edit
                </LoadingButton>
              </Tooltip>
            </div>
          ) : (
            <span className="hli">
              <LoadingButton style={{ padding: "0 40px" }} onClick={onEditClick}>
                Edit
              </LoadingButton>
            </span>
          )}
        </Col>
      </Row>
    </CUICard>
  );
};

export default IssuerGovernanceName;
