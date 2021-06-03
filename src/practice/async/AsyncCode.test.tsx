
import React from 'react';

const fetchData = async () => {
    const data = ['peanut butter', 'sandwitch', 'bread'];
    await delay(100);
    return data;
}

async function delay(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    })
}

test('async function test', async () => {
    const data = await fetchData();
    expect(data).toContain('bread');
})

