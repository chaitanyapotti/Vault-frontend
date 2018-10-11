import React from "react";
import { CUICard, CUIFormInput, CUIButton } from "../../../helpers/material-ui";
import { CUIInputType, CUIButtonType, CUIInputColor, CS_COLORS } from "../../../static/js/variables";
import { Row, Col } from "../../../helpers/react-flexbox-grid";

class PDetailGovernance extends React.Component {
  render() {
    const {
      yourTokens,
      yourVoteShare,
      voteSaturationLimit,
      killAttemptsLeft,
      killFrequency,
      nextKillAttempt,
      yourTokenValue,
      yourRefundValue,
      totalRefundableBalance,
      killConsensus,
      onKillClick
    } = this.props || {};
    return (
      <CUICard style={{ padding: "40px 50px" }}>
        <div>Project Details</div>
        <Row>
          <Col lg={6}>
            Your Tokens: <span className="text--secondary">{yourTokens} ETH/person</span>
          </Col>
          <Col lg={6}>
            Your Vote Share: <span className="text--secondary">{yourVoteShare}</span>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            Vote Saturation Limit: <span className="text--secondary">{voteSaturationLimit}%</span>
          </Col>
          <Col lg={6}>
            Kill Attempts Left
            <span className="text--secondary">
              {killAttemptsLeft}
              ETH
            </span>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            Kill Frequency:
            <span className="text--secondary">{killFrequency}</span>
          </Col>
          <Col lg={6}>
            Next Kill Attempt:
            <span className="text--secondary">{nextKillAttempt}</span>
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            Your Token Value: <span className="text--secondary">{yourTokenValue} ETH</span>
          </Col>
          <Col lg={6}>
            your Refund Value: <span className="text--secondary">{yourRefundValue} ETH</span>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            Total Refundable Balance: <span className="text--secondary">{totalRefundableBalance} ETH</span>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            Kill Consensus: <span className="text--secondary">{killConsensus}%</span>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <CUIButton type={CUIButtonType.RAISED} buttonColor={CUIInputColor.PRIMARY} label="Kill Project" onClick={onKillClick} />
          </Col>
        </Row>
      </CUICard>
    );
  }
}

export default PDetailGovernance;
