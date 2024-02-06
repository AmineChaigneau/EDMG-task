import { UPDATE_MAX_PLAYERS, UPDATE_MAX_PLAYERS_FAIL } from './types'

export const update_players_max = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_MAX_PLAYERS,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_MAX_PLAYERS_FAIL
        })
    }
};
