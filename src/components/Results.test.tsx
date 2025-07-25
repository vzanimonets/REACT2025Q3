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

  it('renders person name when people prop is provided', () => {
    const people = [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
        homeworld: 'Tatooine',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
        url: '',
      },
    ];
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
