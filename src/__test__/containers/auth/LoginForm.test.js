import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import 'jest-styled-components';



import { render, screen, act, fireEvent } from "@testing-library/react";

import { setItem, getItem } from "../../../lib/localStorageRequest";
import LoginForm from "../../../containers/auth/LoginForm";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createBrowserHistory();

const renderLoginForm = (store) =>
  render(
    <Provider store={store}>
      <Router history={history}>
        <LoginForm />
      </Router>
    </Provider>
  );

describe("LoginForm", () => {
  it("LoginForm render test with localstorage username", async () => {
    await setItem("username", "wanderertyty123");
    const store = mockStore({ auth: {}, loading: {}, write: {} });
    await renderLoginForm(store);
    const expectResult = [
      {
        type: "auth/CHANGE_FIELD",
        payload: {
          authType: undefined,
          username: undefined,
          password: undefined,
          passwordConfirm: undefined,
          authErrorMessage: "",
        },
      },
      { type: "auth/CHECK" },
      { type: "loading/START_LOADING", payload: "auth/CHECK" },
    ];

    expect(store.getActions()).toEqual(expectResult);
    await setItem("username", "");
  });

  it("LoginForm render test without localstorage username", async () => {
    const store = mockStore({ auth: {}, loading: {}, write: {} });
    await renderLoginForm(store);
    const expectResult = [
      {
        type: "auth/CHANGE_FIELD",
        payload: {
          authType: undefined,
          username: undefined,
          password: undefined,
          passwordConfirm: undefined,
          authErrorMessage: "",
        },
      },
    ];

    expect(store.getActions()).toEqual(expectResult);
  });

  it('StyledInput focus test', async () => {
    const store = mockStore({ auth: {}, loading: {}, write: {} });
    renderLoginForm(store);

    const styledInput = screen.getByRole('input');
    const styledInput2 = screen.getByRole('input2');
    styledInput2.focus();
    expect(styledInput2).toHaveFocus();
    styledInput.focus();
    expect(styledInput).toHaveFocus();
  })

});
