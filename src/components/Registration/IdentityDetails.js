import React from 'react';
import { CUICard, CUIFormInput, CUIButton } from '../../helpers/material-ui';
import { CUIInputType, CUIButtonType, CUIInputColor } from '../../static/js/variables';
import { Row, Col } from '../../helpers/react-flexbox-grid';

class IdentityDetails extends React.Component {
  state = {
    name: '',
    email: '',
    project: '',
    erc20tag: '',
    prjctDesc: '',
  };

  onChangeName = e => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeEmail = e => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangeProject = e => {
    this.setState({
      project: e.target.value,
    });
  };

  onChangeErc20Tag = e => {
    this.setState({
      erc20tag: e.target.value,
    });
  };

  onChangePrjctDesc = e => {
    this.setState({
      prjctDesc: e.target.value,
    });
  };

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
              inputValue={this.state.name}
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
              inputValue={this.state.email}
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
              inputValue={this.state.project}
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
              inputValue={this.state.erc20tag}
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
              inputValue={this.state.prjctDesc}
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
              inputValue={this.state.webLink}
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
              inputValue={this.state.TlgrmLink}
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
              inputValue={this.state.gitLink}
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
              inputValue={this.state.medLink}
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
              inputValue={this.state.fbLink}
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
              inputValue={this.state.twtLink}
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
    );
  }
}

export default IdentityDetails;
