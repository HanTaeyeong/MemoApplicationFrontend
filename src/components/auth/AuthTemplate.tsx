import React from 'react'
import styled from 'styled-components';

const AuthTemplateBlock = styled.div`
    position:absolute;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    padding-left:1.5rem;
    padding-right:1.5rem;
`;

const WhiteBox = styled.div`
    .logo-area{
        display:block;
        text-align:center;
        font-weight:bold;
        letter-spacing:2px;
    }
    font-size:2rem;
    box-shadow: 0 0 8px rgba(0,0,0,0.025);
    padding: 2rem;
    width:360px;
    border-radius:2px;
`;

const AuthTemplate = ({children}:{children:JSX.Element}) => {
    return (
        <AuthTemplateBlock>
            <WhiteBox>
                <div className="logo-area">
                    Simple Memo
                </div>
            </WhiteBox>
            {children}
        </AuthTemplateBlock>
    )
}

export default AuthTemplate
