import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsBody from './ResultsBody';
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

describe('ResultsBody', () => {
  it('renders skeleton rows when loading', () => {
    render(<ResultsBody people={[]} loading={true} />);
    expect(screen.getAllByTestId('skeleton-row').length).toBeGreaterThan(0);
  });

  it('renders error message', () => {
    render(
      <ResultsBody people={[]} loading={false} error={{ text: 'API error' }} />
    );
    expect(screen.getByText(/api error/i)).toBeInTheDocument();
  });

  it('renders "No results found" when people is empty', () => {
    render(<ResultsBody people={[]} loading={false} error={null} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('renders Card for each person', () => {
    const people = [
      { ...mockPerson, name: 'Luke Skywalker', url: '1' },
      { ...mockPerson, name: 'Leia Organa', url: '2' },
    ];
    render(<ResultsBody people={people} loading={false} error={null} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('renders person with empty name', () => {
    const people = [{ ...mockPerson, name: '' }];
    render(<ResultsBody people={people} loading={false} error={null} />);
    expect(screen.getByTestId('person-row')).toBeInTheDocument();
  });

  it('renders people with duplicate names', () => {
    const people = [
      { ...mockPerson, name: 'Luke Skywalker', url: '1' },
      { ...mockPerson, name: 'Luke Skywalker', url: '2' },
    ];
    render(<ResultsBody people={people} loading={false} error={null} />);
    expect(screen.getAllByText('Luke Skywalker').length).toBeGreaterThan(1);
  });
});
