import { render } from '@testing-library/react';
import ResultsBody from './ResultsBody';

describe('ResultsBody', () => {
  it('should render without crashing', () => {
    render(<ResultsBody people={[]} highlight={false} />);
  });
});
