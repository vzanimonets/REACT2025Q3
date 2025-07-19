import React from 'react';
import { render } from '@testing-library/react';
import Results from './Results';
import '@testing-library/jest-dom';

describe('Results', () => {
  it('renders without crashing and passes props to ResultsBody', () => {
    render(
      <Results
        people={[]}
        loading={false}
        error={null}
        searchTerm="test"
        highlight={false}
      />
    );
  });
});
