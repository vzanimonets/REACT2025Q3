import SearchContainer from './components/SearchContainer';
import ResultsContainer from './components/ResultsContainer';
import ErrorBoundary from './components/ErrorBoundary';
import Results from './components/Results';
import ErrorButton from './components/ErrorButton';
import type { ReactNode } from 'react';
import { Component } from 'react';

interface AppState {
  searchTerm: string;
  artificialError: Error | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedTerm,
      artificialError: null,
    };
  }

  handleSearchInputChange = (value: string) => {
    this.setState({ searchTerm: value, artificialError: null });
    localStorage.setItem('searchTerm', value);
  };

  handleThrowError = () => {
    this.setState({
      artificialError: new Error('Test error from ErrorButton'),
    });
  };

  handleErrorBoundaryReset = () => {
    this.setState({ artificialError: null });
  };

  render(): ReactNode {
    const { searchTerm, artificialError } = this.state;
    return (
      <div className="w-full min-h-screen p-2 bg-white rounded-none shadow-none flex flex-col">
        <header className="flex flex-col items-center mb-6 mt-4">
          <h1 className="text-center text-4xl font-bold mb-2">
            Star Wars Characters Search
          </h1>
          <SearchContainer
            value={searchTerm}
            onChange={this.handleSearchInputChange}
          />
        </header>
        <main className="flex-1 flex flex-col items-center">
          <ErrorBoundary
            key={searchTerm + (artificialError ? '-error' : '')}
            fallback={(error) => (
              <Results
                people={[]}
                loading={false}
                error={{ text: error.message }}
              />
            )}
          >
            <ResultsContainer
              searchTerm={searchTerm}
              artificialError={artificialError}
            />
          </ErrorBoundary>
          <ErrorButton onThrowError={this.handleThrowError} />
        </main>
      </div>
    );
  }
}

export default App;
