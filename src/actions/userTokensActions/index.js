import axios from 'axios';
import config from '../../config';
import actionTypes from '../../action_types';
import constants from '../../constants';

export function showUserTokensLoaderAction(){
    return (dispatch) =>{
        dispatch({
            type: actionTypes.SHOW_USER_TOKENS_LOADER,
            payload: null
        })
    }
}