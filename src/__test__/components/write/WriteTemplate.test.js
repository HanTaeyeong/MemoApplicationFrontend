import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";

import WriteTemplate from "../../../components/write/WriteTemplate";
import write, { initialState } from "../../../store/write";

const initialStore = { auth: {}, write: {}, loading: {} }

const makeStore = configureMockStore([thunk]);

const renderWriteTemplate = (store) => {
  return render(
    <Provider store={store}>
      <WriteTemplate />
    </Provider>
  );
};

describe('write/WriteTemplate', () => {

  it('WriteTemplate Render test', () => {
    const store = makeStore(initialStore)
    const writeTemplate = renderWriteTemplate(store);

    const backButton = writeTemplate.getByRole('button', { name: 'Back to lists' })
    const deleteButton = writeTemplate.getByRole('button', { name: 'Delete' })
    expect(writeTemplate).toBeTruthy();
    expect(backButton.innerHTML).toEqual('<span class=\"text\">Back to lists</span>');
    expect(deleteButton.innerHTML).toEqual("<span class=\"text\">Delete</span>");

    const titleInput = writeTemplate.getByRole('title-input');

    expect(titleInput).toBeTruthy();

    const themeSwitcher = writeTemplate.getByRole('theme-switcher')
    expect(themeSwitcher).toBeTruthy();
  })

  // it('clicking Go to back Button without _id should writePost',()=>{
  //   const store=makeStore(initialStore)
  //   const writeTemplate=renderWriteTemplate(store);
    
  //   const backButton = screen.getByRole('button',{name:'Back to lists'});
    
  //   console.log(store.getActions())
  //   backButton.click();
    
  //   console.log(store.getActions())

  //   expect(1).toBe(1);
  // })

})


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
