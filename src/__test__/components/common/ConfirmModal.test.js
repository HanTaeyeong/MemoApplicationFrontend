import { Provider } from "react-redux";

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import configureMockStore from "redux-mock-store";

import ConfirmModal from "../../../components/common/ConfirmModal";

const store = configureMockStore([])({});

describe("common/ConfirmModal test", () => {
    
  it("ConfirmModal renders well", () => {
    const visible = true;
    const confirmModal = render(
      <Provider store={store}>
        <ConfirmModal
          visible={visible}
          title={"Delete memo"}
          description={"Are you sure to delete this memo?"}
          confirmText={"Yes"}
          cancelText={"No"}
        />
      </Provider>
    );

    expect(screen.getByText(/Delete memo/i)).toBeTruthy();
    expect(screen.getByText(/Are you sure to delete this memo/i)).toBeTruthy();
    expect(screen.getByText(/Yes/i)).toBeTruthy();
    expect(screen.getByText(/No/i)).toBeTruthy();
  });

  it("confirmModal with visible props false not renders", () => {
    const visible = false;
    const confirmModal = render(
      <Provider store={store}>
        <ConfirmModal
          visible={visible}
          title={"Delete memo"}
          description={"Are you sure to delete this memo?"}
          confirmText={"Yes"}
          cancelText={"No"}
        />
      </Provider>
    );
    
    expect(confirmModal.child).not.toBeDefined();
  });
});
