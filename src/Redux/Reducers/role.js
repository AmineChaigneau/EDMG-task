import { LOAD_USER_ROLE_SUCCESS, LOAD_USER_ROLE_FAIL, UPDATE_USER_ROLE_SUCCESS, UPDATE_USER_ROLE_FAIL, UPDATE_USER_CURRENT_ROLE_SUCCESS, UPDATE_SUBJECT_ID, UPDATE_SUBJECT_ID_FAIL, UPDATE_MAX_ARR } from "../Actions/types";

const initialState = {
    username: '',
    role: 'Receveur',
    gain: 0,
    maximum: 38,
    subject_id: 0,
    max_arr: [],
}

export default function role(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_USER_ROLE_SUCCESS:
        case UPDATE_SUBJECT_ID:
            return {
                ...state,
                subject_id: payload.subject_id
            }
        case UPDATE_USER_CURRENT_ROLE_SUCCESS:
            return {
                ...state,
                role: payload.role,
                maximum: payload.maximum,
                gain: payload.gain
            }
        case UPDATE_USER_ROLE_SUCCESS:
            return {
                ...state,
                role: payload.role,
                gain: payload.gain,
                maximum: payload.maximum,
                subject_id: payload.subject_id
            }
        case UPDATE_MAX_ARR:
            return {
                ...state,
                max_arr: payload
            }
        case LOAD_USER_ROLE_FAIL:
            return {
                ...state,
                username: '',
                role: '',
                gain: 0,
                max: 0,
            }
        case UPDATE_SUBJECT_ID_FAIL:
            return {
                ...state
            }
        case UPDATE_USER_ROLE_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}

