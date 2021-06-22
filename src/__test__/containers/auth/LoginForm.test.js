import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

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
        type: "auth/INITIALIZE_AUTH",
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
        type: "auth/INITIALIZE_AUTH",
      },
    ];

    expect(store.getActions()).toEqual(expectResult);
  });

  it("StyledInput focus test", async () => {
    const store = mockStore({ auth: {}, loading: {}, write: {} });
    renderLoginForm(store);

    const styledInput = screen.getByRole("input");
    const styledInput2 = screen.getByRole("input2");
    styledInput2.focus();
    expect(styledInput2).toHaveFocus();
    styledInput.focus();
    expect(styledInput).toHaveFocus();
  });

  it("on authorized state LoginForm set Localstorage [username]", async () => {
    const store = mockStore({
      auth: { authorized: true, username: "hty", password: "fiejdif42!@" },
      loading: {},
      write: {},
    });

    renderLoginForm(store);
    const localUsername = await getItem("username");

    expect(localUsername).toEqual("hty");
  });

  it("onChange of ID input invokes onChange Function", () => {
    const store = mockStore({
      auth: { username: "", password: "" },
      loading: {},
      write: {},
    });
    renderLoginForm(store);
    const styledInput1 = screen.getByRole("input");
    fireEvent.change(styledInput1, { target: { value: "hty" } });
    expect(styledInput1).toHaveValue("hty");

    const expectedResult = [
      {
        type: "auth/INITIALIZE_AUTH",
      },
      { type: "auth/CHECK" },
      { type: "loading/START_LOADING", payload: "auth/CHECK" },
      {
        type: "auth/CHANGE_FIELD",
        payload: {
          authType: undefined,
          username: "hty",
          password: "",
          passwordConfirm: undefined,
          authErrorMessage: undefined,
        },
      },
    ];

    expect(store.getActions()).toEqual(expectedResult);
  });

  it("onSubmit test at LoginForm with username error message test", () => {
    const store = mockStore({
      auth: { username: "htgfdfe2y", password: "" },
      loading: {},
      write: {},
    });
    renderLoginForm(store);

    const loginButton = screen.getByRole("button", { name: "Login" });
    loginButton.click();
    const expectedResult = [
      {
        type: "auth/INITIALIZE_AUTH",
      },
      { type: "auth/CHECK" },
      { type: "loading/START_LOADING", payload: "auth/CHECK" },
      {
        type: "auth/CHANGE_FIELD",
        payload: {
          authType: undefined,
          username: "htgfdfe2y",
          password: "",
          passwordConfirm: undefined,
          authErrorMessage:
            "[PW] Password with at least 1 number, 1 alphabet, 1 special character! (8~32).",
        },
      },
    ];

    expect(store.getActions()).toEqual(expectedResult);
  });

  it("onSubmit test at LoginForm with username & password invokes loginAttempt correctly", () => {
    const store = mockStore({
      auth: { username: "htgfdfe2y", password: "dsfei2fh!" },
      loading: {},
      write: {},
    });
    renderLoginForm(store);

    const loginButton = screen.getByRole("button", { name: "Login" });
    loginButton.click();
    const expectedResult = [
      {
        type: "auth/INITIALIZE_AUTH",
      },
      { type: "auth/CHECK" },
      { type: "loading/START_LOADING", payload: "auth/CHECK" },
      { type: "auth/LOGIN" },
      { type: "loading/START_LOADING", payload: "auth/LOGIN" },
    ];

    expect(store.getActions()).toEqual(expectedResult);
  });
});
