/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'

import Dialog from "./Dialog";

describe("Dialog component", () => {

  const title = 'Test Title';
  const body = 'Test Body';
  const handleClose = jest.fn();

    it("matches snapshot", () => {
        const { container } = render(
            <Dialog title={title} body={body} handleClose={handleClose} isOpen={true} />);
        expect(container).toMatchSnapshot();
      });
      it('Should render the dialog with the correct title and body', () => {
        const { getByText } = render(<Dialog title={title} body={body} handleClose={handleClose} isOpen={true} />);
    
        expect(getByText(title)).toBeInTheDocument();
        expect(getByText(body)).toBeInTheDocument();
      });
    
      it('Should call the handleClose function when the close icon is clicked', () => {
        const {getByTestId} = render(<Dialog title={title} body={body} handleClose={handleClose} isOpen={true} />);
    
        const closeIcon = getByTestId('close-icon');
        userEvent.click(closeIcon);
    
        expect(handleClose).toHaveBeenCalled();
      });
});