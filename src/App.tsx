import './App.css';
import Search from './components/Search';
import CardList from './components/CardList';
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
  error: string | null;
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
      .catch((err) => {
        this.setState({ error: err.message, loading: false, people: [] });
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
        <div className="app-container">
          <header className="top-controls">
            <Search onSearch={this.handleSearch} />
          </header>
          <main className="results-section">
            {loading && <div>Loading...</div>}
            {error && (
              <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>
            )}
            <div className="results-list">
              <CardList people={people} />
            </div>
          </main>
          <div className="error-btn-container">
            <ErrorButton />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
