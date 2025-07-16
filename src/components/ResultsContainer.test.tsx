import { render } from '@testing-library/react';
import ResultsContainer from './ResultsContainer';

describe('ResultsContainer', () => {
  it('should render without crashing', () => {
    render(
      <ResultsContainer
        searchTerm=""
        artificialError={null}
        highlight={false}
      />
    );
  });
});
