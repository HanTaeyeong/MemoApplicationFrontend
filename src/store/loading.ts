import { createAction, createReducer } from 'typesafe-actions';

export const START_LOADING = 'loading/START_LOADING';
export const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(START_LOADING, requestType => requestType)();
export const finishLoading = createAction(FINISH_LOADING, requestType => requestType)();

export const initialState = {
    'auth/LOGIN': false,
    'auth/REGISTER': false,
    'auth/LOGOUT': false,
    'auth/CHECK': false,

    'write/CHANGE_WRITING_FIELD':false,
    'write/WRITE_POST': false,
    'write/GET_POST_LIST': false,
    'write/UPDATE_POST': false,
    'write/DELETE_POST': false
};

const loading = createReducer(initialState,
    {
        [START_LOADING]: (state, action) => ({ ...state, [action.payload]: true }),
        [FINISH_LOADING]: (state, action) => ({ ...state, [action.payload]: false }),
    }
)

export default loading;