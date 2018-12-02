import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ButtonComponent } from "../Common/FormComponents";

class EthWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: "abc"
    };
  }

  handleSelect = event => {
    this.setState({ wallet: event.target.value });
  };

  render() {
    const { onClickNext, disabledFlag, disabledBackStatus, onClickBack } = this.props || {};
    return (
      <div>
        <div className="txt-m txt-dbld text--left">Step 2: ETH Wallet</div>
        <div className="txt push--top">
          Vault has detected your Ethereum address from your Metamask authentication. At the end of this process, this address will become a member of
          the Vault smart contract. You will then be able to participate in DAICOs.
        </div>
        {/* <div className="txt-m txt-dbld push--top">What Ethereum wallet are you using?</div>
                <CUISelectInput
                    data={[{value: 'abc'}, {value: 'bdgd'},{value: 'saksjsa'}]} 
                    label="Wallet" 
                    value={wallet} 
                    onChange={this.handleSelect}
                /> */}
        <div className="txt-m txt-dbld push--top">
          Your ETH Wallet Address:
          <span style={{ color: "#4ca9fc" }}> {this.props.userLocalPublicAddress}</span>
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

        <div className="txt-m txt-dbld push--top">Ethereum Wallet Requirements</div>
        <ul className="txt push--top">
          <li>Your ETH wallet address must be the one from which you'll sending ETH for DAICO crowdsales. </li>
          <li>
            Please understand that you will not be able to vote from Ethereum addresses that are not members - even if the address holds the tokens of
            a certain DAICO. This ensures that vote weight caps are abided by all users.
          </li>
          <li>
            You can sign up for Vault memberships from only one Ethereum address per phone number. Make sure this is the Ethereum address where you
            want your membership
          </li>
        </ul>
        <span className="float--right">
          <ButtonComponent label="Back" onClick={() => onClickBack()} disabled={disabledBackStatus} />
          <span className="push--left">
            <ButtonComponent label="Next" onClick={() => onClickNext()} disabled={disabledFlag} />
          </span>
        </span>
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

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EthWallet);
