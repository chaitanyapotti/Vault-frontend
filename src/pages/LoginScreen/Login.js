import React, { Component } from "react";
import web3 from "../../helpers/web3";

class Login extends Component {
  state = {
    loading: false, // Loading button state
  };

  handleAuthenticate = ({ publicAddress, signature }) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
      body: JSON.stringify({ publicAddress, signature }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(response => response.json());

  handleClick = () => {
    const { onLoggedIn } = this.props;
    if (!web3.eth.coinbase) {
      window.alert("Please activate MetaMask first.");
      return;
    }
    const publicAddress = web3.utils.toChecksumAddress(web3.eth.coinbase);
    this.setState({ loading: true });

    // Look if user with current publicAddress is already present on backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`)
      .then(response => response.json())
      // If yes, retrieve it. If no, create it.
      .then(users => (users.length ? users[0] : this.handleSignup(publicAddress)))
      // Popup MetaMask confirmation modal to sign message
      .then(this.handleSignMessage)
      // Send signature to backend on the /auth route
      .then(this.handleAuthenticate)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then(onLoggedIn)
      .catch(err => {
        window.alert(err);
        this.setState({ loading: false });
      });
  };

  handleSignMessage = ({ publicAddress, nonce }) =>
    new Promise((resolve, reject) =>
      web3.personal.sign(web3.fromUtf8(`I am signing my one-time nonce: ${nonce}`), publicAddress, (err, signature) => {
        if (err) return reject(err);
        return resolve({ publicAddress, signature });
      }),
    );

  handleSignup = publicAddress =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      body: JSON.stringify({ publicAddress }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(response => response.json());

  render() {
    const { loading } = this.state;
    return (
      <div>
        <button className="Login-button Login-mm" onClick={this.handleClick}>
          {loading ? "Loading..." : "Login with MetaMask"}
        </button>
      </div>
    );
  }
}

export default Login;
