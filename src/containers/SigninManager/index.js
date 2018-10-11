import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkUserRegistration } from '../../actions/signinManagerActions';

class SigninManager extends Component {

    componentDidMount() {
        this.props.checkUserRegistration()
    }

    render() {
        return (
            <div>
                <p>User is registered: {this.props.userRegistered.toString()}</p>
                <p>User Address: {this.props.userPublicAddress}</p>
                <p>User is issuer: {this.props.userIsIssuer.toString()}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { userRegistered, userPublicAddress, userIsIssuer } = state.signinManagerData || {}
    return {
        userRegistered: userRegistered,
        userPublicAddress: userPublicAddress,
        userIsIssuer: userIsIssuer
    }

}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        checkUserRegistration: checkUserRegistration,
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SigninManager);