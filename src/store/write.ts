import { createAction, createReducer } from 'typesafe-actions';
import { createRequestThunk, createRequestActionTypes } from '../lib/createRequest';
import * as postApi from '../lib/api/post';

export const CHANGE_WRITING_FIELD = 'write/CHANGE_WRITING_FIELD';


export const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST');
export const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] = createRequestActionTypes('write/UPDATE_POST');
export const [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE] = createRequestActionTypes('write/DELETE_POST');

export const changeWritingField = createAction(CHANGE_WRITING_FIELD, ({ _id, title, contents, tags }) =>
    ({ _id, title, contents, tags }))();

export const writePost = createAction(WRITE_POST, ({ title, contents, tags }) => ({ title, contents, tags }))
export const writePostAsync = createRequestThunk(WRITE_POST, postApi.writePost);

export const updatePost = createAction(UPDATE_POST, ({ _id, title, contents }) => ({ _id, title, contents }));
export const updatePostAsync = createRequestThunk(UPDATE_POST, postApi.updatePost);

export const deletePost = createAction(DELETE_POST, ({ _id }) => ({ _id }));
export const deletePostAsync = createRequestThunk(DELETE_POST, postApi.deletePost);


export interface WriteType {
    _id: string,
    title: string,
    contents: string,
    tags: string[] | undefined,
    username: string,

    postError: boolean;
}
export const initialState: WriteType = {
    _id: '',
    title: '',
    contents: '',
    tags: [],
    username: '',

    postError: false,
}


const write = createReducer(initialState, {
    [CHANGE_WRITING_FIELD]: (state: WriteType, { payload: { _id, title, contents, tags } }: any) => ({ ...state, _id, title, contents, tags }),

    [WRITE_POST_SUCCESS]: (state: WriteType) => ({ ...state, postError: false }),
    [WRITE_POST_FAILURE]: (state: WriteType) => ({ ...state, postError: true }),

    [UPDATE_POST_SUCCESS]: (state: WriteType) => ({ ...state, postError: false }),
    [UPDATE_POST_FAILURE]: (state: WriteType) => ({ ...state, postError: true }),

    [DELETE_POST_SUCCESS]: (state: WriteType) => ({ ...state, postError: false }),
    [DELETE_POST_FAILURE]: (state: WriteType) => ({ ...state, postError: false })
})

export default write;


