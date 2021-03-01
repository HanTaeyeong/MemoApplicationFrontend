import { createAction, ActionType, createReducer, Action } from 'typesafe-actions';
import { createRequestThunk, createRequestActionTypes } from '../lib/createRequest';
import * as authAPI from '../lib/api/auth';
import { create } from 'domain';

const CHANGE_AUTH_TYPE = 'auth/CHANGE_AUTH_TYPE';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const TEMP_SET_USER = 'auth/TEMP_SET_USER';

export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
export const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes('auth/LOGOUT');
export const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('auth/CHECK');

export const changeAuthType = createAction(CHANGE_AUTH_TYPE, ({ authType }) => ({ authType }))();

export const changeField = createAction(CHANGE_FIELD, ({ authType, username, password, passwordConfirm }) => ({
    authType, username, password, passwordConfirm
}))();
export const initializeForm = createAction(INITIALIZE_FORM, authType => authType)();
export const tempSetUser = createAction(TEMP_SET_USER, user => user)();

export const register = createAction(REGISTER, ({ username, password }) => ({
    username, password
}))
export const registerAsync = createRequestThunk(REGISTER, authAPI.register);

export const login = createAction(LOGIN, ({ username, password }) => ({
    username, password
}))
export const loginAsync = createRequestThunk(LOGIN, authAPI.login);

export const logout = createAction(LOGOUT, ({ username }) => ({ username }));
export const logoutAsync = createRequestThunk(LOGOUT, authAPI.logout);


export const check = createAction(CHECK, authAPI.check);
export const checkAsync = createRequestThunk(CHECK, authAPI.check);


interface AuthMapType {
    [key: string]: Object;
}

enum AuthTypeEnum {
    'login' = 'login',
    'register' = 'register'
}

interface AuthStateType {
    authType: AuthTypeEnum;
    username: string;
    password: string;
    passwordConfirm: string | null | undefined;
    authorized: boolean | null,
    authError: any;
    checkError: any;
}

const initialState: AuthStateType = {
    authType: AuthTypeEnum['register'],
    username: '',
    password: '',
    passwordConfirm: '',
    authorized: false,
    authError: null,
    checkError: null,
}

const auth = createReducer(initialState,
    {
        [TEMP_SET_USER]: (state, { payload: user }) => ({ ...state, user }),
        [CHANGE_AUTH_TYPE]: (state, { payload: { authType } }) => ({ ...state, authType }),
        [CHANGE_FIELD]: (state, { payload: { authType, username, password, passwordConfirm } }) => ({ ...state, authType, username, password, passwordConfirm }),
        [INITIALIZE_FORM]: (state, { payload: { authType } }) => ({ ...initialState }),

        [REGISTER_SUCCESS]: (state: AuthStateType, { payload: { auth } }: any) => ({ ...state, authError: null, auth }),
        [REGISTER_FAILURE]: (state: AuthStateType, { payload: { error } }: any) => ({ ...state, authError: error }),

        [LOGIN_SUCCESS]: (state: AuthStateType, { payload: { username } }: any) => ({ ...state, username, authorized: true, authError: null }),
        [LOGIN_FAILURE]: (state: AuthStateType, { payload: { error } }: any) => ({ ...state, authorized: false, authError: error }),

        [CHECK_SUCCESS]: (state: AuthStateType, { payload: username }: any) => ({ ...state, username, authorized: true, checkError: false }),
        [CHECK_FAILURE]: (state: AuthStateType, { payload: error }: any) => ({ ...state, authorized: false, checkError: error }),

        [LOGOUT_SUCCESS]: (state: AuthStateType, { payload: username }: any) => ({ ...initialState }),
        [LOGOUT_FAILURE]: (state: AuthStateType, { payload: username }: any) => ({ ...initialState })
    }
)

export default auth;