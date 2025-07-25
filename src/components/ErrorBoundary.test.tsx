import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders child', () => {
    const childText = 'Child';
    const { getByText } = render(
      <ErrorBoundary fallback={() => null}>
        <div>{childText}</div>
      </ErrorBoundary>
    );
    expect(getByText(childText)).toBeInTheDocument();
  });

  it('catches error and logs', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={() => <div>Fallback</div>}>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
