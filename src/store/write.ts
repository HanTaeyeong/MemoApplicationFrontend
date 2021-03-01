import { createAction, createReducer } from 'typesafe-actions';
import { createRequestThunk, createRequestActionTypes } from '../lib/createRequest';
import * as postApi from '../lib/api/post';

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_WRITING_FIELD = 'write/CHANGE_WRITING_FIELD';
const FINALIZE_WRITING = 'write/FINALIZE_WRITING';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST');

export const initialize = createAction(INITIALIZE)();
export const changeWritingField = createAction(CHANGE_WRITING_FIELD, ( { title, contents, tags, username }) => ( { title, contents, tags, username }))();

export const finalizeWriting = createAction(FINALIZE_WRITING)();

export const writePost = createAction(WRITE_POST, ({ title, contents, tags }) => ({ title, contents, tags }))
export const writePostAsync = createRequestThunk(WRITE_POST, postApi.writePost);

export interface WriteType {
    _id: string,
    title: string,
    contents: string,
    tags: string[] | undefined,
    username: string,

    finishWriting: boolean,
    postError: boolean | null
}
const initialState: WriteType = {
    _id: '',
    title: '',
    contents: '',
    tags: [],
    username: '',

    finishWriting: false,
    postError: false
}

const write = createReducer(initialState, {
    [INITIALIZE]: state => initialState,
    [CHANGE_WRITING_FIELD]: (state, { payload: { title, contents, tags, username } }) => ({ ...state, title, contents, tags, username }),
    [FINALIZE_WRITING]: (state) => ({ ...state, finishWriting: true }),

    [WRITE_POST_SUCCESS]: (state: WriteType) => ({ ...state, postError: false }),
    [WRITE_POST_FAILURE]: (state: WriteType) => ({ ...state, postError: true }),
})

export default write;


