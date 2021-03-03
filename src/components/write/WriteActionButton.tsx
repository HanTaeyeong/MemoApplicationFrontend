import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { writePostAsync, WriteType } from '../../store/write';

import styled from 'styled-components';

import useInterval from '../../lib/hook/useInterval';

const WriteActionButtonBlock = styled.div``;

const WriteActionButton = () => {
    
    return (
        <WriteActionButtonBlock>

        </WriteActionButtonBlock>
    )
}

export default WriteActionButton