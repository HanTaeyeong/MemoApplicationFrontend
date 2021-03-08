import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { RootStateType } from '../../store';
import { changeField, checkAsync, loginAsync } from '../../store/auth';
import AuthForm from '../../components/auth/AuthForm';
import { useHistory } from 'react-router-dom';

import { validate, userSchema } from '../../lib/validation';
import { setItem, removeItem, getItem } from '../../lib/localStorageRequest';

const LoginForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const authState = useSelector(({ auth, loading }: RootStateType) => ({
        ...auth,
        authType: 'login',
        loading: {
            ...loading
        }
    }))
    const { authorized, username, password, loading } = authState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                ...authState,
                authType: 'login',
                [name]: value
            })
        )
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const vaildationResult = validate(userSchema, { username, password })
        if (!vaildationResult.isValid) {
            console.log('invalid username or password');
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
    }, [authorized,loading['auth/CHECK'],loading['auth/LOGIN']])

    return (
        <AuthForm authType="login" onChange={onChange} onSubmit={onSubmit} />
    )
}

export default LoginForm
