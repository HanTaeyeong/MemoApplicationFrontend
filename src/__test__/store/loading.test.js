
import loading, * as loadingStore from '../../store/loading';

const initialState=loadingStore.initialState;
const testCases=[]
for(const key in loadingStore.initialState){
    testCases.push(key)
}

describe('loading test',()=>{
    test.each(testCases)('loading test for each of element',(key)=>{
    const expectedResult = {
        type: loadingStore.START_LOADING,
        payload: { ...initialState, [key]: true }
    }
    expect(loadingStore.startLoading({ ...loadingStore.initialState, [key]: true })).toEqual(expectedResult);

    const expectedResult2 = {
        type: loadingStore.FINISH_LOADING,
        payload: { ...initialState, [key]: false }
    }
    expect(loadingStore.finishLoading({ ...loadingStore.initialState, [key]: false })).toEqual(expectedResult2);
    })

    it('loading handler START_LOADING test',()=>{
        const startLoading=loading.handlers['loading/START_LOADING'];
        const initialStateOfStartLoading={loading:{'auth/LOGIN':false}};
        const action={payload:'auth/LOGIN'};
        const expectedResult={...initialStateOfStartLoading, [action.payload]:true}
        expect(startLoading(initialStateOfStartLoading,action)).toEqual(expectedResult);
    })

    it('loading handler FINISH_LOADING test',()=>{
        const finishLoading=loading.handlers['loading/FINISH_LOADING'];
        const initialStateOfFinishLoading={loading:{'write/GET_POST_LIST':true}};
        const action={payload:'write/GET_POST_LIST'};
        const expectedResult={...initialStateOfFinishLoading,[action.payload]:false};
        expect(finishLoading(initialStateOfFinishLoading,action)).toEqual(expectedResult);
    })
})
