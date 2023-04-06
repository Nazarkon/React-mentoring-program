/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'

import Dialog from "./Dialog";

describe("Dialog component", () => {

    it("matches snapshot", () => {
        const handleClose = jest.fn();
        const title = "Test Dialog Title";
        const body = "Test Dialog Body";
        const { container } = render(
            <Dialog title={title} body={body} handleClose={handleClose} isOpen={true} />);
        expect(container).toMatchSnapshot();
      });
  it("should render the dialog with title and body when isOpen is true", () => {
    const handleClose = jest.fn();
    const title = "Test Dialog Title";
    const body = "Test Dialog Body";

    const { getByText } = render(<Dialog title={title} body={body} handleClose={handleClose} isOpen={true} />);

    const titleElement = getByText(title);
    const bodyElement = getByText(body);

    expect(titleElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
  });

  it("should not render the dialog when isOpen is false", () => {
    const handleClose = jest.fn();
    const title = "Test Dialog Title";
    const body = "Test Dialog Body";

    const { queryByText } = render(<Dialog title={title} body={body} handleClose={handleClose} isOpen={false} />);

    const titleElement = queryByText(title);
    const bodyElement = queryByText(body);

    expect(titleElement).toBeNull();
    expect(bodyElement).toBeNull();
  });

//   it("should call handleClose when close icon is clicked", () => {
//     const handleClose = jest.fn();
//     const title = "Test Dialog Title";
//     const body = "Test Dialog Body";

//     const { getByClassName } = render(<Dialog title={title} body={body} handleClose={handleClose} isOpen={true} />);

//     const closeIcon = getByClassName("dialog-close-icon");

//     userEvent.click(closeIcon);

//     expect(handleClose).toHaveBeenCalled();
//   });

  it("should call the onClick function of the button when button is clicked", () => {
    const handleClose = jest.fn();
    const title = "Test Dialog Title";
    const body = "Test Dialog Body";
    const buttonText = "Test Button";
    const onClick = jest.fn();

    const { getByText } = render(
      <Dialog
        title={title}
        body={body}
        handleClose={handleClose}
        isOpen={true}
        buttons={[{ label: buttonText, onClick: onClick }]}
      />
    );

    const buttonElement = getByText(buttonText);

    userEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalled();
  });
});