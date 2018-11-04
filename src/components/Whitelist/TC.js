import React, { Component } from 'react';
import { CUIFormInput, CUIFormInputLabel } from "../../helpers/material-ui";
import {CUIInputType, CUIInputColor} from "../../static/js/variables";

class TC extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            check1: false,
            check2: false
        }
    }

    onCheck1 = () => this.setState({check1: !this.state.check1});

    onCheck2 = () => this.setState({check2: !this.state.check2});

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
                            inputChecked={this.state.check1}
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
                            inputChecked={this.state.check2}
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
 
export default TC;