import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../SocialLinks";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
import { CustomToolTip } from "../FormComponents";

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
    buyButtonDisabled,
    thumbnailUrl,
    remainingAllocation,
    daicoTokenAddress
  } = props || {};
  const { website } = urls;
  const link = `https://rinkeby.etherscan.io/tx/${whitelistButtonTransactionHash}`;
  const r1FinalizeLink = `https://rinkeby.etherscan.io/tx/${r1FinalizeButtonTransactionHash}`;
  const etherscanLink = `https://rinkeby.etherscan.io/address/${daicoTokenAddress}`;
  const warningText = signinStatusFlag <= 2 ? "This feature is for vault members only" : "";
  return (
    <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
      <Row>
        <Col xs={12} lg={8}>
          <div className="hl">
            <span className="prjct-logo hli">
              <img className="prjct-logo hli" alt="logo" src={thumbnailUrl} />
            </span>
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
        <Col lg={4} className="push-half--top text-right">
          <a id="lnktag" className="text--black" href={ensureHttpUrl(etherscanLink)} target="_blank" rel="noreferrer noopener">
            View On Etherscan
          </a>
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
              <CustomToolTip title={warningText} id="btn-disabled">
                <div>
                  <LoadingButton style={{ padding: "0 40px" }} disabled>
                    {buttonText}
                  </LoadingButton>
                </div>
              </CustomToolTip>
            </div>
          ) : whitelistButtonTransactionHash !== "" ? (
            <div className="hli">
              <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" style={{ padding: "0 40px" }} onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            </div>
          ) : buttonVisibility ? (
            <span className="hli">
              <LoadingButton style={{ padding: "0 40px" }} onClick={onClick} loading={buttonSpinning}>
                {buttonText}
              </LoadingButton>
            </span>
          ) : buyButtonVisibility ? (
            <CustomToolTip disabled={!buyButtonDisabled || remainingAllocation === 0} title="Can't Buy Now">
              <span className="hli push-left--13">
                <LoadingButton style={{ padding: "0 40px" }} onClick={onBuyClick} disabled={!buyButtonDisabled || remainingAllocation === 0}>
                  {buyButtonText}
                </LoadingButton>
              </span>
            </CustomToolTip>
          ) : r1FinalizeButtonTransactionHash !== "" ? (
            <div className="hli">
              <a href={ensureHttpUrl(r1FinalizeLink)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            </div>
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
