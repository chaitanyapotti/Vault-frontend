import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput, CUIFormInputLabel } from "../../helpers/material-ui";
import {CUIInputType, CUIInputColor} from "../../static/js/variables";
import { saveUserFormStates, conditionOneAction, conditionTwoAction } from "../../actions/userRegistrationActions";

class TC extends Component {
    constructor(props) {
        super(props);
    }

    onCheck1 = () => {
        this.props.conditionOneAction(!this.props.conditionOneAccepted)
    }

    onCheck2 = () => {
        this.props.conditionTwoAction(!this.props.conditionTwoAccepted)
    }

    render() { 
        return ( 
            <div>
                <div className="txt-m txt-dbld text--center">STEP: 3 Terms And Conditions</div>
                <div className="txt-m txt-dbld push--top">
                    Please read all Electus legal documentation
                </div>
                <div className="push--top">
                    <CUIFormInputLabel
                        control={
                        <CUIFormInput
                            inputType={CUIInputType.CHECKBOX}
                            inputColor={CUIInputColor.PRIMARY}
                            style={{ fontSize: '14px' }}
                            inputChecked={this.props.conditionOneAccepted}
                            onChange={this.onCheck1}
                        />
                        }
                        label={<span className="txt">"I hereby confirm that I am not a citizen or resident of United States Of America, Singapore or China or any other jurisdiction in which it is not permissible to participate in token crowd contribution or acting on behalf of  any of them."</span>}
                    />

                    <CUIFormInputLabel
                        control={
                        <CUIFormInput
                            inputType={CUIInputType.CHECKBOX}
                            inputColor={CUIInputColor.PRIMARY}
                            style={{ fontSize: '14px' }}
                            inputChecked={this.props.conditionTwoAccepted}
                            onChange={this.onCheck2}
                        />
                        }
                        label={<span className="txt">"I hereby confirm that I have read and I accept Electus Terms of Use, Terms of Electus Token Sale and Privacy Policy"</span>}
                    />
                </div>
            </div> 
        );
    }
}
 
const mapStateToProps = state => {
    const { userLocalPublicAddress } = state.signinManagerData || {};
    const { userRegistrationData } = state || {}
    const { conditionOneAccepted, conditionTwoAccepted } = state.userRegistrationData || {}
    return {
        userLocalPublicAddress,
        userRegistrationData,
        conditionOneAccepted,
        conditionTwoAccepted
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            saveUserFormStates,
            conditionOneAction,
            conditionTwoAction
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TC);