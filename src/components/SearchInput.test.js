import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchInput from "./SearchInput";

describe("Check SearchInput element behavior", () => {

    test("Check that component renders an input with the value equal to initial value passed in props", () => {
        const propValue = "Search something";

        render(<SearchInput defaultValue={propValue}/>)

        const searchInput = screen.getByLabelText('search');

        expect(searchInput).toHaveValue(propValue);
    })

    test("Check that after typing to the input and a click event on the Submit button, the onChange prop is called with proper value", () => {
        const onSearchMock = jest.fn();

        render(<SearchInput onSearch={onSearchMock}/>)

        const searchInput = screen.getByLabelText('search');

        const submitButton = screen.getByRole('button');


        fireEvent.change(searchInput, { target: { value: "Hello World" } });

        fireEvent.click(submitButton)

        expect(searchInput.value).toBe("Hello World");
    })

    test("Check that after typing to the input and pressing Enter key, the onChange prop is called with proper value", () => {
        const onSearchMock = jest.fn();

        render(<SearchInput  onSearch={onSearchMock}/>)

        const searchInput = screen.getByLabelText('search');

        fireEvent.change(searchInput, { target: { value: "Hello World" } });

        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

        expect(searchInput.value).toBe("Hello World");
    })
})