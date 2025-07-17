import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsHeader from './ResultsHeader';

describe('ResultsHeader', () => {
  it('renders all column headers', () => {
    render(<ResultsHeader />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Height')).toBeInTheDocument();
    expect(screen.getByText('Mass')).toBeInTheDocument();
    expect(screen.getByText('Hair Color')).toBeInTheDocument();
    expect(screen.getByText('Skin Color')).toBeInTheDocument();
    expect(screen.getByText('Eye Color')).toBeInTheDocument();
    expect(screen.getByText('Birth Year')).toBeInTheDocument();
    expect(screen.getByText('Gender')).toBeInTheDocument();
    expect(screen.getByText('Films')).toBeInTheDocument();
    expect(screen.getByText('Vehicles+Starships')).toBeInTheDocument();
  });
});
