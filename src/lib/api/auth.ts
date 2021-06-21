import client from './client';
import { setItem, removeItem } from '../../lib/localStorageRequest';

const apiServer = process.env.REACT_APP_MEMO_API_ADDRESS;

const prefix = apiServer + '/api/auth';

export const login = async ({ username, password }: { username: string, password: string }) => {
    const res = await client.post(prefix + '/login', { username, password });

    const token = res.headers['Authorization'];
    setItem('access-token', token);

    return res;
}

export const logout = async () => {
    const res = await client.post(prefix + '/logout')
    removeItem('access-token');
    return res;
};

export const register = async ({ username, password }: { username: string, password: string }) => {
    const res = await client.post(prefix + '/register', { username, password })

    const token = res.headers['Authorization'];
    setItem('access-token', token);

    return res;
}

export const check = async () => await client.get(prefix + '/check');


