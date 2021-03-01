import React from 'react'
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

interface ButtonPropsType{
    cyan:Boolean;
    fullWidth:Boolean;
}

const StyledButton = styled.button`
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

    ${(props:ButtonPropsType) => props.fullWidth &&
        css`
    padding-top:0.75rem;
    padding-bottom:0.75rem;
    width:100%;
    font-size:1.125rem;
    `}
    
    ${(props:ButtonPropsType) => props.cyan && css`
        background:${palette.cyan[5]};
        &:hover{
            background:${palette.cyan[4]}
        }
    `}

`;


const Button = ({ children,cyan,fullWidth }: { children: String,cyan:Boolean,fullWidth:Boolean }) => {
    return (
        <StyledButton cyan={cyan} fullWidth={fullWidth} >{children}</StyledButton>
    )
}

export default Button;
