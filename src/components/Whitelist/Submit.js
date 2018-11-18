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
import LoadingButton from "../Common/LoadingButton";

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
    const { isVaultMembershipButtonSpinning, vaultMembershipRequestTransactionHash, vaultPaymentPendingStatus } = this.props || {};
    const link = `https://rinkeby.etherscan.io/tx/${vaultMembershipRequestTransactionHash}`;
    return (
      <div>
        {this.props.vaultMembershipRequestChecked ? (
          <div>
            <div className="txt-m txt-dbld text--center">STEP: 7 Request Vault Membership</div>
            <div className="txt push--top">I hereby declare that all the data submitted is factually correct to the best of my knowledge.</div>
            <div>
              {this.props.vaultMembershipRequested ? (
                <div>
                  {this.props.isVaultMember ? (
                    <div>{this.props.history.push("/registration")}</div>
                  ) : (
                    <div>We will approve your membership request automatically in some time.</div>
                  )}
                </div>
              ) : vaultMembershipRequestTransactionHash !== "" ? (
                <a href={link} target="_blank" rel="noreferrer noopener">
                  <LoadingButton style={{ padding: "0 40px" }} type="pending" onClick={() => console.log("Sent to etherscan")}>
                    Status
                  </LoadingButton>
                </a>
              ) : (
                <div>
                  <Grid>
                    <Row className="push--top">
                      <Col>
                        <LoadingButton
                          style={{ padding: "0 40px" }}
                          onClick={this.handleRequestVaultMembership}
                          loading={isVaultMembershipButtonSpinning}
                        >
                          Become a Vault Member
                        </LoadingButton>
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
          <Grid>
            <Loader rows={6} />
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userLocalPublicAddress, isVaultMember } = state.signinManagerData || {};
  const { userRegistrationData } = state || {};
  const {
    vaultMembershipRequested,
    isIssuerFlag,
    vaultMembershipRequestChecked,
    isVaultMembershipButtonSpinning,
    vaultMembershipRequestTransactionHash,
    vaultPaymentPendingStatus
  } = state.userRegistrationData || {};
  return {
    userLocalPublicAddress,
    userRegistrationData,
    vaultMembershipRequested,
    isVaultMember,
    isIssuerFlag,
    vaultMembershipRequestChecked,
    isVaultMembershipButtonSpinning,
    vaultMembershipRequestTransactionHash,
    vaultPaymentPendingStatus
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
