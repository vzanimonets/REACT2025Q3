import { render } from '@testing-library/react';
import Results from './Results';

describe('Results', () => {
  it('should render without crashing', () => {
    render(
      <Results
        people={[]}
        loading={false}
        error={null}
        searchTerm=""
        highlight={false}
      />
    );
  });
});
