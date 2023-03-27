import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Counter from "./Counter";
import { act } from 'react-dom/test-utils';

describe("Check Counter element behavior", () => {

    test("Test that component renders initial value provided in props", () => {

        const propValue = 2;

        render(<Counter defaultValue={propValue}/>)

        const propValueElement = screen.getByText(/count/i);

        expect(propValueElement).toBeInTheDocument();
    })

    test("Check if decrement button decrements the displayed value", async () => {
        render(<Counter/>)

        const countElement = screen.getByText(/count/i);

        const countValue = countElement.textContent;

        expect(countValue).toBe('Count: 0');

        const buttonDecrement = screen.getByRole('button', { name: /decrement/i });
        await act(async () => {
            buttonDecrement.click();
        }) 

        const newCountValue = countElement.textContent;

        expect(newCountValue).toBe('Count: -1');
       
    })

    test("Check if increment button increments the displayed value", async () => {
        render(<Counter/>)

        const countElement = screen.getByText(/count/i);

        const countValue = countElement.textContent;

        expect(countValue).toBe('Count: 0');

        const buttonDecrement = screen.getByRole('button', { name: /increment/i });
        await act(async () => {
         buttonDecrement.click();
        })

        const newCountValue = countElement.textContent;

        expect(newCountValue).toBe('Count: 1');
       
    })

})