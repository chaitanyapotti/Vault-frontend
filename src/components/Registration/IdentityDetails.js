import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUICard, CUIFormInput, CUIButton } from "../../helpers/material-ui";
import {
  CUIInputType,
  CUIButtonType,
  CUIInputColor
} from "../../static/js/variables";
import { Row, Col } from "../../helpers/react-flexbox-grid";
import {
  adminNameChangedAction,
  adminEmailChangedAction,
  projectNameChangedAction,
  erc20TokenTagChangedAction,
  projectDescriptionChangedAction,
  websiteLinkAction,
  telegramLinkChangedAction,
  githubLinkChangedAction,
  mediumLinkChangedAction,
  facebookLinkChangedAction,
  twitterLinkChangedAction,
  teamAddressChangedAction
} from "../../actions/projectRegistrationActions";
import { ButtonComponent } from "../Common/FormComponents";
import actionTypes from "../../action_types";

class IdentityDetails extends React.Component {
  onChangeName = e => {
    this.props.adminNameChangedAction(e.target.value);
  };

  onChangeEmail = e => {
    this.props.adminEmailChangedAction(e.target.value);
  };

  onChangeProject = e => {
    this.props.projectNameChangedAction(e.target.value);
  };

  onChangeErc20Tag = e => {
    this.props.erc20TokenTagChangedAction(e.target.value);
  };

  onChangePrjctDesc = e => {
    this.props.projectDescriptionChangedAction(e.target.value);
  };

  onChangeWebLink = e => {
    this.props.websiteLinkAction(e.target.value);
  };

  onChangeTlgrmLink = e => {
    this.props.telegramLinkChangedAction(e.target.value);
  };

  onChangeGitLink = e => {
    this.props.githubLinkChangedAction(e.target.value);
  };

  onChangeMedLink = e => {
    this.props.mediumLinkChangedAction(e.target.value);
  };

  onChangeFbLink = e => {
    this.props.facebookLinkChangedAction(e.target.value);
  };

  onChangeTwtLink = e => {
    this.props.twitterLinkChangedAction(e.target.value);
  };

  onChangeTeamAddress = e => {
    this.props.teamAddressChangedAction(e.target.value);
  };

  uploadWhitePaper = () => {
    console.log("upload white paper button action");
  };

  componentDidUpdate(prevProps) {
    console.log("here");
    if (prevProps.errors !== this.props.errors) {
      this.hasError();
      this.getErrorMsg();
    }
  }

  hasError = () => {
    let returnvalue = false;
    if (this.props.errors) {
      if (
        this.props.errors.hasOwnProperty(actionTypes.ADMIN_NAME_CHANGED) &&
        this.props.errors[actionTypes.ADMIN_NAME_CHANGED !== ""]
      ) {
        returnvalue = true;
      } else {
        returnvalue = false;
      }
    } else {
      returnvalue = false;
    }
    console.log(returnvalue);
    return returnvalue;
  };
  getErrorMsg = () => {
    if (this.props.errors) {
      if (this.props.errors.hasOwnProperty(actionTypes.ADMIN_NAME_CHANGED)) {
        return this.props.errors[actionTypes.ADMIN_NAME_CHANGED];
      }
      return false;
    }
    return false;
  };
  render() {
    return (
      <CUICard style={{ padding: "40px 67px" }}>
        <div className="txt-xl">Identity Details</div>
        <hr />
        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Admin Name"
              inputLabel="Admin Name"
              inputPlaceholder="Eg. Aman"
              inputValue={this.props.adminName}
              textFocus
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeName}
              error={this.hasError()}
              helperText={this.getErrorMsg()}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Admin Email"
              inputLabel="Admin Email"
              inputPlaceholder="Eg. test@test.com"
              inputValue={this.props.adminEmail}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeEmail}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Project Name"
              inputLabel="Project Name"
              inputPlaceholder="Eg. Wanchain"
              inputValue={this.props.projectName}
              textFocus
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeProject}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="ERC20 Token Tag"
              inputLabel="ERC20 Token Tag"
              inputPlaceholder="Eg. ERC"
              inputValue={this.props.erc20TokenTag}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeErc20Tag}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              multiline
              inputName="Project Description"
              inputLabel="Project Description"
              inputPlaceholder="Eg. Protocol for E-Governance"
              inputValue={this.props.projectDescription}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangePrjctDesc}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Website Link"
              inputLabel="Website Link"
              inputPlaceholder="Eg. Wanchain"
              inputValue={this.props.websiteLink}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeWebLink}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Telegram Link"
              inputLabel="Telegram Link"
              inputPlaceholder="Eg. ERC"
              inputValue={this.props.telegramLink}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeTlgrmLink}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Github Link"
              inputLabel="Github Link"
              inputPlaceholder="Eg. Wanchain"
              inputValue={this.props.githubLink}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeGitLink}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Medium Link"
              inputLabel="Medium Link"
              inputPlaceholder="Eg. ERC"
              inputValue={this.props.mediumLink}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeMedLink}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Facebook Link"
              inputLabel="Facebook Link"
              inputPlaceholder="Eg. Wanchain"
              inputValue={this.props.facebookLink}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeFbLink}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Twitter Link"
              inputLabel="Twitter Link"
              inputPlaceholder="Eg. ERC"
              inputValue={this.props.twitterLink}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeTwtLink}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              full
              inputName="Team Address"
              inputLabel="Team Address"
              inputPlaceholder="0xABCD"
              inputValue={this.props.teamAddress}
              // onBlur={this.onBlurAge}
              // error={this.state.errorAgeText !== ''}
              // helperText={this.state.errorAgeText}
              // onKeyDownSelector="Admin"
              onChange={this.onChangeTeamAddress}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text--right push--top">
              <ButtonComponent
                id="uploadWhitepaper"
                label="Upload Whitepaper"
                onClick={this.uploadWhitePaper}
              />
            </div>
          </Col>
        </Row>
      </CUICard>
    );
  }
}

const mapStateToProps = state => {
  const {
    adminName,
    adminEmail,
    projectName,
    erc20TokenTag,
    projectDescription,
    websiteLink,
    telegramLink,
    githubLink,
    mediumLink,
    facebookLink,
    twitterLink,
    teamAddress,
    errors
  } = state.activeDaicosData || {};
  return {
    adminName,
    adminEmail,
    projectName,
    erc20TokenTag,
    projectDescription,
    websiteLink,
    telegramLink,
    githubLink,
    mediumLink,
    facebookLink,
    twitterLink,
    teamAddress,
    errors
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      adminNameChangedAction,
      adminEmailChangedAction,
      projectNameChangedAction,
      erc20TokenTagChangedAction,
      projectDescriptionChangedAction,
      websiteLinkAction,
      telegramLinkChangedAction,
      githubLinkChangedAction,
      mediumLinkChangedAction,
      facebookLinkChangedAction,
      twitterLinkChangedAction,
      teamAddressChangedAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdentityDetails);
