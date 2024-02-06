import { UPDATE_CURRENT_CHOICE_TRIAL_SUCCESS, UPDATE_CURRENT_CHOICE_TRIAL_FAIL, POST_CURRENT_CHOICE } from '../Actions/types'

const initialState = {
    subject_id: 0,
    id_trial: 0,
    player_option: '',
    player_value: 0,
    winorloose: '',
    effort: false,
    player1_value: 0,
    player1_choice: '',
    player2_value: 0,
    player2_choice: '',
    dyna_count: []
}

export default function choice_trial(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_CURRENT_CHOICE_TRIAL_SUCCESS:
            return {
                ...state,
                subject_id: payload.subject_id,
                id_trial: payload.id_trial,
                player_option: payload.player_option,
                player_value: payload.player_value,
                winorloose: payload.winorloose,
                effort: payload.effort,
                player1_value: payload.player1_value,
                player1_choice: payload.player1_choice,
                player2_value: payload.player2_value,
                player2_choice: payload.player2_choice,
                dyna_count: payload.dyna_count
            }
        case UPDATE_CURRENT_CHOICE_TRIAL_FAIL:
            return {
                ...state
            }
        case POST_CURRENT_CHOICE:
            return {
                ...state
            }
        default:
            return state
    };
};