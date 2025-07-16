import { render } from '@testing-library/react';
import ResultsHeader from './ResultsHeader';

describe('ResultsHeader', () => {
  it('should render without crashing', () => {
    render(<ResultsHeader />);
  });
});
