import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { RootStateType } from '../../store';
import { changeField, checkAsync, loginAsync } from '../../store/auth';
import AuthForm from '../../components/auth/AuthForm';
import { useHistory } from 'react-router-dom';

import { validate, IdSchema, PasswordSchema } from '../../lib/validation';
import { setItem, removeItem, getItem } from '../../lib/localStorageRequest';

const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(({ auth }: RootStateType) => auth);
    const loading = useSelector(({ loading }: RootStateType) => loading);

    const { authorized, username, password } = auth;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                ...auth,
                [name]: value
            })
        )
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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

        const passwordResult= validate (PasswordSchema, {password});
        if (!passwordResult.isValid) {
            dispatch(
                changeField({
                    ...auth,
                    authError: 'Password with at least 1 number, 1 alphabet, 1 special character! (8~32).'
                })
            )
            return;
        }

        dispatch(loginAsync({ username, password }))
    }

    useEffect(() => {
        const localUsername = getItem('username');
        if (localUsername) {
            dispatch(checkAsync(localUsername));
        }
    }, [])

    useEffect(() => {
        if (authorized && !loading['auth/CHECK'] && !loading['auth/LOGIN']) {
            setItem('username', JSON.stringify(username));
            history.push('/postListPage', { from: '/login' });
        }
    }, [authorized, loading['auth/CHECK'], loading['auth/LOGIN']])

    return (
        <AuthForm authType="login" onChange={onChange} onSubmit={onSubmit} />
    )
}

export default LoginForm
