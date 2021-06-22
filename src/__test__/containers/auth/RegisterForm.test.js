import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { render, screen, act, fireEvent } from "@testing-library/react";

import { getItem } from "../../../lib/localStorageRequest";
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
        "type": "auth/INITIALIZE_AUTH",
      },
    ];

    expect(store.getActions()).toEqual(expectResult);
  });

  it("RegisterForm render test without localstorage username", async () => {
    const store = mockStore({ auth: {}, loading: {}, write: {} });
    await renderRegisterForm(store);
    const expectResult = [
      {
        type: "auth/INITIALIZE_AUTH"
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
        type: "auth/INITIALIZE_AUTH"
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
});

//initialState message expectedResult
const defaultAction = {
  type: "auth/INITIALIZE_AUTH"
};

const onSubmitTestDatas = [
  {
    message: "RegisterForm with invalid ID error message test",
    initialAuth: { username: "htgfdfe2y!", password: "532fd" },
    expectedResult: [
      defaultAction,
      {
        type: "auth/CHANGE_FIELD",
        payload: {
          authType: undefined,
          username: "htgfdfe2y!",
          password: "532fd",
          passwordConfirm: undefined,
          authErrorMessage:
            "[ID] ID should consists of number and alphabet (4 ~ 16).",
        },
      },
    ],
  },

  {
    message: "with invalid password error message test",
    initialAuth: { username: "htgfdfe2y", password: "532fd" },
    expectedResult: [
      defaultAction,
      {
        type: "auth/CHANGE_FIELD",
        payload: {
          authType: undefined,
          username: "htgfdfe2y",
          password: "532fd",
          passwordConfirm: undefined,
          authErrorMessage:
            "[PW] Password with at least 1 number, 1 alphabet, 1 special character! (8~32).",
        },
      },
    ],
  },

  {
    message: "with username & different Password should invoke not same error",
    initialAuth: {
      username: "htgfdfe2y",
      password: "dsfei22fh!",
      passwordConfirm: "ffi2fh",
    },
    expectedResult: [
      defaultAction,
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
    ],
  },

  {
    message: "with username & same Password should invoke Register",
    initialAuth: {
      username: "htgfdfe2y",
      password: "dsfei2fh!",
      passwordConfirm: "dsfei2fh!",
    },
    expectedResult: [
      defaultAction,
      { type: "auth/REGISTER" },
      { type: "loading/START_LOADING", payload: "auth/REGISTER" },
    ],
  },

   {
    message: "with username & same Password should invoke Register",
    initialAuth: {
      username: "htgfdfe2y",
      password: "dsfei2fh!",
      passwordConfirm: "dsfei2fh!",
    },
    expectedResult: [
      defaultAction,
      { type: "auth/REGISTER" },
      { type: "loading/START_LOADING", payload: "auth/REGISTER" },
    ],
  },
];

describe("onSubmit test", () => {
  test.each(onSubmitTestDatas)(
    "%s",
    ({ message, initialAuth, expectedResult }) => {
      const store = mockStore({
        auth: initialAuth,
        loading: {},
        write: {},
      });
      renderRegisterForm(store);

      const registerButton = screen.getByRole("button", { name: "Register" });
      registerButton.click();

      expect(store.getActions()).toEqual(expectedResult);
    }
  );
});
