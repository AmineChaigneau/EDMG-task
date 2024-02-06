import { UPDATE_LANGUE, UPDATE_LANGUE_FAIL, UPDATE_LOCATION_PATHNAME, UPDATE_LOCATION_PATHNAME_FAIL} from './types'

export const choose_langue = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_LANGUE,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_LANGUE_FAIL
        })
    }
};

export const record_location = (res) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_LOCATION_PATHNAME,
            payload: res
        })
    } catch (err) {
        dispatch({
            type: UPDATE_LOCATION_PATHNAME_FAIL
        })
    }
}