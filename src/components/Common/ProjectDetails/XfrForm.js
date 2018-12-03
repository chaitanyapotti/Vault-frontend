import React from "react";
import { Row, Col } from "../../../helpers/react-flexbox-grid";
import { CUIFormInput, CUICard } from "../../../helpers/material-ui";
import { CUIInputType } from "../../../static/js/variables";
import LoadingButton from "../LoadingButton";
import { ensureHttpUrl } from "../../../helpers/common/urlFixerInHref";
import { getSignInStatusText, getEtherScanHashLink } from "../../../helpers/common/projectDetailhelperFunctions";
import { CustomToolTip } from "../FormComponents";

const XfrForm = props => {
  const {
    titleText,
    onTitleTextChange,
    amountText,
    onAmountTextChange,
    descriptionText,
    onDescriptionTextChange,
    isPermissioned,
    canDeployXfrPoll,
    deployXfrButtonSpinning,
    onDeployXfrClick,
    deployXfrPollTransactionHash,
    signinStatusFlag,
    ownerAddress,
    userLocalPublicAddress,
    network
  } = props || {};
  const link = getEtherScanHashLink(deployXfrPollTransactionHash, network);
  const disabledMsg = getSignInStatusText(signinStatusFlag, ownerAddress === userLocalPublicAddress);
  const xfrDeployText = "Can't deploy now";
  return (
    <CUICard className="card-brdr" style={{ padding: "40px 50px" }}>
      <Row>
        <Col lg={6}>
          <CUIFormInput
            inputType={CUIInputType.TEXT}
            full
            inputName="Xfr Title"
            inputLabel="Xfr Title"
            inputPlaceholder="App Redesign"
            inputValue={titleText}
            textFocus
            // onBlur={this.onBlurAge}
            // error={this.state.errorAgeText !== ''}
            // helperText={this.state.errorAgeText}
            // onKeyDownSelector="Admin"
            onChange={onTitleTextChange}
          />
        </Col>
        <Col lg={6}>
          <CUIFormInput
            inputType={CUIInputType.TEXT}
            full
            inputName="Xfr Amount"
            inputLabel="Xfr Amount"
            inputPlaceholder="500 ETH"
            inputValue={amountText}
            textFocus
            // onBlur={this.onBlurAge}
            // error={this.state.errorAgeText !== ''}
            // helperText={this.state.errorAgeText}
            // onKeyDownSelector="Admin"
            onChange={onAmountTextChange}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <CUIFormInput
            inputType={CUIInputType.TEXT}
            full
            multiline
            rowsMax="4"
            inputName="Description"
            inputLabel="Description"
            inputValue={descriptionText}
            inputPlaceholder="Describe aboout fund request briefly"
            textFocus
            onChange={onDescriptionTextChange}
          />
        </Col>
      </Row>

      <Row className="push--top">
        <Col lg={4}>
          {!isPermissioned ? (
            <div className="hli">
              <CustomToolTip title={disabledMsg} id="btn-disabled" placement="bottom" disabled>
                <span>
                  <LoadingButton disabled>Deploy Xfr</LoadingButton>
                </span>
              </CustomToolTip>
            </div>
          ) : deployXfrPollTransactionHash !== "" ? (
            <div className="hli">
              <a href={ensureHttpUrl(link)} target="_blank" rel="noreferrer noopener">
                <LoadingButton type="pending" onClick={() => console.log("Sent to etherscan")}>
                  Status
                </LoadingButton>
              </a>
            </div>
          ) : (
            <div className="hli">
              <CustomToolTip title={xfrDeployText} id="btn-disabled" placement="bottom" disabled={!canDeployXfrPoll}>
                <span className="hli">
                  <LoadingButton onClick={onDeployXfrClick} loading={deployXfrButtonSpinning} disabled={!canDeployXfrPoll}>
                    Deploy Xfr
                  </LoadingButton>
                </span>
              </CustomToolTip>
            </div>
          )}
        </Col>
        <Col lg={8}>
          <div className="text--right">This poll will end in 30 days of publishing</div>
        </Col>
      </Row>
    </CUICard>
  );
};

export default XfrForm;
