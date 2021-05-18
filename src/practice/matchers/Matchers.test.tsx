import React from 'react';

test("two plus one is three", () => {
    expect(2 + 1).toBe(3);
})

test("object assignment", () => {
    interface DataType {
        [index: string]: number;
    };

    const data: DataType = { one: 1 };
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
})

test("adding positive numbers is not zero", () => {
    for (let i = 1; i < 10; i++) {
        for (let j = 1; j < 10; j++) {
            expect(i + j).not.toBe(0);
        }
    }
})

test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
})

test('zero', () => {
    const z = 0;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).not.toBeTruthy();
    expect(z).toBeFalsy();
})

test('two plus three', () => {
    const value = 2 + 3;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(5);
    expect(value).toBeLessThan(6);

    expect(value).toBe(5);
    expect(value).toEqual(5);
})

test('adding two float numbers', () => {
    const value = 0.1 + 0.2;
    // Expected precision:    2
    // Expected difference: < 0.005
    expect(value).toBeCloseTo(0.2995);
})

test("there is 'stop' in Christoph", () => {
    expect('Christop').toMatch(/stop/);
})

const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'beer'
]

test('the shopping list has beer on it', ()=>{
    expect(shoppingList).toContain('beer');
    expect(new Set(shoppingList)).toContain('beer')
})

function compileAndroidCode(){
    throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected',()=>{
    expect(()=> compileAndroidCode()).toThrow();
    expect(()=>compileAndroidCode()).toThrow(Error);
    
    expect(()=>compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(()=>compileAndroidCode()).toThrow(/JDK/);
})






