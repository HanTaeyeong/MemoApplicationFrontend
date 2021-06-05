import client from './client';

const apiServer=process.env.MEMO_API_ADRESS;

const prefix=apiServer+'/api/auth';

export const login = async ({ username, password }: { username: string, password: string }) =>
    await client.post(prefix+'/login', { username, password });

export const logout = async () => {
    return await client.post(prefix+'/logout')
};

export const register = async ({ username, password }: { username: string, password: string }) =>
    await client.post(prefix+'/register', { username, password })

export const check = async () => await client.get(prefix+'/check');


