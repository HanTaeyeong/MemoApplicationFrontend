import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as authStore from "../../store/auth";
import * as loading from "../../store/loading";

const initialState = {
  authType: "register",
  username: "",
  password: "",
  passwordConfirm: "",
  authorized: false,
  authErrorMessage: 'null',
  checkError: null,
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("auth reducer syncronous test", () => {
  it("register should change auth state", () => {
    const expectedResult = {
      type: authStore.REGISTER,
      payload: { username: "register-username", password: "register-password" },
    };

    expect(
      authStore.register()({
        username: "register-username",
        password: "register-password",
      })
    ).toEqual(expectedResult);
  });

  it("login should change auth state", () => {
    const expectedResult = {
      type: authStore.LOGIN,
      payload: { username: "login-username123", password: "login-password123" },
    };

    expect(
      authStore.login()({
        username: "login-username123",
        password: "login-password123",
      })
    ).toEqual(expectedResult);
  });

  it("should logout initialize auth state", () => {
    const expectedResult = {
      type: authStore.LOGOUT,
      payload: { username: "" },
    };

    expect(authStore.logout()({ username: "" })).toEqual(expectedResult);
  });

  it("changeField should change auth state", () => {
    const expectedResult = {
      type: authStore.CHANGE_FIELD,
      payload: {
        authType: "register",
        username: "hty123",
        password: "qwerty1234",
        passwordConfirm: "qwerty1234",
        authErrorMessage: '',
      },
    };
    expect(
      authStore.changeField({
        authType: "register",
        username: "hty123",
        password: "qwerty1234",
        passwordConfirm: "qwerty1234",
        authErrorMessage: '',
      })
    ).toEqual(expectedResult);
  });
});

describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("registerAsync should invoke startLoading", async () => {
    const store = mockStore({ auth: {} });
    const onLoadingState = [
      { type: authStore.REGISTER },
      {
        payload: authStore.REGISTER,
        type: loading.START_LOADING,
      },
    ];

    const requestValue = {
      username: "gksxodud2721",
      password: "shine1009!",
    };
    store.dispatch(authStore.registerAsync(requestValue));
    expect(store.getActions()).toEqual(onLoadingState);
  });
  it("loginAsync should invoke startLoading", () => {
    const store = mockStore({ auth: {} });

    const onLoadingState = [
      { type: authStore.LOGIN },
      {
        payload: authStore.LOGIN,
        type: loading.START_LOADING,
      },
    ];

    const requestValue = {
      username: "gksxodud2721",
      password: "shine1009!",
    };
    store.dispatch(authStore.loginAsync(requestValue));
    expect(store.getActions()).toEqual(onLoadingState);
  });
  it("checkAsync should invoke startLoading", () => {
    const store = mockStore({ auth: {} });
    const onLoadingState = [
      { type: authStore.CHECK },
      { payload: authStore.CHECK, type: loading.START_LOADING },
    ];

    const requestValue = { username: "gksxodud2721" };

    store.dispatch(authStore.checkAsync(requestValue));
    expect(store.getActions()).toEqual(onLoadingState);
  });
});
