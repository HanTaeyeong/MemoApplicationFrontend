import { Provider } from "react-redux";

import { render, screen, act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import configureMockStore from "redux-mock-store";

import Button from "../../../components/common/Button";

// ${(props: ButtonPropsType) => props.fullWidth &&
//     css`
// padding-top:0.75rem;
// padding-bottom:0.75rem;
// widt-size:1.33rem;
// `}h:100%;
// font

const store = configureMockStore([])({});

const renderButton = ({ children, cyan, fullWidth, onClickFunction }) => {
  return render(
    <Provider store={store}>
      <Button
        cyan={cyan}
        fullWidth={fullWidth}
        onClickFunction={onClickFunction}
      >
        {children}
      </Button>
    </Provider>
  );
};

const hoverStyleChangeTest = (buttonComponent, isCyan) => {
  const style = getComputedStyle(buttonComponent);
  if (isCyan) {
    expect(style.background).toEqual('rgb(34, 184, 207)');
    // fireEvent(buttonComponent, mouseenter);
    // expect(style.background).toEqual('rgb(59, 201, 219)');
    return;
  }
  if (!isCyan) {
    expect(style.background).toEqual('rgb(52, 58, 64)');
    // fireEvent(buttonComponent, mouseenter);
    // expect(style.background).toEqual('rgb(134, 142, 150)');
  }
};

describe("common/Button Component test", () => {
  
  it('Button component with random props test',()=>{
    const isCyan = Math.random() >= 0.5;
    const isFullWidth = Math.random() >= 0.5;
    const buttonProps = {
      children: "Button children text",
      cyan: isCyan,
      fullWidth: isFullWidth
    };
    renderButton(buttonProps);
    const buttonComponent = screen.getByRole("button", {
      name: /Button children text/i,
    });

    const style = getComputedStyle(buttonComponent);
    hoverStyleChangeTest(buttonComponent, isCyan);
  })
  
  it("Button component renders correctly", () => {
    const mockFunction = jest.fn();
    
    const buttonProps = {
      children: "Button children text",
      cyan: false,
      fullWidth: true,
      onClickFunction: mockFunction,
    };

    renderButton(buttonProps);
    const buttonComponent = screen.getByRole("button", {
      name: /Button children text/i,
    });

    act(() => buttonComponent.click());
    expect(mockFunction).toBeCalledTimes(1);
  });

  it("Button components without onClickFunction acts correctly", () => {
    const mockFunction = jest.fn();
    
    const buttonProps = {
      children: "Button children text",
      cyan: true,
      fullWidth: false,
    };

    renderButton(buttonProps);
    const buttonComponent = screen.getByRole("button", {
      name: /Button children text/i,
    });

    act(() => buttonComponent.click());

    expect(mockFunction).not.toBeCalled();
  });
});
