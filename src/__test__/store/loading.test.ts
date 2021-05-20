
import React from 'react';

import loading, * as loadingStore from '../../store/loading';

const getRandomObjectKey = (object: Object) => {
    const keys = Object.keys(object);
    return keys[keys.length * Math.random() << 0];
}

it('loading start should change loading state to be true & loading finish makes it false', () => {

    const { initialState } = loadingStore;
    const currentKey = getRandomObjectKey(initialState);

    const expectedResult = {
        type: loadingStore.START_LOADING,
        payload: { ...initialState, [currentKey]: true }
    }
    expect(loadingStore.startLoading({ ...loadingStore.initialState, [currentKey]: true })).toEqual(expectedResult);

    const expectedResult2 = {
        type: loadingStore.FINISH_LOADING,
        payload: { ...initialState, [currentKey]: false }
    }
    expect(loadingStore.finishLoading({ ...loadingStore.initialState, [currentKey]: false })).toEqual(expectedResult2);

})





