import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import Card from './Card';

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

describe('Card', () => {
  it('should render without crashing', () => {
    render(<Card person={mockPerson} highlight={false} />);
  });

  it('renders all person fields', () => {
    const { getByText, getAllByText } = render(
      <Card person={mockPerson} highlight={false} />
    );
    expect(getByText('Luke Skywalker')).toBeInTheDocument();
    expect(getByText('172')).toBeInTheDocument();
    expect(getByText('77')).toBeInTheDocument();
    expect(getByText('blond')).toBeInTheDocument();
    expect(getByText('fair')).toBeInTheDocument();
    expect(getByText('blue')).toBeInTheDocument();
    expect(getByText('19BBY')).toBeInTheDocument();
    expect(getByText('male')).toBeInTheDocument();
    expect(getAllByText('0').length).toBe(2);
  });

  it('highlights name when highlight=true and searchTerm matches', () => {
    const { container } = render(
      <Card person={mockPerson} highlight={true} searchTerm="Luke" />
    );
    const mark = container.querySelector('mark');
    expect(mark).toBeInTheDocument();
    expect(mark?.textContent?.toLowerCase()).toBe('luke');
  });

  it('renders empty name cell if name is empty', () => {
    const person = { ...mockPerson, name: '' };
    const { getByTestId } = render(<Card person={person} highlight={false} />);
    const row = getByTestId('person-row');
    const firstCell = row.querySelector('div');
    expect(firstCell).toBeInTheDocument();
    expect(firstCell?.textContent).toBe('');
  });
});
