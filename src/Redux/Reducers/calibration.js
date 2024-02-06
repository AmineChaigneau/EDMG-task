import { POST_CALIBRATION, ADD_CALIBRATION, UPDATE_CALIBRATION_BUTTON, UPDATE_COMMANDEUR_BUTTON, UPDATE_ROLE_BUTTON, ADD_CALIBRATION_FAIL, POST_CALIBRATION_FAIL, UPDATE_BUTTON_FAIL } from '../Actions/types'

const initialState = {
    nb_calibration: 0,
    calibration: [],
    calibration_button: [],
    commandeur_button: [],
    role_button: []
};

export default function calibration(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_CALIBRATION:
            return {
                ...state,
                nb_calibration: state.nb_calibration + 1,
                calibration: [...state.calibration, payload],
            }
        case UPDATE_CALIBRATION_BUTTON:
            return {
                ...state,
                calibration_button: [...state.calibration_button, payload],
            }
        case UPDATE_COMMANDEUR_BUTTON:
            return {
                ...state,
                commandeur_button: [...state.commandeur_button, payload],
            }
        case UPDATE_ROLE_BUTTON:
            return {
                ...state,
                role_button: [...state.role_button, payload],
            }
        case POST_CALIBRATION:
            return {
                ...state
            }
        case POST_CALIBRATION_FAIL:
            return {
                ...state
            }
        case ADD_CALIBRATION_FAIL:
            return {
                ...state,
            }
        case UPDATE_BUTTON_FAIL:
            return {
                ...state,
            }
        default:
            return state
    }
}