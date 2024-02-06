import { UPDATE_MAX_PLAYERS, UPDATE_MAX_PLAYERS_FAIL } from '../Actions/types'

const initialState = {
    joueur1_max: 0,
    joueur2_max: 0
};

export default function Players(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_MAX_PLAYERS:
            return {
                joueur1_max: payload.joueur1,
                joueur2_max: payload.joueur2
            }
        case UPDATE_MAX_PLAYERS_FAIL:
            return {
                joueur1_max: 25,
                joueur2_max: 22
            }
        default:
            return state
    }
}