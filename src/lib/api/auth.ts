import client from './client';
import { setItem, removeItem } from '../../lib/localStorageRequest';
import axios from 'axios';

const apiServer = process.env.REACT_APP_MEMO_API_ADDRESS;

const prefix = apiServer + '/api/auth';

export const login = async ({ username, password }: { username: string, password: string }) => {
    const res = await client.post(prefix + '/login', { username, password });

    const token = res.headers['authorization'];
    setItem('access-token', token);
    axios.defaults.headers.common['authorization'] = token;

    return res;
}

export const logout = async () => {
    const res = await client.post(prefix + '/logout')
    removeItem('access-token');
    removeItem('username');
    return res;
};

export const register = async ({ username, password }: { username: string, password: string }) => {
    const res = await client.post(prefix + '/register', { username, password })

    const token = res.headers['authorization'];
    setItem('access-token', token);
    axios.defaults.headers.common['authorization'] = token;

    return res;
}

export const check = async () => {
    const res = await client.get(prefix + '/check');
    if (res.status !== 200) {
        removeItem('access-token');
        removeItem('username');
    }
}


