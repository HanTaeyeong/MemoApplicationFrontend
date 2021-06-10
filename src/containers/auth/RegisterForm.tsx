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

        if (!isValidId()) {
            dispatch(changeField({ ...auth, authErrorMessage: '[ID] ID should consists of number and alphabet (4 ~ 16).' }))
            return;
        }

        if (!isValidPassword()) {
            dispatch(
                changeField({
                    ...auth,
                    authErrorMessage: '[PW] Password with at least 1 number, 1 alphabet, 1 special character! (8~32).'
                })
            )
            return;
        }
        if (password !== passwordConfirm) {
            dispatch(changeField({ ...auth, authErrorMessage: '[PW] Passwords are not same.' }))
            return;
        }

        dispatch(registerAsync({ username, password }))
    }

    const isValidId = () => {
        const idResult = validate(IdSchema, { username })
        return idResult.isValid;
    }

    const isValidPassword = () => {
        const passwordResult = validate(PasswordSchema, { password });
        return passwordResult.isValid;
    }

    const checkAuthState = () => {
        if (!authorized && !loading['auth/CHECK']) {
            removeItem('username');
        }
        if (authorized && !loading['auth/CHECK'] && !loading['auth/REGISTER']) {
            setItem('username', username);
            history.push('/postListPage');
        }
    }

    useEffect(() => {
        checkAuthState();
    }, [])

    useEffect(() => {
        if (authorized && !loading['auth/REGISTER']) {
            setItem('username', username);
            history.push('/postListPage');
        }
    }, [loading['auth/REGISTER']])

    return (
        <AuthForm authType="register" onChange={onChange} onSubmit={onSubmit} />
    )
}

export default RegisterForm;
