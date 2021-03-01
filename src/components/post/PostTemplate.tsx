import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import PostListHeader from './PostListHeader';
//import PostItem from './PostItem';

import * as postApi from '../../lib/api/post';

const PostTemplateBlock = styled.div`
    width:100%;
    height:100%;
    background-color:black;
`;

const PostTemplate = () => {
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function getList() {
            const res = await postApi.getPostList();
            setPosts(res.data);
            console.log(res.data)
        }
        getList();
    }, [])

    const goToWrite = () => {
        history.push('/write', { from: '/postListPage' });
    }

    return (
        <PostTemplateBlock>
            <PostListHeader/>
            asdfasdgasdf
            <button onClick={goToWrite}>goToWrite</button>
            {posts.map(post => <div>ddd</div>)}
        </PostTemplateBlock>
    )
}

export default PostTemplate