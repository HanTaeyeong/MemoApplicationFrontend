import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import history from '../../history';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import palette from '../../lib/styles/palette';

import Button from '../common/Button';

import { writePostAsync, changeWritingField, updatePostAsync, deletePostAsync } from '../../store/write';
import { RootStateType } from '../../store';

const quillOption = {
    theme: 'snow',
    placeholder: 'write here...',
    modules: {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            //['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    },
    formats: [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]
}

const WriteTemplate = () => {
    const dispatch = useDispatch();
    const [moveToPostList, setMoveToPostList] = useState(false);

    const write = useSelector(({ write }: RootStateType) => write);
    const loading = useSelector(({ loading }: RootStateType) => loading);

    const { title, contents, tags, _id } = write;

    const [editorState, setEditorState] = useState({ title: '', contents: '', theme: 'snow' });

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(changeWritingField({ ...write, title: value }));
    }

    const onChangeContents = (text: string) => {
        dispatch(changeWritingField({ ...write, contents: text }));
    }

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setEditorState({ ...editorState, theme: e.target.value })
    }

    const onGoingBack = () => {
        if (!_id) 
        { dispatch(writePostAsync({ title, contents, tags })) }
        else {
            dispatch(updatePostAsync({ _id, title, contents }))
        }

        setMoveToPostList(true);
    }
    const onDelete = () => {
        dispatch(deletePostAsync({ _id }));
        setMoveToPostList(true);
    }

    useLayoutEffect(() => {
        if (moveToPostList && !loading['write/WRITE_POST'] && !loading['write/UPDATE_POST'] && !loading['write/DELETE_POST']) {
            history.push('/postListPage');
        }
    }, [loading['write/WRITE_POST'], loading['write/UPDATE_POST'], loading['write/DELETE_POST'], moveToPostList])

    return (
        <WriteTemplateBlock>
            <ButtonWrapper>
                <Button cyan={true} fullWidth={false} onClickFunction={onGoingBack}>Back to lists</Button>
                <Button cyan={false} fullWidth={false} onClickFunction={onDelete}>Delete</Button>
            </ButtonWrapper>
            <TitleInput role='title-input' onChange={e => onChangeTitle(e)} name='title'
                placeholder="Write a title here" value={write.title} />
            <ReactQuill
                onChange={e => onChangeContents(e)}
                theme={editorState.theme}
                modules={quillOption.modules}
                formats={quillOption.formats}
                placeholder={quillOption.placeholder}
                value={write.contents}
            />
            <div className="themeSwitcher" role='theme-switcher'>
                <label>Theme </label>
                <select onChange={(e) =>
                    onChangeSelect(e)}>
                    <option value="snow">Snow</option>
                    <option value="bubble">Bubble</option>
                </select>
            </div>
        </WriteTemplateBlock>
    )
}


const WriteTemplateBlock = styled.div`
    padding-top:5rem;
    padding-bottom:5rem;
    margin: 1rem 4rem;
    
 .ql-container {
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  background: #fefcfc;
}
.ql-snow.ql-toolbar {
  display: block;
  background: #eaecec;
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
}

 .ql-bubble .ql-editor {
  border: 1px solid #ccc;
  border-radius: 0.5em;
}
 .ql-editor {
  min-height: 18em;
}

.themeSwitcher {
  margin-top: 0.5em;
  font-size: small;
}
`;


const TitleInput = styled.input`
    font-size:3rem;
    outline:none;
    padding-bottom:0.5rem;
    border:none;
    border-bottom:1px solid ${palette.gray[4]};
    margin-bottom:2rem;
    width:100%;
`;

const ButtonWrapper = styled.div`
    margin:1rem;
    margin-left:0;
    display:flex;
    justify-content:space-between;
`;


export default WriteTemplate;