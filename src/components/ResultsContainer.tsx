import { Component } from 'react';
import Results from './Results';
import { fetchPeople } from '../api/swapi';
import type { SwapiPerson } from '../api/swapi';
// import ErrorButton from './ErrorButton'; // No longer needed

interface ErrorObject {
  text: string;
  errorCode?: number;
}

interface ResultsContainerProps {
  searchTerm: string;
  artificialError?: Error | null;
}

interface ResultsContainerState {
  people: SwapiPerson[];
  loading: boolean;
  error: ErrorObject | null;
}

class ResultsContainer extends Component<
  ResultsContainerProps,
  ResultsContainerState
> {
  constructor(props: ResultsContainerProps) {
    super(props);
    this.state = {
      people: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchPeople(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: ResultsContainerProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchPeople(this.props.searchTerm);
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
    const { artificialError } = this.props;
    if (artificialError) {
      throw artificialError;
    }
    return (
      <>
        <Results people={people} loading={loading} error={error} />
      </>
    );
  }
}

export default ResultsContainer;
