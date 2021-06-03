import { Provider } from "react-redux";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";

import PostItem from "../../../components/post/PostItem";

const mockInitialState = {
  auth: { username: "HanTaeyeong", authorized: true, loading: {} },
  write: { posts: [], pageState: {} },
  loading: {},
};


const mockPostData = {
  _id: "359fejijd9ef",
  title: "tyty",
  contents: "wanderer",
  lastUpdated: "2021-06-01",
};

const store = configureMockStore([])(mockInitialState);
const renderPostItem = (post, fn) => {
  return render(
    <Provider store={store}>
      <PostItem post={post} onClickItem={fn} />
    </Provider>
  );
};

describe("post/PostItem Component test", () => {
  it("PostItem render test", () => {
    const fn = jest.fn();
    const postItem = renderPostItem(mockPostData, fn);
    const { _id, title, contents, lastUpdated } = mockPostData;

    expect(postItem).toBeTruthy();
    expect(screen.getByText(title).innerHTML).toBe(title);
    expect(screen.getByText(contents).innerHTML).toBe(contents);
    expect(screen.getByText(lastUpdated).innerHTML).toBe(lastUpdated);
  });

  it("PostItem onClickItem works well", () => {
    const fn = jest.fn();
    renderPostItem(mockPostData, fn);
    const postItem = document.getElementById("359fejijd9ef");

    postItem.click();
    expect(fn).toBeCalledTimes(1);
  });
});
