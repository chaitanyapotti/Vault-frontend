import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../SocialLinks";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
import { getSignInStatusText, getEtherScanAddressLink, getEtherScanHashLink } from "../../../helpers/common/projectDetailhelperFunctions";
import { CustomToolTip } from "../FormComponents";
import BtnLoader from "../../Loaders/BtnLoader";

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
    startNewRoundButtonTransactionHash,
    thumbnailUrl,
    signinStatusFlag,
    ownerAddress,
    userLocalPublicAddress,
    daicoTokenAddress,
    network
  } = props || {};
  const link = getEtherScanHashLink(startNewRoundButtonTransactionHash, network);
  const etherscanLink = getEtherScanAddressLink(daicoTokenAddress, network);
  const disabledMsg = getSignInStatusText(signinStatusFlag, ownerAddress === userLocalPublicAddress);
  const isDisabled = !isPermissioned;
  const { website } = urls;
  return (
    <CUICard className="card-brdr" style={{ padding: "40px 40px" }}>
      <Row>
        <Col xs={12} lg={8}>
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
        <Col lg={4} className="txt-g-secondary txt txt-no-wrp">
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
          {isPermissioned ? (
            startNewRoundButtonTransactionHash !== "" ? (
              <div className="hli">
                <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                  <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                    Status
                  </LoadingButton>
                </a>
              </div>
            ) : canStartNewRound ? (
              <span className="hli">
                <LoadingButton style={{ padding: "0 40px" }} onClick={onClick} loading={startNewRoundButtonSpinning}>
                  {buttonText}
                </LoadingButton>
              </span>
            ) : !canStartNewRound ? null : (
              <span width="20">
                <BtnLoader width={45} height={9} />
              </span>
            )
          ) : null}
          <div className="hli">
            <CustomToolTip disabled={isDisabled} title={disabledMsg} id="btn-disabled">
              <span>
                <LoadingButton style={{ padding: "0 40px" }} onClick={onEditClick} disabled={isDisabled}>
                  Edit
                </LoadingButton>
              </span>
            </CustomToolTip>
          </div>
        </Col>
      </Row>
    </CUICard>
  );
};

export default IssuerGovernanceName;
