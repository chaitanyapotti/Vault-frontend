/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from '../../helpers/react-flexbox-grid';
import { IdentityDetails, DaicoDetails, Distribution } from '../../components/Registration';
import { CUIButton } from '../../helpers/material-ui';
import { CUIButtonType, CUIInputColor } from '../../static/js/variables';
import { newProjectRegistration } from '../../actions/projectRegistrationActions'; 

class Registration extends Component {

  handlePublishDaico = (e) => {
    this.props.newProjectRegistration(this.props.activeDaicosData, this.props.userLocalPublicAddress)
  }

  render() {
    return (
      <Grid>
        <Row className="push--top">
          <Col xs={12} lg={7}>
            <IdentityDetails />
          </Col>
          <Col xs={12} lg={5}>
            

            <CUIButton
              type={CUIButtonType.RAISED}
              buttonColor={CUIInputColor.PRIMARY}
              id="Publish DAICO"
              label={'Publish DAICO'}
              // disabled={!this.state.validPassword}
              onClick={() => {
                this.handlePublishDaico();
              }}
            />
            <DaicoDetails />
          </Col>
        </Row>

        <Row className="push--top push--bottom">
          <Col xs={12} lg={7}>
            <Distribution />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  const { activeDaicosData } = state || {};
  const { userLocalPublicAddress } = state.signinManagerData || {}
  return {
    activeDaicosData: activeDaicosData,
    userLocalPublicAddress: userLocalPublicAddress
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    newProjectRegistration: newProjectRegistration
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
