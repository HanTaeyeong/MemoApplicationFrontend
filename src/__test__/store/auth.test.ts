import { types } from 'node:util';
import React from 'react';

import * as authStore from '../../store/auth';

it('register should change auth state', () => {
    const expectedResult = {
        type: authStore.REGISTER,
        payload: { username: 'register-username', password: 'register-password' }
    }

    expect(authStore.register()({ username: 'register-username', password: 'register-password' })).toEqual(expectedResult);
})

it('login should change auth state', () => {
    const expectedResult = {
        type: authStore.LOGIN,
        payload: { username: 'login-username123', password: 'login-password123' }
    }

    expect(authStore.login()({ username: 'login-username123', password: 'login-password123' })).toEqual(expectedResult);
})

it('should logout initialize auth state', () => {
    const expectedResult = {
        type: authStore.LOGOUT,
        payload: { username: '' }
    }

    expect(authStore.logout()({ username: '' })).toEqual(expectedResult);
})

it('changeField should change auth state', () => {
    const expectedResult = {
        type: authStore.CHANGE_FIELD,
        payload: {
            authType: 'register', username: 'hty123', password: 'qwerty1234', passwordConfirm: 'qwerty1234', authError: false
        }
    }
    expect(authStore.changeField({
        authType: 'register', username: 'hty123',
        password: 'qwerty1234', passwordConfirm: 'qwerty1234', authError: false
    })).toEqual(expectedResult);
})