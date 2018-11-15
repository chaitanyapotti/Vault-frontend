import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  saveUserFormStates,
  requestVaultMembership,
  postUserFormData,
  isIssuerFlagToggled,
  hasVaultMembershipRequested
} from "../../actions/userRegistrationActions";
import { ButtonComponent } from "../Common/FormComponents";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard, CUIFormInput, CUIFormInputLabel, CUIDivider } from "../../helpers/material-ui";
import { CUIInputType, CUIInputColor } from "../../static/js/variables";
import Loader from "../Loaders/loader";
class Submit extends Component {
  componentDidMount() {
    let interval;
    if (!this.props.userLocalPublicAddress) {
      interval = setInterval(() => {
        if (this.props.userLocalPublicAddress) {
          this.props.hasVaultMembershipRequested(this.props.userLocalPublicAddress);
          clearInterval(interval);
        }
      }, 1000);
    } else {
      this.props.hasVaultMembershipRequested(this.props.userLocalPublicAddress);
      clearInterval(interval);
    }
  }

  handleRequestVaultMembership = () => {
    this.props.saveUserFormStates(this.props.userRegistrationData, this.props.userLocalPublicAddress);
    this.props.postUserFormData(this.props.userRegistrationData, this.props.userLocalPublicAddress);
    this.props.requestVaultMembership(this.props.userLocalPublicAddress, this.props.isIssuerFlag);
  };

  handleIssuerFlagToggled = e => {
    // console.log("click", data);
    this.props.isIssuerFlagToggled();
  };

  render() {
    return (
      <div>
        {this.props.vaultMembershipRequestChecked ? (
          <div>
            <div className="txt-m txt-dbld text--center">STEP: 2 ETH Wallet</div>
            <div className="txt push--top">I hereby declare that all the data submitted is factually correct to the best of my knowledge.</div>
            <div>
              {this.props.vaultMembershipRequested ? (
                <div>
                  {this.props.isVaultMember ? (
                    <div>{this.props.history.push("/registration")}</div>
                  ) : (
                    <div>Your request is pending with us. We shall approve it ASAP.</div>
                  )}
                </div>
              ) : (
                <div>
                  <Grid>
                    <Row className="push--top">
                      <Col>
                        <ButtonComponent label="Become a Vault Member" onClick={this.handleRequestVaultMembership} />
                      </Col>
                      <Col>
                        <CUIFormInputLabel
                          control={
                            <CUIFormInput
                              inputType={CUIInputType.RADIO}
                              inputColor={CUIInputColor.PRIMARY}
                              inputChecked={this.props.isIssuerFlag}
                              onChange={this.handleIssuerFlagToggled}
                            />
                          }
                          label="Issuer"
                        />
                        <span>
                          <CUIFormInputLabel
                            control={
                              <CUIFormInput
                                inputType={CUIInputType.RADIO}
                                inputColor={CUIInputColor.PRIMARY}
                                inputChecked={!this.props.isIssuerFlag}
                                onChange={this.handleIssuerFlagToggled}
                              />
                            }
                            label="Investor"
                          />
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      {this.props.isIssuerFlag ? (
                        <div>You will be able to publish a DAICO and you will be charged 0.5016 Ethers.</div>
                      ) : (
                        <div>You will be able to participate in DAICOs and you will be charged 0.0016 Ethers.</div>
                      )}
                    </Row>
                  </Grid>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Grid><Loader rows={6} /></Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userLocalPublicAddress, isVaultMember } = state.signinManagerData || {};
  const { userRegistrationData } = state || {};
  const { vaultMembershipRequested, isIssuerFlag, vaultMembershipRequestChecked } = state.userRegistrationData || {};
  return {
    userLocalPublicAddress,
    userRegistrationData,
    vaultMembershipRequested,
    isVaultMember,
    isIssuerFlag,
    vaultMembershipRequestChecked
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveUserFormStates,
      requestVaultMembership,
      postUserFormData,
      isIssuerFlagToggled,
      hasVaultMembershipRequested
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Submit);
