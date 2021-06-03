import { ChangeEventHandler, MouseEventHandler, useEffect } from 'react'
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';

import palette from '../../lib/styles/palette';
import { RootStateType } from '../../store';

import {changePageState} from '../../store/write';

export interface PostNavigationType {
    onChangeSelect: ChangeEventHandler<HTMLSelectElement>;
    onChangePage: MouseEventHandler<HTMLButtonElement>;
}

const pageLimitValues = ['10', '20', '50', '100'];

function PostNavigation() {
    const dispatch = useDispatch();
    const write = useSelector(({ write }: RootStateType) => write);
    const loading = useSelector(({ loading }: RootStateType) => loading);
    const isLoadingList = loading['write/GET_POST_LIST'];
    
    const {limit, page, lastPage, totalPostCount } = write.pageState;

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        const nextLimit = +e.target.value;
        const nextLastPage = ((totalPostCount / nextLimit) | 0) + 1;

        dispatch(changePageState({
            totalPostCount,
            page: 1,
            limit: nextLimit,
            lastPage: nextLastPage
        }));
    }

    const onChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let nextPage = page + (+e.currentTarget.name);
        if (nextPage < 1) {
            nextPage = 1;
        }
        if (nextPage > lastPage) {
            nextPage = lastPage;
        }

        dispatch(changePageState({ limit, lastPage, totalPostCount, page: nextPage }));
    };

    return (
        <NavigationBlock>
            <SelectItems>
                <select name="limits" onChange={onChangeSelect} >
                    {pageLimitValues.map(value => <option value={value} key={'pageLimitOption' + value}>{+value}</option>)}
                </select>
                <span>{totalPostCount} total posts</span>
            </SelectItems>

            <PageItems>
                <SButton onClick={onChangePage} name="-1" disabled={page === 1} className={isLoadingList ? 'loading' : ''}>before</SButton>
                <SButton onClick={onChangePage} name='1' disabled={page === lastPage} className={isLoadingList ? 'loading' : ''}>next</SButton>
                <span>{page}/{lastPage} page</span>
            </PageItems>
        </NavigationBlock>
    )
}

const NavigationBlock = styled.div`
    display:flex;
    justify-content:space-between;
    margin-bottom:1rem;
`;
const SelectItems = styled.div`
    select{
        margin-right:0.33rem;
    }
`;
const PageItems = styled.div`
    button{
        margin-right:0.33rem;
    }
`;


const SButton = styled.button`
    border:none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.gray[8]};
    &:hover{
        background: ${palette.gray[6]};
    }

    &:disabled, 
    &.loading
    {
        background:${palette.gray[3]};
        color:${palette.gray[4]};
        cursor:not-allowed;
    }
`;


export default PostNavigation
