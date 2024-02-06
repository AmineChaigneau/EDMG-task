import axios from 'axios';
import { proxy } from '../../utilities';
import { ADD_CALIBRATION, UPDATE_CALIBRATION_BUTTON, UPDATE_COMMANDEUR_BUTTON, UPDATE_ROLE_BUTTON, ADD_CALIBRATION_FAIL, POST_CALIBRATION, POST_CALIBRATION_FAIL, UPDATE_BUTTON_FAIL } from '../Actions/types'
import { showNotification } from './notification';

export const add_calibration = (res) => async dispatch => {
    try {
        dispatch({
            type: ADD_CALIBRATION,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: ADD_CALIBRATION_FAIL
        })
    }
};

export const update_calibration_button = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_CALIBRATION_BUTTON,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_BUTTON_FAIL
        })
    }
};

export const update_role_button = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_ROLE_BUTTON,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_BUTTON_FAIL
        })
    }
};

export const update_commandeur_button = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_COMMANDEUR_BUTTON,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_BUTTON_FAIL
        })
    }
};


// post calibration 
export const post_calibration = (subject_id, nb_calibration, calibration, calibration_button) => async dispatch => {

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        subject_id,
        nb_calibration,
        calibration,
        calibration_button
    })

    try {
        const res = await axios.post(`${proxy}/api/calibration`, body, config)
        if(!res.data.error) {
            dispatch({
                type: POST_CALIBRATION
            })
        } else {
            dispatch({
                type: POST_CALIBRATION_FAIL
            })
            dispatch(showNotification(res.data.error, 'error'));
        }
    } catch (err) {
        dispatch({
            type: POST_CALIBRATION_FAIL
        })
        dispatch(showNotification('Essai non enregistré, problème de connexion', 'error'));
    }
};