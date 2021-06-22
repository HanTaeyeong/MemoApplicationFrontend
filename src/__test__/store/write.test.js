import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as writeStore from "../../store/write";
import * as loading from "../../store/loading";

import write from "../../store/write";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = writeStore.initialState;
const makeMockPosts = (n) => {
  const posts = [];
  for (let i = 0; i < n; i++) {
    const _id = "35ddejifgjd9ef" + i.toString();
    const title = "tywty" + i.toString();
    const contents = "wagnderer" + i.toString();
    const lastUpdate = "2021-06-0" + i.toString();

    posts.push({ _doc: { _id, title, contents, lastUpdate } });
  }
  return posts;
};
const postNumber = 10;
const mockPosts = makeMockPosts(postNumber);

const writeHandlers = [
  "write/WRITE_POST_SUCCESS",
  "write/WRITE_POST_FAILURE",
  "write/UPDATE_POST_SUCCESS",
  "write/UPDATE_POST_FAILURE",
  "write/DELETE_POST_SUCCESS",
  "write/DELETE_POST_FAILURE",
];

const writeHandlerTestDataSet = writeHandlers.map((message,index) => ({
  index,
  message,
}));

describe("write store handlers test", () => {
  test.each(writeHandlerTestDataSet)("%s handler test", ({index,message}) => {
    const currentAction = writeHandlers[index];
    const currentHandler = write.handlers[currentAction];
    const isSuccess = currentAction.slice(-7) === "SUCCESS";
    const expectedResult = { ...initialState, postError: !isSuccess };
    expect(currentHandler(initialState)).toEqual(expectedResult);
  });
  it('write/INITIALIZE_WRITE',()=>{
    const handler = write.handlers['write/INITIALIZE_WRITE'];
    const action={

    }
    const expectedResult={...initialState}
    expect(handler(initialState,action)).toEqual({...initialState});
  })
  it("write/CHANGE_WRITING_FIELD", () => {
    const handler = write.handlers["write/CHANGE_WRITING_FIELD"];

    const action = {
      payload: {
        _id: "3fjijde9f3jifeE",
        title: "mytest",
        contents: "eifjd",
        tags: [],
      },
    };
    const expectedResult = { ...initialState, ...action.payload };
    expect(handler(initialState, action)).toEqual(expectedResult);
  });

  it("write/CHANGE_PAGE_STATE", () => {
    const handler = write.handlers["write/CHANGE_PAGE_STATE"];
    const action = {
      payload: { page: 1, limit: 20, lastPage: 5, totalPostCount: 100 },
    };
    const expectedResult = {
      ...initialState,
      pageState: { ...action.payload },
    };
    expect(handler(initialState, action)).toEqual(expectedResult);
  });

  it("write/GET_POST_LIST_SUCCESS", () => {
    const handler = write.handlers["write/GET_POST_LIST_SUCCESS"];
    const action = {
      payload: {
        posts: mockPosts,
        lastPage: 2,
        totalPostCount: mockPosts.length,
      },
    };
    const expectedResult = {
      ...initialState,
      pageState: {
        ...initialState.pageState,
        lastPage: 2,
        totalPostCount: mockPosts.length,
      },
      posts: mockPosts.map((post) => post._doc),
      postError: false,
    };
    expect(handler(initialState, action)).toEqual(expectedResult);
  });

  it("write/GET_POST_LIST_FAILURE", () => {
    const handler = write.handlers["write/GET_POST_LIST_FAILURE"];
    const expectedResult = { ...initialState, postError: true };

    expect(handler(initialState)).toEqual(expectedResult);
  });
});

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
