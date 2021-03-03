import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import palette from '../../lib/styles/palette';

import { writePostAsync, changeWritingField, finalizeWriting, initialize } from '../../store/write';
import { RootStateType } from '../../store';

// import useInterval from '../../lib/hook/useInterval';

const EditorBlock = styled.div`
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

const Editor = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const writeState = useSelector(({ write, loading }: RootStateType) => 
    ({ ...write, loading: { ...loading } }));
    
    const { title, contents, tags, finishWriting, loading } = writeState;

    const [editorState, setEditorState] = useState({ title: '', contents: '', theme: 'snow' });

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(changeWritingField({ ...writeState, title: value }));
      
    }

    const onChangeContents = (text: string) => {
        dispatch(changeWritingField({ ...writeState, contents: text }));
    }

    const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setEditorState({ ...editorState, theme: e.target.value })
    }

    // useInterval(dispatch(writePostAsync({ title, body, tags })), 60000);
    const onGoingBack = () => {
        dispatch(finalizeWriting(''));
        dispatch(writePostAsync({ title, contents, tags }))
    }
    const onInitialize= ()=>{
        dispatch(initialize(''))
    }

    useEffect(()=>{
        onInitialize();
     
    },[]);

    useEffect(() => {
      
        if (finishWriting && !loading['write/WRITE_POST']) {
            history.push('/postListPage', { from: '/write' });
        }
    }, [loading['write/WRITE_POST'],finishWriting])

    return (
        <EditorBlock>
            <button onClick={onGoingBack}>Go to back</button>
            <button onClick={onInitialize}>Initialize</button>
            <TitleInput onChange={e => onChangeTitle(e)} name='title' />
            <ReactQuill
                onChange={e => onChangeContents(e)}
                theme={editorState.theme}
                modules={quillOption.modules}
                formats={quillOption.formats}
                placeholder={quillOption.placeholder}
            />
            <div className="themeSwitcher">
                <label>Theme </label>
                <select onChange={(e) =>
                    onChangeSelect(e)}>
                    <option value="snow">Snow</option>
                    <option value="bubble">Bubble</option>
                </select>
            </div>
        </EditorBlock>
    )
}

export default Editor