import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { RootStateType } from '../../store';
import Button from '../common/Button';
import { initializeForm, logoutAsync} from '../../store/auth';
import {removeItem} from '../../lib/localStorageRequest';

const HeaderBlock = styled.div`
    width:100%;
    background:white;
    box-shadow:0px 2px 4px rgba(0,0,0,0.08);
    margin-bottom:4rem;
`;

const Wrapper = styled.div`
    height:4rem;
    display:flex;
    align-items:center;
    justify-content:space-between;
    .logo{
        font-size:1.125rem;
        font-weight:800;
        letter-spacing:2px;
    }
    .right{
        display:flex;
        align-items:center;
    }
`;



const Header = () => {
    const authState = useSelector(({ auth, loading }: RootStateType) =>
        ({ username: auth.username, authorized: auth.authorized, loading: { ...loading } }))
    const { authorized,username } = authState;

    const dispatch = useDispatch();
    const history = useHistory();

    const onLogout = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(initializeForm);
        removeItem('username');
        dispatch(logoutAsync(''));
    }

    useEffect(() => {
        if (!authorized && !username) {
            history.push('/login', { from: 'PostListPage' }) 
        }
    }, [authorized,username])

    return (
        <HeaderBlock>
            <Wrapper>
                <form onSubmit={(e)=>onLogout(e)}>
                    <div className='logo'>Simple Memo</div>
                    <div className='right'>
                        <Button cyan={false} fullWidth={false}>Logout</Button>
                    </div>
                </form>
            </Wrapper>
        </HeaderBlock>
    )
}

export default Header