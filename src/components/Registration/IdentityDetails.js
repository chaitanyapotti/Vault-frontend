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
  teamAddressChangedAction,
  whitepaperChangedAction,
  uploadWhitepaperAction,
  thumbnailChangedAction,
  uploadThumbnailAction
} from "../../actions/projectRegistrationActions";
import { ButtonComponent } from "../Common/FormComponents";
import actionTypes from "../../action_types";

class IdentityDetails extends React.Component {
  state = {
    thumbnailFile: ""
  };

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
    this.props.whitepaperChangedAction(e.target.files[0]);
    this.props.uploadWhitepaperAction(e.target.files[0],  this.props.userLocalPublicAddress, "whitepaper");
  };

  uploadWhitepaper = () => {
    this.props.uploadWhitepaperAction(this.props.whitepaperPDF, this.props.userLocalPublicAddress, "whitepaper");
  };

  thumbnailChanged = e => {
    this.props.thumbnailChangedAction(e.target.files[0]);
    this.setState({ thumbnailFile: URL.createObjectURL(e.target.files[0]) });
    this.props.uploadThumbnailAction(e.target.files[0], this.props.userLocalPublicAddress, "thumbnail");
  };

  uploadThumbnail = () => {
    this.props.uploadThumbnailAction(this.props.thumbnailImage, this.props.userLocalPublicAddress, "thumbnail");
  };

  componentDidUpdate(prevProps) {
    const { errors } = this.props || {};
    if (prevProps.errors !== errors) {
      this.getErrorMsg();
    }
  }

  getErrorMsg = propName => {
    const { errors } = this.props || {};
    if (errors) {
      if (errors.hasOwnProperty(propName)) {
        return errors[propName];
      }
      return "";
    }
    return "";
  };

  render() {
    const {
      adminName,
      adminEmail,
      projectName,
      erc20TokenTag,
      projectDescription,
      twitterLink,
      githubLink,
      facebookLink,
      telegramLink,
      mediumLink,
      teamAddress,
      websiteLink,
      // uploadingWhitepaper,
      whitepaperUrl,
      // uploadingThumbnail,
      thumbnailUrl,
      allowEditAll
    } = this.props || {};
    return (
      <CUICard className="card-brdr">
        <div className="txt-xl" style={{ padding: "40px 50px" }}>Identity Details</div>
        <hr />
        <div style={{ padding: "20px 50px" }}>
          <Row>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                required
                full
                inputName="Admin Name"
                inputLabel="Admin Name"
                inputPlaceholder="Eg. Adam Smith"
                inputValue={adminName}
                disabled={!allowEditAll}
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
                inputValue={adminEmail}
                disabled={!allowEditAll}
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
                inputValue={projectName}
                disabled={!allowEditAll}
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
                forceAlpha
                inputName="ERC20 Ticker"
                inputLabel="ERC20 Ticker"
                inputPlaceholder="Eg. ELE"
                inputValue={erc20TokenTag}
                disabled={!allowEditAll}
                onChange={this.onChangeErc20Tag}
                error={!!this.getErrorMsg(actionTypes.ERC20_TAG_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.ERC20_TAG_CHANGED)}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                required
                full
                multiline={true}
                inputName="Project Description"
                inputLabel="Project Description"
                inputPlaceholder="Eg. Protocol for Decentralized Organizations"
                inputValue={projectDescription}
                onChange={this.onChangePrjctDesc}
                error={!!this.getErrorMsg(actionTypes.PROJECT_DESCRIPTION_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.PROJECT_DESCRIPTION_CHANGED)}
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
                inputValue={websiteLink}
                onChange={this.onChangeWebLink}
                error={!!this.getErrorMsg(actionTypes.WEBSITE_LINK_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.WEBSITE_LINK_CHANGED)}
              />
            </Col>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                full
                inputName="Telegram Link"
                inputLabel="Telegram Link"
                inputPlaceholder="Eg. https://t.me/joinchat/FwqASEdUSqFIPNBNwPZzfgz"
                inputValue={telegramLink}
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
                full
                inputName="Github Link"
                inputLabel="Github Link"
                inputPlaceholder="Eg. https://github.com/chaitanyapotti/"
                inputValue={githubLink}
                onChange={this.onChangeGitLink}
                error={!!this.getErrorMsg(actionTypes.GITHUB_LINK_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.GITHUB_LINK_CHANGED)}
              />
            </Col>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                full
                inputName="Medium Link"
                inputLabel="Medium Link"
                inputPlaceholder="Eg. https://medium.com/@ParthaB"
                inputValue={mediumLink}
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
                full
                inputName="Facebook Link"
                inputLabel="Facebook Link"
                inputPlaceholder="Eg. https://www.facebook.com/electusnetwork/"
                inputValue={facebookLink}
                onChange={this.onChangeFbLink}
                error={!!this.getErrorMsg(actionTypes.FACEBOOK_LINK_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.FACEBOOK_LINK_CHANGED)}
              />
            </Col>
            <Col xs={12} lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                full
                inputName="Twitter Link"
                inputLabel="Twitter Link"
                inputPlaceholder="Eg. https://twitter.com/ElectusNetwork"
                inputValue={twitterLink}
                onChange={this.onChangeTwtLink}
                error={!!this.getErrorMsg(actionTypes.TWITTER_LINK_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.TWITTER_LINK_CHANGED)}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <CUIFormInput
                inputType={CUIInputType.TEXT}
                required
                full
                inputName="Team Address"
                inputLabel="Team Address"
                inputPlaceholder="Eg. 0xdbf6df7e94e3019e1705e699a8874ac5f6ed753e"
                inputValue={teamAddress}
                disabled={!allowEditAll}
                onChange={this.onChangeTeamAddress}
                error={!!this.getErrorMsg(actionTypes.TEAM_ADDRESS_CHANGED)}
                helperText={this.getErrorMsg(actionTypes.TEAM_ADDRESS_CHANGED)}
              />
            </Col>
          </Row>

          <Row className="push--top">
            <Col lg={6}>
              <div className="upload-btn-wrapper">
                <ButtonComponent onClick={() => console.log("clicked")}>Upload Whitepaper</ButtonComponent>
                <input name="whitepaper" type="file" accept="application/pdf" onChange={this.whitepaperChanged} />
              </div>
              <span className="push--left">{this.props.whitepaperPDF.name}</span>
              <span className="push--left"><a href={this.props.whitepaperUrl} target="_blank" rel="noreferrer noopener">Whitepaper</a></span>
            </Col>
            <Col lg={6}>
              <div className="upload-btn-wrapper">
                <ButtonComponent onClick={() => console.log("clicked")}>Upload Thumbnail</ButtonComponent>
                <input name="thumbnail" type="file" accept="image/*" onChange={this.thumbnailChanged} />
              </div>
              <span>{this.props.thumbnailImage.name}</span>
              <span> <a href={this.props.thumbnailUrl} target="_blank" rel="noreferrer noopener">Thumbnail</a> </span>
            </Col>
          </Row>
          <Row className="push--top">
            <Col lg={12}>
              <div className="text--center">
                {this.state.thumbnailFile && <img alt="thumbnail" src={this.state.thumbnailFile} width="200" height="200" style={{ backgroundSize: "contain" }} />}
              </div>
            </Col>
          </Row>
        </div>
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
    errors,
    allowEditAll
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
    userLocalPublicAddress,
    allowEditAll
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
