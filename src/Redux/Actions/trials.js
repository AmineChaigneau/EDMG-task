import { LOAD_TRIALS_SUCCESS, LOAD_TRIALS_FAIL, LOAD_TRIALS_RECEVEUR_SUCCESS, LOAD_TRIALS_RECEVEUR_FAIL, LOAD_TRIALS_COMMANDER_SUCCESS, LOAD_TRIALS_COMMANDER_FAIL, UPDATE_TRIALS_RECEVEUR_SUCCESS, UPDATE_TRIALS_LIST_FAIL, UPDATE_TRIALS_COMMANDEUR_SUCCESS } from './types'

// export const load_trials = () => async dispatch => {
//     const config = {
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         }
//     };

//     try {
//         const res = await axios.get(`http://localhost:8000/game/trial`, config)

//         if(res.data.error) {
//             console.log(res.error)
//             dispatch({
//                 type: LOAD_TRIALS_FAIL
//             });
//         } else {
//             console.log(res.data)
//             dispatch({
//                 type: LOAD_TRIALS_SUCCESS,
//                 payload: res.data
//             });
//         }
//     } catch (err) {
//         dispatch({
//             type: LOAD_TRIALS_FAIL
//         });
//     }
// }

export const load_trials = (res) => async dispatch => {
    try {
        dispatch({
            type: LOAD_TRIALS_SUCCESS,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: LOAD_TRIALS_FAIL
        })
    }
};

export const load_trials_receveur = (res) => async dispatch => {
    try {
        dispatch({
            type: LOAD_TRIALS_RECEVEUR_SUCCESS,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: LOAD_TRIALS_RECEVEUR_FAIL
        })
    }
};

export const load_trials_commander = (res) => async dispatch => {
    try {
        dispatch({
            type: LOAD_TRIALS_COMMANDER_SUCCESS,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: LOAD_TRIALS_COMMANDER_FAIL
        })
    }
};

export const update_list_trial_receveur = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_TRIALS_RECEVEUR_SUCCESS,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_TRIALS_LIST_FAIL
        })
    }
};

export const update_list_trial_commandeur = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_TRIALS_COMMANDEUR_SUCCESS,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_TRIALS_LIST_FAIL
        })
    }
};