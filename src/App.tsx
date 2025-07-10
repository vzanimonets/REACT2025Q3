import Search from './components/Search';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';
import { fetchPeople } from './swapi';
import type { SwapiPerson } from './swapi';
import type { ReactNode } from 'react';
import { Component } from 'react';

interface AppState {
  searchTerm: string;
  people: SwapiPerson[];
  loading: boolean;
  error: string | { text: string; errorCode: number } | null;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      people: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm: savedTerm }, () => {
      this.fetchPeople(savedTerm);
    });
  }

  fetchPeople = (searchTerm: string) => {
    this.setState({ loading: true, error: null });
    fetchPeople({ search: searchTerm })
      .then((data) => {
        this.setState({ people: data.results, loading: false });
      })
      .catch((err: unknown) => {
        let errorObj: string | { text: string; errorCode: number };
        if (
          err instanceof Error &&
          err.message &&
          err.message.includes('SWAPI request failed:')
        ) {
          const match = err.message.match(/(\\d{3})/);
          const code = match ? parseInt(match[1], 10) : undefined;
          errorObj = code
            ? { text: err.message, errorCode: code }
            : err.message;
        } else {
          errorObj =
            err instanceof Error
              ? err.message || 'Unknown error'
              : 'Unknown error';
        }
        this.setState({ error: errorObj, loading: false, people: [] });
      });
  };

  handleSearch = (query: string) => {
    this.setState({ searchTerm: query });
    this.fetchPeople(query);
  };

  render(): ReactNode {
    const { people, loading, error } = this.state;
    return (
      <ErrorBoundary>
        <div className="w-full min-h-screen p-2 bg-white rounded-none shadow-none">
          <h1 className="text-center">Star Wars Characters</h1>
          <header className="bg-gray-50 shadow px-2 py-3 mb-2 border-b border-gray-200 flex flex-col items-center">
            <Search onSearch={this.handleSearch} />
          </header>
          <main className="bg-gray-50 shadow px-2 py-3 mb-2 border-b border-gray-200">
            <Results
              people={people}
              loading={loading}
              error={error === null ? undefined : error}
            />
          </main>
          <div className="flex justify-end mt-2">
            <ErrorButton />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
