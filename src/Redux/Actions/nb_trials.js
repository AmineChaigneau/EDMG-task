import { ADD_RECEVEUR_TRIAL, ADD_PROPOSEUR_TRIAL, ADD_COMMANDEUR_TRIAL, ADD_ROLE_TRIAL_FAIL, REMOVE_RECEVEUR_TRIAL, REMOVE_PROPOSEUR_TRIAL, REMOVE_COMMANDEUR_TRIAL, REMOVE_ROLE_TRIAL_FAIL } from './types'

export const update_receveur = (res) => async dispatch => {
    try {
        dispatch({
            type: ADD_RECEVEUR_TRIAL
        })
    } catch (err) {
        dispatch({
            type: ADD_ROLE_TRIAL_FAIL
        })
    }
};

export const update_proposeur = (res) => async dispatch => {
    try {
        dispatch({
            type: ADD_PROPOSEUR_TRIAL
        })
    } catch (err) {
        dispatch({
            type: ADD_ROLE_TRIAL_FAIL
        })
    }
};

export const update_commandeur = (res) => async dispatch => {
    try {
        dispatch({
            type: ADD_COMMANDEUR_TRIAL
        })
    } catch (err) {
        dispatch({
            type: ADD_ROLE_TRIAL_FAIL
        })
    }
};

export const remove_receveur = (res) => async dispatch => {
    try {
        dispatch({
            type: REMOVE_RECEVEUR_TRIAL
        })
    } catch (err) {
        dispatch({
            type: REMOVE_ROLE_TRIAL_FAIL
        })
    }
};

export const remove_proposeur = (res) => async dispatch => {
    try {
        dispatch({
            type: REMOVE_PROPOSEUR_TRIAL
        })
    } catch (err) {
        dispatch({
            type: REMOVE_ROLE_TRIAL_FAIL
        })
    }
};

export const remove_commandeur = (res) => async dispatch => {
    try {
        dispatch({
            type: REMOVE_COMMANDEUR_TRIAL
        })
    } catch (err) {
        dispatch({
            type: REMOVE_ROLE_TRIAL_FAIL
        })
    }
};