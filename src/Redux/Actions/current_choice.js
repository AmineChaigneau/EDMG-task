import axios from 'axios';
import { proxy } from '../../utilities';
import { UPDATE_CURRENT_CHOICE_TRIAL_SUCCESS, UPDATE_CURRENT_CHOICE_TRIAL_FAIL, POST_CURRENT_CHOICE, POST_CURRENT_CHOICE_FAIL } from './types'

export const update_current_choice = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_CURRENT_CHOICE_TRIAL_SUCCESS,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_CURRENT_CHOICE_TRIAL_FAIL
        })
    }
};

export const post_choice_trial = (state) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    const body = state

    try {
        const res = await axios.post(`${proxy}/api/choicetrial`, body, config)
        if (!res.data.error) {
            dispatch({
                type: POST_CURRENT_CHOICE
            })
        } else {
            dispatch({
                type: POST_CURRENT_CHOICE_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type: POST_CURRENT_CHOICE_FAIL
        })
    }
}



// export const post_current_choice