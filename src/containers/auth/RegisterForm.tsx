import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { RootStateType } from '../../store';
import { changeField, registerAsync } from '../../store/auth';
import AuthForm from '../../components/auth/AuthForm';
import { useHistory } from 'react-router-dom';

import { validate, userSchema } from '../../lib/validation';
import {setItem,removeItem} from '../../lib/localStorageRequest';

const RegisterForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const authState = useSelector(({ auth, loading }: RootStateType) => ({
        ...auth,
        authType: 'register',
        loading:{...loading}
    }))
    const { authorized, username, password, passwordConfirm, loading } = authState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                ...authState,
                authType: 'register',
                [name]: value
            })
        )
    }

    const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            alert('password is diffrent');
            return;
        }
        const vaildationResult = validate(userSchema, { username, password })
        if (!vaildationResult.isValid) { return; }

        dispatch(registerAsync({ username, password }))
    }

    const checkAuthState = () => {
        if (!authorized && !loading['auth/CHECK']) {
            removeItem('username');
        }
        if (authorized && !loading['auth/CHECK'] &&!loading['auth/REGISTER']) {
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
