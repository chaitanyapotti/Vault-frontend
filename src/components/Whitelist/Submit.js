import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput, CUISelectInput, CUIButton } from "../../helpers/material-ui";
import {CUIInputType} from "../../static/js/variables";
import { saveUserFormStates } from "../../actions/userRegistrationActions";

class Submit extends Component {
    constructor(props) {
        super(props);
    }

    submitForm= () =>{
        console.log("submit form")
        this.props.saveUserFormStates(this.props.userRegistrationData, this.props.userLocalPublicAddress)
    }

    render() { 
        
        return ( 
            <div>
                <div className="txt-m txt-dbld text--center">STEP: 2 ETH Wallet</div>
                <div className="txt push--top">
                    I hereby submit.
                </div>
                <div>
                    <CUIButton onClick={this.submitForm}>Submit</CUIButton>
                </div>
            </div> 
        );
    }
}
 
const mapStateToProps = state => {
    const { userLocalPublicAddress } = state.signinManagerData || {};
    const { userRegistrationData } = state || {}
    return {
        userLocalPublicAddress,
        userRegistrationData
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            saveUserFormStates
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Submit);