import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";

import WriteTemplate from "../../../components/write/WriteTemplate";
import write, { initialState } from "../../../store/write";

const initialStore = { write: { ...initialState }, loading: {}, auth: {} };

const makeStore = configureMockStore([thunk]);

const renderWriteTemplate = (store) => {
  return render(
    <Provider store={store}>
      <WriteTemplate />
    </Provider>
  );
};

//fireEvent.change(styledInput1, { target: { value: "hty" } });

describe("write/WriteTemplate", () => {
  it("WriteTemplate Render test", () => {
    const store = makeStore(initialStore);
    const writeTemplate = renderWriteTemplate(store);

    const backButton = writeTemplate.getByRole("button", {
      name: "Back to lists",
    });
    const deleteButton = writeTemplate.getByRole("button", { name: "Delete" });
    expect(writeTemplate).toBeTruthy();
    expect(backButton.innerHTML).toEqual(
      '<span class="text">Back to lists</span>'
    );
    expect(deleteButton.innerHTML).toEqual('<span class="text">Delete</span>');

    const titleInput = writeTemplate.getByRole("title-input");

    expect(titleInput).toBeTruthy();

    const themeSwitcher = writeTemplate.getByRole("theme-switcher");
    expect(themeSwitcher).toBeTruthy();
  });

  it("change TitleInput should invoke CHANGE_WRITTING_FIELD", () => {
    const store = makeStore(initialStore);
    const writeTemplate = renderWriteTemplate(store);

    const titleInput = screen.getByRole("title-input");
    fireEvent.change(titleInput, { target: { value: "hty123" } });
    const expectedResult = [
      {
        type: "write/CHANGE_WRITING_FIELD",
        payload: { _id: "", title: "hty123", contents: "", tags: [] },
      },
    ];
    expect(store.getActions()).toEqual(expectedResult);
  });

  it("clicking Go to back Button without title should do nothing", () => {
    const store = makeStore(initialStore);
    renderWriteTemplate(store);

    const backButton = screen.getByRole("button", { name: "Back to lists" });
    backButton.click();
    expect(store.getActions()).toEqual([]);
  });
  it("clicking Go to back Button with title but not _id should write Post", () => {
    const store = makeStore({
      ...initialStore,
      write: { ...initialStore.write, title: "ty-test" },
    });
    renderWriteTemplate(store);

    const backButton = screen.getByRole("button", { name: "Back to lists" });
    backButton.click();
    const expectedResult = [
      { type: "write/WRITE_POST" },
      { payload: "write/WRITE_POST", type: "loading/START_LOADING" },
    ];
    expect(store.getActions()).toEqual(expectedResult);
  });
  it("clicking Go to back Button with title and _id should updatePost", () => {
    const store = makeStore({
      ...initialStore,
      write: { ...initialStore.write, title: "ty-test", _id: "2ejiref39" },
    });
    renderWriteTemplate(store);

    const backButton = screen.getByRole("button", { name: "Back to lists" });
    backButton.click();
    const expectedResult = [
      { type: "write/UPDATE_POST" },
      { payload: "write/UPDATE_POST", type: "loading/START_LOADING" },
    ];

    expect(store.getActions()).toEqual(expectedResult);
  });

  it("clicking Delete Button then, Confirm Button should invoke deletePostAsync", async () => {
    const store = makeStore(initialStore);
    renderWriteTemplate(store);
    const deleteButton = await screen.getByRole("button", { name: "Delete" });
    deleteButton.click();
    const deleteConfirmButton = await screen.getByRole("button", {
      name: "Yes",
    });
    deleteConfirmButton.click();
    const expectedResult = [
      { type: "write/DELETE_POST" },
      { type: "loading/START_LOADING", payload: "write/DELETE_POST" },
    ];
    expect(store.getActions()).toEqual(expectedResult);
  });
});

// describe("post/PostTemplate Component test", () => {
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
//     const postContents = await screen.findByText(/wanderer2/i);
//     expect(postTitle.innerHTML).toEqual("tyty4");
//     expect(postContents.innerHTML).toEqual("wanderer2");
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
// });

// describe("PostItem IntegrateTest", () => {
//   it("onClikPostItem invokes changeWrittingField & move to EdittingPage ", () => {
//     const store = makeStore(mockInitialStateWithPosts);
//     const postTemplate = renderPostTemplate(store);
//     const post1 = screen.getByRole("post-item",{name:'tyty2'});
//     post1.click();

//     const expectedAction = [
//       { type: "write/GET_POST_LIST" },
//       { payload: "write/GET_POST_LIST", type: "loading/START_LOADING" },
//       {
//         payload:{
//           _id: "359fejifgjd9ef",
//           title: "tyty2",
//           contents: "wanderer2",
//           tags:[],
//         },
//         type: "write/CHANGE_WRITING_FIELD",
//       },
//     ];

//     expect(store.getActions()).toEqual(expectedAction);
//   });
// });
