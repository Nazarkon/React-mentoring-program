import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Dialog from "./Dialog";

describe("Dialog component", () => {
  const title = "Test Title";
  const body = "Test Body";
  const handleClose = jest.fn();

  it("matches snapshot", () => {
    const { container } = render(
      <Dialog title={title} handleClose={handleClose}>
        <p>{body}</p>
      </Dialog>
    );
    expect(container).toMatchSnapshot();
  });
  it("Should render the dialog with the correct title and body", () => {
    const title = "Test Title";
    const content = "This is a test content.";
    const { getByText } = render(
      <Dialog title={title} handleClose={handleClose}>
        <div>{content}</div>
      </Dialog>
    );
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });

  it("Should call the handleClose function when the close icon is clicked", () => {
    const content = "This is a test content.";
    const { getByTestId } = render(
      <Dialog title={title} handleClose={handleClose}>
        <div>{content}</div>
      </Dialog>
    );

    const closeIcon = getByTestId("close-icon");
    userEvent.click(closeIcon);

    expect(handleClose).toHaveBeenCalled();
  });
});
