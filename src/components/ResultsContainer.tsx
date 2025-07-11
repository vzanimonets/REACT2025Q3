import { Component } from 'react';
import Results from './Results';
import { fetchPeople } from '../api/swapi';
import type { SwapiPerson } from '../api/swapi';

interface ErrorObject {
  text: string;
  errorCode?: number;
}

interface ResultsContainerProps {
  boundaryError?: Error | null;
}

interface ResultsContainerState {
  people: SwapiPerson[];
  loading: boolean;
  error: ErrorObject | null;
  searchTerm: string;
}

class ResultsContainer extends Component<
  ResultsContainerProps,
  ResultsContainerState
> {
  private searchTermInterval: number | undefined;

  constructor(props: ResultsContainerProps) {
    super(props);
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      people: [],
      loading: false,
      error: null,
      searchTerm: savedTerm,
    };
  }

  componentDidMount() {
    this.fetchPeople(this.state.searchTerm);
    // Poll localStorage for searchTerm changes (since no hooks/events)
    this.searchTermInterval = window.setInterval(() => {
      const savedTerm = localStorage.getItem('searchTerm') || '';
      if (savedTerm !== this.state.searchTerm) {
        this.setState({ searchTerm: savedTerm }, () => {
          this.fetchPeople(savedTerm);
        });
      }
    }, 500);
  }

  componentWillUnmount() {
    if (this.searchTermInterval) {
      clearInterval(this.searchTermInterval);
    }
  }

  fetchPeople = (searchTerm: string) => {
    this.setState({ loading: true, error: null });
    fetchPeople({ search: searchTerm })
      .then((data) => {
        this.setState({
          people: data.results,
          loading: false,
        });
      })
      .catch((err: unknown) => {
        let errorObj: ErrorObject;
        if (
          err instanceof Error &&
          err.message &&
          err.message.includes('SWAPI request failed:')
        ) {
          const match = err.message.match(/(\d{3})/);
          const code = match ? parseInt(match[1], 10) : undefined;
          errorObj = { text: err.message, errorCode: code };
        } else {
          errorObj = {
            text:
              err instanceof Error
                ? err.message || 'Unknown error'
                : 'Unknown error',
          };
        }
        this.setState({ error: errorObj, loading: false, people: [] });
      });
  };

  render() {
    const { people, loading, error } = this.state;
    const { boundaryError } = this.props;
    return (
      <Results
        people={people}
        loading={loading}
        error={boundaryError ? { text: boundaryError.message } : error}
      />
    );
  }
}

export default ResultsContainer;
