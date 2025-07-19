import React from 'react';
import { render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function ProblemChild() {
  throw new Error('Test error');
  return <div />;
}

describe('ErrorBoundary', () => {
  it('should render without crashing', () => {
    render(
      <ErrorBoundary fallback={() => null}>
        <div>Child</div>
      </ErrorBoundary>
    );
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
