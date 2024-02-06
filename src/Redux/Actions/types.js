// Auth Dispatch States
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS';
export const AUTHENTICATED_FAIL = 'AUTHENTICATED_FAIL';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

// Profile Dispatch States
export const LOAD_USER_PROFILE_SUCCESS = 'LOAD_USER_PROFILE_SUCCESS';
export const LOAD_USER_PROFILE_FAIL = 'LOAD_USER_PROFILE_FAIL';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAIL = 'UPDATE_USER_PROFILE_FAIL';
export const POST_USER_PROFILE_SUCCESS = 'POST_USER_PROFILE_SUCCESS';
export const POST_USER_PROFILE_FAIL = 'POST_USER_PROFILE_FAIL';

// Maiai Dispatch States 
export const LOAD_USER_MAIA_SUCCES = 'LOAD_USER_MAIA_SUCCES'
export const LOAD_USER_MAIA_FAIL = 'LOAD_USER_MAIA_FAIL'
export const UPDATE_USER_MAIA_SUCCES = 'UPDATE_USER_MAIA_SUCCES'
export const UPDATE_USER_MAIA_FAIL = 'UPDATE_USER_MAIA_FAIL'
export const POST_USER_MAIA_SUCCES = 'POST_USER_MAIA_SUCCES'
export const POST_USER_MAIA_FAIL = 'POST_USER_MAIA_FAIL'

// Role Dispatch States 
export const LOAD_USER_ROLE_SUCCESS = 'LOAD_USER_ROLE_SUCCESS'
export const LOAD_USER_ROLE_FAIL = 'LOAD_USER_ROLE_FAIL'
export const UPDATE_USER_ROLE_SUCCESS = 'LOAD_USER_ROLE_FAIL'
export const UPDATE_USER_ROLE_FAIL = 'LOAD_USER_ROLE_FAIL'
export const UPDATE_USER_CURRENT_ROLE_SUCCESS = 'UPDATE_USER_CURRENT_ROLE_SUCCESS'
export const UPDATE_USER_CURRENT_ROLE_FAIL = 'UPDATE_USER_CURRENT_ROLE_FAIL'

// Trial Dispatch States
export const LOAD_TRIALS_SUCCESS = 'LOAD_TRIALS_SUCCESS'
export const LOAD_TRIALS_FAIL = 'LOAD_TRIALS_FAIL'
export const LOAD_TRIALS_RECEVEUR_SUCCESS = 'LOAD_TRIALS_RECEVEUR_SUCCESS'
export const LOAD_TRIALS_RECEVEUR_FAIL = 'LOAD_TRIALS_RECEVEUR_FAIL'
export const LOAD_TRIALS_COMMANDER_SUCCESS = 'LOAD_TRIALS_COMMANDER_SUCCESS'
export const LOAD_TRIALS_COMMANDER_FAIL = 'LOAD_TRIALS_COMMANDER_FAIL'
export const UPDATE_TRIALS_RECEVEUR_SUCCESS = 'UPDATE_TRIALS_RECEVEUR_SUCCESS'
export const UPDATE_TRIALS_COMMANDEUR_SUCCESS = 'UPDATE_TRIALS_COMMANDEUR_SUCCESS'
export const UPDATE_TRIALS_LIST_FAIL = 'UPDATE_TRIALS_LIST_FAIL'

//
export const UPDATE_TRIALS_SUCCESS = 'UPDATE_TRIALS_SUCCESS'
export const UPDATE_TRIALS_FAIL = 'UPDATE_TRIALS_FAIL'
export const POST_TRIALS_SUCCESS = 'POST_TRIALS_SUCCESS'
export const POST_TRIALS_FAIL = 'POST_TRIALS_FAIL'

// Current trial / Trial User
export const LOAD_CURRENT_TRIAL_SUCCESS = 'LOAD_CURRENT_TRIAL_SUCCESS'
export const LOAD_CURRENT_TRIAL_FAIL = 'LOAD_CURRENT_TRIAL_SUCCESS'
export const UPDATE_CURRENT_TRIAL_SUCCES = 'UPDATE_CURRENT_TRIAL_SUCCES'
export const UPDATE_CURRENT_TRIAL_FAIL = 'UPDATE_CURRENT_TRIAL_SUCCES'
export const UPDATE_SUBJECT_ID = 'UPDATE_SUBJECT_ID'
export const UPDATE_SUBJECT_ID_FAIL = 'UPDATE_SUBJECT_ID_FAIL'
export const UPDATE_CHOIX = 'UPDATE_CHOIX'
export const UPDATE_CHOIX_FAIL = 'UPDATE_CHOIX_FAIL'
export const POST_CURRENT_TRIAL_SUCCESS = 'POST_CURRENT_TRIAL_SUCCESS'
export const POST_CURRENT_TRIAL_FAIL = 'POST_CURRENT_TRIAL_FAIL'
export const UPDTATE_TRICHE = 'UPDTATE_TRICHE'
export const UPDTATE_SCREEN = 'UPDTATE_SCREEN'

// Trial Record 
export const LOAD_TRIAL_RECORD_SUCCESS = 'LOAD_TRIAL_RECORD_SUCCESS'
export const LOAD_TRIAL_RECORD_FAIL = 'LOAD_TRIAL_RECORD_FAIL'
export const RECORD_TRIAL_SUCCESS = 'RECORD_TRIAL_SUCCESS'
export const RECORD_TRIAL_FAIL = 'RECORD_TRIAL_FAIL'
export const POST_RECORD_TRIAL_SUCCESS = 'RECORD_TRIAL_SUCCESS'
export const POST_RECORD_TRIAL_FAIL = 'RECORD_TRIAL_FAIL'

// Rating
export const POST_RATING_SUCCESS = 'POST_RATING_SUCCESS'
export const POST_RATING_FAIL = 'POST_RATING_SUCCESS'

// Nb tiral 
export const ADD_COMMANDEUR_TRIAL = 'ADD_COMMANDEUR_TRIAL'
export const ADD_PROPOSEUR_TRIAL = 'ADD_PROPOSEUR_TRIAL'
export const ADD_RECEVEUR_TRIAL = 'ADD_RECEVEUR_TRIAL'
export const ADD_ROLE_TRIAL_FAIL = 'ADD_ROLE_TRIAL_FAIL'
export const REMOVE_COMMANDEUR_TRIAL = 'REMOVE_COMMANDEUR_TRIAL'
export const REMOVE_PROPOSEUR_TRIAL = 'REMOVE_PROPOSEUR_TRIAL'
export const REMOVE_RECEVEUR_TRIAL = 'REMOVE_RECEVEUR_TRIAL'
export const REMOVE_ROLE_TRIAL_FAIL = 'REMOVE_ROLE_TRIAL_FAIL'

export const UPDATE_LANGUE = 'UPDATE_LANGUE'
export const UPDATE_LANGUE_FAIL = 'UPDATE_LANGUE_FAIL'

// Players max
export const UPDATE_MAX_PLAYERS = 'UPDATE_MAX_PLAYERS'
export const UPDATE_MAX_PLAYERS_FAIL = 'UPDATE_MAX_PLAYERS_FAIL'
export const UPDATE_MAX_ARR = 'UPDATE_MAX_ARR'

// Time all record 
export const TIME_RECORD_SUCCESS = 'TIME_RECORD_SUCCESS'
export const TIME_RECORD_FAIL = 'TIME_RECORD_FAIL'

// Reset 
export const RESET_STORE = 'RESET_STORE'

// Calibration 
export const ADD_CALIBRATION = 'ADD_CALIBRATION'
export const ADD_CALIBRATION_FAIL = 'ADD_CALIBRATION_FAIL'
export const UPDATE_CALIBRATION_BUTTON = 'UPDATE_CALIBRATION_BUTTON'
export const UPDATE_COMMANDEUR_BUTTON = 'UPDATE_COMMANDEUR_BUTTON'
export const UPDATE_ROLE_BUTTON = 'UPDATE_ROLE_BUTTON'
export const UPDATE_BUTTON_FAIL = 'UPDATE_BUTTON_FAIL'
export const POST_CALIBRATION = 'POST_CALIBRATION'
export const POST_CALIBRATION_FAIL = 'POST_CALIBRATION_FAIL'

// Position CURRENT TRIAL ROLE 
export const POST_ROLE_BUTTON = 'POST_ROLE_BUTTON'
export const POST_ROLE_BUTTON_FAIL = 'POST_ROLE_BUTTON_FAIL'

// LOCATION 
export const UPDATE_LOCATION_PATHNAME = 'UPDATE_LOCATION_PATHNAME'
export const UPDATE_LOCATION_PATHNAME_FAIL = 'UPDATE_LOCATION_PATHNAME_FAIL'

// ASSUMPTIONS CHECK
export const UPDATE_ASSUMPTIONS = 'UPDATE_ASSUMPTIONS'
export const UPDATE_ASSUMPTIONS_FAIL = 'UPDATE_ASSUMPTIONS_FAIL'
export const POST_ASSUMPTIONS = 'POST_ASSUMPTIONS'
export const POST_ASSUMPTIONS_FAIL = 'POST_ASSUMPTIONS_FAIL'

// FULLSCREEN 
export const FULLSCREEN_RECORD = 'FULLSCREEN_RECORD'

// CURRENT CHOICE 
export const UPDATE_CURRENT_CHOICE_TRIAL_SUCCESS = 'UPDATE_CURRENT_CHOICE_TRIAL_SUCCESS'
export const UPDATE_CURRENT_CHOICE_TRIAL_FAIL = 'UPDATE_CURRENT_CHOICE_TRIAL_FAIL'
export const POST_CURRENT_CHOICE = 'POST_CURRENT_CHOICE'
export const POST_CURRENT_CHOICE_FAIL = 'POST_CURRENT_CHOICE_FAIL'