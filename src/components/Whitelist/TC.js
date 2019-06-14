import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput, CUIFormInputLabel } from "../../helpers/material-ui";
import { CUIInputType, CUIInputColor } from "../../static/js/variables";
import {
  saveUserFormStates,
  conditionOneAction,
  conditionTwoAction,
  conditionThreeAction,
  conditionFourAction
} from "../../actions/userRegistrationActions";
import { ButtonComponent } from "../Common/FormComponents";

class TC extends Component {
  onCheck1 = () => {
    this.props.conditionOneAction(!this.props.conditionOneAccepted);
  };

  onCheck2 = () => {
    this.props.conditionTwoAction(!this.props.conditionTwoAccepted);
  };

  onCheck3 = () => {
    this.props.conditionThreeAction(!this.props.conditionThreeAccepted);
  };

  onCheck4 = () => {
    this.props.conditionFourAction(!this.props.conditionFourAccepted);
  };

  render() {
    const { onClickNext, disabledFlag, disabledBackStatus, onClickBack } = this.props || {};
    return (
      <div>
        <div className="txt-m txt-dbld text--left">Step 3: Terms And Conditions</div>
        <div className="txt-m txt-dbld push--top">Please confirm the following:</div>
        <div className="push--top">
          <CUIFormInputLabel
            control={
              <CUIFormInput
                inputType={CUIInputType.CHECKBOX}
                inputColor={CUIInputColor.PRIMARY}
                style={{ fontSize: "14px" }}
                inputChecked={this.props.conditionOneAccepted}
                onChange={this.onCheck1}
              />
            }
            label={
              <span className="txt">
                I hereby confirm that I am not a citizen or resident of any jurisdiction in which it is not permissible to participate in token crowd
                contribution or acting on behalf of any of them.
              </span>
            }
          />

          <CUIFormInputLabel
            control={
              <CUIFormInput
                inputType={CUIInputType.CHECKBOX}
                inputColor={CUIInputColor.PRIMARY}
                style={{ fontSize: "14px" }}
                inputChecked={this.props.conditionTwoAccepted}
                onChange={this.onCheck2}
              />
            }
            label={
              <span className="txt">
                I hereby confirm that I have read and I accept Vault Terms of Use, and will not attempt to participate in any crowdsale without
                reading and understanding the terms of the DAICO's token sale and their privacy policy.
              </span>
            }
          />

          <CUIFormInputLabel
            control={
              <CUIFormInput
                inputType={CUIInputType.CHECKBOX}
                inputColor={CUIInputColor.PRIMARY}
                style={{ fontSize: "14px" }}
                inputChecked={this.props.conditionThreeAccepted}
                onChange={this.onCheck3}
              />
            }
            label={
              <span className="txt">
                I understand that the data that I provide is not verified by Vault. Instead, Vault simply stores this information and relays it to the
                issuers of the DAICOs that I consent to participate in by clicking the ‘Get Whitelisted’ button and confirming the request
                transaction.
              </span>
            }
          />

          <CUIFormInputLabel
            control={
              <CUIFormInput
                inputType={CUIInputType.CHECKBOX}
                inputColor={CUIInputColor.PRIMARY}
                style={{ fontSize: "14px" }}
                inputChecked={this.props.conditionFourAccepted}
                onChange={this.onCheck4}
              />
            }
            label={
              <span className="txt">
                I understand that I may be rejected from the whitelist if the issuer finds the data to be incongruent, false, or if the issuer does
                not wish to permit individuals of my jurisdiction.
              </span>
            }
          />
        </div>
        <span className="float--right">
          <ButtonComponent label="Back" onClick={() => onClickBack()} disabled={disabledBackStatus} />
          <span className="push--left">
            <ButtonComponent label="Next" onClick={() => onClickNext()} disabled={disabledFlag} />
          </span>
        </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userLocalPublicAddress } = state.signinManagerData || {};
  const { userRegistrationData } = state || {};
  const { conditionOneAccepted, conditionTwoAccepted, conditionThreeAccepted, conditionFourAccepted } = state.userRegistrationData || {};
  return {
    userLocalPublicAddress,
    userRegistrationData,
    conditionOneAccepted,
    conditionTwoAccepted,
    conditionThreeAccepted,
    conditionFourAccepted
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saveUserFormStates,
      conditionOneAction,
      conditionTwoAction,
      conditionThreeAction,
      conditionFourAction
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TC);
