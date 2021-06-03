import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";

import PostNavigation from "../../../components/post/PostNavigation";
import { initialState } from "../../../store/write";

const mockPostData = {
  _id: "1359fejijd9ef",
  title: "tyty",
  contents: "wanderer",
  lastUpdated: "2021-06-01",
};

const mockPosts = [
  {
    _id: "359fejifgjd9ef",
    title: "tyty2",
    contents: "wanderer2",
    lastUpdated: "2021-06-03",
  },
  {
    _id: "359fesjijd9ef",
    title: "tyty3",
    contents: "wanderer3",
    lastUpdated: "2021-06-04",
  },
  {
    _id: "359fdfejijd9ef",
    title: "tyty4",
    contents: "wanderer4",
    lastUpdated: "2021-06-05",
  },
  {
    _id: "359fejifgjd9ef",
    title: "tyty2",
    contents: "wanderer2",
    lastUpdated: "2021-06-03",
  },
  {
    _id: "359fesjijd9ef",
    title: "tyty3",
    contents: "wanderer3",
    lastUpdated: "2021-06-04",
  },
  {
    _id: "359fdfejijd9ef",
    title: "tyty4",
    contents: "wanderer4",
    lastUpdated: "2021-06-05",
  },
  {
    _id: "359fejifgjd9ef",
    title: "tyty2",
    contents: "wanderer2",
    lastUpdated: "2021-06-03",
  },
  {
    _id: "359fesjijd9ef",
    title: "tyty3",
    contents: "wanderer3",
    lastUpdated: "2021-06-04",
  },
  {
    _id: "359fdfejijd9ef",
    title: "tyty4",
    contents: "wanderer4",
    lastUpdated: "2021-06-05",
  },
  {
    _id: "359fejifgjd9ef",
    title: "tyty2",
    contents: "wanderer2",
    lastUpdated: "2021-06-03",
  },
  {
    _id: "359fesjijd9ef",
    title: "tyty3",
    contents: "wanderer3",
    lastUpdated: "2021-06-04",
  },
  {
    _id: "359fdfejijd9ef",
    title: "tyty4",
    contents: "wanderer4",
    lastUpdated: "2021-06-05",
  },
  {
    _id: "359fejifgjd9ef",
    title: "tyty2",
    contents: "wanderer2",
    lastUpdated: "2021-06-03",
  },
  {
    _id: "359fesjijd9ef",
    title: "tyty3",
    contents: "wanderer3",
    lastUpdated: "2021-06-04",
  },
  {
    _id: "359fdfejijd9ef",
    title: "tyty4",
    contents: "wanderer4",
    lastUpdated: "2021-06-05",
  },
  {
    _id: "359fejifgjd9ef",
    title: "tyty2",
    contents: "wanderer2",
    lastUpdated: "2021-06-03",
  },
  {
    _id: "359fesjijd9ef",
    title: "tyty3",
    contents: "wanderer3",
    lastUpdated: "2021-06-04",
  },
  {
    _id: "359fdfejijd9ef",
    title: "tyty4",
    contents: "wanderer4",
    lastUpdated: "2021-06-05",
  },
];

const mockInitialStateWithoutPosts = {
  auth: { username: "HanTaeyeong", authorized: true, loading: {} },
  write: initialState,
  loading: {},
};

const mockInitialStateWithPosts = {
  auth: { username: "HanTaeyeong", authorized: true, loading: {} },
  write: {
    ...initialState,
    posts: mockPosts,
    pageState: {
      ...initialState.pageState,
      lastPage: 2,
      totalPostCount: mockPosts.length,
    },
  },
  loading: {},
};

const makeStore = configureMockStore([thunk]);

const renderPostNavigation = (store) => {
  return render(
    <Provider store={store}>
      <PostNavigation />
    </Provider>
  );
};

describe("post/PostNavigation test", () => {
  it("PostNavigation Render test", () => {
    const store = makeStore(mockInitialStateWithPosts);
    const postNavigation = renderPostNavigation(store);
    expect(postNavigation).toBeTruthy();
  });  

  it('clicking nextButton without post do not invokes CHANGE_PAGE_STATE',async()=>{
    const store = makeStore(mockInitialStateWithoutPosts);
    const postNavigation = renderPostNavigation(store);
    const nextButton = await screen.findByRole("button", { name: "next" });
    const expectedResult = [ ];
    expect(store.getActions()).toEqual([]);

    nextButton.click();

    expect(store.getActions()).toEqual(expectedResult);
  })

  it("clicking next Button having next Page invokes CHANGE_PAGE_STATE", async () => {
    const store = makeStore(mockInitialStateWithPosts);
    const postNavigation = renderPostNavigation(store);
    const nextButton = await screen.findByRole("button", { name: "next" });
    const expectedResult = [
      {
        type: "write/CHANGE_PAGE_STATE",
        payload: { page: 2, limit: 10, lastPage: 2, totalPostCount: 18 },
      },
    ];
    expect(store.getActions()).toEqual([]);

    nextButton.click();

    expect(store.getActions()).toEqual(expectedResult);
  });

  // it('Clicking before Button does nothing',()=>{

  // })

  //   it("PostTemplate wihout postList render test", async () => {
  //     const store = makeStore(mockInitialStateWithoutPosts);
  //     const postTemplate = renderPostTemplate(store);

  //     expect(postTemplate).toBeTruthy();

  //     const postEmptyText = await screen.findByText(/Write a new memo/i);

  //     expect(postEmptyText.innerHTML).toEqual("Write a new memo...");
  //   });

  //   it("PostTemplate with postLists render Test", async () => {
  //     const store = makeStore(mockInitialStateWithPosts);
  //     const postTemplate = renderPostTemplate(store);

  //     expect(postTemplate).toBeTruthy();

  //     const postTitle = await screen.findByText(/tyty4/i);
  //     const postContents= await screen.findByText(/wanderer2/i);
  //     expect(postTitle.innerHTML).toEqual("tyty4");
  //     expect(postContents.innerHTML).toEqual('wanderer2');
  //   });

  //   it("PostTemplate New memo button invokes changeWritingField action", () => {
  //     const store = makeStore(mockInitialStateWithoutPosts);
  //     const postTemplate = renderPostTemplate(store);
  //     const newMemoButton = screen.getByRole("new-memo-button");

  //     const expectedAction = [
  //       { type: "write/GET_POST_LIST" },
  //       { payload: "write/GET_POST_LIST", type: "loading/START_LOADING" },
  //       {
  //         payload: { _id: "", contents: "", tags: [], title: "" },
  //         type: "write/CHANGE_WRITING_FIELD",
  //       },
  //     ];

  //     newMemoButton.click();
  //     expect(store.getActions()).toEqual(expectedAction);
  //   });
});
