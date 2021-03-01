import { createAction, createReducer } from 'typesafe-actions';
import { createRequestThunk, createRequestActionTypes } from '../lib/createRequest';
import * as postApi from '../lib/api/post';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST');

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({ key, value }));
export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({ title, body, tags }))

export const writePostAsync = createRequestThunk(WRITE_POST, postApi.writePost);

export interface WriteType {
    _id: string,
    title: string,
    body: string,
    tags: string[] | undefined,

    username: string,
    postError: boolean | null
}
const initialState: WriteType = {
    _id: '',
    title: '',
    body: '',
    tags: [],

    username: '',
    postError: false
}

const write = createReducer(initialState, {
    [INITIALIZE]: state => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({ ...state, [key]: value }),

    [WRITE_POST]: (state: WriteType) => ({ ...state, postError: false }),
    [WRITE_POST_SUCCESS]: (state: WriteType) => ({ ...state, postError: false }),
    [WRITE_POST_FAILURE]: (state: WriteType) => ({ ...state, postError: true }),
})

export default write;


