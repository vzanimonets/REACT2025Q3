import React from 'react';
import { render } from '@testing-library/react';
import Results from './Results';

import mockPerson from '../mocks/MockPerson';

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

  it('renders person name when people prop is provided', () => {
    const people = [mockPerson];
    const { getByText } = render(
      <Results
        people={people}
        loading={false}
        error={null}
        searchTerm="Luke"
        highlight={false}
      />
    );
    expect(getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
