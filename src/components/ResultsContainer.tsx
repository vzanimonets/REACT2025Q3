import { Component } from 'react';
import Results from './Results';
import { fetchPeople } from '../api/swapi';
import type { SwapiPerson } from '../api/swapi';
import ErrorButton from './ErrorButton';

interface ErrorObject {
  text: string;
  errorCode?: number;
}

interface ResultsContainerState {
  people: SwapiPerson[];
  loading: boolean;
  error: ErrorObject | null;
  searchTerm: string;
  artificialError: Error | null;
}

class ResultsContainer extends Component<object, ResultsContainerState> {
  private searchTermInterval: number | undefined;

  constructor(props: object) {
    super(props);
    const savedTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      people: [],
      loading: false,
      error: null,
      searchTerm: savedTerm,
      artificialError: null,
    };
  }

  componentDidMount() {
    this.fetchPeople(this.state.searchTerm);
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

  handleThrowError = () => {
    this.setState({
      artificialError: new Error('Test error from ErrorButton'),
    });
  };

  render() {
    const { people, loading, error, artificialError } = this.state;
    if (artificialError) {
      throw artificialError;
    }
    return (
      <>
        <Results people={people} loading={loading} error={error} />
        <div className="flex justify-end mt-4">
          <ErrorButton onThrowError={this.handleThrowError} />
        </div>
      </>
    );
  }
}

export default ResultsContainer;
