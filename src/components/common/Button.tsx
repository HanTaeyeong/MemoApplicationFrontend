import React from 'react'
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

import { RootStateType } from '../../store';
import { useSelector } from 'react-redux';

interface ButtonPropsType {
    cyan: Boolean;
    fullWidth: Boolean;
}

const StyledButton = styled.button`
    position:relative;

    border:none;
    border-radius: 5rem;
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;
    box-shadow: 0.25rem 0.25rem 0.5rem 0.2rem rgba(0, 0, 0, 0.1);
    background: ${palette.gray[8]};
    &:hover{
        background: ${palette.gray[6]};
    }

    ${(props: ButtonPropsType) => props.fullWidth &&
        css`
    padding-top:0.75rem;
    padding-bottom:0.75rem;
    width:100%;
    font-size:1.33rem;
    `}
    
    ${(props: ButtonPropsType) => props.cyan && css`
        background:${palette.cyan[5]};
        &:hover{
            background:${palette.cyan[4]}
        }
    `}
    
        &.loading{
            background:${palette.cyan[1]};
            cursor:not-allowed;
            .text{
            visibility:hidden;
        }

        &::after{
            content:"";
            position:absolute;
            width:1.25rem;
            height:1.25rem;
            border:0.25rem solid transparent;
            border-top-color:${palette.cyan[5]};
            border-radius:50%;
            /* top:50%;
            left:50%;
            transform:translate(-50%,-50%);
             */
             top:0;
             left:0;
             bottom:0;
             right:0;
             margin:auto;
            animation:button-loading-spinner 1s ease infinite;
        }
        }
        
        @keyframes button-loading-spinner{
            from{
                transform:rotate(0turn);
            }
            to{
                transform:rotate(1turn);
            }
        }
`;

interface ButtonType {
    children: String;
    cyan: Boolean;
    fullWidth: Boolean;

    onClickFunction?: Function | undefined;
}

const Button = ({ children, cyan, fullWidth, onClickFunction }: ButtonType) => {

    const loadingState = useSelector(({ loading }: RootStateType) => ({ ...loading }));
    const isLoading = loadingState['auth/LOGIN'] || loadingState['auth/REGISTER'] || loadingState['write/UPDATE_POST'] || loadingState['write/WRITE_POST'];

    const onClick = () => {
        if (onClickFunction) {
            return onClickFunction();
        } else {
            return () => { }
        }
    }

    return (
        <StyledButton role='button' cyan={cyan} fullWidth={fullWidth}
            onClick={onClick} className={isLoading ? 'loading' : ''}>
            <span className={'text'}>{children}</span>
        </StyledButton>
    )
}

export default Button;
