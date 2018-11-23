import React, { Component } from "react";
import { Divider } from "@material-ui/core";
import { CUICard } from "../../../../helpers/material-ui";
import IssuerReqType from "./IssuerReqType";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import LoadingButton from "../../LoadingButton";
import { ensureHttpUrl } from "../../../../helpers/common/urlFixerInHref";
import { CustomToolTip } from "../../FormComponents";

class IssuerFundReq extends Component {
  getObject1 = () => {
    const {
      data,
      details,
      tokensUnderGovernance,
      isXfr1DescriptionEditable,
      onXfr1DescriptionChange,
      xfr1Description,
      isPermissioned,
      onEditXfr1DescriptionClick,
      onSaveXfr1DescriptionClick
    } = this.props || {};
    const { poll1 } = data || {};
    const { amount, consensus, endTime, address } = poll1 || {};
    const requiredData = details && details.length > 0 && address ? details.filter(x => x.address.toUpperCase() === address.toUpperCase()) : [];
    const { name, description, startDate } = requiredData[0] || {};
    return endTime ? (
      <IssuerReqType
        amount={amount}
        consensus={consensus}
        endTime={endTime}
        name={name}
        description={xfr1Description !== null ? xfr1Description : description}
        startDate={startDate}
        tokensUnderGovernance={tokensUnderGovernance}
        onEditDescriptionClick={onEditXfr1DescriptionClick}
        isDescriptionEditable={isXfr1DescriptionEditable}
        onDescriptionChange={onXfr1DescriptionChange}
        isPermissioned={isPermissioned}
        onSaveClick={onSaveXfr1DescriptionClick}
        address={address}
      />
    ) : null;
  };

  getObject2 = () => {
    const {
      data,
      details,
      tokensUnderGovernance,
      isXfr2DescriptionEditable,
      onXfr2DescriptionChange,
      xfr2Description,
      isPermissioned,
      onEditXfr2DescriptionClick,
      onSaveXfr2DescriptionClick
    } = this.props || {};
    const { poll2 } = data || {};
    const { amount, consensus, endTime, address } = poll2 || {};
    const requiredData = details && details.length > 0 && address ? details.filter(x => x.address.toUpperCase() === address.toUpperCase()) : [];
    const { name, description, startDate } = requiredData[0] || {};
    return endTime ? (
      <IssuerReqType
        amount={amount}
        consensus={consensus}
        endTime={endTime}
        name={name}
        description={xfr2Description !== null ? xfr2Description : description}
        startDate={startDate}
        tokensUnderGovernance={tokensUnderGovernance}
        onEditDescriptionClick={onEditXfr2DescriptionClick}
        isDescriptionEditable={isXfr2DescriptionEditable}
        onDescriptionChange={onXfr2DescriptionChange}
        isPermissioned={isPermissioned}
        onSaveClick={onSaveXfr2DescriptionClick}
        address={address}
      />
    ) : null;
  };

  render() {
    const xfr1 = this.getObject1();
    const xfr2 = this.getObject2();
    const {
      onWithdrawXfrAmountClick,
      canWithdrawXfrAmount,
      withdrawXfrButtonSpinning,
      getWithdrawableXfrAmount,
      withdrawXfrButtonTransactionHash,
      isPermissioned
    } = this.props || {};
    const { totalAmount, amount1, amount2, text } = getWithdrawableXfrAmount;
    const withdrawXfrLink = `https://rinkeby.etherscan.io/tx/${withdrawXfrButtonTransactionHash}`;
    return (
      <div>
        {totalAmount > 0 ? (
          <div>
            <Row className="push--top">
              <Col lg={4}>
                {!isPermissioned || !canWithdrawXfrAmount ? (
                  <div className="hli">
                    <CustomToolTip title="This feature is only for Vault Issuer Members" id="btn-disabled" disabled>
                      <div>
                        <LoadingButton disabled>Withdraw Xfr Amount</LoadingButton>
                      </div>
                    </CustomToolTip>
                  </div>
                ) : withdrawXfrButtonTransactionHash !== "" ? (
                  <div className="hli">
                    <a href={ensureHttpUrl(withdrawXfrLink)} target="_blank" rel="noreferrer noopener">
                      <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                        Status
                      </LoadingButton>
                    </a>
                  </div>
                ) : (
                  <span className="hli">
                    <LoadingButton onClick={onWithdrawXfrAmountClick} loading={withdrawXfrButtonSpinning} disabled={!canWithdrawXfrAmount}>
                      Withdraw Xfr Amount
                    </LoadingButton>
                  </span>
                )}
              </Col>
              <Col lg={8}>
                <div className="text--right">{text}</div>
              </Col>
            </Row>
            <Divider />
          </div>
        ) : null}
        {xfr1 !== null || xfr2 !== null ? (
          <div>
            <CUICard className="card-brdr">
              <div style={{ padding: "40px 50px" }} className="txt-xxxl text--primary">
                Exceptional Fund Requests
              </div>
              <Divider />
              <Row className="push-top--35">
                <Col lg={12} className="txt">
                  {xfr1}
                </Col>
              </Row>
              {xfr2 ? <Divider /> : null}
              <Row className="push-top--35">
                <Col lg={12} className="txt">
                  {xfr2}
                </Col>
              </Row>
            </CUICard>
          </div>
        ) : null}
      </div>
    );
  }
}

export default IssuerFundReq;
