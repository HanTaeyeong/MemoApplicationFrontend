import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as writeStore from "../../store/write";
import * as loading from "../../store/loading";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

  it("deletePost should distpatch correctly", () => {
    const mockData = {
      _id: "gjfjije",
    };
    const expectedResult = {
      type: writeStore.DELETE_POST,
      payload: mockData,
    };
    expect(writeStore.deletePost()(mockData)).toEqual(expectedResult);
  });
});

describe("write reducer async test", () => {
  afterEach(() => {
    fetchMock.restore();
    fetchMock.reset();
  });
  it("writePostAysync should invoke START_LOADING action", () => {
    const store = mockStore({ write: {} });
    const onLoadingState = [
      { type: writeStore.WRITE_POST },
      {
        payload: writeStore.WRITE_POST,
        type: loading.START_LOADING,
      },
    ];

    const requestValue = {
      title: "writePostAsync title",
      contents: "writePostAsync contents",
      tags: [],
    };

    store.dispatch(writeStore.writePostAsync(requestValue));
    expect(store.getActions()).toEqual(onLoadingState);
  });
  it("updatePostAsync should invoke START_LOADING", () => {
    const store = mockStore({ write: {} });
    const onLoadingState = [
      {
        type: writeStore.UPDATE_POST,
      },
      {
        payload: writeStore.UPDATE_POST,
        type: loading.START_LOADING,
      },
    ];

    const requestValue = {
      _id: "wierjf",
      title: "updatePost title",
      constents: "updatePost constents",
    };
    store.dispatch(writeStore.updatePostAsync(requestValue));
    expect(store.getActions()).toEqual(onLoadingState);
  });

  it("deletePostAsync should invoke START_LOADING", () => {
    const store = mockStore({ write: {} });
    const onLoadingState = [
      { type: writeStore.DELETE_POST },
      { payload: writeStore.DELETE_POST, type: loading.START_LOADING },
    ];
    const requestValue = {
      _id: "eifjdkef",
    };
    store.dispatch(writeStore.deletePostAsync(requestValue));
    expect(store.getActions()).toEqual(onLoadingState);
  });
});
