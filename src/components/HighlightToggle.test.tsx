import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import HighlightToggle from './HighlightToggle';

describe('HighlightToggle', () => {
  it('renders the checkbox and label', () => {
    const { getByLabelText } = render(
      <HighlightToggle checked={false} onChange={() => {}} />
    );
    const checkbox = getByLabelText('Highlight search term');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('checkbox reflects checked prop', () => {
    const { getByLabelText, rerender } = render(
      <HighlightToggle checked={false} onChange={() => {}} />
    );
    const checkbox = getByLabelText(
      'Highlight search term'
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    rerender(<HighlightToggle checked={true} onChange={() => {}} />);
    expect(checkbox.checked).toBe(true);
  });

  it('calls onChange when checkbox is clicked', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <HighlightToggle checked={false} onChange={handleChange} />
    );
    const checkbox = getByLabelText('Highlight search term');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('label is associated with the checkbox', () => {
    const { getByLabelText } = render(
      <HighlightToggle checked={false} onChange={() => {}} />
    );
    const checkbox = getByLabelText('Highlight search term');
    expect(checkbox).toBeInTheDocument();
  });
});
