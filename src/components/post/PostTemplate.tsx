import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import PostListHeader from './PostListHeader';
import PostItem from './PostItem';
import Button from '../common/Button';

import palette from '../../lib/styles/palette';

import { initialize, changeWritingField } from '../../store/write';

import * as postApi from '../../lib/api/post';

const PostTemplateBlock = styled.div`
    width:100%;
    height:100%;
`;
// { children: String,cyan:Boolean,fullWidth:Boolean }


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

    &:disabled{
        background:${palette.gray[3]};
        color:${palette.gray[5]};
        cursor:not-allowed;
    }
`;

const NewMemoButton = styled.button`
    position:fixed;
    width:3rem;
    height:3rem;
    font-size:3rem;
    right:3rem;
    bottom:3rem;
    border-radius:100%;
    
    display:flex;
    align-items:center;
    justify-content:center;

    background:${palette.cyan[5]};
    color:white;    
    &:hover{
        background:${palette.cyan[4]}
    }
`;


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

const NewMemoBlock = styled.div`
    display: flex;
    justify-content:flex-end;
    margin-bottom:1rem;
`

interface PostType {
    _id: string,
    title: string,
    contents: string,
}

const PostTemplate = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [posts, setPosts] = useState<any[]>([]);
    const [pageState, setPageState] = useState({ page: 1, limit: 10, lastPage: 1, totalPostCount: 0 });
    const [isLoadingList, setIsLoadingList] = useState(false);

    async function getList() {
        const { page, limit } = pageState;
        setIsLoadingList(true);
        const res = await postApi.getPostList({ page, limit });
        const newPosts = [];

        setPageState({
            ...pageState,
            lastPage: +res.headers['last-page'],
            totalPostCount: +res.headers['total-post-count']
        })

        for (const d of res.data) {
            newPosts.push({ ...d._doc })
        }

        setPosts(newPosts);
        setIsLoadingList(false);
    }

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const { page, limit, totalPostCount, lastPage } = pageState;

        const nextLimit = +e.target.value;
        const nextLastPage = ((totalPostCount / nextLimit) | 0) + 1;

        setPageState({ ...pageState, page: 1, limit: nextLimit, lastPage: nextLastPage })
    }

    const onChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let nextPage = pageState.page + (+e.currentTarget.name);

        if (nextPage < 1) {
            nextPage = 1;
        }
        if (nextPage > pageState.lastPage) {
            nextPage = pageState.lastPage;
        }

        setPageState({ ...pageState, page: nextPage });
    };

    useEffect(() => {
        if (!isLoadingList) {
            getList();
        }
    }, [pageState.page, pageState.limit])

    const moveToWrite = () => {
        dispatch(initialize(''));
        dispatch(changeWritingField({ _id: "", title: "", contents: "", tags: [] }))
        history.push('/write', { from: '/postListPage' });
    }

    return (
        <PostTemplateBlock>
            <PostListHeader />

            <NavigationBlock>
                <SelectItems>
                    <select name="limits" onChange={onChangeSelect} >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <span>{pageState.totalPostCount} total posts</span>
                </SelectItems>
                <PageItems>
                    <SButton onClick={onChangePage} name="-1" disabled={pageState.page === 1}>before</SButton>
                    <SButton onClick={onChangePage} name='1' disabled={pageState.page === pageState.lastPage}>next</SButton>
                    <span>{pageState.page}/{pageState.lastPage} page</span>
                </PageItems>
            </NavigationBlock>

            {posts.length ? posts.map((post) =>
                <PostItem key={post._id} _id={post._id} title={post.title} contents={post.contents} lastUpdated={post.updatedAt} />
            ) : <div>Write a new memo...</div>}

            <NewMemoButton onClick={moveToWrite}>+</NewMemoButton>
        </PostTemplateBlock>
    )
}

export default PostTemplate