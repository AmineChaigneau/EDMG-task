import { ADD_COMMANDEUR_TRIAL, ADD_PROPOSEUR_TRIAL, ADD_RECEVEUR_TRIAL, ADD_ROLE_TRIAL_FAIL } from '../Actions/types'

const initialState = {
    commandeur: 0,
    proposeur: 0,
    receveur: 0,
    commandeur_cond: Math.random() < 0.5,
    proposeur_cond: Math.random() < 0.5,
    receveur_cond: Math.random() < 0.5
};

export default function nbTrial(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ADD_COMMANDEUR_TRIAL:
            return {
                ...state,
                commandeur: state.commandeur + 1
            }
        case ADD_PROPOSEUR_TRIAL:
            return {
                ...state,
                proposeur: state.proposeur + 1
            }
        case ADD_RECEVEUR_TRIAL:
            return {
                ...state,
                receveur: state.receveur + 1
            }
        case ADD_ROLE_TRIAL_FAIL: 
            return {
                ...state
            }
        default:
            return state
    };
};