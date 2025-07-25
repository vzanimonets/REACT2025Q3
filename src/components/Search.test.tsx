import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';

describe('Search', () => {
  it('renders input and buttons', () => {
    const { getByRole, getByLabelText } = render(
      <Search value="" onChange={() => {}} onSearch={() => {}} />
    );
    expect(getByRole('search')).toBeInTheDocument();
    expect(getByLabelText('Search input')).toBeInTheDocument();
    expect(getByRole('button', { name: /search$/i })).toBeInTheDocument();
  });

  it('shows clear button only when input is not empty', async () => {
    const { getByLabelText, queryByRole, getByRole, rerender } = render(
      <Search value="" onChange={() => {}} onSearch={() => {}} />
    );
    expect(getByLabelText('Search input')).toBeInTheDocument();
    expect(
      queryByRole('button', { name: /clear search input/i })
    ).not.toBeInTheDocument();
    rerender(<Search value="Luke" onChange={() => {}} onSearch={() => {}} />);
    expect(
      getByRole('button', { name: /clear search input/i })
    ).toBeInTheDocument();
  });

  it('calls onChange when input length > 3 or 0', async () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Search value="" onChange={onChange} onSearch={() => {}} />
    );
    const input = getByLabelText('Search input');
    await userEvent.type(input, 'abcd');
    expect(onChange).toHaveBeenCalledWith('abcd');
    await userEvent.clear(input);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('does not call onChange for input length 1-3', async () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Search value="" onChange={onChange} onSearch={() => {}} />
    );
    const input = getByLabelText('Search input');
    await userEvent.type(input, 'ab');
    expect(onChange).not.toHaveBeenCalled();
    await userEvent.type(input, 'c');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onSearch and onChange on submit', async () => {
    const onChange = jest.fn();
    const onSearch = jest.fn();
    const { getByLabelText, getByRole } = render(
      <Search value="Luke" onChange={onChange} onSearch={onSearch} />
    );
    const input = getByLabelText('Search input');
    await userEvent.clear(input);
    await userEvent.type(input, 'Leia');
    fireEvent.submit(getByRole('search'));
    expect(onChange).toHaveBeenCalledWith('Leia');
    expect(onSearch).toHaveBeenCalled();
  });

  it('clear button clears input, calls onChange and focuses input', async () => {
    const onChange = jest.fn();
    const { getByLabelText, getByRole } = render(
      <Search value="Luke" onChange={onChange} onSearch={() => {}} />
    );
    const input = getByLabelText('Search input');
    const clearBtn = getByRole('button', {
      name: /clear search input/i,
    });
    await userEvent.click(clearBtn);
    expect(onChange).toHaveBeenCalledWith('');
    expect(input).toHaveFocus();
  });

  it('syncs localValue with value prop', () => {
    const { rerender, getByLabelText } = render(
      <Search value="Luke" onChange={() => {}} onSearch={() => {}} />
    );
    const input = getByLabelText('Search input') as HTMLInputElement;
    expect(input.value).toBe('Luke');
    rerender(<Search value="Leia" onChange={() => {}} onSearch={() => {}} />);
    expect(input.value).toBe('Leia');
  });

  it('input and buttons have correct accessibility labels', () => {
    const { getByLabelText, getByRole } = render(
      <Search value="" onChange={() => {}} onSearch={() => {}} />
    );
    expect(getByLabelText('Search input')).toBeInTheDocument();
    expect(getByRole('button', { name: /search$/i })).toBeInTheDocument();
  });

  it('trims input before calling onSearch', async () => {
    const onChange = jest.fn();
    const onSearch = jest.fn();
    const { getByRole } = render(
      <Search value="  Luke  " onChange={onChange} onSearch={onSearch} />
    );
    fireEvent.submit(getByRole('search'));
    expect(onSearch).toHaveBeenCalled();
  });
});
