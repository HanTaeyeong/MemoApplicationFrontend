import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";

import PostTemplate from "../../../components/post/PostTemplate";
import { initialState } from "../../../store/write";

const mockPostData = {
  _id: "359fejijd9ef",
  title: "tyty",
  contents: "wanderer",
  lastUpdated: "2021-06-01",
};

const mockInitialState = {
  auth: { username: "HanTaeyeong", authorized: true, loading: {} },
  write: initialState,
  loading: {},
};

const makeStore = configureMockStore([thunk]);

const renderPostTemplate = (store) => {
  return render(
    <Provider store={store}>
      <PostTemplate />
    </Provider>
  );
};

describe("post/PostItem Component test", () => {
  it("PostTemplate render test", async () => {
    const store = makeStore(mockInitialState);
    const postTemplate = renderPostTemplate(store);

    expect(postTemplate).toBeTruthy();

    const postEmptyText = await screen.findByText(/Write a new memo/i);

    expect(postEmptyText.innerHTML).toEqual("Write a new memo...");
  });

  it("PostTemplate New memo button invokes changeWritingField action", () => {
    const store = makeStore(mockInitialState);
    const postTemplate = renderPostTemplate(store);
    const newMemoButton = screen.getByRole("new-memo-button");

    const expectedAction = [
      { type: "write/GET_POST_LIST" },
      { payload: "write/GET_POST_LIST", type: "loading/START_LOADING" },
      {
        payload: { _id: "", contents: "", tags: [], title: "" },
        type: "write/CHANGE_WRITING_FIELD",
      }
    ];

    newMemoButton.click();
    expect(store.getActions()).toEqual(expectedAction);
  });
});
