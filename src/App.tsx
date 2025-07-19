import { Component, type ReactNode } from 'react';
import SearchContainer from './components/SearchContainer';
import ResultsContainer from './components/ResultsContainer';
import ErrorBoundary from './components/ErrorBoundary';
import Results from './components/Results';
import ErrorButton from './components/ErrorButton';
import HighlightToggle from './components/HighlightToggle';
import { ERROR_MESSAGES } from './utils/constants';

interface AppState {
  searchTerm: string;
  artificialError: Error | null;
  highlight: boolean;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const savedTerm = localStorage.getItem('searchTerm') || '';
    const savedHighlight = localStorage.getItem('highlight') !== 'false';
    this.state = {
      searchTerm: savedTerm,
      artificialError: null,
      highlight: savedHighlight,
    };
  }

  handleSearchInputChange = (value: string) => {
    this.setState({ searchTerm: value, artificialError: null });
    localStorage.setItem('searchTerm', value);
  };

  handleSearch = (value: string) => {
    const trimmed = value.trim();
    this.setState({ searchTerm: trimmed, artificialError: null });
    localStorage.setItem('searchTerm', trimmed);
  };

  handleThrowError = () => {
    this.setState({
      artificialError: new Error(ERROR_MESSAGES.TEST_ERROR),
    });
  };

  handleErrorBoundaryReset = () => {
    this.setState({ artificialError: null });
  };

  handleHighlightToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ highlight: e.target.checked });
    localStorage.setItem('highlight', String(e.target.checked));
  };

  render(): ReactNode {
    const { searchTerm, artificialError, highlight } = this.state;
    return (
      <div className="w-full min-h-screen p-2 bg-white dark:bg-gray-900 rounded-none shadow-none flex flex-col">
        <header className="flex flex-col items-center mb-6 mt-4 text-black dark:text-white">
          <h1 className="text-center text-4xl font-bold mb-2">
            Star Wars Characters Search
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full max-w-md">
            <SearchContainer
              value={searchTerm}
              onChange={this.handleSearchInputChange}
              onSearch={this.handleSearch}
            />
            <HighlightToggle
              checked={highlight}
              onChange={this.handleHighlightToggle}
            />
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center">
          <ErrorBoundary
            key={searchTerm + (artificialError ? '-error' : '')}
            fallback={(error) => (
              <Results
                people={[]}
                loading={false}
                error={{ text: error.message }}
                searchTerm={searchTerm}
                highlight={highlight}
              />
            )}
          >
            <ResultsContainer
              searchTerm={searchTerm}
              artificialError={artificialError}
              highlight={highlight}
            />
          </ErrorBoundary>
          <ErrorButton onThrowError={this.handleThrowError} />
        </main>
      </div>
    );
  }
}

export default App;
