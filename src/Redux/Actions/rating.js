// import Cookies from 'js-cookie';
import axios from 'axios';
import { POST_RATING_FAIL, POST_RATING_SUCCESS } from './types';
import { showNotification } from './notification';
import { proxy } from '../../utilities';

export const post_rating = (rate, com, subject_id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = {
        rate,
        com,
        subject_id
    }

    try {
        const res = await axios.post(`${proxy}/api/feedback`, body, config)
        if(!res.data.error) {
            dispatch({
                type: POST_RATING_SUCCESS
            })
            dispatch(showNotification(res.data.success, 'success'));
        } else {
            dispatch({
                type: POST_RATING_FAIL
            })
            dispatch(showNotification(res.data.error, 'error'));
        }
    } catch (err) {
        console.log(err.response)
        dispatch({
            type: POST_RATING_FAIL
        })
    }
}