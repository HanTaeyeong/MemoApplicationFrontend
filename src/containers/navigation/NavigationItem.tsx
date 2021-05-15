import React from 'react'
import styled from 'styled-components';

export interface NavigationItemType {
    _id: string,
    title: string,
    icon: string,
    link: string,
}

const NavItemBlock = styled.div`
    
`;

const NavigationItem = ({ navItem }: { navItem: NavigationItemType }) => {
    const { title, icon, link } = navItem;
    return (
        <NavItemBlock onClick={()=>{}}>
            <img src={icon} alt="none" />
            <span>{title}</span>
        </NavItemBlock>
    )
}

export default NavigationItem
