
import Navigation from '../../../containers/navigation/Navigation';

import { render, screen, act, fireEvent } from "@testing-library/react";

describe('navigation test', () => {
    it('navigation render test', async () => {
        const navigation = await render(<Navigation />);
        expect(navigation).toBeDefined()
        const navActiveButton = await screen.findByRole('nav-active-button');

        const navListItems = await screen.findAllByRole('nav-list-item');
        expect(navListItems.length).toBe(4);
        const navList =await screen.findByRole('nav-list');
        const leftPositionStart=getComputedStyle(navList)._values.left;
        
        navActiveButton.click()
        const leftPositionEnd=getComputedStyle(navList)._values.left;
    })
    it('navList position test',async()=>{
        const navigation = await render(<Navigation />);
        const navActiveButton = await screen.findByRole('nav-active-button');
        const navList =await screen.findByRole('nav-list');
        const leftPositionStart=getComputedStyle(navList)._values.left;
        expect(leftPositionStart).toEqual('-500px')
        navActiveButton.click()
        const leftPositionEnd=getComputedStyle(navList)._values.left;
        expect(leftPositionEnd).toEqual('0px')
        const navBackground =await  screen.getByRole('nav-background');
        navBackground.click();
        const leftPositionAfterClickingBackground=getComputedStyle(navList)._values.left;

        expect(leftPositionAfterClickingBackground).toEqual('-500px'); 
    })
})