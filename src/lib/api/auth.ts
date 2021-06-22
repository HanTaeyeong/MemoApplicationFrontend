import client from './client';
import { setItem, removeItem } from '../../lib/localStorageRequest';

import { initializeAuth } from '../../store/auth';
import { initializeWrite } from '../../store/write';

import { getConfig } from './config';

const apiServer = process.env.REACT_APP_MEMO_API_ADDRESS;

const prefix = apiServer + '/api/auth';

export const login = async ({ username, password }: { username: string, password: string }) => {
    const res = await client.post(prefix + '/login', { username, password }, getConfig());

    const token = res.headers['authorization'];
    setItem('access-token', token);

    return res;
}

export const logout = async () => {
    initializeLocalStorage();
    const res = await client.post(prefix + '/logout', getConfig())

    return res;
};

export const register = async ({ username, password }: { username: string, password: string }) => {
    const res = await client.post(prefix + '/register', { username, password }, getConfig())

    const token = res.headers['authorization'];
    setItem('access-token', token);

    return res;
}

export const check = async () => {
    const res = await client.get(prefix + '/check', getConfig());
    if (res.status !== 200) {
        initializeLocalStorage();
    }
    return res;
}

const initializeLocalStorage = () => {
    removeItem('access-token');
    removeItem('username');
    initializeAuth();
    initializeWrite();
}

