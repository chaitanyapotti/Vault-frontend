import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveUserFormStates, requestVaultMembership, postUserFormData, isIssuerFlagToggled } from "../../actions/userRegistrationActions";
import {ButtonComponent} from "../../components/Common/FormComponents";
import { Grid, Row, Col } from "../../helpers/react-flexbox-grid";
import { CUICard, CUIFormInput, CUIFormInputLabel, CUIDivider } from "../../helpers/material-ui";
import { CUIInputType, CUIInputColor } from "../../static/js/variables";

class Submit extends Component {
    constructor(props) {
        super(props);
    }

    handleRequestVaultMembership = () => {
        console.log("submit form")
        this.props.saveUserFormStates(this.props.userRegistrationData, this.props.userLocalPublicAddress)
        if (this.props.isVaultMember){
            this.props.postUserFormData(this.props.userRegistrationData, this.props.userLocalPublicAddress)
        }
        this.props.requestVaultMembership(this.props.userLocalPublicAddress, this.props.isIssuerFlag);
    }


    handleIssuerFlagToggled = (e) => {
        // console.log("click", data);
        this.props.isIssuerFlagToggled();
    };


    render() { 
        
        return ( 
            <div>
                <div className="txt-m txt-dbld text--center">STEP: 2 ETH Wallet</div>
                <div className="txt push--top">
                    I hereby submit.
                </div>
                <div>
                    {this.props.vaultMembershipRequested?(
                        <div>
                            {this.props.isVaultMember?(
                                <div>Redirect to where? You are already a vault member.</div>
                            ): (
                                <div>Your request is pending with us. We shall approve it ASAP.</div>
                            )}
                        </div>                       
                        )
                    :(<div>
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
                                        {this.props.isIssuerFlag?(
                                            <div>
                                                You will be able to publish a DAICO and you will be charged 0.5 Ethers.
                                                </div>
                                        ):(
                                            <div>
                                                You will be able to participate in DAICOs and you will be charged 0.0015 Ethers.
                                            </div>
                                        )}
                                    </Row>
                            </Grid>
                    </div>
                        
                    
                    )}
                    
                    
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
            postUserFormData,
            isIssuerFlagToggled
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Submit);