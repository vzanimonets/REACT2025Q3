import { Component } from 'react';
import Results from './Results';
import { fetchPeople } from '../api/swapi';
import type { SwapiPerson } from '../api/swapi';
import type { ErrorObject } from '../types';
import { createErrorObject } from '../utils/errorHandler';

interface ResultsContainerProps {
  searchTerm: string;
  artificialError?: Error | null;
  highlight?: boolean;
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
        const errorObj = createErrorObject(err);
        this.setState({ error: errorObj, loading: false, people: [] });
      });
  };

  render() {
    const { people, loading, error } = this.state;
    const { artificialError, searchTerm, highlight } = this.props;
    if (artificialError) {
      throw artificialError;
    }
    return (
      <Results
        people={people}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        highlight={highlight}
      />
    );
  }
}

export default ResultsContainer;
