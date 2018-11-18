import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput } from "../../helpers/material-ui";
import {CUIInputType} from "../../static/js/variables";

class Done extends Component {

    handleSelect = event => {
        this.setState({ wallet: event.target.value });
    };

    render() { 
        // const {wallet} = this.state || {};
        return ( 
            <div>
                <div className="txt-m txt-dbld text--center">STEP: 8 Done</div>
                {/* <div className="txt push--top">
                    Please state a valid Ethereum wallet address from which you will be sending Ethers and to which you will receive respective tokens.
                </div> */}
                <div>
                  {this.props.isVaultMember ? (
                    <div>{this.props.history.push("/registration")}</div>
                  ) : (
                    <div>We will approve your membership request automatically in some time.</div>
                  )}
                </div>
            </div> 
        );
    }
}
 
const mapStateToProps = state => {
    const { userLocalPublicAddress, isVaultMember } = state.signinManagerData || {};
    return {
        userLocalPublicAddress,
        isVaultMember
    };
};


export default connect(
    mapStateToProps
)(Done);