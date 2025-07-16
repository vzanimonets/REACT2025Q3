import { render } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('should render without crashing', () => {
    render(
      <ErrorBoundary fallback={() => null}>
        <div>Child</div>
      </ErrorBoundary>
    );
  });
});
