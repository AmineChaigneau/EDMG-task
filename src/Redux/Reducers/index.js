import { combineReducers } from 'redux'
// import auth from './auth'
import maia from './maia'
import profile from './profile'
import role from './role'
import trials from './trials'
import currentTrial from './current_trial'
import choiceTrial from './choice_trial'
import trialsRecord from './trials_record'
import notification from './notification'
import nbTrials from './nb_trials'
import players from './players'
import langue from './langue'
import calibration from './calibration'
import assumptions from './assumptions'
import { RESET_STORE } from '../Actions/types'

// export default combineReducers({ 
//     // auth,
//     profile,
//     maia,
//     role,
//     trials,
//     currentTrial,
//     trialsRecord,
//     notification,
//     nbTrials,
//     players,
//     langue
// })

const appReducer = combineReducers({
    // auth,
    profile,
    maia,
    role,
    trials,
    currentTrial,
    trialsRecord,
    notification,
    nbTrials,
    players,
    langue,
    calibration,
    assumptions,
    choiceTrial
})

const rootReducer = (state, action) => {
    if (action.type === RESET_STORE) {
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;