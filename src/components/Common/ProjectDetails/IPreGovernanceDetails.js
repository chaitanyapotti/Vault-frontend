import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
import { getEtherScanAddressLink } from "../../../helpers/common/projectDetailhelperFunctions";

const IPreGovernanceDetails = props => {
  const {
    individualCap,
    voteSaturationLimit,
    killFrequency,
    initialTapAmount,
    initialFundRelease,
    tapIncrementUnit,
    hardCapCapitalisation,
    dilutedCapitalisation,
    startDateTime,
    pollFactoryAddress,
    network
  } = props || {};
  const etherscanLink = getEtherScanAddressLink(pollFactoryAddress, network);
  return (
    <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
      <Row>
        <Col className="txt-xxxl text--primary" lg={6}>
          Project Details
        </Col>
        <Col className="push-half--top text-right" lg={6}>
          <a id="lnktag" className="text--black" href={ensureHttpUrl(etherscanLink)} target="_blank" rel="noreferrer noopener">
            View On Etherscan
          </a>
        </Col>
      </Row>
      <Row className="push-top--35">
        <Col lg={6} className="txt">
          <div className="txt-bold">ICO Start Date:</div>
          <div className="text--secondary">{startDateTime}</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Individual Cap:</div>
          <div className="text--secondary">{individualCap} ETH/person</div>
        </Col>
      </Row>
      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Vote Saturation Limit: </div>
          <div className="text--secondary">{voteSaturationLimit}%</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Kill Frequency: </div>
          <div className="text--secondary">{killFrequency}</div>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Initial Tap Amount:</div>
          <div className="text--secondary">{initialTapAmount} ETH/month</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Tap Increment Factor:</div>
          <div className="text--secondary">{tapIncrementUnit}</div>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Hard Cap Capitalisation: </div>
          <div className="text--secondary">{hardCapCapitalisation}</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Diluted Capitalisation:</div>
          <div className="text--secondary">{dilutedCapitalisation}</div>
        </Col>
      </Row>
      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Initial Fund Release: </div>
          <div className="text--secondary">{initialFundRelease} ETH</div>
        </Col>
      </Row>
    </CUICard>
  );
};

export default IPreGovernanceDetails;

// <Col lg={6} className="txt">
//           {tokenBalance > 0 ? <span className="text--secondary"> user: {tokenBalance}</span> : <span />}
//         </Col>
