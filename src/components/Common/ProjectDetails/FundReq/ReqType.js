import React from "react";
import { Tooltip } from "@material-ui/core";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import { formatFromWei, formatDate, significantDigits } from "../../../../helpers/common/projectDetailhelperFunctions";
import LoadingButton from "../../LoadingButton";

const ReqType = props => {
  const {
    amount,
    consensus,
    endTime,
    description,
    startDate,
    name,
    signinStatusFlag,
    voted,
    onXfrClick,
    onRevokeXfrClick,
    xfrButtonSpinning,
    tokensUnderGovernance,
    onXfrPollHistoryClick
  } = props || {};
  return (
    <div>
      <div>Exceptional Fund Requests</div>
      <Row className="txt-g-secondary txt-m">
        <Col lg={6}>
          <div>{name}</div>
        </Col>
        <Col lg={6}>
          <div>{formatDate(startDate)}</div>
        </Col>
      </Row>

      <div className="txt-g-secondary txt-m">
        <div lg={12}>{formatFromWei(amount, 3)} ETH</div>
      </div>

      <div className="push--top txt">{description}</div>

      <Row className="push--top">
        <Col lg={6} className="txt">
          Approval Rate:{" "}
          <span className="text--secondary"> {significantDigits(parseFloat(consensus) / parseFloat(tokensUnderGovernance) || 0)}%</span>
        </Col>
        <Col lg={6} className="txt">
          Ends in: <span className="text--secondary">{formatDate(endTime * 1000)}</span>
        </Col>
      </Row>
      <Row>
        <Col lg={6} className="push--top">
          {signinStatusFlag <= 3 ? (
            <Tooltip title="This feature is only for Vault Members" id="btn-disabled">
              <div>
                <LoadingButton disabled type="danger">
                  Deny
                </LoadingButton>
              </div>
            </Tooltip>
          ) : voted ? (
            <LoadingButton onClick={onRevokeXfrClick} loading={xfrButtonSpinning}>
              Allow
            </LoadingButton>
          ) : (
            <LoadingButton onClick={onXfrClick} type="danger" loading={xfrButtonSpinning}>
              Deny
            </LoadingButton>
          )}
        </Col>
        <Col lg={6} className="push--top text-right">
          <LoadingButton onClick={onXfrPollHistoryClick}>XFR polls History</LoadingButton>
        </Col>
      </Row>
    </div>
  );
};

export default ReqType;
