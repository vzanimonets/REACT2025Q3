import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders all column headers', () => {
    const headers = [
      'Name',
      'Height',
      'Mass',
      'Hair Color',
      'Skin Color',
      'Eye Color',
      'Birth Year',
      'Gender',
      'Films',
      'Vehicles+Starships',
    ];
    render(<Header />);
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });
});
