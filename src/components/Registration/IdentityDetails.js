import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUICard, CUIFormInput } from "../../helpers/material-ui";
import { CUIInputType } from "../../static/js/variables";
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
              inputPlaceholder="Eg. Adam Smith"
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
              inputPlaceholder="Eg. admin@electus.network"
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
              inputPlaceholder="Eg. Electus"
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
              inputName="ERC20 Ticker"
              inputLabel="ERC20 Ticker"
              inputPlaceholder="Eg. ELE"
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
              inputPlaceholder="Eg. Protocol for Decentralized Organizations"
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
              inputPlaceholder="Eg. electus.network"
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
              inputPlaceholder="Eg. https://t.me/joinchat/FwqASEdUSqFIPNBNwPZzfgz"
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
              inputPlaceholder="Eg. https://github.com/chaitanyapotti/"
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
              inputPlaceholder="Eg. https://medium.com/@ParthaB"
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
              inputPlaceholder="Eg. https://www.facebook.com/electusnetwork/"
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
              inputPlaceholder="Eg. https://twitter.com/ElectusNetwork"
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
              inputPlaceholder="Eg. 0xdbf6df7e94e3019e1705e699a8874ac5f6ed753e"
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
          <Col>
            <div className="text--right push--top">
              <ButtonComponent id="uploadWhitepaper" label="Upload Whitepaper" onClick={this.uploadWhitePaper} />
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
  } = state.projectRegistrationData || {};
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
