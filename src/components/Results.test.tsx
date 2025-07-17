import React from 'react';
import { render, screen } from '@testing-library/react';
import Results from './Results';
import '@testing-library/jest-dom';

const mockPerson = {
  name: 'Luke Skywalker',
  url: '1',
  height: '172',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: '',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '',
  edited: '',
};

describe('Results', () => {
  it('renders list of people', () => {
    const people = [
      { ...mockPerson, name: 'Luke Skywalker', url: '1' },
      { ...mockPerson, name: 'Leia Organa', url: '2' },
    ];
    render(
      <Results
        people={people}
        loading={false}
        error={null}
        searchTerm=""
        highlight={false}
      />
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('shows "No results found" when people is empty', () => {
    render(
      <Results
        people={[]}
        loading={false}
        error={null}
        searchTerm="test"
        highlight={false}
      />
    );
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('shows skeleton rows when loading', () => {
    render(
      <Results
        people={[]}
        loading={true}
        error={null}
        searchTerm=""
        highlight={false}
      />
    );
    expect(screen.getAllByTestId('skeleton-row').length).toBeGreaterThan(0);
  });

  it('shows error message when error is present', () => {
    render(
      <Results
        people={[]}
        loading={false}
        error={{ text: 'API error' }}
        searchTerm=""
        highlight={false}
      />
    );
    expect(screen.getByText(/api error/i)).toBeInTheDocument();
  });
});
