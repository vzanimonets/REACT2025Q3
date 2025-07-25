import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('should render without crashing', () => {
    const { getByText } = render(
      <ErrorBoundary fallback={() => null}>
        <div>Child</div>
      </ErrorBoundary>
    );
    expect(getByText('Child')).toBeInTheDocument();
  });

  it('catches error and logs to console.error', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      render(
        <ErrorBoundary fallback={() => <div>Fallback</div>}>
          <ProblemChild />
        </ErrorBoundary>
      );
    }).not.toThrow();
    expect(errorSpy).toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});
