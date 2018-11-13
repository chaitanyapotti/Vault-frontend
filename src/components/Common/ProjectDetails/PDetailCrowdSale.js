import React from "react";
import { CUICard } from "../../../helpers/material-ui";
import { Row, Col } from "../../../helpers/react-flexbox-grid";

const PDetailCrowdSale = props => {
  const {
    individualCap,
    voteSaturationLimit,
    killFrequency,
    initialTapAmount,
    initialFundRelease,
    tapIncrementUnit,
    hardCapCapitalisation,
    dilutedCapitalisation,
    tokenDataVisibitlity,
    tokenBalance,
    buyableTokens
  } = props || {};
  return (
    <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
      <div className="txt-xxxl text--primary">Project Details</div>
      <Row className="push-top--35">
        <Col lg={6} className="txt">
          <div className="txt-bold">Individual Cap: </div>
          <div className="text--secondary">{individualCap} ETH/person</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Kill Frequency: </div>
          <div className="text--secondary">{killFrequency}</div>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Vote Saturation Limit: </div>
          <div className="text--secondary">{voteSaturationLimit}%</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Initial Fund Release: </div>
          <div className="text--secondary">{initialFundRelease} ETH</div>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Initial Tap Amount: </div>
          <div className="text--secondary">{initialTapAmount} ETH/month</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Tap Increment Factor: </div>
          <div className="text--secondary">{tapIncrementUnit}</div>
        </Col>
      </Row>

      <Row className="push-half--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Hard Capitalisation: </div>
          <div className="text--secondary">{hardCapCapitalisation}</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Diluted Capitalisation: </div>
          <div className="text--secondary">{dilutedCapitalisation}</div>
        </Col>
      </Row>
      {tokenDataVisibitlity ? (
        <Row className="push-half--top">
          <Col lg={6} className="txt">
            <div className="txt-bold">User Token Balance:</div>
            <div className="text--secondary">{tokenBalance}</div>
          </Col>
          <Col lg={6} className="txt">
            <div className="txt-bold">Total Buyable Tokens: </div>
            <div className="text--secondary">{buyableTokens}</div>
          </Col>
        </Row>
      ) : (
        <span />
      )}
    </CUICard>
  );
};

export default PDetailCrowdSale;

// <Col lg={6} className="txt">
//           {tokenBalance > 0 ? <span className="text--secondary"> user: {tokenBalance}</span> : <span />}
//         </Col>
