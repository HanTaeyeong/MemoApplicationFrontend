import React, { useState } from 'react'
import styled from 'styled-components';

import NavigationItem, { NavigationItemType } from './NavigationItem'


const navItems: NavigationItemType[] = [
    { _id: 'Email67395!+', title: 'Email', icon: '4', link: '1' },
    { _id: 'Subscription+eif39j2', title: 'Subscription', icon: '', link: '' },
    { _id: 'Donation+de9fj3', title: 'Donation', icon: '', link: '' },
    { _id: 'About+39fjdie', title: 'About', icon: '', link: '' },
]


const Navigation = () => {
    const [navActive, setNavActive] = useState(false);
    return (
        <NavigationBlock>
            <div role='nav-active-button' onClick={() => setNavActive(!navActive)}>activation</div>
            <NavList role='nav-list' className={navActive ? 'navActive' : ''}>
                {navItems.map((navItem) => <NavigationItem key={navItem._id} navItem={navItem} />)}
            </NavList>
            <NavActivationBackground role='nav-background' className={navActive ? 'navActive' : ''} onClick={()=>setNavActive(false)} />
        </NavigationBlock>
    )
}

const Email = styled.div``;
const Subscription = styled.div``;
const Donation = styled.div``;
const About = styled.div``;

const NavigationBlock = styled.div`
    display:flex;
    flex-direction:column;
    `;

const NavActivationBackground = styled.div`
    z-index:9;
    
    position:fixed;
    display:none;
    left:0;
    height:0;
    width:100vw;
    height:100vh;
    transition:0.5s;

    &.navActive{
        background:rgba(0,0,0,0.15);
        display:flex;
    }
`;

const NavList = styled.div`
    z-index:10;
    
    position:fixed;
    width:500px;
    height:500px;

    display:flex;
    flex-direction:column;
    top:100px;

    left:-500px;
    background:yellow;
    transition:0.5s;

    &.navActive{
        left:0;
    }
`;




export default Navigation;