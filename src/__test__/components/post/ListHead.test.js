import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";

import ListHeader from "../../../components/post/ListHeader";

const mockInitialState = {
  auth: { username: "HanTaeyeong", authorized: true, loading: {} },
};

const renderListHeader = (store) => {
  return render(
    <Provider store={store}>
      <ListHeader />
    </Provider>
  );
};

describe("post/ListHeader Component test", () => {
  it("ListHeader component render test", () => {
    const store = configureMockStore([thunk])(mockInitialState);
    const listHeader = renderListHeader(store);
    expect(listHeader).toBeTruthy();
  });

  it("ListHeader Logout Button invokes LogoutAsync action", () => {
    const store = configureMockStore([thunk])(mockInitialState);
    const listHeader = renderListHeader(store);
    const onLogoutAction=[
        { type: 'auth/LOGOUT' },
        { type: 'loading/START_LOADING', payload: 'auth/LOGOUT' }
      ]

    const logoutButton = screen.getByRole("button", {
      name: /Logout/i,
    });
    logoutButton.click();
    expect(store.getActions()).toEqual(onLogoutAction);
  });
});
