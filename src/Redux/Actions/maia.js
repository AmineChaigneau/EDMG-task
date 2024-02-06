// import Cookies from 'js-cookie';
import axios from 'axios';
import { POST_USER_MAIA_FAIL, POST_USER_MAIA_SUCCES } from './types';
import { showNotification } from './notification';

// export const load_maia = () => async dispatch => {
//     const config = {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }
//     };

//     try {
//         const res = await axios.get(`http://localhost:8000/profile/maiainfo`, config);

//         if(res.data.error) {
//             dispatch({
//                 type: LOAD_USER_MAIA_FAIL
//             });
//         } else {
//             dispatch({
//                 type: LOAD_USER_MAIA_SUCCES,
//                 payload: res.data
//             })
//         }
//     } catch (err) {
//         dispatch({
//             type: LOAD_USER_MAIA_FAIL
//         })
//     }
// }

export const post_maia = (subject_id, maia_completed, data_maia) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = {
        subject_id,
        maia_completed,
        data_maia
    }

    try {
        const res = await axios.post(`https://economic-game-task-api.herokuapp.com/api/maia`, body, config)
        if (!res.data.error) {
            dispatch({
                type: POST_USER_MAIA_SUCCES,
                payload: res.data
            });
            dispatch(showNotification(res.data.success, 'success'));
        } else {
            dispatch({
                type: POST_USER_MAIA_FAIL
            });
            dispatch(showNotification(res.data.error, 'error'));
        }
    } catch (err) {
        dispatch({
            type: POST_USER_MAIA_FAIL
        });
        dispatch(showNotification('La connexion a échouché, veuillez réessayer', 'error'));
    }
}