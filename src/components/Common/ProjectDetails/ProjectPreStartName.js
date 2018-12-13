import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import SocialLinks from "../SocialLinks";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
import { CustomToolTip } from "../FormComponents";
import { getSignInStatusText, getEtherScanHashLink, getEtherScanAddressLink } from "../../../helpers/common/projectDetailhelperFunctions";
import BtnLoader from "../../Loaders/BtnLoader";

const ProjectPreStartName = props => {
  const {
    urls,
    projectName,
    tokenTag,
    price,
    roundText,
    description,
    whitepaper,
    lastRoundInfo,
    buttonText,
    onClick,
    buttonVisibility,
    buttonSpinning,
    signinStatusFlag,
    whitelistButtonTransactionHash,
    thumbnailUrl,
    isCurrentMember,
    daicoTokenAddress,
    network,
    isMembershipRequestPending
  } = props || {};
  const disabledMsg = getSignInStatusText(signinStatusFlag);
  const link = getEtherScanHashLink(whitelistButtonTransactionHash, network);
  const etherscanLink = getEtherScanAddressLink(daicoTokenAddress, network);
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
              <div className="txt opacity-75">{price} ETH</div>
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
        <Col lg={6} className="text-right">
          {signinStatusFlag < 4 && (typeof isCurrentMember === "undefined" || !isCurrentMember) ? (
            <div className="hli">
              <CustomToolTip title={disabledMsg} id="btn-disabled" disabled>
                <span>
                  <LoadingButton style={{ padding: "0 40px" }} disabled>
                    {buttonText}
                  </LoadingButton>
                </span>
              </CustomToolTip>
            </div>
          ) : whitelistButtonTransactionHash !== "" ? (
            <div className="hli">
              <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            </div>
          ) : isMembershipRequestPending ? (
            <span className="hli">Your request is pending</span>
          ) : isCurrentMember ? (
            <span>
              You are whitelisted <img src="/assets/Vault/whitelist.svg" alt="whitelist checked" width="20" height="20" />
            </span>
          ) : buttonVisibility ? (
            <div className="hli">
              <LoadingButton onClick={onClick} loading={buttonSpinning}>
                {buttonText}
              </LoadingButton>
            </div>
          ) : (
            <span width="20">
              <BtnLoader width={45} height={9} />
            </span>
          )}
        </Col>
      </Row>
    </CUICard>
  );
};

export default ProjectPreStartName;
