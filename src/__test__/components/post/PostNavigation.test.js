import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { fireEvent, render, screen } from "@testing-library/react";
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

const makeMockPosts = (n) => {
  const posts = [];
  for (let i = 0; i < n; i++) {
    const _id = "359fejifgjd9ef" + i.toString();
    const title = "tyty" + i.toString();
    const contents = "wanderer" + i.toString();
    const lastUpdate = "2021-06-0" + i.toString();

    posts.push({ _id, title, contents, lastUpdate });
  }
  return posts;
};
const postNumber = 30;
const mockPosts = makeMockPosts(postNumber);
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
      lastPage: 3,
      totalPostCount: mockPosts.length,
    },
  },
  loading: {},
};

const afterClickingNextButtonState = {
  auth: { username: "HanTaeyeong", authorized: true, loading: {} },
  write: {
    ...initialState,
    posts: mockPosts,
    pageState: { page: 2, limit: 10, lastPage: 3, totalPostCount: postNumber },
  },
  loading: {},
};

const pageLimitValues = ["10", "20", "50", "100"];

const makeStore = configureMockStore([thunk]);

const defaultAction = [
  { type: "write/GET_POST_LIST" },
  {
    payload: "write/GET_POST_LIST",
    type: "loading/START_LOADING",
  },
];

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

  it("clicking nextButton without post do not invokes CHANGE_PAGE_STATE", async () => {
    const store = makeStore(mockInitialStateWithoutPosts);
    const postNavigation = renderPostNavigation(store);
    const nextButton = await screen.findByRole("button", { name: "next" });
    const expectedResult = [...defaultAction];
    expect(store.getActions()).toEqual([...defaultAction]);
    nextButton.click();
    expect(store.getActions()).toEqual(expectedResult);
  });

  it("clicking next Button having next Page invokes CHANGE_PAGE_STATE", async () => {
    const store = makeStore(mockInitialStateWithPosts);
    const postNavigation = renderPostNavigation(store);
    const nextButton = await screen.findByRole("button", { name: "next" });
    const expectedResult = [
      ...defaultAction,
      {
        type: "write/CHANGE_PAGE_STATE",
        payload: {
          page: 2,
          limit: 10,
          lastPage: 3,
          totalPostCount: postNumber,
        },
      },
    ];
    expect(store.getActions()).toEqual(defaultAction);

    nextButton.click();

    expect(store.getActions()).toEqual(expectedResult);
  });

  it("clicking before Button & CHANGE_PAGE_STATE", async () => {
    const store = makeStore(afterClickingNextButtonState);
    const postNavigation = renderPostNavigation(store);
    const beforeButton = await screen.findByRole("button", { name: "before" });
    const expectedResult = [
      ...defaultAction,
      {
        type: "write/CHANGE_PAGE_STATE",
        payload: {
          page: 1,
          limit: 10,
          lastPage: 3,
          totalPostCount: postNumber,
        },
      },
    ];
    expect(store.getActions()).toEqual(defaultAction);
    beforeButton.click();
    expect(store.getActions()).toEqual(expectedResult);
  });

  it("Select limit test", async () => {
    const store = makeStore(mockInitialStateWithPosts);
    const postNavigation = renderPostNavigation(store);
    const select = await screen.findByRole("select");
    expect(select.value).toBe("10");

    fireEvent.change(select, {
      target: { value: "20" },
    });

    const expectedResult = [
      ...defaultAction,
      {
        type: "write/CHANGE_PAGE_STATE",
        payload: {
          page: 1,
          limit: 20,
          lastPage: 2,
          totalPostCount: postNumber,
        },
      },
    ];
    expect(store.getActions()).toEqual(expectedResult);
  });
});
