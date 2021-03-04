import React from 'react'
import styled from 'styled-components';
import Button from './Button';

const ModalBackground = styled.div`
    position:fixed;
    z-index:30;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.25);
    display:flex;
    justify-content:center;
    align-items:center;
`;

const ConfirmModalBlock = styled.div`
    z-index:10;
    width:20rem;
    background:white;
    padding:1.5rem;
    border-radius:4px;
    box-shadow:0px 0px 8px rgba(0, 0, 0, 0.125);
    h2{
        margin-top:0;
        margin-bottom:1rem;
    }
    
    p{
        margin-bottom:3rem;
    }
    .buttons{
        display:flex;
        justify-content:flex-end;
    }
`;

const ConfirmButton = styled(Button)`
    height:2rem;
    &+&{
        margin-left:0.75rem;
    }
`;

interface ConfirmModalType {
    visible: boolean;
    title: string;
    description: string;
    confirmText: string;
    cancelText: string
};

const ConfirmModal = ({ visible, title, description, confirmText, cancelText }: ConfirmModalType) => {

    if (!visible) {
        return null;
    }

    return (
        <ModalBackground>
            <ConfirmModalBlock>
                <h2>{title}</h2>
                <p>{description}</p>
                <div className="buttons">
                    <ConfirmButton cyan={false} fullWidth={false} >{cancelText}</ConfirmButton>
                    <ConfirmButton cyan fullWidth={false} >{confirmText}</ConfirmButton>
                </div>

            </ConfirmModalBlock>
        </ModalBackground>
    )
}

export default ConfirmModal