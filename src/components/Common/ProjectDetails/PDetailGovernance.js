import React from 'react';
import { CUICard } from '../../../helpers/material-ui';
import { Row, Col } from '../../../helpers/react-flexbox-grid';
import { ButtonComponent } from '../FormComponents';

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
      onKillClick,
    } =
      this.props || {};
    return (
      <CUICard style={{ padding: '40px 50px' }}>
        <div className="txt-xxxl text--primary">Project Details</div>
        <Row className="push-top--35">
          <Col lg={6} className="txt">
            Your Tokens: <span className="text--secondary">{yourTokens}</span>
          </Col>
          <Col lg={6} className="txt">
            Your Vote Share: <span className="text--secondary">{yourVoteShare}%</span>
          </Col>
        </Row>

        <Row className="push-half--top">
          <Col lg={6} className="txt">
            Vote Saturation Limit: <span className="text--secondary">{voteSaturationLimit}%</span>
          </Col>
          <Col lg={6} className="txt">
            Kill Attempts Left:
            <span className="text--secondary">{killAttemptsLeft}</span>
          </Col>
        </Row>

        <Row className="push-half--top">
          <Col lg={6} className="txt">
            Kill Frequency:
            <span className="text--secondary">{killFrequency}</span>
          </Col>
          <Col lg={6} className="txt">
            Next Kill Attempt:
            <span className="text--secondary">{nextKillAttempt}</span>
          </Col>
        </Row>

        <Row className="push-half--top">
          <Col lg={6} className="txt">
            Your Token Value: <span className="text--secondary">${yourTokenValue}</span>
          </Col>
          <Col lg={6} className="txt">
            your Refund Value: <span className="text--secondary">${yourRefundValue}</span>
          </Col>
        </Row>

        <Row className="push-top--35 txt txt-g-secondary ">
          <Col lg={12}>
            Total Refundable Balance: <span className="text--secondary">{totalRefundableBalance} ETH</span>
          </Col>
        </Row>
        <Row className="txt txt-g-secondary">
          <Col lg={12}>
            Kill Consensus: <span className="text--secondary">{killConsensus}%</span>
          </Col>
        </Row>
        <div className="text-right">
          <ButtonComponent type="danger" onClick={onKillClick} label="Kill Project" />
        </div>
      </CUICard>
    );
  }
}

export default PDetailGovernance;
