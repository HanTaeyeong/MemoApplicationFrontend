import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import PostListHeader from './PostListHeader';
import PostItem from './PostItem';

import * as postApi from '../../lib/api/post';

const PostTemplateBlock = styled.div`
    width:100%;
    height:100%;
`;

interface PostType {
    _id: string,
    title: string,
    contents: string,
}



const PostTemplate = () => {
    const history = useHistory();
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
        const nextLastPage = (( totalPostCount/nextLimit) | 0) + 1;

        // let nextPage = (nextLastPage * (page / lastPage)) | 0;

        // if (nextPage < 1) {
        //     nextPage = 1;
        // }

        // if (nextPage > nextLastPage) {
        //     nextPage = nextLastPage;
        // }
        
        // console.log(nextLastPage)

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
        if (isLoadingList) {
            return;
        }
        getList();
    }, [pageState.page, pageState.limit])

    const goToWrite = () => {
        history.push('/write', { from: '/postListPage' });
    }

    return (
        <PostTemplateBlock>
            <button onClick={onChangePage} name="-1">before</button>
            <button onClick={onChangePage} name='1'>next</button>
            <div>{pageState.page}/{pageState.lastPage} page</div>
            <PostListHeader />
            <select name="limits" onChange={onChangeSelect} >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <button onClick={goToWrite}>NewMemo</button>

            <div>{pageState.totalPostCount} total posts</div>

            {posts.map((post) =>
                <PostItem key={post._id} title={post.title} contents={post.contents} lastUpdated={post.updatedAt} />
            )}


        </PostTemplateBlock>
    )
}

export default PostTemplate