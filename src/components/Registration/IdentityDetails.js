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
  teamAddressChangedAction,
  whitepaperChangedAction,
  uploadWhitepaperAction,
  thumbnailChangedAction,
      uploadThumbnailAction
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

  whitepaperChanged = e => {
    this.props.whitepaperChangedAction(e.target.files[0])
  }

  uploadWhitepaper = () => {
    this.props.uploadWhitepaperAction(this.props.whitepaperPDF, this.props.userLocalPublicAddress, "whitepaper")
  };

  thumbnailChanged = e => {
    this.props.thumbnailChangedAction(e.target.files[0])
  }

  uploadThumbnail = () => {
    this.props.uploadThumbnailAction(this.props.thumbnailImage, this.props.userLocalPublicAddress, "thumbnail")
  };

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.getErrorMsg();
    }
  }

  getErrorMsg = propName => {
    if (this.props.errors) {
      if (this.props.errors.hasOwnProperty(propName)) {
        return this.props.errors[propName];
      }
      return "";
    }
    return "";
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
              required
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
              error={!!this.getErrorMsg(actionTypes.ADMIN_NAME_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.ADMIN_NAME_CHANGED)}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
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
              error={!!this.getErrorMsg(actionTypes.ADMIN_EMAIL_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.ADMIN_EMAIL_CHANGED)}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
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
              error={!!this.getErrorMsg(actionTypes.PROJECT_NAME_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.PROJECT_NAME_CHANGED)}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
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
              error={!!this.getErrorMsg(actionTypes.ERC20_TAG_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.ERC20_TAG_CHANGED)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
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
              required
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
              error={!!this.getErrorMsg(actionTypes.WEBSITE_LINK_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.WEBSITE_LINK_CHANGED)}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
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
              error={!!this.getErrorMsg(actionTypes.TELEGRAM_LINK_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.TELEGRAM_LINK_CHANGED)}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
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
              error={!!this.getErrorMsg(actionTypes.GITHUB_LINK_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.GITHUB_LINK_CHANGED)}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
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
              error={!!this.getErrorMsg(actionTypes.MEDIUM_LINK_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.MEDIUM_LINK_CHANGED)}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
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
              error={!!this.getErrorMsg(actionTypes.FACEBOOK_LINK_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.FACEBOOK_LINK_CHANGED)}
            />
          </Col>
          <Col xs={12} lg={6}>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
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
              error={!!this.getErrorMsg(actionTypes.TWITTER_LINK_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.TWITTER_LINK_CHANGED)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <CUIFormInput
              inputType={CUIInputType.TEXT}
              required
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
              error={!!this.getErrorMsg(actionTypes.TEAM_ADDRESS_CHANGED)}
              helperText={this.getErrorMsg(actionTypes.TEAM_ADDRESS_CHANGED)}
            />
          </Col>
        </Row>
        <Row>
          <div className="text--right push--top">
            <Col>
              <input
                type="file"
                accept="application/pdf"
                onChange={this.whitepaperChanged}
              >
              </input>
            </Col>
            <Col>
              <ButtonComponent
                id="uploadWhitepaper"
                label="Upload Whitepaper"
                onClick={this.uploadWhitepaper}
              ></ButtonComponent>
              {
                this.props.uploadingWhitepaper ?
                  <div>Uploading</div> : <div>{this.props.whitepaperUrl} </div>
              }
            </Col>
          </div>
        </Row>
        <Row>
          <div className="text--right push--top">
            <Col>
              <input
                type="file"
                accept="image/*"
                onChange={this.thumbnailChanged}
              >
              </input>
            </Col>
            <Col>
              <ButtonComponent
                id="uploadThumbnail"
                label="Upload Thumbnail"
                onClick={this.uploadThumbnail}
              ></ButtonComponent>
              {
                this.props.uploadingThumbnail ?
                  <div>Uploading</div> : <div>{this.props.thumbnailUrl} </div>
              }
            </Col>
          </div>
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
    whitepaperPDF,
    uploadingWhitepaper,
    whitepaperUrl,
    thumbnailImage,
    uploadingThumbnail,
    thumbnailUrl,
    errors
  } = state.projectRegistrationData || {};
  const { userLocalPublicAddress } = state.signinManagerData || {};
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
    whitepaperPDF,
    uploadingWhitepaper,
    whitepaperUrl,
    thumbnailImage,
    uploadingThumbnail,
    thumbnailUrl,
    errors,
    userLocalPublicAddress
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
      teamAddressChangedAction,
      whitepaperChangedAction,
      uploadWhitepaperAction,
      thumbnailChangedAction,
      uploadThumbnailAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdentityDetails);
