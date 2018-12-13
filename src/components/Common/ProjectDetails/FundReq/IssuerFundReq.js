import React, { Component } from "react";
import { Divider } from "@material-ui/core";
import { CUICard } from "../../../../helpers/material-ui";
import IssuerReqType from "./IssuerReqType";
import { Row, Col } from "../../../../helpers/react-flexbox-grid";
import LoadingButton from "../../LoadingButton";
import { ensureHttpUrl } from "../../../../helpers/common/urlFixerInHref";
import { CustomToolTip } from "../../FormComponents";
import { getSignInStatusText, getEtherScanHashLink } from "../../../../helpers/common/projectDetailhelperFunctions";

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
      onSaveXfr1DescriptionClick,
      signinStatusFlag,
      userLocalPublicAddress,
      ownerAddress
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
        ownerAddress={ownerAddress}
        userLocalPublicAddress={userLocalPublicAddress}
        signinStatusFlag={signinStatusFlag}
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
      onSaveXfr2DescriptionClick,
      signinStatusFlag,
      userLocalPublicAddress,
      ownerAddress
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
        ownerAddress={ownerAddress}
        userLocalPublicAddress={userLocalPublicAddress}
        signinStatusFlag={signinStatusFlag}
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
      isPermissioned,
      onXfrPollHistoryClick,
      ownerAddress,
      userLocalPublicAddress,
      signinStatusFlag,
      network
    } = this.props || {};
    const { totalAmount, text } = getWithdrawableXfrAmount;
    const disabledMsg = getSignInStatusText(signinStatusFlag, ownerAddress === userLocalPublicAddress);
    const xfrWarningText = "No Current wihdrawable amount";
    const withdrawXfrLink = getEtherScanHashLink(withdrawXfrButtonTransactionHash, network);
    return (
      <div>
        {parseFloat(totalAmount) > 0 ? (
          <div>
            <Row className="push--top">
              <Col lg={4}>
                {!isPermissioned ? (
                  <div className="hli">
                    <CustomToolTip title={disabledMsg} id="btn-disabled" placement="bottom" disabled>
                      <div>
                        <LoadingButton style={{ padding: "0 40px" }} disabled>
                          Withdraw Xfr Amount
                        </LoadingButton>
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
                  <div className="hli">
                    <CustomToolTip title={xfrWarningText} id="btn-disabled" placement="bottom" disabled={!canWithdrawXfrAmount}>
                      <span className="hli">
                        <LoadingButton onClick={onWithdrawXfrAmountClick} loading={withdrawXfrButtonSpinning} disabled={!canWithdrawXfrAmount}>
                          Withdraw Xfr Amount
                        </LoadingButton>
                      </span>
                    </CustomToolTip>
                  </div>
                )}
              </Col>
              <Col lg={8}>
                <div className="text--right">{text}</div>
              </Col>
            </Row>
            <Divider />
          </div>
        ) : null}

        <div>
          <CUICard className="card-brdr">
            <Row style={{ padding: "40px 50px" }}>
              <Col className="txt-xxxl text--primary" lg={8}>
                Exceptional Fund Requests
              </Col>
              <Col className="push-half--top text-right txt-no-wrp" lg={4}>
                <LoadingButton className="text--black lnktags" type="text" onClick={onXfrPollHistoryClick}>
                  View XFR History
                </LoadingButton>
              </Col>
            </Row>
            {xfr1 !== null ? (
              <div>
                <Divider />
                <Row className="push-top--35">
                  <Col lg={12} className="txt">
                    {xfr1}
                  </Col>
                </Row>
              </div>
            ) : null}
            {xfr2 !== null ? (
              <div>
                <Divider />
                <Row className="push-top--35">
                  <Col lg={12} className="txt">
                    {xfr2}
                  </Col>
                </Row>
              </div>
            ) : null}
            {xfr1 === null && xfr2 === null ? (
              <Row>
                <Col lg={12} className="txt text-center">
                  <div style={{ padding: "40px 20px" }}>Xfr Poll not deployed</div>
                </Col>
              </Row>
            ) : null}
          </CUICard>
        </div>
      </div>
    );
  }
}

export default IssuerFundReq;
