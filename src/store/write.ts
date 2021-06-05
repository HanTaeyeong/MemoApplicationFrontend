import { createAction, createReducer } from 'typesafe-actions';
import { createRequestThunk, createRequestActionTypes } from '../lib/createRequest';
import * as postApi from '../lib/api/post';

export const CHANGE_WRITING_FIELD = 'write/CHANGE_WRITING_FIELD';
export const CHANGE_PAGE_STATE = 'write/CHANGE_PAGE_STATE';

export const [GET_POST_LIST, GET_POST_LIST_SUCCESS, GET_POST_LIST_FAILURE] = createRequestActionTypes('write/GET_POST_LIST');

export const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST');
export const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] = createRequestActionTypes('write/UPDATE_POST');
export const [DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE] = createRequestActionTypes('write/DELETE_POST');

export const changeWritingField = createAction(CHANGE_WRITING_FIELD, ({ _id, title, contents, tags }) =>
    ({ _id, title, contents, tags }))();

export const changePageState = createAction(CHANGE_PAGE_STATE, ({ page, limit, lastPage, totalPostCount }) =>
    ({ page, limit, lastPage, totalPostCount }))();

export const getPostList = createAction(GET_POST_LIST, ({ page, limit }) => ({ page, limit }));
export const getPostListAsync = createRequestThunk(GET_POST_LIST, postApi.getPostList);

export const writePost = createAction(WRITE_POST, ({ title, contents, tags }) => ({ title, contents, tags }))
export const writePostAsync = createRequestThunk(WRITE_POST, postApi.writePost);

export const updatePost = createAction(UPDATE_POST, ({ _id, title, contents }) => ({ _id, title, contents }));
export const updatePostAsync = createRequestThunk(UPDATE_POST, postApi.updatePost);

export const deletePost = createAction(DELETE_POST, ({ _id }) => ({ _id }));
export const deletePostAsync = createRequestThunk(DELETE_POST, postApi.deletePost);

export interface PostType {
    _id: string,
    title: string,
    contents: string,
    tags: string[] | undefined,
    lastUpdated: string,
    username: string
}

interface PageStateType {
    page: number,
    limit: number,
    lastPage: number,
    totalPostCount: number
}

export interface WriteStateType {
    _id: string,
    title: string,
    contents: string,
    tags: string[] | undefined,
    username: string,

    postError: boolean;

    posts: PostType[],
    pageState: PageStateType;
}

export const initialState: WriteStateType = {
    _id: '',
    title: '',
    contents: '',
    tags: [],
    username: '',

    postError: false,
    posts: [],
    pageState: { page: 1, limit: 10, lastPage: 1, totalPostCount: 0 }
}


const write = createReducer(initialState, {
    [CHANGE_WRITING_FIELD]: (state: WriteStateType, { payload: { _id, title, contents, tags } }: any) =>
        ({ ...state, _id, title, contents, tags }),

    [CHANGE_PAGE_STATE]: (state: WriteStateType, { payload: { page, limit, lastPage, totalPostCount } }: any) =>
        ({ ...state, pageState: { page, limit, lastPage, totalPostCount } }),

    [GET_POST_LIST_SUCCESS]: (state: WriteStateType, { payload: { posts, lastPage, totalPostCount  } }: any) =>
    ({
        ...state, pageState: { ...state.pageState, lastPage, totalPostCount },
        posts: posts.map((post: any) => post._doc), postError: false
    }),
    [GET_POST_LIST_FAILURE]: (state: WriteStateType) => ({ ...state, postError: true }),

    [WRITE_POST_SUCCESS]: (state: WriteStateType) => ({ ...state, postError: false }),
    [WRITE_POST_FAILURE]: (state: WriteStateType) => ({ ...state, postError: true }),

    [UPDATE_POST_SUCCESS]: (state: WriteStateType) => ({ ...state, postError: false }),
    [UPDATE_POST_FAILURE]: (state: WriteStateType) => ({ ...state, postError: true }),

    [DELETE_POST_SUCCESS]: (state: WriteStateType) => ({ ...state, postError: false }),
    [DELETE_POST_FAILURE]: (state: WriteStateType) => ({ ...state, postError: true })
})

export default write;


