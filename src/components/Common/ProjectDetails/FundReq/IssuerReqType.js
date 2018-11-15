import React from "react";
import { Tooltip } from "@material-ui/core";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import { formatFromWei, formatDate, significantDigits } from "../../../../helpers/common/projectDetailhelperFunctions";
import LoadingButton from "../../LoadingButton";
import { CUIFormInput, CUICard } from "../../../../helpers/material-ui";
import { CUIInputType } from "../../../../static/js/variables";

const IssuerReqType = props => {
  const {
    amount,
    consensus,
    endTime,
    description,
    startDate,
    name,
    tokensUnderGovernance,
    isPermissioned,
    isDescriptionEditable,
    xfrAddress,
    onDescriptionChange,
    onEditDescriptionClick
  } = props || {};
  return (
    <div style={{ padding: "20px 50px" }}>
      <div>Exceptional Fund Requests</div>
      <Row className="txt-g-secondary txt-m push-half--top">
        <Col lg={6}>
          <div>{name}</div>
        </Col>
        <Col lg={6}>
          <div>{formatDate(startDate)}</div>
        </Col>
      </Row>

      <div className="txt-g-secondary txt-m">{formatFromWei(amount, 3)} ETH</div>
      {isDescriptionEditable ? (
        <div className="push--top txt fnt-ps">{description}</div>
      ) : (
        <div className="push--top txt fnt-ps">
          <CUIFormInput
            inputType={CUIInputType.TEXT}
            full
            inputName="Xfr Description"
            inputLabel="Xfr Description"
            inputPlaceholder="App Redesign"
            inputValue={description}
            textFocus
            // onBlur={this.onBlurAge}
            // error={this.state.errorAgeText !== ''}
            // helperText={this.state.errorAgeText}
            // onKeyDownSelector="Admin"
            onChange={onDescriptionChange}
          />
        </div>
      )}

      <Row className="push--top">
        <Col lg={6}>
          {!isPermissioned ? (
            <div className="hli">
              <Tooltip title="This feature is only for Vault Issuer Members" id="btn-disabled">
                <div>
                  <LoadingButton style={{ padding: "0 40px" }} disabled>
                    Edit
                  </LoadingButton>
                </div>
              </Tooltip>
            </div>
          ) : (
            <span className="hli">
              <LoadingButton style={{ padding: "0 40px" }} onClick={() => onEditDescriptionClick(xfrAddress)}>
                Edit
              </LoadingButton>
            </span>
          )}
        </Col>
        <Col lg={6}>
          {isPermissioned && isDescriptionEditable ? (
            <span className="hli">
              <LoadingButton style={{ padding: "0 40px" }} onClick={() => console.log("here")}>
                Save
              </LoadingButton>
            </span>
          ) : null}
        </Col>
      </Row>

      <Row className="push--top">
        <Col lg={6} className="txt">
          <div className="txt-bold">Approval Rate: </div>
          <div className="text--secondary"> {100 - significantDigits(parseFloat(consensus) / parseFloat(tokensUnderGovernance) || 0)}%</div>
        </Col>
        <Col lg={6} className="txt">
          <div className="txt-bold">Ends in: </div>
          <div className="text--secondary">{formatDate(endTime * 1000)}</div>
        </Col>
      </Row>
    </div>
  );
};

export default IssuerReqType;
