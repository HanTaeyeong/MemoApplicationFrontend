import client from './client';


export const login = async ({ username, password }: { username: string, password: string }) =>
    await client.post('/api/auth/login', { username, password });

export const logout = async () => {
    return await client.post('/api/auth/logout')
};

export const register = async ({ username, password }: { username: string, password: string }) =>
    await client.post('/api/auth/register', { username, password })

export const check = async () => await client.get('/api/auth/check');


