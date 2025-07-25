import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Message from './Message';

describe('Message', () => {
  it('renders the provided text', () => {
    const { getByText } = render(<Message text="Hello world" />);
    expect(getByText('Hello world')).toBeInTheDocument();
  });

  it('applies error styles when type="error"', () => {
    const { container } = render(
      <Message text="Error occurred" type="error" />
    );
    expect(container.firstChild).toHaveClass('text-red-600');
  });

  it('applies default styles when type is not error', () => {
    const { container } = render(<Message text="Info message" />);
    expect(container.firstChild).toHaveClass('text-gray-600');
  });

  it('renders errorCode if provided', () => {
    const { getByText } = render(
      <Message text="Error!" type="error" errorCode={404} />
    );
    expect(getByText('Error code: 404')).toBeInTheDocument();
  });

  it('does not render errorCode div if errorCode is not provided', () => {
    const { queryByText } = render(<Message text="No error code" />);
    expect(queryByText(/Error code:/)).not.toBeInTheDocument();
  });
});
