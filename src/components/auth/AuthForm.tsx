import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';


const AuthFormBlock = styled.div`
    h3{
        margin:0;
        margin-bottom:1rem;
        color:${palette.gray[8]};
    }
`;

const StyledInput = styled.input`
    font-size:1rem;
    border:none;
    border-bottom:1px solid ${palette.gray[5]};
    padding-bottom:0.5rem;
    outline:none;
    width:100%;
    &:focus{
        color:$oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    &+&{
        margin-top: 1rem;
    }
`

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

    return (
        <AuthFormBlock>
            <h3>{text}</h3>
            <form onSubmit={(e)=>onSubmit(e)}>
                <StyledInput onChange={(e)=>onChange(e)} autoComplete="username" name="username" placeholder="Id" />
                <StyledInput onChange={(e)=>onChange(e)} type="password" autoComplete="new-password" name="password" placeholder="password" />
                {authType === 'register' && (<StyledInput onChange={(e)=>onChange(e)} autoComplete="new-password" name="passwordConfirm" placeholder="passwordConfirm" type="password" />)}
                <ButtonWithMarginTop cyan fullWidth >{text}</ButtonWithMarginTop>
            </form>
            <Footer>
                {authType === 'login' ? (
                    <Link to='/register'>Go to Register</Link>
                ) : (<Link to="/login">Go To Login</Link>)}
            </Footer>
        </AuthFormBlock>
    )
}

export default AuthForm
