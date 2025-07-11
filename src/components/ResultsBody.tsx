import Message from './Message';
import Spinner from './Spinner';
import Card from './Card';
import type { SwapiPerson } from '../api/swapi';

interface ErrorObject {
  text: string;
  errorCode?: number;
}

interface ResultsBodyProps {
  people: SwapiPerson[];
  loading?: boolean;
  error?: ErrorObject | null;
}

const ResultsBody = ({ people, loading = false, error }: ResultsBodyProps) => {
  if (loading) return <Spinner />;
  if (error) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <Message text={error.text} type="error" errorCode={error.errorCode} />
      </div>
    );
  }
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
