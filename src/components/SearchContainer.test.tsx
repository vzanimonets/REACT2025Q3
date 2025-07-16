import { render } from '@testing-library/react';
import SearchContainer from './SearchContainer';

describe('SearchContainer', () => {
  it('should render without crashing', () => {
    render(
      <SearchContainer value="" onChange={() => {}} onSearch={() => {}} />
    );
  });
});
