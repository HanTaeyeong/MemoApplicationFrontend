import { createAction, ActionType, createReducer, Action } from 'typesafe-actions';
import { createRequestThunk, createRequestActionTypes } from '../lib/createRequest';
import * as authAPI from '../lib/api/auth';
import ErrorCodes from '../lib/ErrorCodes';

export const CHANGE_AUTH_TYPE = 'auth/CHANGE_AUTH_TYPE';
export const CHANGE_FIELD = 'auth/CHANGE_FIELD';
export const INITIALIZE_AUTH = 'auth/INITIALIZE_AUTH';

export const TEMP_SET_USER = 'auth/TEMP_SET_USER';

export const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes('auth/REGISTER');
export const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes('auth/LOGIN');
export const [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE] = createRequestActionTypes('auth/LOGOUT');
export const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('auth/CHECK');

//export const changeAuthType = createAction(CHANGE_AUTH_TYPE, ({ authType }) => ({ authType }))();

export const initializeAuth = createAction(INITIALIZE_AUTH, () => { })();
export const changeField = createAction(CHANGE_FIELD, ({ authType, username, password, passwordConfirm, authErrorMessage }) => ({
    authType, username, password, passwordConfirm, authErrorMessage
}))();
//export const tempSetUser = createAction(TEMP_SET_USER, username => username)();

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


export const check = createAction(CHECK, ({ username }) => ({ username }));
export const checkAsync = createRequestThunk(CHECK, authAPI.check);


interface AuthMapType {
    [key: string]: Object;
}

enum AuthTypeEnum {
    'login' = 'login',
    'register' = 'register'
}

export interface AuthStateType {
    authType: AuthTypeEnum;
    username: string;
    password: string;
    passwordConfirm: string | null | undefined;
    authorized: boolean | null,
    authErrorMessage: string;
    checkError: any;
}

export const initialState: AuthStateType = {
    authType: AuthTypeEnum['register'],
    username: '',
    password: '',
    passwordConfirm: '',
    authorized: false,
    authErrorMessage: '',
    checkError: null,
}

const auth = createReducer(initialState,
    {
        //[TEMP_SET_USER]: (state, { payload: username }) => ({ ...state, username }),
        //[CHANGE_AUTH_TYPE]: (state, { payload: { authType } }) => ({ ...state, authType }),
        [CHANGE_FIELD]: (state, { payload: { authType, username, password, passwordConfirm, authErrorMessage } }) => ({ ...state, authType, username, password, passwordConfirm, authErrorMessage }),
        [INITIALIZE_AUTH]: (state) => ({ ...initialState }),

        [REGISTER_SUCCESS]: (state: AuthStateType) => ({ ...state, authorized: true, authErrorMessage: "" }),
        [REGISTER_FAILURE]: (state: AuthStateType, { payload: { error } }: any) => ({ ...state, authorized: false, authErrorMessage: ErrorCodes[+error?.message?.slice(-3)] }),

        [LOGIN_SUCCESS]: (state: AuthStateType) => ({ ...state, authorized: true, authErrorMessage: "" }),
        [LOGIN_FAILURE]: (state: AuthStateType, { payload: { error } }: any) => ({ ...state, authorized: false, authErrorMessage: ErrorCodes[+error?.message?.slice(-3)] }),

        [CHECK_SUCCESS]: (state: AuthStateType) => ({ ...state, authorized: true, checkError: false }),
        [CHECK_FAILURE]: (state: AuthStateType, { payload: error }: any) => ({ ...state, authorized: false, checkError: error }),

        [LOGOUT_SUCCESS]: (state: AuthStateType) => ({ ...initialState }),
        [LOGOUT_FAILURE]: (state: AuthStateType) => ({ ...initialState })
    }
)

export default auth;