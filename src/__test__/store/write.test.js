import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as writeStore from "../../store/write";
import * as loading from "../../store/loading";

describe("write reducer syncronous test", () => {
  it("changeWritingField should change write store state", () => {
    const mockData = {
      _id: "gjiejfd",
      title: "test changeWritingFiled",
      contents: "test write reducer chainge writting field",
      tags: [],
    };

    const expectedResult = {
      type: writeStore.CHANGE_WRITING_FIELD,
      payload: mockData,
    };
    expect(writeStore.changeWritingField(mockData)).toEqual(expectedResult);
  });

  it("writePost should dispatch correctly", () => {
    const mockData = {
      title: "test changeWritingFiled",
      contents: "test write reducer chainge writting field",
      tags: [],
    };

    const expectedResult = {
      type: writeStore.WRITE_POST,
      payload: mockData,
    };
    expect(writeStore.writePost()(mockData)).toEqual(expectedResult);
  });

  it("update Post should dispatch correctly", () => {
    const mockData = {
      _id: "gjiejfd",
      title: "test changeWritingFiled",
      contents: "test write reducer chainge writting field",
    };

    const expectedResult = {
      type: writeStore.UPDATE_POST,
      payload: mockData,
    };

    expect(writeStore.updatePost()(mockData)).toEqual(expectedResult);
  });

  it('deletePost should distpatch correctly',()=>{
      const mockData={
          _id:'gjfjije'
      }
      const expectedResult={
          type:writeStore.DELETE_POST,
          payload:mockData
      }
      expect(writeStore.deletePost()(mockData)).toEqual(expectedResult);
  })
});

describe("write reducer async test", () => {});
