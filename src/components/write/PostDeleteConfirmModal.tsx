import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Button from '../common/Button';

import { RootStateType } from '../../store';
import { deletePostAsync } from '../../store/write';
import history from '../../history';

const modalData = {
    title: 'Delete memo',
    description: 'Are you sure to delete this memo?',
    confirmText: 'Yes',
    cancelText: 'No'
}

const PostDeleteConfirmModal = ({ closeModal }: { closeModal: Function }) => {
    const dispatch = useDispatch();
    const write = useSelector(({ write }: RootStateType) => write);
    const loading = useSelector(({ loading }: RootStateType) => loading);

    const [moveToPostList, setMoveToPostList] = useState(false);
    const { _id } = write;
    const { title, description, confirmText, cancelText } = modalData;


    useEffect(() => {
        if (moveToPostList && !loading['write/DELETE_POST']) { history.push('/postListPage'); }
    }, [loading['write/DELETE_POST']])

    const onDeleteConfirm = () => {
        dispatch(deletePostAsync({ _id }));
        setMoveToPostList(true);
    }

    return (
        <ModalBackground role='post-delete-confirm-modal'>
            <ConfirmModalBlock>
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="buttons">
                    <ConfirmButton cyan={false} fullWidth={false} onClickFunction={closeModal}  >{cancelText}</ConfirmButton>
                    <ConfirmButton cyan fullWidth={false} onClickFunction={onDeleteConfirm}>{confirmText}</ConfirmButton>
                </div>
            </ConfirmModalBlock>
        </ModalBackground>
    )
}

const ModalBackground = styled.div`
    position:fixed;
    z-index:30;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.25);
    display:flex;
    justify-content:center;
    align-items:center;
`;

const ConfirmModalBlock = styled.div`
    z-index:10;
    width:20rem;
    background:white;
    padding:1.5rem;
    border-radius:4px;
    box-shadow:0px 0px 8px rgba(0, 0, 0, 0.125);
    h2{
        margin-top:0;
        margin-bottom:1rem;
    }
    
    p{
        margin-bottom:3rem;
    }
    .buttons{
        display:flex;
        justify-content:flex-end;
    }
`;

const ConfirmButton = styled(Button)`
    height:2rem;
    &+&{
        margin-left:0.75rem;
    }
`;

export default PostDeleteConfirmModal