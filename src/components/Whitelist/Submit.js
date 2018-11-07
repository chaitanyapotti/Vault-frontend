import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveUserFormStates, requestVaultMembership, postUserFormData } from "../../actions/userRegistrationActions";
import {ButtonComponent} from "../../components/Common/FormComponents";

class Submit extends Component {
    constructor(props) {
        super(props);
    }

    handleRequestVaultMembership = () => {
        this.props.requestVaultMembership(this.props.userLocalPublicAddress, this.props.isIssuerFlag);
    }

    submitForm= () =>{
        console.log("submit form")
        this.props.saveUserFormStates(this.props.userRegistrationData, this.props.userLocalPublicAddress)
        if (this.props.isVaultMember){
            this.props.postUserFormData(this.props.userRegistrationData, this.props.userLocalPublicAddress)
        }
    }

    render() { 
        
        return ( 
            <div>
                <div className="txt-m txt-dbld text--center">STEP: 2 ETH Wallet</div>
                <div className="txt push--top">
                    I hereby submit.
                </div>
                <div>
                    <ButtonComponent onClick={this.submitForm}>Submit</ButtonComponent>
                    
                    {this.props.vaultMembershipRequested?(
                        <div>
                            {this.props.isVaultMember?(
                                <div>Redirect to where? You are already a vault member.</div>
                            ): (
                                <div>Your request is pending with us. We shall approve it ASAP.</div>
                            )}
                        </div>                       
                        )
                    :(<ButtonComponent label="Become a Vault Member" onClick={this.handleRequestVaultMembership} />)}
                    
                    
                </div>
            </div> 
        );
    }
}
 
const mapStateToProps = state => {
    const { userLocalPublicAddress, isVaultMember } = state.signinManagerData || {};
    const { userRegistrationData } = state || {}
    const { vaultMembershipRequested, isIssuerFlag } = state.userRegistrationData || {}
    return {
        userLocalPublicAddress,
        userRegistrationData,
        vaultMembershipRequested,
        isVaultMember,
        isIssuerFlag
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            saveUserFormStates,
            requestVaultMembership,
            postUserFormData
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Submit);