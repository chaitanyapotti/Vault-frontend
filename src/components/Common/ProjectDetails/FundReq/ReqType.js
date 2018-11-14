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
    onXfrPollHistoryClick,
    canXfrClick,
    xfr1ButtonTransactionHash,
    xfr2ButtonTransactionHash,
    xfr2Link,
    link
  } = props || {};
  return (
    <div style={{ padding: "40px 50px" }}>
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

      <div className="push--top txt fnt-ps">{description}</div>

      <Row className="push--top">
        <Col lg={5} className="txt txt-no-wrp">
          Approval Rate:{" "}
          <span className="text--secondary"> {100 - significantDigits(parseFloat(consensus) / parseFloat(tokensUnderGovernance) || 0)}%</span>
        </Col>
        <Col lg={7} className="txt txt-no-wrp">
          Ends in: <span className="text--secondary">{formatDate(endTime * 1000)}</span>
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="push--top text-right">
          {signinStatusFlag <= 3 ? (
            <Tooltip title="This feature is only for Vault Members" id="btn-disabled">
              <div>
                <LoadingButton style={{ padding: "0 40px" }} disabled type="danger">
                  Deny
                </LoadingButton>
              </div>
            </Tooltip>
          ) : xfr1ButtonTransactionHash && xfr1ButtonTransactionHash !== "" ? (
            <a href={link} target="_blank" rel="noreferrer noopener">
              <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                Status
              </LoadingButton>
            </a>
          ) : xfr2ButtonTransactionHash && xfr2ButtonTransactionHash !== "" ? (
            <a href={link} target="_blank" rel="noreferrer noopener">
              <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                Status
              </LoadingButton>
            </a>
          ) : voted ? (
            <LoadingButton style={{ padding: "0 40px" }} onClick={onRevokeXfrClick} loading={xfrButtonSpinning} disabled={!canXfrClick}>
              Allow
            </LoadingButton>
          ) : (
            <LoadingButton style={{ padding: "0 40px" }} onClick={onXfrClick} type="danger" loading={xfrButtonSpinning} disabled={!canXfrClick}>
              Deny
            </LoadingButton>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ReqType;
