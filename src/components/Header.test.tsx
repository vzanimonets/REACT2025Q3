import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';
import headers from '../mocks/MockHeaders';

describe('Header', () => {
  it('renders all column headers', () => {
    render(<Header />);
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });
});
