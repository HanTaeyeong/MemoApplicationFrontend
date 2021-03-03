import React from 'react'
import styled from 'styled-components';

import palette from '../../lib/styles/palette';

const PostItemBlock = styled.div`
margin-top:4rem;`;

const ItemHead = styled.div`
    border-bottom:1px solid ${palette.gray[2]};
 
    h1{
        font-size:2rem;
        line-height:1.5;
        margin:0
    }
`

const ItemSubInfo = styled.div`
    color:${palette.gray[6]};
    
    span+span:before{
        color:${palette.gray[5]};
        padding-left:0.25rem;
        padding-right:0.25rem;
        content:'\\B7';
    }
`
const ItemContent = styled.div`
    font-size:1.25rem;
    color:${palette.gray[8]};
    `


const PostItem = ({title,contents,lastUpdated}:{title:string, contents:string, lastUpdated:string}) => {

    return (
        <PostItemBlock>
            <ItemHead>
                <h1>{title}</h1>
                <ItemSubInfo>
                    <span><b>Last updated</b></span>
                    <span>{lastUpdated}</span>
                </ItemSubInfo>
            </ItemHead>
            <ItemContent>
                {contents}
            </ItemContent>

        </PostItemBlock>
    )
}

export default PostItem