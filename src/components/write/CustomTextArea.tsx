import { getElementError } from '@testing-library/react';
import React, { TextareaHTMLAttributes, useEffect, useState } from 'react'

const textAreaSelection = () => {
}

setInterval(() => textAreaSelection(), 2000);

function CustomTextArea() {

    const [text, setText] = useState('');

    const onChange = () => {
        document.onselectionchange = function() {
            let selection = document.getSelection();
            if(!selection) return;
            let {anchorNode, anchorOffset, focusNode, focusOffset} = selection;
           console.log(selection.rangeCount)
          };
    }

    return (
        <div>
            <textarea id={'custom-text-area'} onChange={onChange}>

            </textarea>
        </div>
    )
}

export default CustomTextArea
