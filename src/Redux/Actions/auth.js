import Cookies from 'js-cookie';
import axios from 'axios';
import { load_user } from './profile';
import { load_role } from './role';
// import { load_maia } from './maia';
// import { load_trials } from './trials';
import { load_current_trial } from './current_trial';
import { showNotification } from './notification';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from './types';

export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`/http://localhost:8000/accounts/authenticated`, config);

        if (res.data.error || res.data.isAuthenticated === 'error') {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
        else if (res.data.isAuthenticated === 'success') {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            });
        }
        else {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
    } catch(err) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        });
    }
};

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(`http://localhost:8000/accounts/login`, body, config);

        if (res.data.success) {
            dispatch({
                type: LOGIN_SUCCESS
            });

            dispatch(load_user());
            // dispatch(load_role());
            // dispatch(load_maia());
            // dispatch(load_trials());
            dispatch(load_current_trial());
            dispatch(showNotification(res.data.success, 'success'));
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
            dispatch(showNotification(res.data.error, 'error'));
        }
    } catch(err) {
        console.log(err)
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch(showNotification("La connexion a échouché, veuillez réessayer", 'error'));
    }
};

export const register = (username, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password, re_password });

    try {
        const res = await axios.post(`http://localhost:8000/accounts/register`, body, config);

        if (res.data.error) {
            dispatch({
                type: REGISTER_FAIL
            });
            dispatch(showNotification(res.data.error, 'error'));
        } else {
            dispatch({
                type: REGISTER_SUCCESS
            });
            dispatch(showNotification(res.data.success, 'success'));
        }
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
        dispatch(showNotification('La connexion a échouché, Veuillez réessayer', 'error'));
    }
};

export const logout = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.post(`http://localhost:8000/accounts/logout`, body, config);

        if (res.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS
            });
            dispatch(showNotification(res.data.success, 'success'));
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL
        });
    }
};

export const delete_account = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.delete(`http://localhost:8000/accounts/delete`, config, body);

        if (res.data.success) {
            dispatch({
                type: DELETE_USER_SUCCESS
            });
        } else {
            dispatch({
                type: DELETE_USER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_USER_FAIL
        });
    }
};
