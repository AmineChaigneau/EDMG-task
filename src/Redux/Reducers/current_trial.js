import { LOAD_CURRENT_TRIAL_SUCCESS, LOAD_CURRENT_TRIAL_FAIL, UPDATE_CURRENT_TRIAL_SUCCES, UPDATE_CURRENT_TRIAL_FAIL, UPDATE_CHOIX, UPDATE_CHOIX_FAIL, UPDTATE_TRICHE, POST_ROLE_BUTTON, UPDTATE_SCREEN } from '../Actions/types';

const initialState = {
    subject_id: Math.floor(Math.random() * 100000),
    id_trial_subject: 0,
    current_trial: '',
    condition: '',
    role: '',
    time: 0,
    tracking: [],
    tracking_choix: [],
    proposition_proposeur: 0,
    proposition_receveur: 0,
    proposition_joueur: false,
    choix_commander: false,
    gain_user: 0,
    choix: true,
    testvalue: 0,
    testdynamique: [],
    reload: 0,
    button_position: [],
    button_role: [],
    height_device: 0,
    width_device: 0
};

export default function currentTrial(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOAD_CURRENT_TRIAL_SUCCESS:
        case UPDATE_CHOIX:
            return {
                ...state,
                choix: payload.choix,
                tracking_choix: payload.tracking_choix,
            }
        case UPDATE_CURRENT_TRIAL_SUCCES:
            return {
                ...state,
                current_trial: payload.id_trial,
                condition: payload.condition,
                id_trial_subject: state.id_trial_subject + 1,
                role: payload.role,
                time: payload.time,
                tracking: [payload.tracking],
                tracking_choix: [payload.tracking_choix],
                proposition_proposeur: payload.proposition_proposeur,
                proposition_receveur: payload.proposition_receveur,
                proposition_joueur: payload.proposition_joueur,
                choix_commander: payload.choix_commander,
                gain_user: payload.gain_user,
                choix: payload.choix,
                testvalue: payload.testvalue,
                button_position: payload.button_position,
                button_role: payload.button_role
            }
        case POST_ROLE_BUTTON:
            return {
                ...state,
                button_role: payload.button_role
            }
        case LOAD_CURRENT_TRIAL_FAIL:
            return {
                ...state,
                current_trial: '',
                condition: '',
                id_trial_subject: 0,
                role: '',
                time: 0,
                tracking: [],
                proposition_proposeur: 0,
                proposition_receveur: 0,
                proposition_joueur: false,
                choix_commander: false,
                gain_user: 0,
                choix: true,
                testvalue: 0,
            }
        case UPDTATE_TRICHE:
            return {
                ...state,
                reload: state.reload + 1
            }
        case UPDTATE_SCREEN:
            return {
                ...state,
                height_device: payload.height_device,
                width_device: payload.width_device
            }
        case UPDATE_CURRENT_TRIAL_FAIL:
            return {
                ...state
            }
        case UPDATE_CHOIX_FAIL:
            return {
                ...state
            }
        default:
            return state
    };
};
