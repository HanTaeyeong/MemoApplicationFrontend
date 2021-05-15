import React, { useEffect, useState } from 'react';
import history from '../../history';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import ListHeader from './ListHeader';
import PostNavigation from './PostNavigation';
import PostItem, { PostItemType } from './PostItem';
import LoadingSpinner from './LoadingSpinner';

import palette from '../../lib/styles/palette';

import { RootStateType } from '../../store';
import { changeWritingField } from '../../store/write';

import * as postApi from '../../lib/api/post';

const pageLimitValues = ['10', '20', '50', '100'];

const PostTemplate = () => {
    const dispatch = useDispatch();
    const loading = useSelector(({ loading }: RootStateType) => loading)
    const write = useSelector(({ write }: RootStateType) => write)
    const [posts, setPosts] = useState<PostItemType[]>([]);
    const [pageState, setPageState] = useState({ page: 1, limit: 10, lastPage: 1, totalPostCount: 0 });
    const [isLoadingList, setIsLoadingList] = useState(false);

    async function getPostList() {
        const { page, limit } = pageState;
        setIsLoadingList(true);
        const postList = await postApi.getPostList({ page, limit });
        setIsLoadingList(false);
        return postList;
    }

    const onPageStateChanged = async () => {
        const postList = await getPostList();
        const { headers } = postList;
        const newPosts = [];
        setPageState({
            ...pageState,
            lastPage: +headers['last-page'],
            totalPostCount: +headers['total-post-count']
        })
        for (const d of postList.data) {
            newPosts.push({ ...d._doc })
        }
        setPosts(newPosts);
    }

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const { totalPostCount } = pageState;

        const nextLimit = +e.target.value;
        const nextLastPage = ((totalPostCount / nextLimit) | 0) + 1;

        setPageState({ ...pageState, page: 1, limit: nextLimit, lastPage: nextLastPage })
    }

    const onChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { page, lastPage } = pageState;

        let nextPage = page + (+e.currentTarget.name);

        if (nextPage < 1) {
            nextPage = 1;
        }
        if (nextPage > lastPage) {
            nextPage = lastPage;
        }
        setPageState({ ...pageState, page: nextPage });
    };

    const onClickItem = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();

        const { _id, title, contents } = posts.filter(post => e.currentTarget.id === post._id)[0];

        dispatch(changeWritingField({ ...write, _id, title, contents }));
        history.push('/write');
    }

    useEffect(() => {
        if (!isLoadingList) {
            onPageStateChanged();
        }
    }, [pageState.page, pageState.limit])

    const moveToWrite = () => {
        dispatch(changeWritingField({ _id: "", title: "", contents: "", tags: [] }))
        history.push('/write');
    }

    return (
        <PostTemplateBlock>
            <ListHeader />

            <PostNavigation pageLimitValues={pageLimitValues} onChangeSelect={onChangeSelect}
                pageState={pageState} onChangePage={onChangePage} isLoadingList={isLoadingList} />

            {posts.length ? posts.map((post) =>
                <PostItem key={post._id} post={post} onClickItem={onClickItem} />
            ) : <div>Write a new memo...</div>}

            <NewMemoButton onClick={moveToWrite}>+</NewMemoButton>
            <LoadingSpinner className={isLoadingList ? 'loading' : ''} />
        </PostTemplateBlock>
    )
}

const PostTemplateBlock = styled.div`
    width:100%;
    height:100%;
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

export default PostTemplate