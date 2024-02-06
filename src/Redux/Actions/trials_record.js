// import Cookies from 'js-cookie';
import axios from 'axios';
import { RECORD_TRIAL_SUCCESS, RECORD_TRIAL_FAIL, LOAD_TRIAL_RECORD_SUCCESS, LOAD_TRIAL_RECORD_FAIL, POST_RECORD_TRIAL_SUCCESS, POST_RECORD_TRIAL_FAIL, TIME_RECORD_SUCCESS, TIME_RECORD_FAIL, FULLSCREEN_RECORD } from './types'
import { showNotification } from './notification';
import { proxy } from '../../utilities';

export const load_trials_record = () => async dispatch => {
    try {
        dispatch({
            type: LOAD_TRIAL_RECORD_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: LOAD_TRIAL_RECORD_FAIL
        })
    }
};

export const record_trial = (res) => async dispatch => {
    try {
        dispatch({
            type: RECORD_TRIAL_SUCCESS,
            payload: res
        });
        // dispatch(showNotification(`Essai validé`, 'info'));
    } catch (err) {
        dispatch({
            type: RECORD_TRIAL_FAIL
        });
        // dispatch(showNotification(`Essai non enregistré`, 'error'));
    }
};

export const fullscreen_count = () => async dispatch => {
    try {
        dispatch({
            type: FULLSCREEN_RECORD
        })
    } catch(err) {
        console.log(err)
    }
}

export const time_update = (res) => async dispatch => {
    try {
        dispatch({
            type: TIME_RECORD_SUCCESS,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: TIME_RECORD_FAIL
        })
    }
}

// AJOUTER PROFILE + CALLIBRATION
export const post_trial = (subject_id, trials, nb_trial, time_all, gain, maximum, profile, calibration, fullscreen, max_arr) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = {
        subject_id,
        trials,
        nb_trial,
        time_all,
        gain, 
        maximum,
        profile,
        calibration,
        fullscreen,
        max_arr
    }

    try {
        const res = await axios.post(`${proxy}/api/record`, body, config)
        if (!res.data.error) {
            dispatch({
                type: POST_RECORD_TRIAL_SUCCESS
            });
            dispatch(showNotification(`Session enregistré`, 'success'));
        } else {
            dispatch({
                type: POST_RECORD_TRIAL_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: POST_RECORD_TRIAL_FAIL
        });
        dispatch(showNotification(`Essai non enregistré, problème de connexion`, 'error'));
    }
}