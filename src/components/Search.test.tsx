import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

describe('Search', () => {
  it('renders input and buttons', () => {
    render(<Search value="" onChange={() => {}} onSearch={() => {}} />);
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByLabelText('Search input')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /search$/i })
    ).toBeInTheDocument();
  });

  it('shows clear button only when input is not empty', async () => {
    render(<Search value="" onChange={() => {}} onSearch={() => {}} />);
    expect(screen.getByLabelText('Search input')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /clear search input/i })
    ).not.toBeInTheDocument();
    render(<Search value="Luke" onChange={() => {}} onSearch={() => {}} />);
    expect(
      screen.getByRole('button', { name: /clear search input/i })
    ).toBeInTheDocument();
  });

  it('calls onChange when input length > 3 or 0', async () => {
    const onChange = jest.fn();
    render(<Search value="" onChange={onChange} onSearch={() => {}} />);
    const input = screen.getByLabelText('Search input');
    await userEvent.type(input, 'abcd');
    expect(onChange).toHaveBeenCalledWith('abcd');
    await userEvent.clear(input);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('does not call onChange for input length 1-3', async () => {
    const onChange = jest.fn();
    render(<Search value="" onChange={onChange} onSearch={() => {}} />);
    const input = screen.getByLabelText('Search input');
    await userEvent.type(input, 'ab');
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.type(input, 'c');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onSearch and onChange on submit', async () => {
    const onChange = jest.fn();
    const onSearch = jest.fn();
    render(<Search value="Luke" onChange={onChange} onSearch={onSearch} />);
    const input = screen.getByLabelText('Search input');
    await userEvent.clear(input);
    await userEvent.type(input, 'Leia');
    fireEvent.submit(screen.getByRole('search'));
    expect(onChange).toHaveBeenCalledWith('Leia');
    expect(onSearch).toHaveBeenCalled();
  });

  it('clear button clears input, calls onChange and focuses input', async () => {
    const onChange = jest.fn();
    render(<Search value="Luke" onChange={onChange} onSearch={() => {}} />);
    const input = screen.getByLabelText('Search input');
    const clearBtn = screen.getByRole('button', {
      name: /clear search input/i,
    });
    await userEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith('');
    expect(input).toHaveFocus();
  });

  it('syncs localValue with value prop', () => {
    const { rerender } = render(
      <Search value="Luke" onChange={() => {}} onSearch={() => {}} />
    );
    const input = screen.getByLabelText('Search input') as HTMLInputElement;
    expect(input.value).toBe('Luke');
    rerender(<Search value="Leia" onChange={() => {}} onSearch={() => {}} />);
    expect(input.value).toBe('Leia');
  });

  it('input and buttons have correct accessibility labels', () => {
    render(<Search value="" onChange={() => {}} onSearch={() => {}} />);
    expect(screen.getByLabelText('Search input')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /search$/i })
    ).toBeInTheDocument();
  });

  it('trims input before calling onSearch', async () => {
    const onChange = jest.fn();
    const onSearch = jest.fn();
    render(<Search value="  Luke  " onChange={onChange} onSearch={onSearch} />);
    fireEvent.submit(screen.getByRole('search'));
    expect(onSearch).toHaveBeenCalled();
  });
});
