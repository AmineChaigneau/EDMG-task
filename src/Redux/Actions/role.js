import axios from 'axios';
import { LOAD_USER_ROLE_SUCCESS, LOAD_USER_ROLE_FAIL, UPDATE_USER_CURRENT_ROLE_SUCCESS, UPDATE_USER_ROLE_FAIL, UPDATE_SUBJECT_ID, UPDATE_SUBJECT_ID_FAIL, UPDATE_MAX_ARR } from './types'

export const load_role = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`http://localhost:8000/game/role`, config);

        if (res.data.error) {
            dispatch({
                type: LOAD_USER_ROLE_FAIL,
            });
        } else {
            dispatch({
                type: LOAD_USER_ROLE_SUCCESS,
                payload: res.data
            });
        }

    } catch (err) {
        dispatch({
            type: LOAD_USER_ROLE_FAIL,
        });
    }
};

export const update_current_role = (res) => async dispatch => {
    // sans bdd
    try {
        dispatch({
            type: UPDATE_USER_CURRENT_ROLE_SUCCESS,
            payload: res
        })
    } catch(err) {
        dispatch({
            type: UPDATE_USER_ROLE_FAIL
        })
    }
}

export const update_max_arr = (res) => async dispatch => {
    // sans bdd
    try {
        dispatch({
            type: UPDATE_MAX_ARR,
            payload: res
        })
    } catch(err) {
        console.log(err)
    }
}


export const update_subject_id = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_SUBJECT_ID,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_SUBJECT_ID_FAIL
        })
    }
};

// export const update_role = () => async dispatch => {
//     // post bddd
//     try {

//     } catch (err) {

//     }
// }