// import Cookies from 'js-cookie';
import axios from 'axios';
import { LOAD_CURRENT_TRIAL_SUCCESS, LOAD_CURRENT_TRIAL_FAIL, UPDATE_CURRENT_TRIAL_SUCCES, UPDATE_CURRENT_TRIAL_FAIL, UPDATE_CHOIX, UPDATE_CHOIX_FAIL, POST_CURRENT_TRIAL_SUCCESS, POST_CURRENT_TRIAL_FAIL, UPDTATE_TRICHE, POST_ROLE_BUTTON, POST_ROLE_BUTTON_FAIL, UPDTATE_SCREEN } from './types'
import { showNotification } from './notification';
import { proxy } from '../../utilities';

export const load_current_trial = () => async dispatch => {
    try {
        dispatch({
            type: LOAD_CURRENT_TRIAL_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: LOAD_CURRENT_TRIAL_FAIL
        })
    }
};

export const update_current_trial = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_CURRENT_TRIAL_SUCCES,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_CURRENT_TRIAL_FAIL
        })
    }
};


export const update_screen = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDTATE_SCREEN,
            payload: res
        })
    } catch (err) {
        console.log(err)
    }
};

export const update_current_choice = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_CHOIX,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_CHOIX_FAIL
        })
    }
};


export const update_current_button_role = (res) => async dispatch => {
    try {
        dispatch({
            type: POST_ROLE_BUTTON,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: POST_ROLE_BUTTON_FAIL
        })
    }
};

export const post_current_trial = (state) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = state

    try {
        const res = await axios.post(`${proxy}/api/trial`, body, config)
        if(!res.data.error) {
            dispatch({
                type: POST_CURRENT_TRIAL_SUCCESS
            })
            dispatch(showNotification(res.data.success, 'info'));
        } else {
            dispatch({
                type: POST_CURRENT_TRIAL_FAIL
            })
            dispatch(showNotification(res.data.error, 'error'));
        }
    } catch (err) {
        dispatch({
            type: POST_CURRENT_TRIAL_FAIL
        })
        dispatch(showNotification('Essai non enregistré, problème de connexion', 'error'));
    }
}


export const reload_count_up = () => async dispatch => {
    dispatch({
        type: UPDTATE_TRICHE
    })
};
