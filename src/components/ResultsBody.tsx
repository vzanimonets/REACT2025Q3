import Message from './Message';
import Card from './Card';
import SkeletonRow from './SkeletonRow';
import type { SwapiPerson } from '../api/swapi';

interface ErrorObject {
  text: string;
  errorCode?: number;
}

interface ResultsBodyProps {
  people: SwapiPerson[];
  loading?: boolean;
  error?: ErrorObject | null;
  searchTerm?: string;
  highlight?: boolean;
}

const ResultsBody = ({
  people,
  loading = false,
  error,
  searchTerm,
  highlight,
}: ResultsBodyProps) => {
  if (loading)
    return (
      <div className="w-full h-80 overflow-y-auto flex items-start justify-center">
        <div className="w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))}
        </div>
      </div>
    );
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
          <Card
            key={person.url}
            person={person}
            searchTerm={searchTerm}
            highlight={highlight}
          />
        ))}
      </div>
    </div>
  );
};

export default ResultsBody;
