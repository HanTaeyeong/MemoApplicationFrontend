import styled from 'styled-components';

import palette from '../../lib/styles/palette';

const PostItemBlock = styled.div`

margin-top:0.5rem;
border-bottom:1px solid ${palette.gray[2]};
cursor:pointer;
`;

const ItemHead = styled.div`
display:flex;

flex-direction:row;
justify-content:space-between;
    
    .title{    
        font-size:1.125rem;
        font-weight:700;
        margin-bottom:0.5rem;
    }
`

const ItemSubInfo = styled.span`
    color:${palette.gray[6]};
   
    height:1.5rem;
    span+span:before{
        color:${palette.gray[5]};
        padding-left:0.25rem;
        padding-right:0.25rem;
        content:'\\B7';
    }
`
const ItemContent = styled.div`
    font-size:0.77rem;
    color:${palette.gray[8]};
    margin-bottom:2rem;
    
    `
export interface PostItemType {
    _id: string,
    title: string,
    contents: string,
    lastUpdated: string,
}

const PostItem = ({ post, onClickItem }: { post: PostItemType, onClickItem?: Function }) => {
    const { title, contents, lastUpdated } = post;

    return (
        <PostItemBlock title={title} onClick={(e) => onClickItem ? onClickItem(e) : {}}>
            <ItemHead>
                <span className="title">{title}</span>
                <ItemSubInfo>
                    <span><b>Last update</b></span>
                    <span>{lastUpdated?.slice(0, 10)}</span>
                </ItemSubInfo>
            </ItemHead>

            <ItemContent>
                {contents}
            </ItemContent>
        </PostItemBlock>
    )
}

export default PostItem