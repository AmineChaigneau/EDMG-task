import { LOAD_TRIALS_SUCCESS, LOAD_TRIALS_FAIL, LOAD_TRIALS_RECEVEUR_SUCCESS, LOAD_TRIALS_COMMANDER_SUCCESS, LOAD_TRIALS_RECEVEUR_FAIL, LOAD_TRIALS_COMMANDER_FAIL, UPDATE_TRIALS_RECEVEUR_SUCCESS, UPDATE_TRIALS_COMMANDEUR_SUCCESS } from '../Actions/types'

const initialState = {
    time_all: 0,
    trial: [
        {
            id_trial: 1,
            proposition_proposeur: 2.0,
            proposition_receveur: 8.0,
            choix_commander: true,
            gain_user: 8.0
        },
        {
            id_trial: 2,
            proposition_proposeur: 8.0,
            proposition_receveur: 2.0,
            choix_commander: false,
            gain_user: 0.0
        }
    ],
    trial_receveur_condition_1: [
        {
            id_trial: 1,
            proposition_proposeur: 2.0,
            proposition_receveur: 8.0,
            choix_commander: true,
            gain_user: 8.0
        },
        {
            id_trial: 2,
            proposition_proposeur: 8.0,
            proposition_receveur: 2.0,
            choix_commander: false,
            gain_user: 0.0
        }
    ],
    trial_receveur_condition_2: [
        {
            id_trial: 1,
            proposition_proposeur: 2.0,
            proposition_receveur: 8.0,
            choix_commander: true,
            gain_user: 8.0
        },
        {
            id_trial: 2,
            proposition_proposeur: 8.0,
            proposition_receveur: 2.0,
            choix_commander: false,
            gain_user: 0.0
        }
    ],
    trial_commandeur_condition_1: [
        {
            id_trial: 1,
            proposition_proposeur: 2.0,
            proposition_receveur: 8.0,
            choix_commander: true,
            gain_user: 8.0
        },
        {
            id_trial: 2,
            proposition_proposeur: 8.0,
            proposition_receveur: 2.0,
            choix_commander: false,
            gain_user: 0.0
        }
    ],
    trial_commandeur_condition_2: [
        {
            id_trial: 1,
            proposition_proposeur: 2.0,
            proposition_receveur: 8.0,
            choix_commander: true,
            gain_user: 8.0
        },
        {
            id_trial: 2,
            proposition_proposeur: 8.0,
            proposition_receveur: 2.0,
            choix_commander: false,
            gain_user: 0.0
        }
    ]
}

export default function trials(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOAD_TRIALS_SUCCESS:
            return {
                ...state,
                trial: payload
            }
        case LOAD_TRIALS_RECEVEUR_SUCCESS:
            return {
                ...state,
                trial_receveur_condition_1: payload.condition1,
                trial_receveur_condition_2: payload.condition2
            }
        case LOAD_TRIALS_COMMANDER_SUCCESS:
            return {
                ...state,
                trial_commandeur_condition_1: payload.condition1,
                trial_commandeur_condition_2: payload.condition2
            }
        case UPDATE_TRIALS_RECEVEUR_SUCCESS:
            return {
                ...state,
                trial_receveur_condition_1: payload.condition1,
                trial_receveur_condition_2: payload.condition2
            }
        case UPDATE_TRIALS_COMMANDEUR_SUCCESS:
            return {
                ...state,
                trial_commandeur_condition_1: payload.condition1,
                trial_commandeur_condition_2: payload.condition2
            }
        case LOAD_TRIALS_FAIL:
            return {
                ...state
            }
        case LOAD_TRIALS_RECEVEUR_FAIL:
            return {
                ...state
            }
        case LOAD_TRIALS_COMMANDER_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
}