import { render } from '@testing-library/react';
import HighlightToggle from './HighlightToggle';

describe('HighlightToggle', () => {
  it('should render without crashing', () => {
    render(<HighlightToggle checked={false} onChange={() => {}} />);
  });
});
