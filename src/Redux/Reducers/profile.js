import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    POST_USER_PROFILE_SUCCESS,
    POST_USER_PROFILE_FAIL
} from '../Actions/types';

const initialState = {
    username: 0,
    age: '',
    genre: '',
    ville: '',
    pays: '',
    profession: '',
    souris: false,
    preferance: '',
    maintool: '',
    region: '',
    device: false,
    height_device: 0,
    width_device: 0,
    browser: '',
};

export default function profile(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_USER_PROFILE_SUCCESS:
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                username: payload.username,
                age: payload.age,
                genre: payload.genre,
                ville: payload.ville,
                pays: payload.pays,
                profession: payload.profession,
                souris: payload.souris,
                preferance: payload.preferance,
                maintool: payload.maintool,
                region: payload.region,
                device: payload.device,
                height_device: payload.height_device,
                width_device: payload.width_device,
                browser: payload.browser
            }
        case LOAD_USER_PROFILE_FAIL:
            return {
                ...state
            }
        case UPDATE_USER_PROFILE_FAIL:
            return {
                ...state
            }
        case POST_USER_PROFILE_SUCCESS:
            return {
                ...state
            }
        case POST_USER_PROFILE_FAIL:
            return {
                ...state
            }
        default:
            return state
    };
};
