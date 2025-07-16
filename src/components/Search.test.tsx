import { render } from '@testing-library/react';
import Search from './Search';

describe('Search', () => {
  it('should render without crashing', () => {
    render(<Search value="" onChange={() => {}} onSearch={() => {}} />);
  });
});
