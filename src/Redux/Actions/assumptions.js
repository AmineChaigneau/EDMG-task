import axios from 'axios';
import { proxy } from '../../utilities.js';
import { UPDATE_ASSUMPTIONS, UPDATE_ASSUMPTIONS_FAIL, POST_ASSUMPTIONS, POST_ASSUMPTIONS_FAIL } from './types.js'

export const update_assuptions = (res) => async dispatch => {
    try {
        // console.log(res)
        dispatch({
            type: UPDATE_ASSUMPTIONS,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_ASSUMPTIONS_FAIL
        })
    }
}

export const post_assumptions = (state) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    const body = state

    try {
        const res = await axios.post(`${proxy}/api/assumptions`, body, config)
        if (!res.data.error) {
            dispatch({
                type: POST_ASSUMPTIONS
            })
        } else {
            dispatch({
                type: POST_ASSUMPTIONS_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: POST_ASSUMPTIONS_FAIL
        })
    }
}