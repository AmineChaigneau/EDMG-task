import { UPDATE_ASSUMPTIONS, UPDATE_ASSUMPTIONS_FAIL, POST_ASSUMPTIONS, POST_ASSUMPTIONS_FAIL } from '../Actions/types.js'

const initialState = {
    subject_id: 0,
    power: 0,
    effort: 0,
    commandeur: 0,
    receveur: 0,
    proposeur: 0,
    joueur: 0,
    regle: 0,
    coherence: 0,
    resultat: 0
};


export default function assumptions(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_ASSUMPTIONS:
            return {
                ...state,
                subject_id: payload.subject_id,
                power: payload.power,
                effort: payload.effort,
                commandeur: payload.commandeur,
                receveur: payload.receveur,
                proposeur: payload.proposeur,
                joueur: payload.joueur,
                regle: payload.regle,
                coherence: payload.coherence,
                resultat: payload.resultat,
            }
        case UPDATE_ASSUMPTIONS_FAIL:
            return {
                ...state
            }
        case POST_ASSUMPTIONS:
            return {
                ...state
            }
        case POST_ASSUMPTIONS_FAIL:
            return {
                ...state
            }
        default:
            return state
    }

}