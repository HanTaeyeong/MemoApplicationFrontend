import write, * as writeStore from '../../store/write';

it('changeWritingField should work',()=>{
    const {initialState}=writeStore;
    
    const mockData={
        _id:'gjiejfd',
        title:'test changeWritingFiled',
        contents:'test write reducer chainge writting field',
        tags:[]
    }

    const expectedResult={
        type:writeStore.CHANGE_WRITING_FIELD,
        payload:mockData
    }
    expect(writeStore.changeWritingField(mockData)).toEqual(expectedResult);
})



