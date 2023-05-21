import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Counter from "./Counter";
import { act } from "react-dom/test-utils";

describe("Check Counter element behavior", () => {
  it("Matches snapshot", () => {
    const { container } = render(<Counter />);
    expect(container).toMatchSnapshot();
  });

  it("should display the default count value", () => {
    const { getByText } = render(<Counter defaultValue={0} />);
    expect(getByText("Count: 0")).toBeInTheDocument();
  });

  it("should increment the count value when the increment button is clicked", () => {
    const { getByText } = render(<Counter defaultValue={0} />);
    const incrementButton = getByText("Increment");
    act(() => {
      userEvent.click(incrementButton);
    });
    expect(getByText("Count: 1")).toBeInTheDocument();
  });

  it("should decrement the count value when the decrement button is clicked", () => {
    const { getByText } = render(<Counter defaultValue={0} />);
    const decrementButton = getByText("Decrement");
    act(() => {
      userEvent.click(decrementButton);
    });
    expect(getByText("Count: -1")).toBeInTheDocument();
  });
});
