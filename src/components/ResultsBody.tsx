import Message from './Message';
import Spinner from './Spinner';
import Card from './Card';
import type { SwapiPerson } from '../swapi';

interface ResultsBodyProps {
  people: SwapiPerson[];
  loading?: boolean;
  error?: string | { text: string; errorCode: number };
}

type ErrorWithCode = { text: string; errorCode: number };

const ResultsBody = ({ people, loading = false, error }: ResultsBodyProps) => {
  if (loading) return <Spinner />;
  if (
    error &&
    typeof error === 'object' &&
    'text' in error &&
    'errorCode' in error
  ) {
    const err = error as ErrorWithCode;
    return <Message text={err.text} type="error" errorCode={err.errorCode} />;
  }

  if (error && typeof error === 'string' && error === 'Failed to fetch') {
    return (
      <Message
        text="Failed to connect to the server. Please check your internet connection or CORS settings."
        type="error"
      />
    );
  }
  if (error && typeof error === 'string')
    return <Message text={error} type="error" />;
  if (people.length === 0) return <Message text="No results found." />;
  return (
    <div className="w-full h-80 overflow-y-auto flex items-start justify-center">
      <div className="w-full">
        {people.map((person) => (
          <Card key={person.url} person={person} />
        ))}
      </div>
    </div>
  );
};

export default ResultsBody;
