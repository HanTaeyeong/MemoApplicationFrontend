import React from 'react'
import styled from 'styled-components';
import ConfirmModal from '../common/ConfirmModal';

const PostDeleteConfirmModal = ({visible}:{visible:boolean}) => {
    return (
        <ConfirmModal visible={visible} title={'Delete memo'} description={'Are you sure to delete this memo?'}
        confirmText={'Yes'} cancelText={'No'}
        />
    )
}

export default PostDeleteConfirmModal