import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootStateType } from '../../store';
import { initializeAuth } from '../../store/auth';

import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const AuthFormBlock = styled.div`
    h3{
        margin-left:1rem;
        margin-bottom:1rem;
        color:${palette.gray[8]};
    }
`;

const StyledInput = styled.input`
    font-size:1rem;
    border:1px solid ${palette.gray[5]};
    border-radius:50px;

    padding:0.5rem;
    padding-left:1rem;
    outline:none;
    width:100%;
    margin-bottom: 1rem;
   
    :focus{
        color:$oc-teal-7;
        border:1px solid ${palette.cyan[5]};
        &.error{
        border:1px solid red;
        }
    }
`
const ErrorMessage = styled.div`
width:100%;
    margin:0 auto;
    color:red;
text-align:center;
margin-bottom:1rem;
`;

const Footer = styled.div`
    margin-top:2rem;
    text-align:right;
    a{
        color:${palette.gray[6]};
        text-decoration:underline;
        &:hover{
            color:${palette.gray[9]}
        }
    }
`
const ButtonWithMarginTop = styled(Button)`
    margin-top:1rem;
`;

interface MapType {
    [key: string]: string
}

const textMap: MapType = {
    "login": 'Login',
    "register": 'Register'
}

const AuthForm = ({ authType, onChange, onSubmit }: { authType: string, onChange: Function, onSubmit: Function }) => {
    const text = textMap[authType];
    const auth = useSelector(({ auth }: RootStateType) => auth);
    const dispatch = useDispatch();

    const idRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { authErrorMessage } = auth;

    useEffect(() => {
        dispatch(initializeAuth());
    }, [])

    useEffect(() => {
        if (!authErrorMessage) {return};

        const authErrorHead = authErrorMessage?.slice(0, 4)

        if (authErrorHead === "[ID]") {
            idRef.current?.focus();
            return;
        }
        if (authErrorHead === "[PW]") {
            passwordRef.current?.focus();
        }
    }, [authErrorMessage])

    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={(e) => onSubmit(e)}>
                <StyledInput role='input' onChange={(e) => onChange(e)} autoComplete="username" name="username"
                    placeholder="Id" ref={idRef} className={authErrorMessage && 'error'} />
                <StyledInput role='input2' onChange={(e) => onChange(e)} type="password" autoComplete="new-password"
                    name="password" placeholder="password" ref={passwordRef} className={authErrorMessage && 'error'} />

                {authType === 'register' && (<StyledInput onChange={(e) => onChange(e)} autoComplete="new-password" name="passwordConfirm" placeholder="passwordConfirm" type="password" />)}

                {authErrorMessage && <ErrorMessage>{authErrorMessage}</ErrorMessage>}

                <ButtonWithMarginTop cyan fullWidth >{text}</ButtonWithMarginTop>
            </form>

            <Footer>
                {authType === 'login' ? (
                    <Link to='/register' role='button'>Go to Register</Link>
                ) : (<Link to="/login" role='button'>Go to Login</Link>)}
            </Footer>
        </AuthFormBlock>
    )
}

export default AuthForm
