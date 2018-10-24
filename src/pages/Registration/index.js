/* eslint react/require-default-props: 0 */
/* eslint camelcase: 0 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { IdentityDetails, DaicoDetails, Distribution } from "../../components/Registration";
import { CUIButton } from "../../helpers/material-ui";
import { CUIButtonType, CUIInputColor } from "../../static/js/variables";
import { newProjectRegistration } from "../../actions/projectRegistrationActions";
import {ButtonComponent} from "../../components/Common/FormComponents";
class Registration extends Component {
  handlePublishDaico = e => {
    this.props.newProjectRegistration(this.props.projectRegistrationData, this.props.userLocalPublicAddress);
  };

  render() {
    return (
      <Grid>
        <Row className="push--top">
          <Col xs={12} lg={7}>
            <IdentityDetails />
          </Col>
          <Col xs={12} lg={5}>
            <div style={{textAlign: 'center'}}>
              <ButtonComponent
                style={{width: '85%'}}
                label="Publish DAICO"
                onClick={this.handlePublishDaico}
              />
            </div>
            <div className="push--top"><DaicoDetails /></div>
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
  const { projectRegistrationData } = state || {};
  const { userLocalPublicAddress } = state.signinManagerData || {};
  return {
    projectRegistrationData,
    userLocalPublicAddress,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      newProjectRegistration,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
