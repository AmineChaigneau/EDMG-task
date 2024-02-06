// import Cookies from 'js-cookie';
import axios from 'axios';
import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    POST_USER_PROFILE_SUCCESS,
    POST_USER_PROFILE_FAIL
} from './types';
import { showNotification } from './notification';
import { proxy } from '../../utilities';

export const load_user = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`http://localhost:8000/profile/user`, config);

        if (res.data.error) {
            dispatch({
                type: LOAD_USER_PROFILE_FAIL
            });
            dispatch(showNotification(res.data.error, 'error'));
        } else {
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: res.data
            });
        }
    } catch (err) {
        dispatch({
            type: LOAD_USER_PROFILE_FAIL
        });
        dispatch(showNotification('La connexion a échouché, veuillez réessayer', 'error'));
    }
};


export const update_profile = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_USER_PROFILE_SUCCESS,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_USER_PROFILE_FAIL
        })
    }
}

export const post_profile = (username, age, genre, ville, pays, profession, souris, preference, maintool, region, device, height_device, width_device, browser) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        username,
        age,
        genre,
        ville,
        pays,
        profession,
        souris,
        preference,
        maintool,
        region,
        device,
        height_device,
        width_device,
        browser
    });

    try {
        const res = await axios.post(`${proxy}/api/profile`, body, config)
        // const res = await axios.post(`http://localhost:8000/api/profile`, body, config)
        
        if (!res.data.error) {
            dispatch({
                type: POST_USER_PROFILE_SUCCESS,
                payload: res.data
            });
            dispatch(showNotification('Vos informations ont bien été enregistrées.', 'success'));
        } else {
            dispatch({
                type: POST_USER_PROFILE_FAIL
            });
            dispatch(showNotification('Veuillez réessayer.', 'error'));
        }
    } catch (err) {
        dispatch({
            type: POST_USER_PROFILE_FAIL
        });
        dispatch(showNotification('La connexion a échouché, veuillez réessayer', 'error'));
    }
}

