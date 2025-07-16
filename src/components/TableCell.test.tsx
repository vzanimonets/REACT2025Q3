import { render } from '@testing-library/react';
import TableCell from './TableCell';

describe('TableCell', () => {
  it('should render without crashing', () => {
    render(<TableCell>Test</TableCell>);
  });
});
