import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { RootStateType } from '../../store';
import Button from '../common/Button';
import { initializeAuth, logoutAsync } from '../../store/auth';
import { removeItem } from '../../lib/localStorageRequest';

const ListHeader = () => {
    const authState = useSelector(({ auth, loading }: RootStateType) =>
        ({ username: auth.username, authorized: auth.authorized, loading: { ...loading } }))
    const { authorized, username } = authState;

    const dispatch = useDispatch();
    const history = useHistory();

    const onLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(initializeAuth);
        removeItem('username');
        dispatch(logoutAsync(''));
    }

    useEffect(() => {
        if (!authorized) {
            history.push('/login', { from: 'PostListPage' })
        }
    }, [authorized, username])

    return (
        <HeaderBlock>
            <span className='logo'>Simple Memo</span>
            <Button cyan={false} fullWidth={false} onClickFunction={onLogout}>Logout</Button>
        </HeaderBlock>
    )
}


const HeaderBlock = styled.div`
    width:100%;
    height:4rem;
    
    display:flex;
    align-items:center;
    
    background:white;
    box-shadow:0px 2px 4px rgba(0,0,0,0.08);
    margin-bottom:1rem;

    justify-content:space-between;

    .logo{
        font-size:1.125rem;
        font-weight:800;
        letter-spacing:2px;
    }
    .right{
      
    }
`;


export default ListHeader