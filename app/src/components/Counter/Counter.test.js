import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Counter from './Counter';

describe('Check Counter element behavior', () => {
  it('Matches snapshot', () => {
    const { container } = render(<Counter />);
    expect(container).toMatchSnapshot();
  });

  test('Check that component renders initial value provided in props', () => {
    const propValue = 2;

    render(<Counter defaultValue={propValue} />);

    const propValueElement = screen.getByText(/count/i);

    expect(propValueElement).toBeInTheDocument();
  });

  test('Check if decrement button decrements the displayed value', async () => {
    render(<Counter />);

    const countElement = screen.getByText(/count/i);

    const countValue = countElement.textContent;

    expect(countValue).toBe('Count: 0');

    const buttonDecrement = screen.getByRole('button', { name: /decrement/i });

    userEvent.click(buttonDecrement);

    const newCountValue = countElement.textContent;

    expect(newCountValue).toBe('Count: -1');
  });

  test('Check if increment button increments the displayed value', async () => {
    render(<Counter />);

    const countElement = screen.getByText(/count/i);

    const countValue = countElement.textContent;

    expect(countValue).toBe('Count: 0');

    const buttonDecrement = screen.getByRole('button', { name: /increment/i });
    userEvent.click(buttonDecrement);

    const newCountValue = countElement.textContent;

    expect(newCountValue).toBe('Count: 1');
  });
});
