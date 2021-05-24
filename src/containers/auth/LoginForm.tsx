import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { RootStateType } from '../../store';
import { changeField, checkAsync, loginAsync } from '../../store/auth';
import AuthForm from '../../components/auth/AuthForm';

import history from '../../history';


import { validate, IdSchema, PasswordSchema } from '../../lib/validation';
import { setItem, getItem } from '../../lib/localStorageRequest';

const LoginForm = () => {

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

    const checkId = () => {
        if (!isVailidId()) {
            setAuthErrorId()
        }
    }
    const isVailidId=()=>{
        const idResult = validate(IdSchema, { username })
        return idResult.isValid
    }
    const setAuthErrorId = () => {
        dispatch(
            changeField({
                ...auth,
                authError: '[ID] ID should consists of number and alphabet (4 ~ 16).'
            })
        )
    }

    const checkPassword = () => {
        if (!isValidPassword()) {
            setAuthErrorPassword();
        }
    }
    const isValidPassword=()=>{
        const passwordResult = validate(PasswordSchema, { password });
        return passwordResult.isValid;
    }
    const setAuthErrorPassword = () => {
        dispatch(
            changeField({
                ...auth,
                authError: '[PW] Password with at least 1 number, 1 alphabet, 1 special character! (8~32).'
            })
        )
    }


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
                
        checkId()
        checkPassword();

        if(!isVailidId()||!isValidPassword()){
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
            history.push('/postListPage');
        }
    }, [authorized, loading['auth/CHECK'], loading['auth/LOGIN']])

    return (
        <AuthForm authType="login" onChange={onChange} onSubmit={onSubmit} />
    )
}

export default LoginForm
