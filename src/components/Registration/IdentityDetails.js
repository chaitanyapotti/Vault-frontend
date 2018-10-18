import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CUICard, CUIFormInput, CUIButton } from '../../helpers/material-ui';
import { CUIInputType, CUIButtonType, CUIInputColor } from '../../static/js/variables';
import { Row, Col } from '../../helpers/react-flexbox-grid';
import {
    adminNameChangedAction, adminEmailChangedAction, projectNameChangedAction, erc20TokenTagChangedAction, projectDescriptionChangedAction, websiteLinkAction,
    telegramLinkChangedAction, githubLinkChangedAction, mediumLinkChangedAction, facebookLinkChangedAction, twitterLinkChangedAction
} from '../../actions/projectRegistrationActions';

class IdentityDetails extends React.Component {

    onChangeName = (e) => {
        this.props.adminNameChangedAction(e.target.value)
    }

    onChangeEmail = (e) => {
        this.props.adminEmailChangedAction(e.target.value)
    }

    onChangeProject = (e) => {
        this.props.projectNameChangedAction(e.target.value)
    }

    onChangeErc20Tag = (e) => {
        this.props.erc20TokenTagChangedAction(e.target.value)
    }

    onChangePrjctDesc = (e) => {
        this.props.projectDescriptionChangedAction(e.target.value)
    }

    onChangeWebLink = (e) => {
        this.props.websiteLinkAction(e.target.value)
    }

    onChangeTlgrmLink = (e) => {
        this.props.telegramLinkChangedAction(e.target.value)
    }

    onChangeGitLink = (e) => {
        this.props.githubLinkChangedAction(e.target.value)
    }

    onChangeMedLink = (e) => {
        this.props.mediumLinkChangedAction(e.target.value)
    }

    onChangeFbLink = (e) => {
        this.props.facebookLinkChangedAction(e.target.value)
    }

    onChangeTwtLink = (e) => {
        this.props.twitterLinkChangedAction(e.target.value)
    }

    uploadWhitePaper = () => {
        console.log('upload white paper button action');
    };

    render() {
        return (
            <CUICard style={{ padding: '40px 67px' }}>
                <div>Identity Details</div>
                <hr />
                <Row>
                    <Col xs={12} lg={6}>
                        <CUIFormInput
                            inputType={CUIInputType.TEXT}
                            full
                            inputName="Admin Name"
                            inputLabel={'Admin Name'}
                            inputPlaceholder="Eg. Aman"
                            inputValue={this.props.adminName}
                            textFocus
                            // onBlur={this.onBlurAge}
                            // error={this.state.errorAgeText !== ''}
                            // helperText={this.state.errorAgeText}
                            // onKeyDownSelector="Admin"
                            onChange={this.onChangeName}
                        />
                    </Col>
                    <Col xs={12} lg={6}>
                        <CUIFormInput
                            inputType={CUIInputType.TEXT}
                            full
                            inputName="Admin Email"
                            inputLabel={'Admin Email'}
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
                            inputLabel={'Project Name'}
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
                            inputLabel={'ERC20 Token Tag'}
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
                            inputLabel={'Project Description'}
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
                            inputLabel={'Website Link'}
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
                            inputLabel={'Telegram Link'}
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
                            inputLabel={'Github Link'}
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
                            inputLabel={'Medium Link'}
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
                            inputLabel={'Facebook Link'}
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
                            inputLabel={'Twitter Link'}
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
                        <CUIButton
                            type={CUIButtonType.RAISED}
                            buttonColor={CUIInputColor.PRIMARY}
                            id="uploadWhitepaper"
                            label={'Upload Whitepaper'}
                            // disabled={!this.state.validPassword}
                            onClick={() => {
                                this.uploadWhitePaper();
                            }}
                        />
                    </Col>
                </Row>
            </CUICard>
        )
    }
}


const mapStateToProps = state => {
    const { adminName, adminEmail, projectName, erc20TokenTag, projectDescription, websiteLink, telegramLink,
        githubLink, mediumLink, facebookLink, twitterLink } = state.activeDaicosData || {}
    return {
        adminName: adminName,
        adminEmail: adminEmail,
        projectName: projectName,
        erc20TokenTag: erc20TokenTag,
        projectDescription: projectDescription,
        websiteLink: websiteLink,
        telegramLink: telegramLink,
        githubLink: githubLink,
        mediumLink: mediumLink,
        facebookLink: facebookLink,
        twitterLink: twitterLink
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        adminNameChangedAction: adminNameChangedAction,
        adminEmailChangedAction: adminEmailChangedAction,
        projectNameChangedAction: projectNameChangedAction,
        erc20TokenTagChangedAction: erc20TokenTagChangedAction,
        projectDescriptionChangedAction: projectDescriptionChangedAction,
        websiteLinkAction: websiteLinkAction,
        telegramLinkChangedAction: telegramLinkChangedAction,
        githubLinkChangedAction: githubLinkChangedAction,
        mediumLinkChangedAction: mediumLinkChangedAction,
        facebookLinkChangedAction: facebookLinkChangedAction,
        twitterLinkChangedAction: twitterLinkChangedAction
    }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IdentityDetails);
