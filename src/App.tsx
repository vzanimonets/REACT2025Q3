import SearchContainer from './components/SearchContainer';
import ResultsContainer from './components/ResultsContainer';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';
import { fetchPeople } from './api/swapi';
import type { SwapiPerson } from './api/swapi';
import type { ReactNode } from 'react';
import { Component } from 'react';

interface ErrorObject {
  text: string;
  errorCode?: number;
}

interface AppState {
  searchTerm: string;
  people: SwapiPerson[];
  loading: boolean;
  error: ErrorObject | null;
  artificialError: Error | null;
}

class App extends Component<object> {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        {(boundaryError) => (
          <div className="w-full min-h-screen p-2 bg-white rounded-none shadow-none flex flex-col">
            <header className="flex flex-col items-center mb-6 mt-4">
              <h1 className="text-center text-4xl font-bold mb-2">
                Star Wars Characters
              </h1>
              <SearchContainer />
            </header>
            <main className="flex-1 flex flex-col items-center">
              <ResultsContainer boundaryError={boundaryError} />
            </main>
            <div className="flex justify-end mt-4">
              <ErrorButton onThrowError={() => { throw new Error('Test error from ErrorButton'); }} />
            </div>
          </div>
        )}
      </ErrorBoundary>
    );
  }
}

export default App;
