import { LOAD_TRIAL_RECORD_SUCCESS, RECORD_TRIAL_SUCCESS, RECORD_TRIAL_FAIL, LOAD_TRIAL_RECORD_FAIL, POST_RECORD_TRIAL_SUCCESS, POST_RECORD_TRIAL_FAIL, TIME_RECORD_SUCCESS, TIME_RECORD_FAIL, FULLSCREEN_RECORD } from '../Actions/types';

const initialState = {
    time_all: 0,
    trials: [],
    nb_trial: 1,
    fullscreen: 0,
};

export default function trialsRecord(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_TRIAL_RECORD_SUCCESS:
        case RECORD_TRIAL_SUCCESS:
            return {
                ...state,
                trials: [...state.trials, payload],
                nb_trial: state.nb_trial + 1,
            }
        case POST_RECORD_TRIAL_SUCCESS:
            return {
                ...state
            }
        case POST_RECORD_TRIAL_FAIL:
            return {
                ...state
            }
        case RECORD_TRIAL_FAIL:
            return {
                ...state
            }
        case LOAD_TRIAL_RECORD_FAIL:
            return {
                time_all: 0,
                trials: [],
                nb_trial: 0,
            }
        case TIME_RECORD_SUCCESS:
            return {
                ...state,
                time_all: payload
            }
        case TIME_RECORD_FAIL:
            return {
                ...state
            }
        case FULLSCREEN_RECORD:
            return {
                ...state,
                fullscreen: state.fullscreen + 1
            }
        default:
            return state
    };
};

