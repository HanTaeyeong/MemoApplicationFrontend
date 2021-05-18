import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Counter from './Counter';

test('render counter', () => {
    const { getByText } = render(<Counter />);
    const titleElement = getByText(/counter/i);
    expect(titleElement).toBeInTheDocument();
});

test('check init count', () => {
    const { getByText } = render(<Counter />);
    const countElement0 = getByText('0');
    expect(countElement0).toBeInTheDocument();
})

test('plus-button functionality', ()=>{
    const { getByText } = render(<Counter />);
    const plusElement = getByText('+');
    expect(plusElement).toBeInTheDocument();
    fireEvent.click(plusElement);
    
    const countElement1=getByText('1');
    expect(countElement1).toBeInTheDocument();

    expect(plusElement).toBeInTheDocument();
    fireEvent.click(plusElement);
    expect(plusElement).toBeInTheDocument();
    fireEvent.click(plusElement);

    const countElement3=getByText('3');
    expect(countElement3).toBeInTheDocument();
})


test('minus-button functionality',()=>{
    const { getByText } = render(<Counter />);
    const minusElement=getByText('-');    
    expect(minusElement).toBeInTheDocument();
    fireEvent.click(minusElement);
    
    const countElement2=getByText('-1');
    expect(countElement2).toBeInTheDocument();
})