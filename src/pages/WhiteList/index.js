import React, { Component } from 'react';
import {Grid, Row, Col} from "../../helpers/react-flexbox-grid";
import CustomizedStepper from "../../components/Common/CustomizedStepper";
import {ButtonComponent} from "../../components/Common/FormComponents";
import { CUICard, CUIDivider } from "../../helpers/material-ui";
import {Introduction, EthWallet, TC, BuyersInformation, UploadDocuments} from "../../components/Whitelist";

class WhiteList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeStep: 0
        }
    }

    getSteps = () => [
        "Introducton",
        "ETH Wallet",
        "Term & Conditions",
        "Buyers Information",
        "Upload Documents",
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
            return <div className="wht-lst-info-cnt"><BuyersInformation /></div>
            case 4: 
            return <div className="wht-lst-info-cnt"><UploadDocuments /></div>
            default:
            return null;
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
 
export default WhiteList;