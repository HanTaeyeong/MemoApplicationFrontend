import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { render, screen, act, fireEvent } from "@testing-library/react";

import { setItem, getItem } from "../../../lib/localStorageRequest";
import RegisterForm from "../../../containers/auth/RegisterForm";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createBrowserHistory();

const renderRegisterForm = (store) =>
  render(
    <Provider store={store}>
      <Router history={history}>
        <RegisterForm />
      </Router>
    </Provider>
  );

describe("RegisterForm", () => {
  it("RegisterForm render test without", async () => {
    const store = mockStore({ auth: {}, loading: {}, write: {} });
    await renderRegisterForm(store);
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

  it("RegisterForm render test without localstorage username", async () => {
    const store = mockStore({ auth: {}, loading: {}, write: {} });
    await renderRegisterForm(store);
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

  it("StyledInput focus test", async () => {
    const store = mockStore({ auth: {}, loading: {}, write: {} });
    renderRegisterForm(store);

    const styledInput = screen.getByRole("input");
    const styledInput2 = screen.getByRole("input2");
    styledInput2.focus();
    expect(styledInput2).toHaveFocus();
    styledInput.focus();
    expect(styledInput).toHaveFocus();
  });

  it("on authorized state RegisterForm set Localstorage [username]", async () => {
    const store = mockStore({
      auth: { authorized: true, username: "hty", password: "fiejdif42!@" },
      loading: {},
      write: {},
    });

    renderRegisterForm(store);
    const localUsername = await getItem("username");

    expect(localUsername).toEqual("hty");
  });

  it("onChange of ID input invokes onChange Function", () => {
    const store = mockStore({
      auth: { username: "", password: "" },
      loading: {},
      write: {},
    });
    renderRegisterForm(store);
    const styledInput1 = screen.getByRole("input");
    fireEvent.change(styledInput1, { target: { value: "hty" } });
    expect(styledInput1).toHaveValue("hty");

    const expectedResult = [
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

  it("onSubmit test at RegisterForm with invalid ID error message test", () => {
    const store = mockStore({
      auth: { username: "htgfdfe2y!", password: "532fd" },
      loading: {},
      write: {},
    });
    renderRegisterForm(store);

    const registerButton = screen.getByRole("button", { name: "Register" });
    registerButton.click();
    const expectedResult = [
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

      {
        type: "auth/CHANGE_FIELD",
        payload: {
          authType: undefined,
          username: "htgfdfe2y!",
          password: "532fd",
          passwordConfirm: undefined,
          authErrorMessage: "[ID] ID should consists of number and alphabet (4 ~ 16).",
        },
      },
    ];

    expect(store.getActions()).toEqual(expectedResult);
  });

  it("onSubmit test at RegisterForm with invalid password error message test", () => {
    const store = mockStore({
      auth: { username: "htgfdfe2y", password: "532fd" },
      loading: {},
      write: {},
    });
    renderRegisterForm(store);

    const registerButton = screen.getByRole("button", { name: "Register" });
    registerButton.click();
    const expectedResult = [
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

      {
        type: "auth/CHANGE_FIELD",
        payload: {
          authType: undefined,
          username: "htgfdfe2y",
          password: "532fd",
          passwordConfirm: undefined,
          authErrorMessage: "[PW] Password with at least 1 number, 1 alphabet, 1 special character! (8~32).",
        },
      },
    ];

    expect(store.getActions()).toEqual(expectedResult);
  });

  it("onSubmit test at RegisterForm with username & different Password should invoke not same error", () => {
    const store = mockStore({
      auth: {
        username: "htgfdfe2y",
        password: "dsfei22fh!",
        passwordConfirm: "ffi2fh",
      },
      loading: {},
      write: {},
    });
    renderRegisterForm(store);

    const registerButton = screen.getByRole("button", { name: "Register" });
    registerButton.click();
    const expectedResult = [
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
      {
        type: "auth/CHANGE_FIELD",
        payload: {
          authType: undefined,
          username: "htgfdfe2y",
          password: "dsfei22fh!",
          passwordConfirm: "ffi2fh",
          authErrorMessage: "[PW] Passwords are not same.",
        },
      },
    ];

    expect(store.getActions()).toEqual(expectedResult);
  });

  it("onSubmit test at RegisterForm with username & same Password should invoke Register", () => {
    const store = mockStore({
      auth: {
        username: "htgfdfe2y",
        password: "dsfei2fh!",
        passwordConfirm: "dsfei2fh!",
      },
      loading: {},
      write: {},
    });
    renderRegisterForm(store);

    const registerButton = screen.getByRole("button", { name: "Register" });
    registerButton.click();
    const expectedResult = [
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
      { type: "auth/REGISTER" },
      { type: "loading/START_LOADING", payload: "auth/REGISTER" },
    ];

    expect(store.getActions()).toEqual(expectedResult);
  });
});
