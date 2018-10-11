import axios from "axios";
import config from "../../config";
import web3 from "../../helpers/web3";
import actionTypes from "../../action_types";
import constants from "../../constants";

export function checkUserRegistration() {
    return (dispatch) => {
        web3.eth.getAccounts().then(
            accounts => {
                if (accounts.length > 0) {
                    dispatch({
                        type: actionTypes.USER_LOCAL_ACCOUNT_ADDRESS,
                        payload: accounts[0].toLowerCase()
                    })
                    axios
                        .get(`${config.api_base_url}/db/users`, { params: { useraddress: accounts[0].toLowerCase() } })
                        .then(response => {
                            console.log(response)
                            if (response.status == 200) {
                                if (response.data.message == constants.SUCCESS) {
                                    dispatch({
                                        type: actionTypes.USER_REGISTRATION_CHECK_SUCCESS,
                                        payload: response.data.data
                                    });
                                } else {
                                    dispatch({
                                        type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
                                        payload: response.data.reason
                                    });
                                }
                            } else {
                                dispatch({
                                    type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
                                    payload: constants.FAILED_TO_GET_PUBLIC_ADDRESS
                                });
                            }
                        })
                        .catch(err => {
                            dispatch({
                                type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
                                payload: constants.FAILED_TO_GET_PUBLIC_ADDRESS
                            });
                        });

                }
            }
        )
            .catch(
                err => {
                    dispatch({
                        type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
                        payload: constants.FAILED_TO_GET_PUBLIC_ADDRESS
                    });
                }
            )
    }
}

export const fetchCurrentAccount = (userPreviousLocalPublicAddress) => {
    // console.log("every interval", userPreviousLocalPublicAddress)
    return (dispatch) => {
        web3.eth.getAccounts()
            .then(accounts => {
                if (accounts.length > 0) {
                    if (accounts[0].toLowerCase() !== userPreviousLocalPublicAddress.toLowerCase()) {
                        dispatch({
                            type: actionTypes.USER_DEFAULT_ACCOUNT_CHANGED,
                            payload: accounts[0].toLowerCase()
                        })

                        axios
                            .get(`${config.api_base_url}/db/users`, { params: { useraddress: accounts[0].toLowerCase() } })
                            .then(response => {
                                console.log(response)
                                if (response.status == 200) {
                                    if (response.data.message == constants.SUCCESS) {
                                        dispatch({
                                            type: actionTypes.USER_REGISTRATION_CHECK_SUCCESS,
                                            payload: response.data.data
                                        });
                                    } else {
                                        dispatch({
                                            type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
                                            payload: response.data.reason
                                        });
                                    }
                                } else {
                                    dispatch({
                                        type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
                                        payload: constants.FAILED_TO_GET_PUBLIC_ADDRESS
                                    });
                                }
                            })
                            .catch(err => {
                                dispatch({
                                    type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
                                    payload: constants.FAILED_TO_GET_PUBLIC_ADDRESS
                                });
                            });
                    }
                }
            })
            .catch(
                err => {
                    dispatch({
                        type: actionTypes.USER_REGISTRATION_CHECK_FAILED,
                        payload: constants.FAILED_TO_GET_PUBLIC_ADDRESS
                    });
                }
            )
    }

}