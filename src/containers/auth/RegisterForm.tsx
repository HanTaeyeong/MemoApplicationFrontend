import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { RootStateType } from '../../store';
import { changeField, registerAsync } from '../../store/auth';
import AuthForm from '../../components/auth/AuthForm';
import history from '../../history';

import { validate, IdSchema, PasswordSchema } from '../../lib/validation';
import { setItem, removeItem } from '../../lib/localStorageRequest';





const RegisterForm = () => {
    const dispatch = useDispatch();
    const auth = useSelector(({ auth }: RootStateType) => auth);
    const loading = useSelector(({ loading }: RootStateType) => loading);

    const { authorized, username, password, passwordConfirm } = auth;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        dispatch(changeField({ ...auth, [name]: value }))
    }

    const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!isPasswordsSame()) return;
        if (!isValidId()) return;
        if (!isValidPassword()) return;

        dispatch(registerAsync({ username, password }))
    }

    const isPasswordsSame = () => {
        if (password !== passwordConfirm) {
            dispatch(changeField({ ...auth, authError: '[PW] Passwords are not same.' }))
            return false;
        }
        return true;
    }

    const isValidId = () => {
        const idResult = validate(IdSchema, { username })
        if (!idResult.isValid) {
            dispatch(changeField({ ...auth, authError: '[ID] ID should consists of number and alphabet (4 ~ 16).' }))
            return false;
        }
        return true;
    }

    const isValidPassword = () => {
        const passwordResult = validate(PasswordSchema, { password });
        if (!passwordResult.isValid) {
            dispatch(
                changeField({
                    ...auth,
                    authError: '[PW] Password with at least 1 number, 1 alphabet, 1 special character! (8~32).'
                })
            )
            return false;
        }
        return true;
    }

    const checkAuthState = () => {
        if (!authorized && !loading['auth/CHECK']) {
            removeItem('username');
        }
        if (authorized && !loading['auth/CHECK'] && !loading['auth/REGISTER']) {
            setItem('username', JSON.stringify(username));
            history.push('/postListPage');
        }
    }

    useEffect(() => {
        checkAuthState();
    }, [])

    useEffect(() => {
        if (authorized && !loading['auth/REGISTER']) {
            setItem('username', JSON.stringify(username));
            history.push('/postListPage');
        }
    }, [loading['auth/REGISTER']])

    return (
        <AuthForm authType="register" onChange={onChange} onSubmit={onSubmit} />
    )
}

export default RegisterForm;
