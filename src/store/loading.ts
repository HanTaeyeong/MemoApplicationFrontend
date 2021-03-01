import { createAction, createReducer } from 'typesafe-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

export const startLoading = createAction(START_LOADING, requestType => requestType)();
export const finishLoading = createAction(FINISH_LOADING, requestType => requestType)();

const initialState = {
    'auth/LOGIN': false,
    'auth/REGISTER': false,
    'auth/LOGOUT': false,
    'auth/CHECK': false
};

const loading = createReducer(initialState,
    {
        [START_LOADING]: (state, action) => ({ ...state, [action.payload]: true }),
        [FINISH_LOADING]: (state, action) => ({ ...state, [action.payload]: false }),
    }
)

export default loading;