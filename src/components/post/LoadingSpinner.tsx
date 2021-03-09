import React from 'react'
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const LoadingSpinner=styled.div`
    position:fixed;
    margin:auto;
    visibility:hidden;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
    width:0;
    height:0;
    background:black;

    &.loading{
        visibility:visible;
    }
    &::after{
            content:"";
            position:absolute;
            width:5rem;
            height:5rem;
            border:0.5rem solid transparent;
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
        
        @keyframes button-loading-spinner{
            from{
                transform:rotate(0turn);
            }
            to{
                transform:rotate(1turn);
            }
        }
`;

export default LoadingSpinner;
