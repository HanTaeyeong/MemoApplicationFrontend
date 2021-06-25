import axios from 'axios';
import { login, logout, register, check } from '../../../lib/api/auth';
import { getItem, setItem } from '../../../lib/localStorageRequest';

const token = `Bearer mock!@token%#@$`;
const mockResponse = {
    headers: {},
    status: 200,
    data: { token }
}
const mockErrorResponse = {
    headers: {},
    status: 401,
    data: { token: '' }
}

jest.mock('axios', () => {
    return {
        create: () => ({
            post: () => (mockResponse),
            get: () => (mockErrorResponse)
        })
    }
});

describe("request interceptor", () => {
    it('login api should store access-token well', async () => {
        const res = await login({ username: 'hty', password: 'eifdj' });

        const storedToken = getItem('access-token');
        expect(storedToken).toEqual(token)
    })

    it('register api should store access-token well', async () => {
        const res = await register({ username: 'hty123', password: 'eifdj!!' });

        const storedToken = getItem('access-token');
        expect(storedToken).toEqual(token)
    })

    it('logout should delete access token and username well', async () => {
        setItem('access-token', 'ie93jfd');
        setItem('username', 'hty');
        expect(getItem('access-token')).toEqual('ie93jfd')
        expect(getItem('username')).toEqual('hty')

        const res = await logout();

        const storedToken = getItem('access-token');
        const storedUsername = getItem('username');
        expect(storedToken).toBeFalsy();
        expect(storedUsername).toBeFalsy();
    })

    // it('check api on normal status', async() => {
    //     const res = await check();
    //     expect(res).toEqual(mockResponse);
    // })
    it('check api on status not 200 should initialize well', async () => {
        setItem('access-token', 'ie93jfd');
        setItem('username', 'hty');
        expect(getItem('access-token')).toEqual('ie93jfd')
        expect(getItem('username')).toEqual('hty')

        const res = await check();

        const storedToken = getItem('access-token');
        const storedUsername = getItem('username');
        expect(storedToken).toBeFalsy();
        expect(storedUsername).toBeFalsy();
    })

});

