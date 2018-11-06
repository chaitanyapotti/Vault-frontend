import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {Grid, Row, Col} from "../../helpers/react-flexbox-grid";
import CustomizedStepper from "../../components/Common/CustomizedStepper";
import {ButtonComponent} from "../../components/Common/FormComponents";
import { CUICard, CUIDivider } from "../../helpers/material-ui";
import {Introduction, EthWallet, TC, BuyersInformation, UploadDocuments, Submit, OtpVerification} from "../../components/Whitelist";
import { fetchUserFormStates } from "../../actions/userRegistrationActions"

class WhiteList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeStep: 0
        }
    }

    componentDidMount(){
        if (this.props.userLocalPublicAddress) {
            this.props.fetchUserFormStates(this.props.userLocalPublicAddress);
          } else {
            this.props.fetchUserFormStates("0xb758c38326Df3D75F1cf0DA14Bb8220Ca4231e74");
          }
    }

    getSteps = () => [
        "Introducton",
        "ETH Wallet",
        "Term & Conditions",
        "Mobile Number Verification",
        "Buyers Information",
        "Upload Documents",
        "Submit"
    ];
    
    getStepContent = () => {
        switch (this.state.activeStep) {
            case 0:
            return <div className="wht-lst-info-cnt"><Introduction /></div>
            case 1:
            return <div className="wht-lst-info-cnt"><EthWallet /></div>
            case 2:
            return <div className="wht-lst-info-cnt"><TC /></div>
            case 3:
            return <div className="wht-lst-info-cnt"><OtpVerification /></div>
            case 4: 
            return <div className="wht-lst-info-cnt"><BuyersInformation /></div>
            case 5: 
            return <div className="wht-lst-info-cnt"><UploadDocuments /></div>
            case 6:
            return <div className="wht-lst-info-cnt"> <Submit/> </div>;
            default: 
            return <div>Default ka kuch karo</div>
        }
    };

    handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
    };

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
          }));
    };

    render() { 
        return ( 
            <Grid>
                <CUICard style={{ padding: "40px 40px", marginBottom: '40px'}}>
                    <CustomizedStepper getStepContent={this.getStepContent} getSteps={this.getSteps} activeStep={this.state.activeStep} />
                    <div className="push-top--50"><CUIDivider/></div>
                    <div className="push--top text--center">
                        <ButtonComponent label="Back" onClick={this.handleBack} />
                        <span className="push--left"><ButtonComponent label="Next" onClick={this.handleNext} /></span>
                    </div>
                </CUICard>
            </Grid> 
        );
    }
}
 
const mapStateToProps = state => {
    const { userLocalPublicAddress } = state.signinManagerData || {};
    return {
        userLocalPublicAddress
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchUserFormStates
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WhiteList);