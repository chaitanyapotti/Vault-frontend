import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { CUIFormInput } from "../../helpers/material-ui";
import {CUIInputType} from "../../static/js/variables";

class EthWallet extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            wallet: 'abc'
        }
    }

    handleSelect = event => {
        this.setState({ wallet: event.target.value });
    };

    render() { 
        // const {wallet} = this.state || {};
        return ( 
            <div>
                <div className="txt-m txt-dbld text--left">Step 2: ETH Wallet</div>
                <div className="txt push--top">
                    Please state a valid Ethereum wallet address from which you will be sending Ethers and to which you will receive respective tokens.
                </div>
                {/* <div className="txt-m txt-dbld push--top">What Ethereum wallet are you using?</div>
                <CUISelectInput
                    data={[{value: 'abc'}, {value: 'bdgd'},{value: 'saksjsa'}]} 
                    label="Wallet" 
                    value={wallet} 
                    onChange={this.handleSelect}
                /> */}
                <div className="txt-m txt-dbld push--top">Your ETH Wallet Address: 
                    <span style={{color:"#4ca9fc"}}> {" "}{this.props.userLocalPublicAddress}</span>

                </div>
                {/* <CUIFormInput
                    required
                    inputType={CUIInputType.TEXT}
                    full
                    inputName="Address"
                    inputLabel="Address"
                    inputPlaceholder="Metamask"
                    inputValue={this.props.userLocalPublicAddress}
                    onChange={this.onChangeIniFundVal}
                /> */}

                <div className="txt-m txt-dbld push--top">
                    Ethereum Wallet Requirements
                </div>
                <ul className="txt push--top">
                    <li>Your ETH wallet address must be the one from which you'll sending Ethers for your Electus Token Purchase </li>
                    <li>We cannot send tokens to an exchange address, therefore you cannot use an ETH wallet address form any exchange (You would lose your Electus tokens)</li>
                    <li>You need to use a standard ERC-20 wallet</li>
                </ul>

                {/* <div className="txt-m txt-dbld push--top">How many Electus tokens would you like to purchase? ($)</div>
                <CUIFormInput
                    required
                    inputType={CUIInputType.TEXT}
                    full
                    inputName="Number of tokens"
                    inputLabel="Number of tokens"
                    inputPlaceholder="Metamask"
                    onChange={this.onChangeIniFundVal}
                />
                <div className="txt-m">Please enter a value between 100 and 2000000</div> */}
            </div> 
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
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EthWallet);