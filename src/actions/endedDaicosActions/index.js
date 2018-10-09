import axios from 'axios';
import config from '../../config';
import actionTypes from '../../action_types';
import constants from '../../constants';

export function getEndedDaicos() {
    return function (dispatch) {
        axios.get(config.api_base_url + '/db/projects/ended')
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === constants.SUCCESS) {
                        dispatch({
                            type: actionTypes.ENDED_DAICOS_SUCCESS,
                            payload: response.data.data
                        })
                    } else {
                        dispatch({
                            type: actionTypes.ENDED_DAICOS_FAILED,
                            payload: constants.ENDED_DAICOS_FAILED_MESSAGE
                        })
                    }
                } else {
                    dispatch({
                        type: actionTypes.ENDED_DAICOS_FAILED,
                        payload: constants.ENDED_DAICOS_FAILED_MESSAGE
                    })
                }
            }).catch(err => {
                dispatch({
                    type: actionTypes.ENDED_DAICOS_FAILED,
                    payload: constants.ENDED_DAICOS_FAILED_MESSAGE
                })
            })
    }
}

export function showEndedDaicosLoaderAction(){
    return function (dispatch){
        dispatch({
            type: actionTypes.SHOW_ENDED_DAICOS_LOADER,
            payload: null
        })
    }
}
