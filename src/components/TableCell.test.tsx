import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import TableCell from './TableCell';
import { CSS_CLASSES } from '../utils/constants';

describe('TableCell', () => {
  it('renders children', () => {
    const { getByText } = render(<TableCell>Content</TableCell>);
    expect(getByText('Content')).toBeInTheDocument();
  });

  it('applies TABLE_CELL class by default', () => {
    const { container } = render(<TableCell>Cell</TableCell>);
    expect(container.firstChild).toHaveClass(CSS_CLASSES.TABLE_CELL);
  });

  it('applies TABLE_HEADER_CELL class when isHeader is true', () => {
    const { container } = render(<TableCell isHeader>Header</TableCell>);
    expect(container.firstChild).toHaveClass(CSS_CLASSES.TABLE_HEADER_CELL);
  });

  it('appends custom className', () => {
    const { container } = render(
      <TableCell className="custom-class">Cell</TableCell>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders as a div', () => {
    const { container } = render(<TableCell>Cell</TableCell>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
