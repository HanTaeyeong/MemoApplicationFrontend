import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import * as authStore from "../../store/auth";
import auth from "../../store/auth";
import * as loading from "../../store/loading";

import ErrorCodes from "../../lib/ErrorCodes";

const initialState = authStore.initialState;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("auth handlers test", () => {
  it("auth/CHANGE_FIELD test", () => {
    const authFunction = auth.handlers["auth/CHANGE_FIELD"];
    const action = {
      payload: {
        authType: "login",
        username: "hty",
        password: "fedjf1010!",
        passwordConfirm: "fedjf1010!",
        authErrorMessage: "",
      },
    };
    const expectedResult = {
      ...initialState,
      ...action.payload,
    };
    expect(authFunction(initialState, action)).toEqual(expectedResult);
  });

  it("auth/INITIALIZE_FORM test", () => {
    const authFunction = auth.handlers["auth/INITIALIZE_FORM"];
    const expectedResult = initialState;
    expect(authFunction(initialState)).toEqual(expectedResult);
  });

  it("auth/REGISTER_SUCCESS test", () => {
    const authFunction = auth.handlers["auth/REGISTER_SUCCESS"];
    const expectedResult = {
      ...initialState,
      authorized: true,
      authErrorMessage: "",
    };
    expect(authFunction(initialState)).toEqual(expectedResult);
  });

  it("auth/REGISTER_FAILURE test", () => {
    const authFunction = auth.handlers["auth/REGISTER_FAILURE"];
    let errorCode = 0;
    let errorMessage = "";
    for (const ec in ErrorCodes) {
      errorCode = ec;
      errorMessage = ErrorCodes[ec];
      if (Math.random() > 0.7) break;
    }
    const expectedResult = {
      ...initialState,
      authorized: false,
      authErrorMessage: errorMessage,
    };

    const action = {
      payload: { error: { message: "REGISTER ERROR!" + errorCode.toString() } },
    };
    expect(authFunction(initialState, action)).toEqual(expectedResult);
  });

  it("auth/LOGIN_SUCCESS test", () => {
    const authFunction = auth.handlers["auth/LOGIN_SUCCESS"];
    const expectedResult = {
      ...initialState,
      authorized: true,
      authErrorMessage: "",
    };
    expect(authFunction(initialState)).toEqual(expectedResult);
  });

  it("auth/LOGIN_FAILURE test", () => {
    const authFunction = auth.handlers["auth/LOGIN_FAILURE"];
    let errorCode = 0;
    let errorMessage = "";
    for (const ec in ErrorCodes) {
      errorCode = ec;
      errorMessage = ErrorCodes[ec];
      if (Math.random() > 0.7) break;
    }
    const expectedResult = {
      ...initialState,
      authorized: false,
      authErrorMessage: errorMessage,
    };

    const action = {
      payload: { error: { message: "LOGIN ERROR!" + errorCode.toString() } },
    };
    expect(authFunction(initialState, action)).toEqual(expectedResult);
  });

  it("auth/CHECK_SUCCESS test", () => {
    const authFunction = auth.handlers["auth/CHECK_SUCCESS"];
    const expectedResult = {
      ...initialState,
      authorized: true,
      checkError: false,
    };
    expect(authFunction(initialState)).toEqual(expectedResult);
  });

  it("auth/CHECK_FAILURE test", () => {
    const authFunction = auth.handlers["auth/CHECK_FAILURE"];

    const action = { payload: { error: "check failure" } };

    const expectedResult = {
      ...initialState,
      checkError: { error: "check failure" },
    };
    expect(authFunction(initialState, action)).toEqual(expectedResult);
  });

  it("auth/LOGOUT_SUCCESS", () => {
    const authFunction = auth.handlers["auth/LOGOUT_SUCCESS"];
    const expectedResult = {
      ...initialState,
    };
    expect(
      authFunction({
        authType: "login",
        username: "hty",
        password: "fedjf1010!",
        passwordConfirm: "fedjf1010!",
        authErrorMessage: "",
      })
    ).toEqual(expectedResult);
  });
  it("auth/LOGOUT_FAILURE", () => {
    const authFunction = auth.handlers["auth/LOGOUT_FAILURE"];
    const expectedResult = {
      ...initialState,
    };
    expect(
      authFunction({
        authType: "login",
        username: "hty",
        password: "fedjf1010!",
        passwordConfirm: "fedjf1010!",
        authErrorMessage: "",
      })
    ).toEqual(expectedResult);
  });
});

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
        authErrorMessage: "",
      },
    };
    expect(
      authStore.changeField({
        authType: "register",
        username: "hty123",
        password: "qwerty1234",
        passwordConfirm: "qwerty1234",
        authErrorMessage: "",
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
