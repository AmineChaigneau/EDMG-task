import { UPDATE_LANGUE, UPDATE_LANGUE_FAIL, UPDATE_LOCATION_PATHNAME, UPDATE_LOCATION_PATHNAME_FAIL } from '../Actions/types';

const initialState = {
    region: 'fr',
    pathname: '/'
};

export default function languageSetting(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_LANGUE:
            return {
                ...state,
                region: payload
            }
        case UPDATE_LANGUE_FAIL:
            return {
                ...state
            }
        case UPDATE_LOCATION_PATHNAME:
            return {
                ...state,
                pathname: payload
            }
        case UPDATE_LOCATION_PATHNAME_FAIL:
            return {
                ...state
            }
        default: 
            return state
    };
};

