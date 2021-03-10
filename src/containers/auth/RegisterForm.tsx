import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { RootStateType } from '../../store';
import { changeField, registerAsync } from '../../store/auth';
import AuthForm from '../../components/auth/AuthForm';
import { useHistory } from 'react-router-dom';

import { validate, IdSchema, PasswordSchema } from '../../lib/validation';
import { setItem, removeItem } from '../../lib/localStorageRequest';

const RegisterForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(({ auth }: RootStateType) => auth);
    const loading = useSelector(({ loading }: RootStateType) => loading);

    const { authorized, username, password, passwordConfirm } = auth;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                ...auth,
                [name]: value
            })
        )
    }

    const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            dispatch(changeField({
                ...auth, authError: 'Passwords are not same.'
            }))
            return;
        }

        const idResult = validate(IdSchema, { username })
        if (!idResult.isValid) {
            dispatch(
                changeField({
                    ...auth,
                    authError: 'ID should consists of number and alphabet (4 ~ 16).'
                })
            )
            return;
        }

        const passwordResult = validate(PasswordSchema, { password });
        if (!passwordResult.isValid) {
            dispatch(
                changeField({
                    ...auth,
                    authError: 'Password with at least 1 number, 1 alphabet, 1 special character! (8~32).'
                })
            )
            return;
        }

        dispatch(registerAsync({ username, password }))
    }

    const checkAuthState = () => {
        if (!authorized && !loading['auth/CHECK']) {
            removeItem('username');
        }
        if (authorized && !loading['auth/CHECK'] && !loading['auth/REGISTER']) {
            setItem('username', JSON.stringify(username));
            history.push('/postListPage', { from: '/login' });
        }
    }
    useEffect(() => {
        checkAuthState();
    }, [])

    useEffect(() => {
        if (authorized && !loading['auth/REGISTER']) {
            setItem('username', JSON.stringify(username));
            history.push('/postListPage', { from: '/login' });
        }
    }, [loading['auth/REGISTER']])

    return (
        <AuthForm authType="register" onChange={onChange} onSubmit={onSubmit} />
    )
}

export default RegisterForm;
