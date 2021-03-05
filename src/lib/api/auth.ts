import client from './client';

const proxy='/simplememo.com/api/auth';

export const login = async ({ username, password }: { username: string, password: string }) =>
    await client.post(proxy+'/login', { username, password });

export const logout = async () => {
    return await client.post(proxy+'/logout')
};

export const register = async ({ username, password }: { username: string, password: string }) =>
    await client.post(proxy+'/register', { username, password })

export const check = async () => await client.get(proxy+'/check');


